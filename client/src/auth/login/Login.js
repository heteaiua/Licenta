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
import Navbar from "../../components/Navbar";
const Login = () => {
  const paperStyle = {
    padding: 30,
    heigth: "80vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const btnStyle = { margin: "8px 0px" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState();

  if (redirect) {
    console.log(redirect);
    console.log(token);
    return <Navigate to="/" state={{ token: token }} />;
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
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
          color: "#ffff",
        }}
      >
        <h4> {errorMessage} </h4>{" "}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        setError(true);
      } else {
        const loginCall = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const json = await loginCall.json();
        //de aici imi da tokenul
        setToken(json.accessToken);
        setSubmitted(true);
        setError(false);
        setTimeout(() => setRedirect({ redirect: true }), 2000);
        localStorage.setItem("token", json.accessToken);
      }
    } catch (err) {
      setSubmitted(false);
      setError(err);
      setRedirect(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div id="content">
        <header>
          <Navbar />
        </header>
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
              onChange={handleEmail}
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
              Do not have an account? <Link href="/signup"> Register</Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </form>
  );
};
export default Login;
