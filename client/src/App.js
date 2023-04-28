import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./pages/UserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserForm />
      <ToastContainer />
    </>
  );
}

export default App;
