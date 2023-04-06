import React, { useState } from "react";
import "./SignUp.css";
import { TextField, Button, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
export default function Signup() {
  const style = { margin: "10px " };

  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [cnp, setCnp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (redirect) {
    console.log(redirect);
    console.log(token);
    return <Navigate to="/" state={{ token: token }} />;
  }

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
    setSubmitted(false);
  };
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
    setSubmitted(false);
  };
  const handleCnp = (e) => {
    setCnp(e.target.value);
    setSubmitted(false);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
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
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        age === "" ||
        cnp === "" ||
        phoneNumber === "" ||
        password !== confirmPassword ||
        age < 18
      ) {
        console.log("nu e bn");
        setError(true);
      } else {
        const registerCall = await fetch("http://localhost:5000/user/signup", {
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
        const json = await registerCall.json();
        if (!json.error) {
          setToken(json.accessToken);
          setSubmitted(true);
          setError(false);
          setTimeout(() => setRedirect({ redirect: true }), 2000);
          localStorage.setItem("token", json.accessToken);
        }
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
          <div className="home">
            <div className="featuredItem">
              <div>
                <div>
                  <h1>Register form</h1>
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handleFirstName}
                    variant="outlined"
                    label="First Name"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handleLastName}
                    variant="outlined"
                    label="Last Name"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handleEmail}
                    variant="outlined"
                    label="Email"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handlePassword}
                    variant="outlined"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handleConfirmPassword}
                    variant="outlined"
                    label="Confirm Paswword"
                    type="password"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handleAge}
                    variant="outlined"
                    label="Age"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handleCnp}
                    variant="outlined"
                    label="CNP"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <TextField
                    style={style}
                    id="outlined-basic"
                    onChange={handlePhoneNumber}
                    variant="outlined"
                    label="Phone Number"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="featuredTitle">
                  <Button
                    style={style}
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </form>
  );
}
