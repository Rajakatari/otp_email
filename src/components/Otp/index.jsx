import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { Button, Form } from "react-bootstrap";
import "./index.css";
import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const Otp = ({ backButton, apiOtp, digits }) => {
  const [otp, setOtp] = useState(Array(digits).fill(""));
  const [isLogin, setIsLogin] = useState(false);
  console.log(otp);

  const inputRef = useRef([]);

  const handleOtp = (i, e) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[i] = value.substring(value.length - 1);

      setOtp(newOtp);
      if (value && i < digits - 1 && inputRef.current[i + 1]) {
        inputRef.current[i + 1].focus();
      }
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const stringOtp = otp.join("");
    console.log("string_otp:", stringOtp);
    console.log("apiOtp:", typeof apiOtp);
    if (apiOtp === JSON.parse(stringOtp)) {
      setIsLogin((prev) => !prev);
    } else {
      console.log("invalid otp");
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && i > 0 && inputRef.current[i - 1] && !otp[i]) {
      inputRef.current[i - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const otpInput = (digits) => {
    let inputs = [];
    for (let i = 0; i < digits; i++) {
      inputs.push(
        <Form.Group key={i} className="otp-shell">
          <Form.Control
            type="digit"
            ref={(input) => (inputRef.current[i] = input)}
            onChange={(e) => handleOtp(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            value={otp[i]}
          />
        </Form.Group>
      );
    }
    return inputs;
  };

  return (
    <>
      <FaLongArrowAltLeft onClick={backButton} className="back-button" />
      <div className="otp-login-container">
        {isLogin ? (
          <div>
            <MdCheck className="success-logo" />
            <h3>Login Success..!</h3>
            <p>Congratulations! You have been successfully authenticated</p>
          </div>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <h2>Verification Code</h2>
            <p>We have sent the verification code to your email address</p>
            <div className="otp-fields">{otpInput(digits)}</div>
            <Button varient="primary" type="submit">
              Confirm
            </Button>
          </Form>
        )}
      </div>
    </>
  );
};

export default Otp;
