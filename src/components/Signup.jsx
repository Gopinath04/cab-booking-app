import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import InnerBanner from "./innerbanner";
import axios from "axios";

const Bannerdata = {
  title: "Sign Up",
  navtext: "Sign Up"
};

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Signup() {
  return (
    <article className="pb-100">
      <InnerBanner bannertext={Bannerdata} />
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Create an Account</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await axios.post(
                "http://localhost:5000/api/auth/signup",
                {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                }
              );
              alert(res.data.message || "Signup successful!");
              resetForm();
            } catch (err) {
              alert(err.response?.data?.message || "Error signing up");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <Field type="text" name="name" id="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field type="email" name="email" id="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field type="password" name="password" id="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </div>
      </div>
    </article>
  );
}
