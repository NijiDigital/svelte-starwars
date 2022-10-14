<script>
  import { starWarsApiBaseUrl } from './constants'
  import { lastPath } from './helper'
  import { planets } from './store'
  import { get } from 'svelte/store'
  import { Link } from 'svelte-navigator'

  const getPlanets = async () => {
    let value = get(planets)
    if (value) {
      return value
    }
    const response = await fetch(`${starWarsApiBaseUrl}/planets`)
    const data = await response.json()
    value = data.results.map(item => {
      const { url, ...props } = item
      const id = lastPath(url)
      return { ...props, id }
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
                        <Link class="collection-item amber lighten-4 black-text" to={`/planets/${planet.id}`}>
                            {planet.name}
                        </Link>
                    {/each}
                </div>
            {:catch error}
                <h6>Oops… quelque chose s'est mal passé :-(</h6>
            {/await}
        </div>
    </div>
</div>