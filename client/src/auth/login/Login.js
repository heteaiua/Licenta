import React, { useState } from "react";
import "./Login.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { Navigate } from "react-router-dom";

const Login = () => {
  const paperStyle = {
    padding: 30,
    heigth: "80vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const btnStyle = { margin: "8px 0px" };

  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState();
  if (redirect) {
    console.log(redirect);
    return <Navigate to="/dashboard" state={{ token: token }} />;
  }
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h4> User successfully login! </h4>
      </div>
    );
  };
  const errorMessage = () => {
    let errorMessage = "";
    if (error) {
      errorMessage = error[0].message;
    }
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
          color: "#ef0037",
        }}
      >
        <h4> {errorMessage} </h4>{" "}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError(true);
    } else {
      const loginCall = await fetch("http://localhost:3000/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ Username: username, Password: password }),
      });
      const json = await loginCall.json();
      //de aici imi da tokenul
      console.log(json);
      if (!json.error) {
        setToken(json.accessToken);
        setSubmitted(true);
        setError(false);
        setTimeout(() => setRedirect({ redirect: true }), 2000);
      } else {
        setSubmitted(false);
        setError(json.error);
        setRedirect(false);
      }
    }
  };
  return (
    <div id="content">
      <Grid align="center" marginTop={10}>
        <Paper elevation={10} style={paperStyle}>
          <Avatar style={avatarStyle}>
            <PersonIcon />
          </Avatar>
          <h2 style={btnStyle}> Log in</h2>
          <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            style={btnStyle}
            onChange={handleUsername}
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            style={btnStyle}
            type="password"
            onChange={handlePassword}
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            style={btnStyle}
            fullWidth
          >
            Login
          </Button>
          <Typography style={btnStyle}>
            Do not have an account? <Link href="/register"> Register</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};
export default Login;

