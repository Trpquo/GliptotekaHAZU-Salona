import { writable } from 'svelte/store'

const language = writable("hr")
const heroImage = writable("hr")

const API_KEY = private.env.API_KEY
const CARRARA_KEY = private.env.CARRARA_KEY
const root = "/content"
const random = {

    visuals: [ "/content/visuals/0.jpg",
                "/content/visuals/1.jpg",
                "/content/visuals/2.jpg",
                "/content/visuals/3.jpg",
                "/content/visuals/4-(6).jpg",
                "/content/visuals/4-(7).jpg",
                "/content/visuals/5.jpg",
                "/content/visuals/6.jpg",
                "/content/visuals/7.jpg",
                "/content/visuals/8.jpg",
                "/content/visuals/14.jpg",
            ],
    
    get visual() { return this.visuals[ Math.floor( Math.random() * 11 ) ] }
}

export {
    root,
    language,
    heroImage,
    random,
    API_KEY,
    CARRARA_KEY
}