import { useNavigate } from "react-router-dom";
import logo from "../../assets/tribtel-logo.png"; 
import "./SuccessScreen.css";

const SuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <img src={logo} alt="TribTel Logo" className="success-logo" />

      <p className="success-subtitle">Account successfully created</p>
      <h1 className="success-title">You're a Triber</h1>
      <p className="success-note">Please check your email</p>

      <button className="success-btn" onClick={() => navigate("/signin")}>
        Continue
      </button>
    </div>
  );
};

export default SuccessScreen;
