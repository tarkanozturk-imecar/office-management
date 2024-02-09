import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getData,
  addData,
  getByIdData,
  deleteData,
  editData,
} from "../../services/test.service";

const Calendar = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  let location = useLocation();

  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const [currentEvents, setCurrentEvents] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    datetime_of: "", // Combine date and time here
    description: "",
    time: "",
  });

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const showToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentUser &&
          (await getData(PageName).then(async (response) => {
            const formattedEvents = response.body.data.records.map((event) => ({
              id: event.id,
              title: event.title,
              start: new Date(event.datetime_of).toISOString().slice(0, 16),
            }));

            setEvents(formattedEvents);
          }));
      } catch (error) {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setAllData(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleDateSelect = (selectInfo) => {
    setNewEvent({
      title: "",
      datetime_of: selectInfo.startStr,
      //start: selectInfo.startStr,
      description: "",
      time: "",
    });
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    setShowModal(false);

    const datetime_of = new Date(newEvent.datetime_of);

    if (isNaN(datetime_of.getTime())) {
      console.error("Invalid date/time:", newEvent.datetime_of, newEvent.time);
      return;
    }

    const formattedDatetime = datetime_of.toISOString().slice(0, 16);

    // Send a POST request to add the event to the backend
    const bodyObject = {
      datetime_of: formattedDatetime,
      title: newEvent.title,
      description: newEvent.description,
    };

    try {
      let addedCalendarItemID;
      await addData(PageName, bodyObject).then(async (response) => {
        if (response.header.status === 400) {
          //DISPLAY ERROR MESSAGE FOR USER
          const errorMessage = response.header.messages[0].desc;
          showToastMessage(errorMessage);
        }

        // Parse the response data (assuming it contains the newly added event)
        addedCalendarItemID = response.body.data.records;
      });

      //Get the Updated Calendar
      try {
        await getByIdData(PageName, addedCalendarItemID).then(
          async (response) => {
            const originalResponse = response.body.data.records;

            const formattedVariable = {
              id: originalResponse.id,
              title: originalResponse.title,
              start: new Date(originalResponse.datetime_of)
                .toISOString()
                .slice(0, 16),
            };

            setEvents((prevEvents) => [...prevEvents, formattedVariable]);
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteEvent = async (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      try {
        await deleteData(PageName, clickInfo.event.id).then(
          async (response) => {
            clickInfo.event.remove();
          }
        );
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  const eventContent = ({ event }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexWrap: "wrap",
        backgroundColor: "#3788d8",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <strong style={{ color: "white" }}>{event.title}</strong>
      <p style={{ color: "white" }}>
        <strong style={{ color: "white" }}>- saat: </strong>
        {formatEventTime(event.start)}
      </p>
    </div>
  );

  const formatEventTime = (date) => {
    // Using JavaScript's Intl.DateTimeFormat to format time
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(date);
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  /* const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }; */

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };

  const adjustTime = (time, hours) => {
    const [selectedHours, selectedMinutes] = time.split(":");
    const adjustedHours = (parseInt(selectedHours, 10) + hours) % 24;
    const adjustedTime = `${adjustedHours
      .toString()
      .padStart(2, "0")}:${selectedMinutes}`;
    return adjustedTime;
  };

  const handleEventDrop = async (dropInfo) => {
    const prevEvent = events.find((event) => event.id === dropInfo.event.id);
    const prevTime = prevEvent
      ? new Date(prevEvent.start).toISOString().split("T")[1]
      : "";

    const adjustedTime = adjustTime(prevTime, 3);

    const updatedEvent = {
      id: dropInfo.event.id,
      datetime_of: `${
        dropInfo.event.start.toISOString().split("T")[0]
      }T${adjustedTime}:00`, // Combine date and previous time
    };

    try {
      await editData(PageName, updatedEvent.id, updatedEvent).then(
        async (response) => {
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === updatedEvent.id
                ? { ...event, start: new Date(updatedEvent.datetime_of) }
                : event
            )
          );

          if (!response) {
            //DISPLAY ERROR MESSAGE FOR USER
            const errorMessage = response.header.messages[0].desc;
            showToastMessage(errorMessage);
          }
        }
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      <div className="demo-app">
        <ToastContainer />
        {renderSidebar()}
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            //initialEvents={INITIAL_EVENTS}
            select={handleDateSelect}
            //eventContent={renderEventContent}
            eventClick={handleDeleteEvent}
            eventsSet={handleEvents}
            events={events}
            eventContent={eventContent}
            eventDrop={handleEventDrop}
          />
          {/* {renderModal()} */}
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    disabled
                    type="date"
                    value={
                      newEvent.datetime_of
                        ? newEvent.datetime_of.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        datetime_of: e.target.value + "T" + newEvent.time,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => {
                      const selectedTime = e.target.value;
                      const adjustedTime = adjustTime(selectedTime, 3); // Adjust time by 3 hours
                      setNewEvent((prevEvent) => ({
                        ...prevEvent,
                        time: selectedTime,
                        datetime_of: `${
                          prevEvent.datetime_of.split("T")[0]
                        }T${adjustedTime}:00`,
                      }));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Enter event description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleModalSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );

  function renderSidebar() {
    /* const sidebarEvents = currentEvents.slice(0, 10); */ // Display only the first 10 events

    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul
            className="scrollable-events-list"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    );
  }
};

export default Calendar;
