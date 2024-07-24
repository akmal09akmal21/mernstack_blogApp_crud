import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Login from "./components/Login";
import Home from "./pages/Home";
// import Register from "./components/Register";
import PrivateRoute from "./components/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./components/Update";
import Login1 from "./components/Login1";
import Register1 from "./components/Register1";
function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route path="/register" element={<Register1 />} />
        <Route path="/" element={<Login1 />} />
        <Route path="/login" element={<Login1 />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
