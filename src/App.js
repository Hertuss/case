
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MultiLineChart from './components/MultiLineChart';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';


function App() {
  const newDate = new Date()
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  const [state, setState] = useState(null)
  const fetchData = async () => {
    const localDate = new Date()
    if ((localDate.valueOf() / 1000) - (JSON.parse(localStorage.getItem('localDate') || '0') / 1000) > 3600) {
      const data = await axios.get(`https://free.currconv.com/api/v7/convert?q=EUR_USD,TRY_USD&compact=ultra&date=${year}-${month}-${day - 6}&endDate=${year}-${month}-${day}&apiKey=d44616136c661c304e3c`)


      const d = data.data["EUR_USD"]
      const d2 = data.data["TRY_USD"]
      const newData = _(d).map((value, key) => ([key, value, d2[key]])).value()
      localStorage.setItem('localDate', localDate.valueOf())
      localStorage.setItem('data', JSON.stringify([
        ['x', 'EUR_USD', 'TRY_USD'],
        ...newData

      ]))
      setState([
        ['x', 'EUR_USD', 'TRY_USD'],
        ...newData

      ]);
    }
    else {
      const d = JSON.parse(localStorage.getItem('data'))
      setState(d)
    }

  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <div className="view"><MultiLineChart data={state} /></div>
    </div>
  )
}

export default App;