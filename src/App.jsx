import { useState } from "react";
import Otp from "./components/Otp";
import InputForm from "./components/InputForm";

import "./App.css";

function App() {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [apiOtp, setApiOtp] = useState("");
  let otpDigits = 6;

  const getOtp = async (userData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData,
    };
    try {
      const response = await fetch("http://localhost:4000/send-otp", options);
      const data = await response.json();
      console.log(data);
      setApiOtp(data.otp);
    } catch (e) {
      console.log(e.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    // eslint-disable-next-line no-unused-vars
    const numbersRegex = /^-?\d+$/;

    if (
      email !== "" &&
      emailRegex.test(email)
      //&&
      // mobile.length === 10 &&
      // numbersRegex.test(mobile)
    ) {
      setShowOtpInput((prev) => !prev);

      let userData = {
        email: email,
        digits: otpDigits,
      };
      userData = JSON.stringify(userData);
      console.log(userData);

      //API call for OTP

      getOtp(userData);
    } else {
      alert("invalid inputs");
    }
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeMobile = (e) => {
    setMobile(e.target.value);
  };

  const handleBackButton = () => {
    setShowOtpInput((prev) => !prev);
  };

  return (
    <>
      {showOtpInput ? (
        <Otp backButton={handleBackButton} apiOtp={apiOtp} digits={otpDigits} />
      ) : (
        <InputForm
          onSubmitHandler={submitHandler}
          email={email}
          mobile={mobile}
          onChangeEmail={changeEmail}
          onChangeMobile={changeMobile}
        />
      )}
    </>
  );
}

export default App;
