import { useNavigate } from "react-router-dom";

import { View, Image, useTheme } from "@aws-amplify/ui-react";
import { Authenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import logo from "../assets/logo.svg";
import Home from "./Home";

export default function Login() {
  const navigate = useNavigate();

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
        navigate("/");
        return <Home />;
      }}
    </Authenticator>
  );
}
