import {writable, type Writable} from 'svelte/store'
import type {Film, Planet} from '$lib/types/store'

export const films = writable<Film[] | undefined>()

export const planets = writable<Planet[] | undefined>()

const details: {
    films: {
        [k: string]: Writable<Film> | undefined
    }
    planets: {
        [k: string]: Writable<Planet> | undefined
    }
} = {
    films: {},
    planets: {},
}

export const getFilmDetailsStore: (id: string) => Writable<Film> | undefined = (id) => details.films[id]

export const createFilmDetailsStore: (id: string) => Writable<Film> = (id) => {
    const detailStore = writable<Film>()
    details.films[id] = detailStore
    return detailStore
}

export const getPlanetDetailsStore: (id: string) => Writable<Planet> | undefined = (id) => details.planets[id]

export const createPlanetDetailsStore: (id: string) => Writable<Planet> = (id) => {
    const detailStore = writable<Planet>()
    details.planets[id] = detailStore
    return detailStore
}