import React, { useState, useEffect, useRef, FC } from "react";
import { connect } from "react-redux";
import { JsxElement, JsxFragment } from "typescript";
import { signIn, signOut } from "../actions";
import { Link } from "react-router-dom";

declare const window: any;
interface Props{
  signIn:any,
  signOut:any,
  isSignedIn:boolean
}

const GoogleAuth:React.FC<Props> = (props)=> {
  const auth: any = useRef("");
  //const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "97173588437-eu6m0juhite8l928b79so73mvdq695mk.apps.googleusercontent.com",
        scope: "email",
      });
      
      auth.current = window.gapi.auth2.getAuthInstance();
      onAuthChange(auth.current.isSignedIn.get());
      auth.current.isSignedIn.listen(onAuthChange);
    });
  },[]);


  const onAuthChange = (isSignedIn:boolean) => {
    //console.log(isSignedIn)
    if(isSignedIn){
      props.signIn(auth.current.currentUser.get().getId())
    } else {
      props.signOut()
    }
    
  };

  const onSignInClick = () => {
    auth.current.signIn();
  };
  const onSignOutClick = () => {
    auth.current.signOut();
}

  const renderAuthButton = (): JSX.Element | null => {
    if (props.isSignedIn === null) {
      return null; //replace with  spinner later on
    } else if (props.isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="btn btn-danger btn-lg mt-3">
          <i className="bi bi-google me-2"></i>Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="btn btn-danger btn-lg m-3">
          <i className="bi bi-google me-2"></i>Sign in with Google
        </button>
      );
    }
  };

  const renderGoToChart = (): JSX.Element | null => {
    if (props.isSignedIn) {
      return (
        <Link to="/chart" className="btn btn-success btn-lg m-3">
          Go to your Chart
        </Link>
      );
    } else return null;
  };

  return (
    <>
    {console.log(props)}
      <div>{renderAuthButton()}</div>
      <div>{renderGoToChart()}</div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  //contain state of entire application
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps,{ signIn, signOut })(GoogleAuth);
