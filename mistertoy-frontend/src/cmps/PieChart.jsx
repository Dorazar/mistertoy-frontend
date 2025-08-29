import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


function getRandomColors(count) {
  const colors = []
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`)
  }
  return colors
}


export function PieChart({dataToShow}) {
   
  const data = {
  labels: dataToShow.labels,
  datasets: [
    {
      label: '# of Votes',
      data: dataToShow.data,
      backgroundColor: getRandomColors(dataToShow.labels.length),
      borderColor: [
        'rgba(145, 143, 144, 1)'
      ],
      borderWidth: 1,
    },
  ],
}
  return <Pie data={data} />;
}
