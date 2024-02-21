import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";

// import { UserContextType } from "./types";
import Home from "./pages/Home";
import Keyword from "./pages/Keyword";
import Login from "./pages/Login";

import "./App.css";
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
