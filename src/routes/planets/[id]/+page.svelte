<script lang="ts">
    import {starWarsApiBaseUrl} from '$lib/constants'
    import {lastPath} from '$lib/helper'
    import {
        createPlanetDetailsStore,
        getPlanetDetailsStore,
    } from '$lib/store'
    import type {
        Planet,
        PlanetApiResponseData,
    } from '$lib/types/store'
    import {get} from 'svelte/store'
    import dayjs from 'dayjs'
    import {page} from '$app/stores'

    const {id} = $page.params

    const getPlanet: () => Promise<Planet> = async () => {
        let planetDetailStore = getPlanetDetailsStore(id)
        let value: Planet | undefined = planetDetailStore && get(planetDetailStore)
        if (value) {
            return value
        }
        const response = await fetch(`${starWarsApiBaseUrl}/planets/${id}`)
        const data: PlanetApiResponseData = await response.json()
        const {films, url, ...props} = data
        const filmIds = films.map(lastPath)
        value = {...props, filmIds}
        planetDetailStore = createPlanetDetailsStore(id)
        planetDetailStore.set(value)
        return value
    }
</script>

<div class="container amber lighten-5">
    {#await getPlanet()}
        <strong>Chargement en cours…</strong>
    {:then planet}
        <div class="row">
            <div class="col s12">
                <h5>Détails de la planète :</h5>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="name" value="{planet.name}">
                        <label class="active" for="name">Nom :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="created"
                               value="{dayjs(planet.created).format('D/MM/YYYY')}">
                        <label class="active" for="created">Date de création :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="population" value="{planet.population}">
                        <label class="active" for="population">Population :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="climate" value="{planet.climate}">
                        <label class="active" for="climate">Climat :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="diameter" value="{planet.diameter}">
                        <label class="active" for="diameter">Diamètre :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <div id="films" class="collection">
                            {#each planet.filmIds as filmId}
                                <a class="collection-item amber lighten-4 black-text"
                                   href={`/films/${filmId}`}>{filmId}</a>
                            {/each}
                        </div>
                        <label class="active" for="films">Films associés :</label>
                    </div>
                </div>
            </div>
        </div>
    {:catch error}
        <h6>Oops… quelque chose s'est mal passé :-(</h6>
    {/await}
</div>
