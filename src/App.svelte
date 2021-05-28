<script>
	// utils
	import page from 'page'
	// components
	import Header from './components/Header.svelte'

	// routes
	import Home from './routes/Home.svelte'
	import Urbs from './routes/Urbs.svelte'
	import Gliptoteka from './routes/Gliptoteka.svelte'
	import NotFound from './routes/NotFound.svelte'

	let route, params;

	page('/', ()=>{ route = Home })
	page('/Gliptoteka', ()=>{ route = Gliptoteka })
	page('/Urbs', ()=>{ 
		route = Urbs 
		params = { region: null }
	})
	page('/Urbs/:region', (ctx, next)=>{ 
		route = Urbs
		params = ctx.params
		console.log(params)
		// next()
	})
	page('/Urbs/:region/:exhibit', (ctx, next)=>{ 
		route = Urbs
		params = ctx.params
		console.log(params)
		// next()
	})
	page('/*', ()=>{ route = NotFound })

	page.start()
</script>

	<Header />
	<main>
		{#if route === Home}
		<Home />
		{:else if route === Gliptoteka }
		<Gliptoteka />
		{:else if route === Urbs}
			<Urbs { ...params } />
		{:else}
		<NotFound />
		{/if}
	</main>

<style>
	:global(body) {
		width: 90%;
		max-width: var(--max-screen);
		display: grid;
		grid-template-columns: 1fr 33%;
		grid-template-rows: 100px 1fr 100px;
		grid-template-areas: 
				"h h"
				"m a"
				"f f";
		grid-gap: var(--default-gap);
	}
	@media (max-width: 1200px) {
		:global(body) {
			width: 100%;
			grid-template-areas: 
				"h h"
				"m m"
				"a f"
				;
		}
	}

	main {
		grid-area: m;
	}
</style>
