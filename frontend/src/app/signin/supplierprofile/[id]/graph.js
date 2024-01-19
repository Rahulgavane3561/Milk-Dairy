import { Line } from 'react-chartjs-2';
import React from 'react';

const Graph = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return null;
  }

  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: 'Amounts vs Time',
        data: data.map(item => item.amount),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
  scales: {
    x: [{
      type: 'linear',
      position: 'bottom',
      ticks: {
        stepSize: Math.ceil(data.length / 5),
      },
    }],
    y: [{
      type: 'linear',
      ticks: {
        beginAtZero: true,
        stepSize: Math.ceil(Math.max(...data.map(item => item.amount)) / 5),
      },
    }],
  },
};


  return (
    <Line data={chartData} options={chartOptions} />
  );
};

export default Graph;
