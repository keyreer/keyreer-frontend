import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { View, Image, useTheme } from "@aws-amplify/ui-react";
import { Authenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import logo from "../assets/logo.svg";
import Home from "./Home";
// import { UserContextType } from "../types";
// import { UserContext } from "../App";

export default function Login() {
  // const { setSignOut, setUser, user } =
  //   useContext<UserContextType>(UserContext);

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image alt="keyreer logo" src={logo} />
        </View>
      );
    },
  };

  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["nickname"]}
      components={components}
    >
      {({ signOut, user }: WithAuthenticatorProps) => {
        return <Home />;
      }}
    </Authenticator>
  );
}
