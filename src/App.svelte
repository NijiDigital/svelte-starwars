<script>
  import { Route, Router } from 'svelte-navigator'
  import MenuBar from './MenuBar.svelte'
  import Intro from './Intro.svelte'
  import Planets from './Planets.svelte'
</script>

<div class="amber-text">
    <Router primary={false}>
        <h1 class="center-align">Star Wars</h1>
        <MenuBar/>
        <main class="section amber lighten-4 black-text">
            <Route path="/">
                <Intro/>
            </Route>
            <Route path="planets">
                <Planets/>
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
