import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register } from "../services/api";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(form);
      loginUser(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Errore durante la registrazione");
    } finally {
      setLoading(false);
    }
  };

  return <div></div>;
};

export default Register;
