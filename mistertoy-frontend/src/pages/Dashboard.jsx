import { useEffect, useState } from 'react'
import { PieChart } from '../cmps/PieChart'
import { toyService } from '../services/toy.service-local'

export function Dashboard() {
  const [dataToShow, setDataToShow] = useState({ labels: [], data: [] })

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

        setDataToShow({labels,data})
      })
      
  }

  window.dataToShow=dataToShow

  return (
    <>
    <div style={{ width: '300px', height: '300px' }}></div>
      <PieChart dataToShow={dataToShow} />
    </>
  )
}
