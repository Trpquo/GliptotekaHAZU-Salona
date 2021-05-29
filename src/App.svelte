<script>
	// utils
	import page from 'page'
	import { language } from './utils/config'
	
	// components
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import Spinner from './components/Spinner.svelte'

	// routes
	import Home from './routes/Home.svelte'
	import Urbs from './routes/Urbs.svelte'
	import Gliptoteka from './routes/Gliptoteka.svelte'
	import Impressuum from './routes/Impressuum.svelte'
	import NotFound from './routes/NotFound.svelte'

	let contents = (async ()=> {
		const response = await(await fetch("./data/contents.json")).json()
		return response
	})()


	
	let route, params;

	page('/', ()=>{ route = Home })
	page('/Gliptoteka', ()=>{ route = Gliptoteka })
	page('/Gliptotheque', ()=>{ route = Gliptoteka })
	page('/Gliptoteka/:exhibit', (ctx)=>{ 
		route = Gliptoteka
		params = ctx.params
	})
	page('/Urbs', ()=>{ 
		route = Urbs 
		params = { region: null }
	})
	page('/Urbs/:region', (ctx)=>{ 
		route = Urbs
		params = ctx.params
	})
	page('/Urbs/:region/:exhibit', (ctx, next)=>{ 
		route = Urbs
		params = ctx.params
		console.log(params)
		// next()
	})
	page('/Impressuum', ()=>{ route = Impressuum })
	page('/*', ()=>{ route = NotFound })

	page.start()
</script>
	{#await contents}
	<p>Učitavam...</p>
	<Spinner />
	{:then chapters}
	<Header tabs={ chapters[$language] }/>
	<main>
		{#if route === Home}
		<Home content={ chapters[$language][0] } />
		{:else if route === Gliptoteka }
		<Gliptoteka content={ chapters[$language][1] }/>
		{:else if route === Urbs}
		<Urbs { ...params } content={ chapters[$language][2] } />
		{:else if route === Impressuum }
		<Impressuum content={ chapters[$language][1] }/>
		{:else}
		<NotFound />
		{/if}
	</main>
	<Footer />
	{:catch error}
	<p>{ error.message }</p>
	{/await}

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
