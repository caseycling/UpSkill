import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { IntlProvider } from "react-intl";
import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import store, { persistor } from "../redux";
import messagesEn from "../i18n/en_CA.json";
import messagesFr from "../i18n/fr_CA.json";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";

const i18nConfigBuilder = (locale) => ({
  messages: locale === "ENGLISH" ? messagesEn : messagesFr,
  formats: {
    number: {
      CAD: {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
      },
    },
  },
});

const IntelProv = ({ children }) => {
  const { locale } = useSelector((state) => state.settings);
  const [i18nConfig, setI18nConfig] = useState(i18nConfigBuilder("en"));

  useEffect(() => {
    setI18nConfig(i18nConfigBuilder(locale));
    moment.locale(`${locale === "ENGLISH" ? "en" : "fr"}-ca`);
  }, [locale]);

  return (
    <IntlProvider
      locale={locale === "ENGLISH" ? "en" : "fr"}
      messages={i18nConfig.messages}
      formats={i18nConfig.formats}
    >
      {children}
    </IntlProvider>
  );
};

const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntelProv>{children}</IntelProv>
      </PersistGate>
    </Provider>
  );
};

IntelProv.propTypes = {
  children: PropTypes.node.isRequired,
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
