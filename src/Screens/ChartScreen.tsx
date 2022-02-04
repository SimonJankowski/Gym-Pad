import React, { useState, useEffect } from "react";
import Chart from "../components/chart";
import axios from "axios";
 export interface IState{
    user:{
      name:string,
      id:number,
      stats:any,
      _id:string
    }[]
  }
const ChartScreen: React.FC = () => {


  const [user, setUser] = useState<IState["user"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:3001/user/1`); //change id for dynamic
      setUser(result.data); 
      console.log(user[0])
    };
    fetchData();
  },[]);

  return (
    <div className="body-chart d-flex">
      <div className="container justify-content-center align-items-center">
        <div className="row">
          <div className="col-8">
            <div className="card shadow">
              <div className="card Title">
                <h2>Welcome {user[0] ? <span>{user[0].name}</span> : <span>dupa</span>}</h2>
            
              </div>
              <div className="chart">
                <Chart user={user[0]}/>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow">
              <h3>Szyszunia</h3>
              <p>Registered: 1st January</p>
              <h5>Pomiary(poczatkowy/aktualny)</h5>
              <p>Waga: (98.2,103.6)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartScreen;
