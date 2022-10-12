export interface FilmApiResponseData {
    title: string
    director: string
    producer: string
    opening_crawl: string
    planets?: string[]
    url: string
}

export type Film = Omit<FilmApiResponseData, 'planets' | 'url'> & {
    id?: string
    planetIds?: string[]
}

export interface PlanetApiResponseData {
    name: string
    created: string
    population: number
    climate: string
    diameter: number
    films?: string[]
    url: string
}

export type Planet = Omit<PlanetApiResponseData, 'films' | 'url'> & {
    id?: string
    filmIds?: string[]
}
