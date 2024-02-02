import { Authenticator } from "@aws-amplify/ui-react";
import { View, Image, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import logo from "../assets/logo.svg";

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

export default function Login() {
  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["nickname"]}
      components={components}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
