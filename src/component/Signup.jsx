import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "Individual",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    pincode: "",
    isdCode: "",
    mobile: "",
    fax: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "fax" && key !== "phone") {
        newErrors[key] = `Please enter valid ${key}`;
      }
    });

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password must match the password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Signup Successful!");
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4 mt-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h2 className="text-center mb-4">Rappifuzz Signup Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {["Individual", "Enterprise", "Government"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">{type}</label>
              </div>
            ))}
          </div>

          {[
            "firstName",
            "lastName",
            "email",
            "address",
            "pincode",
            "isdCode",
            "mobile",
            "password",
            "confirmPassword",
          ].map((field) => (
            <div key={field} className="mb-3">
              <label>{field.replace(/([A-Z])/g, " $1").trim()} *</label>
              <input
                type={
                  field.includes("password") && !showPassword
                    ? "password"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`form-control ${errors[field] ? "is-invalid" : ""}`}
              />
              {errors[field] && (
                <div className="invalid-feedback">{errors[field]}</div>
              )}
            </div>
          ))}

          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="showPassword"
              className="form-check-input"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          {["fax", "phone"].map((field) => (
            <div key={field} className="mb-3">
              <label>{field.replace(/([A-Z])/g, " $1").trim()}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}

          <button type="submit" className="btn btn-info w-100">
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
