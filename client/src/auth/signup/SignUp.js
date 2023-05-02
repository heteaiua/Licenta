import React, { useEffect, useState } from "react";
import "./SignUp.css";
import {
  Paper,
  Link,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
export default function Signup() {
  const paperStyle = {
    padding: 30,
    heigth: "80vh",
    width: 360,
    margin: "20px auto",
  };
  const style = { margin: "10px " };
  const btnStyle = { margin: "8px 0px" };

  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    cnp: "",
    phoneNumber: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [cnp, setCnp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (redirect) {
    return <Navigate to="/dashboard" state={{ token: token }} />;
  }

  const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
  const PHONE_NUMBER_REGEXP = /^\+40\s?7\d{8}$/;
  //  const CNP_REGEXP = /^[\d]{13}$/;

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (!EMAIL_REGEXP.test(e.target.value)) {
      errors.email = "Email wrong format";
    } else {
      errors.email = "";
    }
    setSubmitted(false);
  };

  console.log(errors);
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
    if (e.target.value < 18) {
      errors.age = "Age must be over 18";
    } else {
      errors.age = "";
    }
    setSubmitted(false);
  };
  const handleCnp = (e) => {
    setCnp(e.target.value);
    if (e.target.value.length < 13 || e.target.value.length > 13) {
      errors.cnp = "CNP must be 13 characters";
    } else {
      errors.cnp = "";
    }
    setSubmitted(false);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    if (!PHONE_NUMBER_REGEXP.test(e.target.value)) {
      errors.phoneNumber = "Phone number format wrong, must start with +40";
    } else {
      errors.phoneNumber = "";
    }
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
        <h4> User successfully registered! </h4>
      </div>
    );
  };
  const errorMessage = () => {
    let errorMessage = "";
    if (error) {
      errorMessage = error[0]?.message;
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
  const isDisabled =
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    age === "" ||
    cnp === "" ||
    phoneNumber === "" ||
    password !== confirmPassword ||
    age < 18;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isDisabled) {
        setError(true);
      } else {
        await fetch("http://localhost:5000/user/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },

          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            age: age,
            cnp: cnp,
            phoneNumber: phoneNumber,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        // const json = await registerCall.json();
        // if (!json.error) {
        //setToken(json.accessToken);
        setSubmitted(true);
        setError(false);
        setTimeout(() => setRedirect({ redirect: true }), 2000);
        // localStorage.setItem("token", json.accessToken);
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
            <h2 style={btnStyle}>Register form</h2>
            <div className="messages">
              {errorMessage()}
              {successMessage()}
            </div>
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handleFirstName}
              variant="outlined"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handleLastName}
              variant="outlined"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handleEmail}
              variant="outlined"
              label="Email"
              type="text"
              fullWidth
            />
            {errors.email}
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handlePassword}
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handleConfirmPassword}
              variant="outlined"
              label="Confirm Paswword"
              type="password"
              fullWidth
            />
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handleAge}
              variant="outlined"
              label="Age"
              type="text"
              fullWidth
            />
            {errors.age}
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handleCnp}
              variant="outlined"
              label="CNP"
              type="text"
              fullWidth
            />
            {errors.cnp}
            <TextField
              style={style}
              id="outlined-basic"
              onChange={handlePhoneNumber}
              variant="outlined"
              label="Phone Number"
              type="text"
              fullWidth
            />
            {errors.phoneNumber}
            <Button
              style={style}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Register
            </Button>
            <Typography style={btnStyle}>
              Do you already have an account? <Link href="/login"> Login</Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </form>
  );
}
