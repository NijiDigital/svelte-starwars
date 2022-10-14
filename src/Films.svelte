<script>
  import { starWarsApiBaseUrl } from './constants'
  import { lastPath } from './helper'
  import { get } from 'svelte/store'
  import { films } from './store'
  import { Link } from 'svelte-navigator'

  const getFilms = async () => {
    let value = get(films)
    if (value) {
      return value
    }
    const response = await fetch(`${starWarsApiBaseUrl}/films`)
    const data = await response.json()
    value = data.results.map(item => {
      const { url, ...props } = item
      const id = lastPath(url)
      return { ...props, id }
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
                        <Link class="collection-item amber lighten-4 black-text" to={`/films/${film.id}`}>
                            {film.title}
                        </Link>
                    {/each}
                </div>
            {:catch error}
                <h6>Oops… quelque chose s'est mal passé :-(</h6>
            {/await}
        </div>
    </div>
</div>