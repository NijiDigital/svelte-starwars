<script lang="ts">
    import {starWarsApiBaseUrl} from '$lib/constants'
    import {lastPath} from '$lib/helper'
    import {films} from '$lib/store'
    import type {FilmApiResponseData} from '$lib/types/store'
    import {get} from 'svelte/store'

    const getFilms = async () => {
        let value = get(films)
        if (value) {
            return value
        }
        const response = await fetch(`${starWarsApiBaseUrl}/films`)
        const data: { results: FilmApiResponseData[] } = await response.json()
        value = data.results.map(item => {
            const {planets, url, ...props} = item
            const id = lastPath(url)
            return {...props, id}
        })
        films.set(value)
        return value
    }
</script>

<div class="container amber lighten-5">
    <div class="row">
        <div class="col s12">
            {#await getFilms()}
                <strong>Chargement en cours…</strong>
            {:then films}
                <h5>Liste des films :</h5>
                <div class="collection">
                    {#each films as film}
                        <a class="collection-item amber lighten-4 black-text" href={`/films/${film.id}`}>
                            {film.title}
                        </a>
                    {/each}
                </div>
            {:catch error}
                <h6>Oops… quelque chose s'est mal passé :-(</h6>
            {/await}
        </div>
    </div>
</div>