import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const navigator = useNavigate();
  // const Yonaltirish = ()=>{
  //     navigator('/buyurtma');

  let { id } = useParams();
  let localClient = JSON.parse(localStorage.getItem("postlar"));
  console.log(localClient);
  const [values, setValues] = useState({
    title: localClient.title,
    description: localClient.description,
  });
  const [formData, setFormData] = useState("");

  const upload = ({ target: { files } }) => {
    let data2 = new FormData();
    data2.append("files", files);
    data2.append("title", values.title);
    data2.append("description", values.description);
    data2.append("photo", files[0]);

    setFormData(data2);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/blog/update/${id}`, formData);
      toast.success(data.message);
      navigator("/home");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={Submit}>
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  value={values.title}
                  onChange={handleChange("title")}
                  className="form-control bg-white border-0"
                  placeholder="title title"
                  style={{ height: "55px" }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  value={values.description}
                  onChange={handleChange("description")}
                  className="form-control bg-white border-0"
                  placeholder="post Description"
                  style={{ height: "55px" }}
                />
                {/* <textarea title="comment" placeholder='Description'>sd</textarea> */}
              </div>

              <div className="col-12 col-sm-6">
                <input
                  type="file"
                  onChange={upload}
                  className="form-control bg-white border-0"
                  placeholder="post Image"
                  style={{ height: "55px" }}
                />
              </div>

              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Make An Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
