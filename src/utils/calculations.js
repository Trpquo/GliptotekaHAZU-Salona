export function px2LoLa(px) {
    const dim = {w: 1920, h: 976}
    const mapArea = {lon0: 16.46, lat0: 43.542, w: .0402, h: .0148}
    const pixDist = {x: mapArea.w / dim.w, y: mapArea.h / dim.h}

    return {lon: mapArea.lon0 + px.x * pixDist.x, lat: mapArea.lat0 - px.y * pixDist.y}
}

export const pixelMarkers = [

    {name: "Amfiteatar", x: 684, y: 226},
    {name: "Teatar", x: 990, y: 404},
    {name: "Vrata Andertia", x: 1502, y: 53},
    {name: "Akvadukt", x: 1100, y: 115},
    {name: "Bazilika", x: 1108, y: 150},
    {name: "Edificio", x: 1025, y: 320},
    {name: "Kula", x: 1496, y: 320},
    {name: "Ugao1", x: 639, y: 405},
    {name: "Ugao2", x: 1223, y: 501},
]
