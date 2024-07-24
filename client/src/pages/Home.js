import axios from "axios";
import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();

  // logout
  const logOut = async () => {
    try {
      const { data } = await axios.get("/users/logout");
      localStorage.removeItem("token");
      console.log(data.message);
      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error.respomse.data.message);
    }
  };
  // user profile
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    async function lorem() {
      await axios.get("/users/profile").then((el) => setUserInfo(el.data.user));
    }
    lorem();
  }, []);

  // blog qoshish
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    photo: "",
  });
  const [formData, setFormData] = useState("");

  const upload = ({ target: { files } }) => {
    let data = new FormData();
    // data.append("files", files);
    data.append("title", blog.title);
    data.append("description", blog.description);
    data.append("photo", files[0]);

    setFormData(data);
  };
  const handleChange = (prop) => (event) => {
    setBlog({ ...blog, [prop]: event.target.value });
  };
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/blog/add", formData);
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    } catch (error) {
      console.log(error.response.data.message);
      toast.success(error.response.data.message);
    }
  };

  // bloglarni korish
  const [postlar, setPostlar] = useState([]);

  useEffect(() => {
    async function lorem() {
      let res = await axios.get("/blog/blogs");

      setPostlar(res.data.getData);
    }
    lorem();
  }, []);

  // delete blog
  const Delete = async (id) => {
    try {
      let { data } = await axios.delete(`/blog/delete/${id}  `);
      if (data.success === true) {
        toast.success(data.message);
      }
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // update
  const Update = (elem) => {
    localStorage.setItem("postlar", JSON.stringify(elem));
    navigate(`/update/${elem._id}`);
  };
  return (
    <>
      <div classNameName="row">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
              id="navbarScroll"
            >
              <h2>{userInfo.userName}</h2>
              <div className="btn btn-info" onClick={logOut}>
                LogOut
              </div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Post Qo'shish
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Po'st qo'shish
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={Submit}>
                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <input
                          type="text"
                          value={blog.title}
                          onChange={handleChange("title")}
                          className="form-control bg-white border-0"
                          placeholder="title Name"
                          style={{ height: "55px" }}
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <input
                          type="text"
                          value={blog.description}
                          onChange={handleChange("description")}
                          className="form-control bg-white border-0"
                          placeholder="post Description"
                          style={{ height: "55px" }}
                        />
                        {/* <textarea name="comment" placeholder='Description'>sd</textarea> */}
                      </div>

                      <div className="col-12 col-sm-6">
                        <input
                          type="file"
                          onChange={upload}
                          className="form-control bg-white border-0"
                          placeholder="Doctor Image"
                          style={{ height: "55px" }}
                        />
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Qo'shish
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {postlar.map((elem, index) => {
            return (
              <div className="card" style={{ width: "18rem" }} key={index + 1}>
                <img
                  src={"http://localhost:5005/uploads/" + elem.photo}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{elem.title}</h5>
                  <p className="card-text">{elem.description}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => Delete(elem._id)}
                  >
                    DELETE
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => Update(elem)}
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
