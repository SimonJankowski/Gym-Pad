import React, { useState, useEffect, useRef } from "react";

interface UserPanelProps {
  user: any;
}
interface IStaty {
  initialWeight: number;
  initialWaist: any;
  initialBiceps: any;
  initialBenchpress: any;
  currentWeight: any;
  currentWaist: any;
  currentBiceps: any;
  currentBenchpress: any;
}

const UserPanel: React.FC<UserPanelProps> = (props: any) => {
  console.log(props);
  const [stats, setStats] = useState<IStaty>({
    initialWeight: 1,
    initialWaist: 1,
    initialBiceps: 1,
    initialBenchpress: 1,
    currentWeight: 1,
    currentWaist: 1,
    currentBiceps: 1,
    currentBenchpress: 1,
  });

  const calcData: Function = (staty: any) => {
    return {
      initialWeight: staty.bodyweight[0].value,
      initialWaist: staty.waist[0].value,
      initialBiceps: staty.biceps[0].value,
      initialBenchpress: staty.benchpress[0].value,
      currentWeight: staty.bodyweight[staty.bodyweight.length - 1].value,
      currentWaist: staty.waist[staty.waist.length - 1].value,
      currentBiceps: staty.biceps[staty.biceps.length - 1].value,
      currentBenchpress: staty.benchpress[staty.benchpress.length - 1].value,
    };
  };

  useEffect(() => {
    if (props.user && props.user.stats.bodyweight.length > 1) {
      setStats(calcData(props.user.stats));
    }
    console.log(stats);
  }, [props]);

  const getDateFromTimestamp = (tStamp: number) => {
    let preformatted = new Date(tStamp);
    return preformatted.toDateString();
  };

  const renderProgress = (before: number, after: number) => {
    if (before < after) {
      return <span className="text-success">+{after - before}</span>;
    } else if (before === after) {
      return <span className="text-primary"> 0</span>;
    } else
      return (
        <span className="text-danger">
          -{Math.round((before - after) * 10) / 10}
        </span>
      );
  };

  return (
    <>
      {props.user ? (
        <div className="card shadow">
          <div className="card-header">
            <h3>{props.user.name}</h3>
            <div className="d-flex justify-content-between">
              <span>Registered:</span>
              <span>{getDateFromTimestamp(props.user.registered)}</span>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <div className="list-group-item d-flex justify-content-between fs-5">
              <span>Measures:</span>
              <span className="">(initial/actual)</span>
            </div>

            <div className="list-group-item d-flex justify-content-between">
              <span>Bodyweight:</span>
              {props.user.stats.bodyweight[0] ? (
              <span className="">
                {stats.initialWaist} / {stats.currentWaist} (
                {renderProgress(stats.initialWeight, stats.currentWeight)} kg)
              </span>) : "? kg"}
            </div>

            <div className="list-group-item d-flex justify-content-between">
              <span>Waist:</span>
              {props.user.stats.waist[0] ? (
              <span className="">
                {stats.initialWaist} / {stats.currentWaist} (
                {renderProgress(stats.initialWaist, stats.currentWaist)} cm)
              </span>) : "? cm"}
            </div>

            <div className="list-group-item d-flex justify-content-between">
              <span>Biceps:</span>
              {props.user.stats.biceps[0] ? (
              <span className="">
                {stats.initialBiceps} / {stats.currentBiceps} (
                {renderProgress(stats.initialBiceps, stats.currentBiceps)} cm)
              </span>) : "? cm"}
            </div>

            <div className="list-group-item d-flex justify-content-between">
              <span>Benchpress:</span>
              {props.user.stats.benchpress[0] ? (
              <span className="">
                {stats.initialBenchpress} / {stats.currentBenchpress} (
                {renderProgress(
                  stats.initialBenchpress,
                  stats.currentBenchpress
                )} kg)
              </span>) : "? kg"}
            </div>
          </ul>
        </div>
      ) : (
        "nie ma usera"
      )}
    </>
  );
};

export default UserPanel;
