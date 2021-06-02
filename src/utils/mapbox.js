import mapbox from 'mapbox-gl';
import { Dragdealer } from 'dragdealer'

import { API_KEY, CARRARA_KEY } from './config'

// mapbox.accessToken = API_KEY
const key = {}

const activateMapOverlay =(mapContainer, container)=>{
    const sliderWrapper = document.createElement('div')
    sliderWrapper.id = 'slider'
    const handle = document.createElement('div')
    handle.className = 'handle'
    sliderWrapper.appendChild(handle)
    container.appendChild(sliderWrapper)
    const slider = new Dragdealer(sliderWrapper.id, { 
        x: 0.025,
        left: -10,
        right: -10,
        steps: 7,
        speed: .3,
        animationCallback: (x, y)=>{
            const reveal = (x + (handle.offsetWidth / 2 / container.offsetWidth)) * 100
            mapContainer.style.clipPath = `polygon(calc(${reveal}% - 10px) 0, 100% 0, 100% 100%, calc(${reveal}% - 10px) 100%)`
          }
    })
}

export { mapbox, key, activateMapOverlay }