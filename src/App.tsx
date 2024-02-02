import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
