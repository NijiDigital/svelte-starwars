<script lang="ts">
    import {starWarsApiBaseUrl} from '$lib/constants'
    import {lastPath} from '$lib/helper'
    import {
        createFilmDetailsStore,
        getFilmDetailsStore,
    } from '$lib/store'
    import type {FilmApiResponseData} from '$lib/types/store'
    import {get} from 'svelte/store'
    import dayjs from 'dayjs'
    import {page} from '$app/stores'

    const {id} = $page.params

    const getFilm = async () => {
        let filmDetailStore = getFilmDetailsStore(id)
        let value = filmDetailStore && get(filmDetailStore)
        if (value) {
            return value
        }
        const response = await fetch(`${starWarsApiBaseUrl}/films/${id}`)
        const data: FilmApiResponseData = await response.json()
        const {planets, url, ...props} = data
        const planetIds = planets.map(lastPath)
        value = {...props, planetIds}
        filmDetailStore = createFilmDetailsStore(id)
        filmDetailStore.set(value)
        return value
    }
</script>

<div class="container amber lighten-5">
    {#await getFilm()}
        <strong>Chargement en cours…</strong>
    {:then film}
        <div class="row">
            <div class="col s12">
                <h5>Détails du film :</h5>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="title" value="{film.title}">
                        <label class="active" for="title">Titre :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="created" value="{dayjs(film.created).format('D/MM/YYYY')}">
                        <label class="active" for="created">Date de création :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="director" value="{film.director}">
                        <label class="active" for="director">Directeur :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input readonly type="text" id="producer" value="{film.producer}">
                        <label class="active" for="producer">Producteur :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea readonly class="materialize-textarea"
                                  id="opening_crawl">{film.opening_crawl}</textarea>
                        <label class="active" for="opening_crawl">Introduction :</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <div id="planets" class="collection">
                            {#each film.planetIds as planetId}
                                <a class="collection-item amber lighten-4 black-text"
                                   href={`/planets/${planetId}`}>{planetId}</a>
                            {/each}
                        </div>
                        <label class="active" for="planets">Planètes associées :</label>
                    </div>
                </div>
            </div>
        </div>
    {:catch error}
        <h6>Oops… quelque chose s'est mal passé :-(</h6>
    {/await}
</div>

<style>
    textarea {
        height: 500px
    }
</style>