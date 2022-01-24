import React, { Component } from 'react'
import Chart from 'react-google-charts'

const LineChartOptions = {
  hAxis: {
    title: 'Date',
  },
  vAxis: {
    title: 'TRY/USD',
  },
  series: {
    1: { curveType: 'function' },
  },
}

const MultiLineChart = ({data}) => {

  return (
    <div className="container mt-5">
      <h2 className = "title">Currency Chart</h2>
      <Chart
        width={'100%'}
        height={'410px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={LineChartOptions}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  )

}

export default MultiLineChart