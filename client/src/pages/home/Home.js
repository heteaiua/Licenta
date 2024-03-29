import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import "./Home.css";

function Home() {
  return (
    <div id="content">
      <header>Welcome to House Energy Management!</header>
      <h3>
        Start by creating your account, or if you have already, please log into
        your account
      </h3>
      <div className="mainAction">
        <Box>
          <Button
            sx={{
              "&.MuiButton-outlined": { color: "black" },
              "&.MuiButton-root": { border: "2px black solid" },
              mr: 2,
            }}
            startIcon={<HowToRegOutlinedIcon />}
            variant="outlined"
            size="large"
            href="/signup"
          >
            Register
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              "&.MuiButton-outlined": { color: "black" },
              "&.MuiButton-root": { border: "2px black solid" },
            }}
            startIcon={<LoginOutlinedIcon />}
            variant="outlined"
            size="large"
            href="/login"
          >
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Home;
