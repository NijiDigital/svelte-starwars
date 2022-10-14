import { writable } from 'svelte/store'

export const films = writable()

export const planets = writable()

const details = {
  films: {},
  planets: {},
}

export const getFilmDetailsStore = (id) => details.films[id]

export const createFilmDetailsStore = (id) => {
  const detailStore = writable()
  details.films[id] = detailStore
  return detailStore
}

export const getPlanetDetailsStore = (id) => details.planets[id]

export const createPlanetDetailsStore = (id) => {
  const detailStore = writable()
  details.planets[id] = detailStore
  return detailStore
}
