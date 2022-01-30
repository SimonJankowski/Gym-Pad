import React, { useState, useEffect, useRef, FC } from "react";
import { JsxElement } from "typescript";
declare const window: any;

const GoogleAuth: React.FC = () => {
  const auth: any = useRef("");
  const [isSignedIn, setIsSignedIn] = useState(null);

  //in use effect first arguement is callback function, second have 3 options:
  useEffect(() => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "97173588437-eu6m0juhite8l928b79so73mvdq695mk.apps.googleusercontent.com",
        scope: "email",
      });
      auth.current = window.gapi.auth2.getAuthInstance();
      setIsSignedIn(auth.current.isSignedIn.get());
      auth.current.isSignedIn.listen(onAuthChange);
    });
  }, []);

  const onAuthChange = () => {
    setIsSignedIn(auth.current.isSignedIn.get());
  };

  const renderAuthButton = (): JSX.Element | null => {
    if (isSignedIn === null) {
      return null; //replace with  spinner later on
    } else if (isSignedIn) {
      return (
        <button className="btn btn-danger btn-lg mt-3">
          <i className="bi bi-google me-2"></i>Sign Out
        </button>
      );
    } else {
      return (
        <button className="btn btn-danger btn-lg m-3">
          <i className="bi bi-google me-2"></i>Sign in with Google
        </button>
      );
    }
  };

const renderGoToChart =():JSX.Element|null =>{
  if(isSignedIn){
    return <a href="/chart" className="btn btn-success btn-lg m-3">Go to your Chart</a>
  } else return null
}

  return <>
  <div>{renderAuthButton()}</div>
  <div>{renderGoToChart()}</div>
  </>;
};

export default GoogleAuth;
