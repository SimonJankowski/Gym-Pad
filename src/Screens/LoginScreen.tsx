import React from "react";
import GoogleAuth from "../components/GoogleAuth";

const LoginScreen: React.FC = () => {
  return (
    <>
      <div className="body d-flex text-center text-dark">
        <div className="container justify-content-center align-items-center mt-1">
        <header className="mb-auto"></header>
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4 mt-5">
              <div className="card shadow">
                <div className="card-body">
                <h5 className="card-title">Login</h5>
                <GoogleAuth/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;

//97173588437-eu6m0juhite8l928b79so73mvdq695mk.apps.googleusercontent.com
//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