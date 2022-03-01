import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const AddMeasuresForm = (props: any) => {
  console.log(props)
  const [form, setForm] = useState({
    bodyweight: 80,
    waist: 60,
    biceps: 20,
    benchpress: 50,
  });

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
    const res = await axios.patch('http://localhost:3001/user/1', {...form, timestamp: Date.now()});
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
            defaultValue="40"
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
            defaultValue="80"
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
            defaultValue="20"
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
            defaultValue="50"
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
