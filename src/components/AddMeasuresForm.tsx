import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const AddMeasuresForm = (props: any) => {
  console.log(props)
  let dane:any
  if(props.userId===999){
     dane = props.user.stats
  } else dane = props.userData

  const [form, setForm] = useState({
    bodyweight: 75,
    waist: 88,
    biceps: 30,
    benchpress: 60,
  });

  useEffect(()=>{
    
    if(dane.bodyweight.length){
    setForm({ ...form, bodyweight:dane.bodyweight[dane.bodyweight.length-1].value})
  }
  if(dane.waist.length){
    setForm({ ...form, waist:dane.waist[dane.waist.length-1].value})
  }
  if(dane.waist.length){
    setForm({ ...form, biceps: dane.biceps[dane.biceps.length-1].value})
  }
  if(dane.waist.length){
    setForm({ ...form, benchpress: dane.benchpress[dane.benchpress.length-1].value})
  }
  },[])
  
 
  const onBodyweightChange = (e: any) => {
    setForm({ ...form, bodyweight: Number(e.target.value) });
  };

  const onWaistChange = (e: any) => {
    setForm({ ...form, waist: Number(e.target.value) });
  };

  const onBicepsChange = (e: any) => {
    setForm({ ...form, biceps: Number(e.target.value) });
  };

  const onBenchpressChange = (e: any) => {
    setForm({ ...form, benchpress: Number(e.target.value) });
  };

  const onCancelClick = (e: any) => {
    e.preventDefault();
    props.modalToggle();
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    //patch request
    //const res = await axios.patch(`http://localhost:3001/user/${props.userId}`, {...form, timestamp: Date.now()});
    const res = await axios.patch(`https://gypad-backend.herokuapp.com/user/${props.userId}`, {...form, timestamp: Date.now()});
    console.log(res)
    props.signIn(res.data.id, res.data.stats)
    props.modalToggle();
  };

  const renderOptions = (from: number, to: number, gap: number) => {
    let options = [];
    for (let i = from * 10; i <= to * 10; i = i + gap) {
      options.push(i / 10);
    }
    return options.map((num) => {
      return (
        <option key={num} value={num}>
          {num}
        </option>
      );
    });
  };
  //<option value="${i}.${j}">${i}.${j}</option>

  const disableButton = (id: number, userData:any) => {
    // id===999 ?  "disabled" :  "";
    if (id === 999 || userSubmittedToday(userData)===true) {
      return "disabled";
    } else return "";
  };

  const renderWarning = (id: number, userData:any) => {
    if (id === 999) {
      return (
        <p className="text-danger">
          {" "}
          You can't send PATCH request in demo mode
        </p>
      );
    } else if(userSubmittedToday(userData)===true){
      return(
        <p className="text-danger">
          {" "}
          You already submitted measures Today
        </p>
      )
    } return null;
  };

  const userSubmittedToday=(userData:any)=>{
    if(!userData.bodyweight.length||
      !userData.waist.length||
      !userData.biceps.length||
      !userData.benchpress.length){
        return false
      }
    let bodyweightLastEntry = new Date(userData.bodyweight[userData.bodyweight.length - 1].date)
    let waistLastEntry = new Date(userData.waist[userData.waist.length - 1].date)
    let bicepsLastEntry = new Date(userData.biceps[userData.biceps.length - 1].date)
    let benchpressLastEntry = new Date(userData.benchpress[userData.benchpress.length - 1].date)
    let today = new Date(Date.now())
    if(bodyweightLastEntry.getDate() === today.getDate() && 
    bodyweightLastEntry.getMonth() === today.getMonth() &&
    bodyweightLastEntry.getFullYear() === today.getFullYear()){
      return true
    }else if(waistLastEntry.getDate() === today.getDate() && 
    waistLastEntry.getMonth() === today.getMonth() &&
    waistLastEntry.getFullYear() === today.getFullYear()){
      return true
    }else if(bicepsLastEntry.getDate() === today.getDate() && 
    bicepsLastEntry.getMonth() === today.getMonth() &&
    bicepsLastEntry.getFullYear() === today.getFullYear()){
      return true
    }else if(benchpressLastEntry.getDate() === today.getDate() && 
    benchpressLastEntry.getMonth() === today.getMonth() &&
    benchpressLastEntry.getFullYear() === today.getFullYear()){
      return true
    } else return false
      
  }

  return (
    <>
      {console.log(form)}
      <form onSubmit={onFormSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Bodyweight{" "}
          </label>
          <select
            onChange={onBodyweightChange}
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue={form.bodyweight}
          >
            <option disabled>Choose...</option>
            {renderOptions(60, 130, 1)}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Waist{" "}
          </label>
          <select
            onChange={onWaistChange}
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue={form.waist}
          >
            <option>Choose...</option>
            {renderOptions(60, 130, 1)}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Biceps{" "}
          </label>
          <select
            onChange={onBicepsChange}
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue={form.biceps}
          >
            <option disabled>Choose...</option>
            {renderOptions(20, 65, 1)}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Benchpress{" "}
          </label>
          <select
            onChange={onBenchpressChange}
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue={form.benchpress}
          >
            <option disabled>Choose...</option>
            {renderOptions(40, 250, 5)}
          </select>
        </div>
        <div className="modal-footer">
          <button onClick={onCancelClick} className="btn btn-outline-danger">
            Cancel
          </button>
          <button
            className={`btn btn-primary ${disableButton(props.userId, props.userData)}`}
          >
            Submit
          </button>
          {renderWarning(props.user.id, props.userData)}
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state)
  //contains global state pieces
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId, stats:state.auth.stats };
};

export default connect(mapStateToProps,{ signIn, signOut })(AddMeasuresForm);
