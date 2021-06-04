export function px2LoLa(px) {
    const dim = {w: 1920, h: 976}
    const mapArea = {lon0: 16.46, lat0: 43.542, w: .0402, h: .0148}
    const pixDist = {x: mapArea.w / dim.w, y: mapArea.h / dim.h}

    return {lon: mapArea.lon0 + px.x * pixDist.x, lat: mapArea.lat0 - px.y * pixDist.y}
}

export const pixelMarkers = [

    {name: "Amfiteatar", x: 684, y: 226},
    {name: "Teatar", x: 990, y: 404},
    {name: "Hram", x: 1010, y: 410},
    {name: "Porta Caesarea", x: 1069, y: 236},
    {name: "Akvadukt", x: 1100, y: 115},
    {name: "Episkopalni kompleks", x: 1100, y: 137},
    // {name: "Kula", x: 1496, y: 320},
    {name: "Hram Venere victrix", lon: 16.49, lat: 43.54, x: 0, y: 0},
    {name: "Namjesnikova palača", x: 1145, y: 285},
    {name: "Forum (Urbs orientalis)", x: 1342, y: 259},
    {name: "Gradske terme", x: 1141, y: 152},
    {name: "Porta Andertia", x: 1502, y: 53},
    {name: "Sjeverni bedemi", x: 1455, y: 20},
    {name: "Manastirine", x: 1093, y: -3},
    {name: "Kapljuč", x: 835, y: 168},
    {name: "Marusinac", x: 727, y: -115},
    // {name: "Ugao1", x: 639, y: 405},
    // {name: "Ugao2", x: 1223, y: 501},
]
