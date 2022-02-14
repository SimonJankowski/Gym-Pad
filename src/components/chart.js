import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IState } from '../Screens/ChartScreen';
import formatDate from '../helpers/helperDate';



const Chart =(props)=> {   //change back to PureComponent if breaks
  const [range, setRange] = useState([97,100])
  const [user, setUser] = useState([]);
  const [data, setData] = useState([ //backup default values for chart
  { name: "january 1", uv: 97 },
  { name: 'January 4', uv: 92 },
  { name: 'January 5', uv: null },
  { name: 'January 6', uv: 91.5 },
  { name: 'January 7', uv: 93 },
  { name: 'January 8', uv: 95.4 },
  { name: 'January 13', uv: 95.4 },
]);
 
const dataConstructor =(daty,wartosci)=>{ // probobly not the best practice
  let arr =[];
 for(let i=0; i<daty.length; i++){
   arr.push({name: daty[i], w:wartosci[i]})
 }
 return arr
}

  useEffect(()=>{
    setUser(props.user);
  },[])

  useEffect(()=>{ //refactor this and data constructor to something better
    if(props.user){
      let staty = props.user.stats.bodyweight;
      let fechas = staty.map(entry=>formatDate(entry.date))
      let values = staty.map(entry=>entry.value)
      fechas.sort()
      
      let ico = dataConstructor(fechas,values)
      setData(ico)
      console.log(data)
    }
  },[props])
  

    return (
     <>
     {props.user ? <div style={{ width: '100%' }}>
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
            <YAxis type="number" domain={range}/>
            <Tooltip />
            <Line connectNulls type="monotone" dataKey="w" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div> : "dupa"}
      
      </>
    );
  }


export default Chart