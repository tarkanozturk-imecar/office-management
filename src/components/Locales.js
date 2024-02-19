import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// third-party
import { IntlProvider } from "react-intl";

// project import
import useConfig from "../components/hooks/useConfig";

// load locales files
const loadLocaleData = (locale) => {
  /* console.log(locale); */
  switch (locale) {
    case "en":
      return import("../utils/locales/en.json");

    case "tr":
    default:
      return import("../utils/locales/tr.json");
  }
};

// ==============================|| LOCALIZATION ||============================== //

const Locales = ({ children }) => {
  const { i18n } = useConfig();

  const [messages, setMessages] = useState();

  useEffect(() => {
    loadLocaleData(i18n).then((d) => {
      setMessages(d.default);
    });
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="tr" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

Locales.propTypes = {
  children: PropTypes.node,
};

export default Locales;
