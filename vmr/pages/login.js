import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const Login = () => {
  const { status, data } = useSession();
  const navigate = useRouter();

  const getTimestampInSeconds = () => {
    return Math.floor(Date.now() / 1000);
  };

  if (status === "authenticated") {
    if (data.user.expTime <= getTimestampInSeconds()) {
      signOut({
        redirect: false,
      });
    } else {
      navigate.push("/admin/dashboard");
    }
  }

  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LoginHandler = async (data, e) => {
    e.preventDefault();

    const status = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/admin/dashboard",
    });

    if (status.ok) {
      navigate.push("/admin/dashboard");
    }
    if (!status.ok) {
      setError(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Login</b>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Good to see you again</p>
            {error ? (
              <div className="alert alert-danger">
                Username and password are invalid.
              </div>
            ) : null}
            <form onSubmit={handleSubmit(LoginHandler)}>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    {...register("email", {
                      required: "Please enter the email",
                    })}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                {errors.email && (
                  <div className="error text-danger">
                    <p>{errors.email.message}</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: "Please enter the password",
                    })}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <div className="error text-danger">
                    <p>{errors.password.message}</p>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
