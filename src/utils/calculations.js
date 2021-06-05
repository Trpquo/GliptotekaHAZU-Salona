export function px2LoLa(px) {
    const dim = {w: 1920, h: 976}
    const mapArea = {lon0: 16.46, lat0: 43.542, w: .0402, h: .0148}
    const pixDist = {x: mapArea.w / dim.w, y: mapArea.h / dim.h}
    const result = { ...px, lon: mapArea.lon0 + px.x * pixDist.x, lat: mapArea.lat0 - px.y * pixDist.y }
    return result
}

export const pixelMarkers = [

    {label: "Amfiteatar", x: 684, y: 226},
    {label: "Teatar", x: 990, y: 404},
    {label: "Hram", x: 1010, y: 410},
    {label: "Porta Caesarea", x: 1069, y: 236},
    {label: "Akvadukt", x: 1100, y: 115},
    {label: "Episkopalni kompleks", x: 1100, y: 137},
    // {label: "Kula", x: 1496, y: 320},
    {label: "Hram Venere victrix", lon: 16.49, lat: 43.54, x: 0, y: 0},
    {label: "Namjesnikova palača", x: 1145, y: 285},
    {label: "Forum (Urbs orientalis)", x: 1342, y: 259},
    {label: "Gradske terme", x: 1141, y: 152},
    {label: "Porta Andertia", x: 1502, y: 53},
    {label: "Sjeverni bedemi", x: 1455, y: 20},
    {label: "Manastirine", x: 1093, y: -3},
    {label: "Kapljuč", x: 835, y: 168},
    {label: "Marusinac", x: 727, y: -115},
    // {label: "Ugao1", x: 639, y: 405},
    // {label: "Ugao2", x: 1223, y: 501},
]
