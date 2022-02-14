import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import UserPanel from "../components/UserPanel"
import axios from "axios";
import { connect } from "react-redux";


 export interface IState{
    user:{
      name:string,
      id:number,
      stats:any,
      _id:string
    }
  }
const ChartScreen: React.FC = (props:any) => {
  const [user, setUser] = useState<IState["user"]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:3001/user/${props.userId}`); //change id for dynamic
      setUser(result.data[0]); 
    };
    fetchData();
  },[]);

  return (
    <div className="body-chart d-flex ">
      <div className="container justify-content-center align-items-center">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8 mt-2">
            <div className="card shadow">
              <div className="card Title">
                <h2 className="card-header">Welcome {user ? <span>{user.name}</span> : <span> </span>}</h2>
              </div>
              <div className="chart">
                <Chart user={user}/>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-2">
            <UserPanel user={user}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => {
  console.log(state)
  return { userId: state.auth.userId }
}

export default connect(mapStateToProps )(ChartScreen);
