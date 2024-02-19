import { useRef, useState } from "react";
import { Button, Overlay, Tooltip, NavDropdown, Nav } from "react-bootstrap";

import useConfig from "../components/hooks/useConfig";

const Localization = () => {
  const { i18n, onChangeLocalization } = useConfig();

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleListItemClick = (lang) => {
    console.log(lang);
    onChangeLocalization(lang);
    setShow(false);
  };

  return (
    <>
      <Nav /* className="me-auto" */>
        <NavDropdown
          title={
            i18n === "tr" ? (
              <img
                src={process.env.PUBLIC_URL + "/turkeyFlag.png"}
                width={20}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + "/englishFlag.png"}
                width={20}
                style={{ marginRight: "10px" }}
              />
            )
          }
          id="basic-nav-dropdown"
          style={{ alignItems: "left" }}
        >
          <NavDropdown.Item
            href="#tr"
            onClick={() => handleListItemClick("tr")}
          >
            <img
              src={process.env.PUBLIC_URL + "/turkeyFlag.png"}
              width={20}
              style={{ marginRight: "10px" }}
            ></img>
            Türkçe (TR)
          </NavDropdown.Item>

          <NavDropdown.Item
            href="#en"
            onClick={() => handleListItemClick("en")}
          >
            <img
              src={process.env.PUBLIC_URL + "/englishFlag.png"}
              width={20}
              style={{ marginRight: "10px" }}
            ></img>
            English (EN)
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

export default Localization;
