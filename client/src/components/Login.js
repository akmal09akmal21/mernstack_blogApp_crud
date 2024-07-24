import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
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
      <div className="row">
        <div className="col-12 mt-5 text-center">
          {" "}
          <Link to="/register" className="btn btn-info">
            SignUp
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form
            className="row g-3 offset-md-4 offset-lg-4  needs-validation "
            noValidate
          >
            <div className="col-md-4 align-center">
              <label htmlFor="validationCustom01" className="form-label">
                Email
              </label>
              <input
                onChange={handleCHange("email")}
                type="email"
                value={email}
                className="form-control"
                id="validationCustom01"
                placeholder="E-mail"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="w-100"></div>
            <div className="col-md-4">
              <label htmlFor="validationCustom02" className="form-label">
                Password
              </label>
              <input
                onChange={handleCHange("password")}
                value={password}
                type="password"
                placeholder="password"
                className="form-control"
                id="validationCustom02"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
