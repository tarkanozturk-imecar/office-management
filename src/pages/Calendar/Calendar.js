import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "./Calendar.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Calendar = ({ PageName, CRUDdata }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [allData, setAllData] = useState([]);

  let navigate = useNavigate();

  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const [currentEvents, setCurrentEvents] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);

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

  useEffect(() => {
    {
      currentUser &&
        UserService.getCalendarAllContent().then(
          (response) => {
            console.log(response.data.body.data.records);
            const formattedEvents = response.data.body.data.records.map(
              (event) => ({
                id: event.id,
                title: event.title,
                start: new Date(event.datetime_of).toISOString().slice(0, 16),
              })
            );

            console.log(formattedEvents);

            setEvents(formattedEvents);
            //setAllData(response.data.body.data.records);
          },
          (error) => {
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
        );
    }
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
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`http://testlab.imecar.com:8082/calendar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          datetime_of: formattedDatetime,
          title: newEvent.title,
          description: newEvent.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add event: ${response.statusText}`);
      }

      // Parse the response data (assuming it contains the newly added event)
      const data = await response.json();
      const addedCalendarItemID = data.body.data.records;
      console.log(addedCalendarItemID);

      //Get the Updated Calendar

      try {
        const response = await fetch(
          `http://testlab.imecar.com:8082` + `/calendar/${addedCalendarItemID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const calendarResponse = await response.json();
        console.log(calendarResponse.body.data.records);

        const originalResponse = calendarResponse.body.data.records;

        const formattedVariable = {
          id: originalResponse.id,
          title: originalResponse.title,
          start: new Date(originalResponse.datetime_of)
            .toISOString()
            .slice(0, 16),
        };

        setEvents((prevEvents) => [...prevEvents, formattedVariable]);
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

  const handleModalClose2 = () => {
    setShowModal2(false);
  };

  const handleDeleteEvent = async (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await fetch(
          `http://testlab.imecar.com:8082` +
            `/calendar/` +
            `${clickInfo.event.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        clickInfo.event.remove();
      } catch (error) {}
    }
  };

  const eventContent = ({ event }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <strong style={{ color: "purple" }}>{event.title}</strong>
      <p>
        <strong>saat:</strong>
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
    const user = JSON.parse(localStorage.getItem("user"));

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
      const response = await fetch(
        `http://testlab.imecar.com:8082/calendar/${updatedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update event: ${response.statusText}`);
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id
            ? { ...event, start: new Date(updatedEvent.datetime_of) }
            : event
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="demo-app">
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
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModalSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
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
