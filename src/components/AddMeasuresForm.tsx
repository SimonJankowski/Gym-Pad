import React from "react";
import { Button } from "react-bootstrap";

const AddMeasuresForm = (props: any) => {
  console.log(props);
  const onCancelClick = (e: any) => {
    e.preventDefault();
    props.modalToggle();
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    //patch request
    props.modalToggle();
  };

  const renderOptions=(from:number, to:number, gap:number)=>{
    let options=[]
    for (let i=(from*10); i<=(to*10); i=i+gap){
            options.push(i/10)
    }
    return options.map(num=>{
return <option key={num} value={num}>{num}</option>
    })
  }
  //<option value="${i}.${j}">${i}.${j}</option>

  const disableButtonIfDemo = (id: number) => {
    // id===999 ?  "disabled" :  "";
    if (id === 999) {
      return "disabled";
    } else return "";
  };

  const renderWarningIfDemo = (id: number) => {
    if (id === 999) {
      return (
        <p className="text-danger">
          {" "}
          You can't send PATCH request in demo mode
        </p>
      );
    } else return null;
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Bodyweight{" "}
          </label>
          <select
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue="40"
          >
            <option disabled>Choose...</option>
            {renderOptions(60,130,1)}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Waist{" "}
          </label>
          <select
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue="80"
          >
            <option>Choose...</option>
            {renderOptions(60,130,1)}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Biceps{" "}
          </label>
          <select
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue="20"
          >
            <option disabled>Choose...</option>
            {renderOptions(20,65,1)}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Benchpress{" "}
          </label>
          <select
            className="form-select"
            id="inputGroupSelect02"
            style={{ width: 150 }}
            defaultValue="50"
          >
            <option disabled>Choose...</option>
     {renderOptions(40,250,5)}
          </select>
        </div>
        <div className="modal-footer">
          <button onClick={onCancelClick} className="btn btn-outline-danger">
            Cancel
          </button>
          <button
            className={`btn btn-primary ${disableButtonIfDemo(props.userId)}`}
          >
            Submit
          </button>
          {renderWarningIfDemo(props.userId)}
        </div>
      </form>
    </>
  );
};

export default AddMeasuresForm;
