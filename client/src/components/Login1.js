import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login1 = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const handleCHange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", {
        email,
        password,
      });
      if (data.success === true) {
        setValues({ email: "", password: "" });
        toast.success(data.message);

        localStorage.setItem("token", JSON.stringify(data));

        if (typeof window !== "undefined") {
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
      // alert(err.response.data.message);
    }
  };

  return (
    <>
      <div className="login-dark">
        <form>
          <h2 className="sr-only">Login bn kirish </h2>
          <div className="illustration">
            <i className="icon ion-ios-locked-outline"></i>
          </div>
          <div className="form-group">
            <input
              onChange={handleCHange("email")}
              type="email"
              value={email}
              className="form-control q1"
              id="validationCustom01"
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
              id="validationCustom02"
              required
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Log In
            </button>
          </div>
          <Link className="aaa" to="/register" style={{ color: "#fff" }}>
            Ro'yxatdan o'tish
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login1;
