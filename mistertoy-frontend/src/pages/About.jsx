import { AdvancedMarker, APIProvider, Map, InfoWindow } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export function About() {
  const positions = [
    { name: 'petah-tiqwa', coords: { lat: 32.0906376, lng: 34.876529 }, content: 'Petah-tiqwa branch' },
    { name: 'tel-aviv', coords: { lat: 32.0852997, lng: 34.7818064 }, content: 'Tel-aviv branch' },
    { name: 'bat-yam', coords: { lat: 32.0154565, lng: 34.7505283 }, content: 'Bat-yam branch' },
  ]

  const [location, setLocation] = useState({ lat: 32.0906376, lng: 34.876529 })
  const [openWindow, setOpenWindow] = useState(false)
  const [description, SetDescription] = useState('petah-tiqwa')

  useEffect(() => {
    onSetLocation(location)
    onSetDescription(location)
  }, [location])

  function onSetDescription(location) {
    for (const locationDetails in positions) {
      if (
        positions[locationDetails].coords.lat === location.lat &&
        positions[locationDetails].coords.lng === location.lng
      ) {
        SetDescription(positions[locationDetails].content)
      }
    }
  }

  function handleChange({ target }) {
    const coords = JSON.parse(target.value)
    onSetLocation(coords)
  }

  function onSetLocation(coords) {
    setLocation(coords)
  }

  function findLocContent() {
    const content = positions.find()
  }

  function onSetOpenWindow() {
    setOpenWindow((prevState) => !prevState)
  }

  return (
    <section className="google-map">
      <APIProvider apiKey={'AIzaSyDJkmCXpfQ35GFuLMmjOqdZTFr_pTCAtuw'}>
        <Map center={location} defaultZoom={15} mapId="DEMO_MAP_ID">
          {openWindow && (
            <InfoWindow position={location} onClose={onSetOpenWindow} headerContent={description}></InfoWindow>
          )}
          <AdvancedMarker onClick={onSetOpenWindow} position={location} />
        </Map>
      </APIProvider>

      <button onClick={handleChange} value={JSON.stringify({ lat: 32.0906376, lng: 34.876529 })}>
        Petah-tiqwa
      </button>
      <button onClick={handleChange} value={JSON.stringify({ lat: 32.0852997, lng: 34.7818064 })}>
        tel-aviv
      </button>
      <button onClick={handleChange} value={JSON.stringify({ lat: 32.0154565, lng: 34.7505283 })}>
        bat-yam
      </button>
    </section>
  )
}
