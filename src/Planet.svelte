<script>
  import { starWarsApiBaseUrl } from './constants'
  import { lastPath } from './helper'
  import {
    createPlanetDetailsStore,
    getPlanetDetailsStore,
  } from './store'
  import { get } from 'svelte/store'
  import { Link } from 'svelte-navigator'
  import dayjs from 'dayjs'

  export let id

  const getPlanet = async () => {
    let planetDetailStore = getPlanetDetailsStore(id)
    let value = planetDetailStore && get(planetDetailStore)
    if (value) {
      return value
    }
    const response = await fetch(`${starWarsApiBaseUrl}/planets/${id}`)
    const data = await response.json()
    const { films, ...props } = data
    const filmIds = films.map(url => lastPath(url))
    value = { ...props, filmIds }
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
                                <Link class="collection-item amber lighten-4 black-text"
                                      to={`/films/${filmId}`}>{filmId}</Link>
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
