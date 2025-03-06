import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateAuthForm } from "../../helpers/validateAuthForm";
import { loginUser } from "../../helpers/services";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./authentication.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError("");

    const validationErrors = validateAuthForm(formData);

    if (Object.values(validationErrors).some((value) => value !== "")) {
      setErrors(validationErrors);
      return;
    }

    const token = await loginUser(formData);

    if (token) {
      localStorage.setItem("token", token);

      setFormData({ email: "", password: "" });
      navigate("/courses");
    }
    setLoginError("Failed to login. Please try again.");
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={errors.email && styles.errors}>
            <Input
              labelText="Email"
              placeholderText="Please enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div className={errors.password && styles.errors}>
            <Input
              labelText="Password"
              placeholderText="Please enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <Button type="submit" buttonText="Login" onClick={() => {}} />
          <div className={loginError && styles.errors}>
            {loginError && <p>{loginError}</p>}
          </div>
        </form>
        <p>
          If you don't have an account, you may{" "}
          <Link to="/registration">Register</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
