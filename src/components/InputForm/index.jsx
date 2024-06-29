import { Form, Button } from "react-bootstrap";
import "./index.css";
import logo from "../../Image.png";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const InputForm = ({
  // eslint-disable-next-line react/prop-types
  email,
  // eslint-disable-next-line react/prop-types
  mobile,

  // eslint-disable-next-line react/prop-types
  onSubmitHandler,
  // eslint-disable-next-line react/prop-types
  onChangeEmail,
  // eslint-disable-next-line react/prop-types
  onChangeMobile,
}) => {
  const inputFormRef = useRef(null);

  useEffect(() => {
    inputFormRef.current.focus();
  }, []);
  return (
    <div className="form-input-main-container">
      <div className="form-card">
        <img src={logo} alt="otp logo" />
        <h2>OTP Verification</h2>
        <p>Enter email and phone number to send one time password</p>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={onChangeEmail}
              value={email}
              required
              ref={inputFormRef}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              onChange={onChangeMobile}
              value={mobile}
              required
            />
          </Form.Group>
          <Button type="submit" variant="outline-primary">
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default InputForm;
