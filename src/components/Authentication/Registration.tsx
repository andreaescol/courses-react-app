import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateAuthForm } from "../../helpers/validateAuthForm";
import { registerUser } from "../../helpers/services";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./authentication.module.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError("");
    const validationErrors = validateAuthForm(formData);

    if (Object.values(validationErrors).some((value) => value !== "")) {
      setErrors(validationErrors);
      return;
    }

    const registerSuccess = await registerUser(formData);

    if (registerSuccess) {
      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    }

    setAuthError("Failed to register. Please try again.");
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={errors.name && styles.errors}>
            <Input
              labelText="Name"
              placeholderText="Please enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
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
          <Button type="submit" buttonText="Register" onClick={() => {}} />
          <div className={authError && styles.errors}>
            {authError && <p>{authError}</p>}
          </div>
        </form>
        <p>
          If you have an account, you may <Link to="/login">Login</Link>.
        </p>
      </div>
    </div>
  );
};

export default Registration;
