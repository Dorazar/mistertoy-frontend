import { useEffect, useState } from 'react'
import { DoughnutChart  } from '../cmps/DoughnutChart'
import { toyService } from '../services/toy.service-local'

export function Dashboard() {
  const [pricesPerLabel, setPricesPerLabel] = useState({ labels: [], data: [] })
  useEffect(() => {
    getData()
  }, [])
  const labelsToShow = {}
  function getData() {
   toyService
      .query()
      .then((toys) =>
        toys.map((toy) =>
          toy.labels.map((toyLabel) => {
            if (labelsToShow[toyLabel]) {
              labelsToShow[toyLabel] += toy.price
            } else {
              labelsToShow[toyLabel] = toy.price
            }
          })
        )
      )
      .then(() => {
        const labels = Object.keys(labelsToShow)
        const data = Object.values(labelsToShow)
        setPricesPerLabel({labels,data})
      })
      
  }
  
  return (
    
    <>
    <div style={{ width: '500px', height: '500px' }}>
        <h1>Prices Per Label</h1>
      <DoughnutChart dataToShow={pricesPerLabel} />
      </div>
    </>
  )
}
