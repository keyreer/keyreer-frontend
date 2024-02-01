import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports.js";
Amplify.configure(awsExports);

export default function Login() {
  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["nickname"]}
      socialProviders={["google"]}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
