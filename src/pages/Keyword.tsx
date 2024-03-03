import { useState, useEffect } from "react";
import {
  withAuthenticator,
  type WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

import {
  Autocomplete,
  Chip,
  Container,
  TextField,
  Box,
  Button,
} from "@mui/material";
import Header from "../components/Header";

import { fetchAuthSession } from "aws-amplify/auth";

const Keyword = ({ signOut, user }: WithAuthenticatorProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [jwtToken, setJwtToken] = useState<string>("");

  const handleChangeKeywords = (newValue: string[]) => {
    setKeywords(newValue);
  };

  const handleRegisterClick = async () => {
    try {
      const response = await fetch("https://api.keyreer.com/keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({
          keywords: keywords,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success: ", data);
        alert("Keywords successfully registered!");
      } else {
        console.error("Failed to register keywords");
        alert("Failed to register keywords.");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchJwtToken = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        if (tokens && tokens.idToken) {
          const tokenStr = tokens.idToken.toString();
          setJwtToken(tokenStr);
          return tokenStr;
        } else {
          console.error("No tokens found in the session.");
          return null;
        }
      } catch (error) {
        console.error("Error fetch ing JWT token: ", error);
        return null;
      }
    };

    const fetchKeywords = async (token: string) => {
      try {
        const response = await fetch("https://api.keyreer.com/keywords", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.keywords) {
            setKeywords(data.keywords);
          }
        } else {
          console.error("Failed to fetch keywords");
        }
      } catch (error) {
        console.error("Error fetching keywords: ", error);
      }
    };

    fetchJwtToken().then((token) => {
      if (token) {
        fetchKeywords(token);
      }
    });
  }, []);

  return (
    <Container>
      <Header user={user} signOut={signOut} />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "80vh" }}
      >
        <h1>/keywords</h1>
        <Box maxWidth="450px" width="100%">
          <Autocomplete
            multiple
            options={[]}
            value={keywords}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"+"}
                label="Add your keywords"
                variant="standard"
                inputProps={{
                  ...params.inputProps,
                  maxLength: 20,
                  sx: { paddingLeft: 10 },
                }}
                // 여기서 width와 height 스타일은 필요 없으므로 제거했습니다.
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  variant="outlined"
                  color="primary"
                  label={option}
                  sx={{
                    padding: 1,
                    paddingBottom: 1.1,
                    fontWeight: "bold",
                    fontSize: "14px",
                    borderWidth: 2,
                  }}
                />
              ))
            }
            onChange={(e, newValue) => {
              handleChangeKeywords(newValue);
            }}
            style={{ width: "100%" }}
          />
        </Box>
        <Box maxWidth="450px" width="100%" marginTop="25px">
          <Button
            variant="contained"
            size="large"
            style={{ width: "100%" }}
            onClick={handleRegisterClick}
          >
            register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default withAuthenticator(Keyword);
