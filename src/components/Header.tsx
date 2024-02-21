import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { type WithAuthenticatorProps } from "@aws-amplify/ui-react";

import { Toolbar, Button, ButtonGroup, Box } from "@mui/material";

import logo from "../assets/logo.svg";

export default function Header({ signOut, user }: WithAuthenticatorProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    if (signOut) {
      signOut();
    }
    navigate("/");
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "200px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>
        <Box sx={{ width: "100%" }} /> {/* 균형을 맞추기 위한 빈 박스 */}
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
        >
          {user ? (
            <ButtonGroup variant="text">
              {location.pathname === "/" && (
                <Button onClick={() => navigate("/keywords")}>
                  Edit keywords
                </Button>
              )}
              {location.pathname === "/keywords" && (
                <Button onClick={() => navigate("/")}>Home</Button>
              )}
              <Button color="error" onClick={handleSignOut}>
                Sign out
              </Button>
            </ButtonGroup>
          ) : (
            <Button onClick={() => navigate("/login")}>Sign in</Button>
          )}
        </Box>
      </Toolbar>
    </React.Fragment>
  );
}
