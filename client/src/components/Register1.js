import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register1 = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { email, password, userName } = values;
  const handleCHange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", {
        userName,
        email,
        password,
      });
      if (data.success === true) {
        setValues({ email: "", password: "", userName: "" });
        toast.success(data.message);

        navigate("/login");
      }
    } catch (err) {
      console.log(err.response.data.message);

      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="login-dark">
        <form className="needs-validation" style={{ color: "#fff" }}>
          <h2 className="sr-only">Ro'yxatdan o'tish </h2>
          <div className="illustration">
            <i className="icon ion-ios-locked-outline"></i>
          </div>
          <div className="form-group">
            <input
              onChange={handleCHange("userName")}
              type="text"
              value={userName}
              className="form-control q1"
              id="validationCustom01"
              placeholder="Eser name"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              onChange={handleCHange("email")}
              type="email"
              value={email}
              className="form-control q1"
              id="validationCustom02"
              placeholder="E-mail"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              onChange={handleCHange("password")}
              value={password}
              type="password"
              placeholder="password"
              className="form-control q1"
              id="validationCustom03"
              required
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <Link className="aaa" to="/login" style={{ color: "#fff" }}>
            Login bilan kirish
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register1;
