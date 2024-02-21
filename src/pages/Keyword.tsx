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

  const handleChangeKeywords = (newValue: string[]) => {
    setKeywords(newValue);
  };

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
        console.error("Error fetch ing JWT token: ", error);
      }
    };

    fetchJwtToken();
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
            onClick={() => {
              console.log("button clicked");
            }}
          >
            register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default withAuthenticator(Keyword);
