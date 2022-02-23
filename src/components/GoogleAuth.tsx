import React, { useState, useEffect, useRef, FC } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { JsxElement, JsxFragment } from "typescript";
import { signIn, signOut } from "../actions";
import { Link } from "react-router-dom";

declare const window: any;
interface Props {
  signIn: any;
  signOut: any;
  isSignedIn: boolean;
  userId: number;
}

const GoogleAuth: React.FC<Props> = (props) => {
  const auth: any = useRef("");
  const userName: any = useRef("");
  const [name, setName] = useState("");
  const [hasName, setHasName] = useState(false);
  useEffect(() => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "97173588437-eu6m0juhite8l928b79so73mvdq695mk.apps.googleusercontent.com",
        scope: "email",
      });

      auth.current = await window.gapi.auth2.getAuthInstance();
      onAuthChange(auth.current.isSignedIn.get());
      auth.current.isSignedIn.listen(onAuthChange);
    });
  }, []);

  const onAuthChange = async (isSignedIn: boolean) => {
    //console.log(isSignedIn)
    if (isSignedIn) {
      const result = await axios(
        `https://gypad-backend.herokuapp.com/user/${auth.current.currentUser.get().getId()}`
      );
      //const result = await axios(`https://gypad-backend.herokuapp.com/user/1`);
      console.log(auth.current.currentUser.get().getId())
      console.log(result.data);
      if (result.data[0] && result.data[0].name) {
        userName.current = result.data[0].name;
        setHasName(true);
        console.log("jest taki user i ma imie");
      }
      props.signIn(auth.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    auth.current.signIn();
  };
  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onNameSubmit = async (e: any) => {
    e.preventDefault();
    //post request
    const response = await axios.post(`https://gypad-backend.herokuapp.com/register`, {
      id: props.userId,
      username: name,
    });
    //todo: add action creator to update user in redux store
    console.log(props);
    if(response.data.name){
    setHasName(true);
    }
  };

  const renderNameForm = (): JSX.Element | null => {
    if (props.isSignedIn && hasName === false) {
      return (
        <div>
          <form onSubmit={onNameSubmit} className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              onChange={onNameChange}
              value={name}
            ></input>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
    } else return null;
  };

  const renderAuthButton = (): JSX.Element | null => {
    if (props.isSignedIn === null) {
      return null; //replace with  spinner later on
    } else if (props.isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="btn btn-danger btn-lg m-3">
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
    if (props.isSignedIn && hasName === true) {
      return (
        <Link to="/chart" className="btn btn-success btn-lg m-3">
          Go to your Chart
        </Link>
      );
    } else return null;
  };



  return (
    <>
      <div>{renderNameForm()}</div>
      <div>{renderAuthButton()}</div>
      <div>{renderGoToChart()}</div>
      <Link to="/demo" className="btn btn-outline-warning btn-lg m-3">
          Demo mode 
        </Link>
    </>
  );
};

const mapStateToProps = (state: any) => {
  //contains global state pieces
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps,{ signIn, signOut })(GoogleAuth);
