import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    clientToken: 'pub19f71f64d5682a70ba36a9ec703a3e74',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100
});

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
    beforeSend: (event, context) => {
      // collect a RUM resource's response headers
      // if (event.type === 'resource' && event.resource.type === 'fetch') {
      //     event.context.responseHeaders = Object.fromEntries(context.response.headers)
      // }

      datadogLogs.logger.info(JSON.stringify(event));
      datadogLogs.logger.info(JSON.stringify(context));

      return true
  }
});



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
