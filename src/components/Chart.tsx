import {useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import formatDate from '../helpers/helperDate';
import {Modal} from 'react-bootstrap'
import AddMeasuresForm from './AddMeasuresForm'



const Chart = (props:any) => {
  console.log(props)
  //in docs apears as PureComponent
  const [range, setRange] = useState([97, 100]);
  const [chartType, setChartType] = useState("bodyweight");
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState([
    //backup default values for chart, to remove in production
    { name: "january 1", unreadable: 100 },
    { name: "December 31", unreadable: 80 },
  ]);
  //formating dynamicly data to be processable by the chart
  const dataConstructor = (arr:any, type:any) => {
    const formatedArr = arr.map((entry:any) => {
      return {
        name: formatDate(entry.date),
        [type]: entry.value,
      };
    });
    return formatedArr;
  };
  //function below generates the best possible range of view of the chart, that is universal for
  //any measures that are in the application or can be added in the future
  //(depending on the value, values aplitude over the time, leaving margin on the edges)
  const getRange = (arr:any) => {
    let minValue = arr.reduce(
      (acc:any, curr:any) =>
        curr.value < acc.value && curr.value !== null ? curr : acc,
      arr[0] || undefined
    );
    let maxValue = arr.reduce(
      (acc:any, curr:any) => (curr.value > acc.value ? curr : acc),
      arr[0] || undefined
    );
    console.log(minValue.value, maxValue.value);
    let dif = maxValue.value - minValue.value;
    let min = Math.floor(minValue.value - dif * 0.1);
    let max = Math.ceil(maxValue.value + dif * 0.1);
    return [min, max];
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  //useEffect below optimasie values that has to be passed to the chart to optimise UX
  //dynamicly depending on users data
  useEffect(() => {
    //console.log(props.user);
    if (props.user && props.user.stats.waist.length > 0) {
      let stats = props.user.stats;
      if (
        chartType === "bodyweight" &&
        stats.bodyweight.length > 0
      ) {
        let ico = dataConstructor(stats.bodyweight, chartType);
        setRange(getRange(stats.bodyweight));
        setData(ico);
      } else if (chartType === "waist") {
        let ico = dataConstructor(stats.waist, chartType);
        setRange(getRange(stats.waist));
        setData(ico);
      } else if (chartType === "biceps") {
        let ico = dataConstructor(stats.biceps, chartType);
        setRange(getRange(stats.biceps));
        setData(ico);
      } else if (chartType === "benchpress") {
        let ico = dataConstructor(stats.benchpress, chartType);
        setRange(getRange(stats.benchpress));
        setData(ico);
      }
    }
    //console.log(data);
  }, [props, chartType]);

  const onSelectChange = (e:any) => {
    setChartType(e.target.value);
  };

  const onModalClick = () =>{
    setShowModal(!showModal)
  }

  return (
    <>
      {props.user ? (
        <>
          <div style={{ width: "100%" }}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                width={500}
                height={200}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={range} />
                <Tooltip />
                <Line
                  connectNulls
                  type="monotone"
                  dataKey={chartType}
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-5 m-4">
                <select
                  value={chartType}
                  onChange={onSelectChange}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="bodyweight">Bodyweight</option>
                  <option value="waist">Waist</option>
                  <option value="biceps">Biceps</option>
                  <option value="benchpress">Benchpress</option>
                </select>
              </div>
              <div className="col-5 m-4">
                <button className="btn btn-outline-primary" onClick={onModalClick}>ADD</button>
                <Modal show={showModal}>
                  <div className="modal-header fs-5 text-center">Add today's measures</div>
                  <div className="modal-body">
                    <AddMeasuresForm userId={props.user.id} modalToggle={onModalClick}/>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading... It can take a while, backend is on free heroku tier"
      )}
    </>
  );
};


export default Chart