import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { View, Image, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import logo from "../assets/logo.svg";
import Keyword from "./Keyword";

export default function Login() {
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    const fetchJwtToken = async () => {
      try {
        // fetchAuthSession을 사용하여 세션 정보를 가져옵니다.
        const { tokens } = await fetchAuthSession();
        // idToken에서 JWT 토큰을 추출하여 상태에 저장합니다.
        if (tokens && tokens.idToken) {
          setJwtToken(tokens.idToken.toString());
        } else {
          console.error("No tokens found in the session.");
        }
      } catch (error) {
        console.error("Error fetching JWT token: ", error);
      }
    };

    fetchJwtToken();
  }, []);
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
      {({ signOut, user }) => (
        <Keyword />
      )}
    </Authenticator>
  );
}
