<script>
  import { Route, Router } from 'svelte-navigator'
  import MenuBar from './MenuBar.svelte'
  import Intro from './Intro.svelte'
  import Planets from './Planets.svelte'
  import Planet from './Planet.svelte'
  import Films from './Films.svelte'
  import Film from './Film.svelte'
</script>

<div class="amber-text">
    <Router primary={false} basepath="BASE_PATH">
        <h1 class="center-align">Star Wars</h1>
        <MenuBar/>
        <main class="section amber lighten-4 black-text">
            <Route path="/">
                <Intro/>
            </Route>
            <Route path="planets">
                <Planets/>
            </Route>
            <Route path="planets/:id" let:params>
                <Planet id="{params.id}"/>
            </Route>
			<Route path="films">
				<Films/>
			</Route>
			<Route path="films/:id" let:params>
				<Film id="{params.id}"/>
			</Route>
        </main>
    </Router>
</div>

<style>
    main {
        padding: 1em;
        margin: 0 auto;
    }

    h1 {
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 600;
    }
</style>
