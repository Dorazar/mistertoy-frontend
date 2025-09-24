import { useEffect, useState } from 'react'
import { DoughnutChart } from '../cmps/DoughnutChart'
import { toyService } from '../services/toy.service'
import { PieChart } from '../cmps/PieChart'
import { LineChart } from '../cmps/LineChart'

export function Dashboard() {
  const [priceByLabel, SetPriceByLabel] = useState({ labels: [], prices: [] })

  const [inventoryByLabel, SetInventoryByLabel] = useState({ labels: [], perc: [] })

  useEffect(() => {
    getData()
  }, [])

  const sumPriceByLabel = {}

  function getData() {
    getPricesPerLabel()
    getInventoryByLabel()
  }

  function getPricesPerLabel() {
    toyService
      .query()
      .then((toys) =>
        toys.map((toy) =>
          toy.labels.map((toyLabel) => {
            if (sumPriceByLabel[toyLabel]) {
              sumPriceByLabel[toyLabel] += toy.price
            } else {
              sumPriceByLabel[toyLabel] = toy.price
            }
          })
        )
      )
      .then(() => {
        const labels = Object.keys(sumPriceByLabel)
        const prices = Object.values(sumPriceByLabel)
        SetPriceByLabel({ labels, prices })
      })
  }

  function getInventoryByLabel() {
    return toyService.query().then((toys) => {
      const inventory = toys.reduce((acc, toy) => {
        const labels = toy.labels || []
        labels.forEach((label) => {
          if (!acc[label]) {
            acc[label] = { inStock: 0, outOfStock: 0 }
          }

          if (toy.inStock) acc[label].inStock++
          else acc[label].outOfStock++
        })
        return acc
      }, {})
      console.log(inventory)
      var perc = {
        labels: [],
        perc: [],
      }
      for (const label in inventory) {
        perc.labels.push(label)
        perc.perc.push(
          (inventory[label].inStock / (inventory[label].inStock + inventory[label].outOfStock)) * 100 
        )
      }
      console.log(perc)
      SetInventoryByLabel(perc)
    })
  }

  return (
    <section className='dashboard'>
    <>
      <div style={{ width: '500px', height: '500px' }}>
        <h1>Prices Per Label</h1>
        <DoughnutChart dataToShow={priceByLabel} />
      </div>
      <div style={{ width: '500px', height: '500px' }}>
         <h1>Inventory Per Label</h1>
        <PieChart dataToShow={inventoryByLabel}></PieChart>
      </div>
        <div style={{ width: '500px', height: '500px' }}>
         <h1>Line Chart</h1>
        <LineChart></LineChart>
      </div>
    </>
    </section>
  )
}
