import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";

// import { UserContextType } from "./types";
import Home from "./pages/Home";
import Keyword from "./pages/Keyword";
import Login from "./pages/Login";

import "./App.css";

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '06f159b6-82df-41d8-bfd3-71b44fe6ad42',
    clientToken: 'pub19f71f64d5682a70ba36a9ec703a3e74',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'keyreer-frontend',
    env: 'prod',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0', 
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
});

Amplify.configure(config);

const App = () => {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/keywords" element={<Keyword />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Authenticator.Provider>
  );
};

export default App;
