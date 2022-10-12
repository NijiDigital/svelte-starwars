<script lang="ts">
    import {starWarsApiBaseUrl} from '$lib/constants'
    import {lastPath} from '$lib/helper'
    import {planets} from '$lib/store'
    import type {PlanetApiResponseData} from '$lib/types/store'
    import {get} from 'svelte/store'

    const getPlanets = async () => {
        let value = get(planets)
        if (value) {
            return value
        }
        const response = await fetch(`${starWarsApiBaseUrl}/planets`)
        const data: { results: PlanetApiResponseData[] } = await response.json()
        value = data.results.map(item => {
            const {films, url, ...props} = item
            const id = lastPath(url)
            return {...props, id}
        })
        planets.set(value)
        return value
    }
</script>

<div class="container amber lighten-5">
    <div class="row">
        <div class="col s12">
            {#await getPlanets()}
                <strong>Chargement en cours…</strong>
            {:then planets}
                <h5>Liste des planètes :</h5>
                <div class="collection">
                    {#each planets as planet}
                        <a class="collection-item amber lighten-4 black-text" href={`/planets/${planet.id}`}>
                            {planet.name}
                        </a>
                    {/each}
                </div>
            {:catch error}
                <h6>Oops… quelque chose s'est mal passé :-(</h6>
            {/await}
        </div>
    </div>
</div>