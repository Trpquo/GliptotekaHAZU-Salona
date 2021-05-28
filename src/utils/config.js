import { writable } from 'svelte/store'

const language = writable("hr")

const API_KEY = private.env.API_KEY
const CARRARA_KEY = private.env.CARRARA_KEY

export {
    language,
    API_KEY,
    CARRARA_KEY
}