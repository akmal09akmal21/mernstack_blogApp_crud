import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
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
      const { data } = await axios.post("/users/signup", {
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
      <div className="row ">
        <div className="col-12 mt-5 text-center">
          {" "}
          <Link to="/login" className="btn btn-info">
            SignIn
          </Link>
        </div>
        <div className="col">
          <form className="row g-3 needs-validation m-5" noValidate>
            <div className="col-md-4">
              <label htmlFor="validationCustom04" className="form-label">
                Last name
              </label>
              <input
                onChange={handleCHange("userName")}
                type="text"
                value={userName}
                className="form-control"
                id="validationCustom04"
                placeholder="Last Name"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="w-100"></div>
            <div className="col-md-4">
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
            {/* <div className="col-12"></div> */}
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
export default Register;
