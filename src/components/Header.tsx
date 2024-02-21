import React from "react";
import { useNavigate } from "react-router-dom";

import { type WithAuthenticatorProps } from "@aws-amplify/ui-react";

import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

import logo from "../assets/logo.svg";

export default function Header({ signOut, user }: WithAuthenticatorProps) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    if (signOut) {
      signOut();
    }
    navigate("/");
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "150px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Typography
          component="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, fontSize: "16px" }}
        >
          Get Job alerts by keyword
        </Typography>

        {user ? (
          <ButtonGroup variant="text">
            <Button onClick={() => navigate("/keywords")}>Edit keywords</Button>
            <Button color="error" onClick={handleSignOut}>
              Sign out
            </Button>
          </ButtonGroup>
        ) : (
          <Button onClick={() => navigate("/login")}>Sign in</Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}
