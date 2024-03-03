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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import Header from "../components/Header";

import { fetchAuthSession } from "aws-amplify/auth";

const Keyword = ({ signOut, user }: WithAuthenticatorProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [jwtToken, setJwtToken] = useState<string>("");

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

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
        setDialogTitle("Success");
        setDialogContent("Keywords have been successfully registered.");
        setOpenDialog(true);
      } else {
        setDialogTitle("Failure");
        setDialogContent("Failed to register keywords.");
        setOpenDialog(true);
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogContent("An error occurred. Please try again.");
      setOpenDialog(true);
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
        <h1 style={{ marginBottom: "100px" }}>Edit your keywords!</h1>
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
                label="keywords"
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
                  deleteIcon={<ClearIcon style={{ color: "black" }} />}
                  sx={{
                    padding: 1,
                    paddingBottom: 1.1,
                    fontWeight: "bold",
                    fontSize: "14px",
                    borderWidth: 2,
                    borderRadius: "7px",
                    color: "black",
                    borderColor: "black",
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
            style={{ width: "100%", backgroundColor: "black" }}
            onClick={handleRegisterClick}
          >
            register
          </Button>
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogContent}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default withAuthenticator(Keyword);
