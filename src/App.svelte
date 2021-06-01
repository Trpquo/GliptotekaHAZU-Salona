<script>
	// utils
	import page from 'page'
	import { language } from './utils/config'
	import contnetsFromServer from './utils/server'
	
	// components
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import Spinner from './components/Spinner.svelte'
    import Hero from "./components/Hero.svelte"


	// routes
	import Home from './routes/Home.svelte'
	import Gliptoteka from './routes/Gliptoteka.svelte'
	import Urbs from './routes/Urbs.svelte'
	import Sepul from './routes/Sepul.svelte'
	import Christ from './routes/Christ.svelte'
	import Impressuum from './routes/Impressuum.svelte'
	import NotFound from './routes/NotFound.svelte'

	let contents

	const storedContents = window.sessionStorage.getItem('salona-contents')

	$: {
		if ( !storedContents || !isProduction ) {
			contents = contnetsFromServer()
		}
		else { 
			contents = JSON.parse( storedContents )
		}
	}


	
	let route, params;
	
	page('/', ()=>{ 
		route = Home 
		params = null
	})
	page('/uvod/:topic', (ctx)=>{ 
		route = Home 
		params = ctx.params
	})
	page('/Gliptoteka/:exhibit?', (ctx)=>{ 
		route = Gliptoteka
		params = ctx.params
	})
	page('/Gliptotheque/:exhibit?', (ctx)=>{ 
		route = Gliptoteka
		params = ctx.params
	})
	page('/Salona/:region?/:topic?', (ctx)=>{ 
		route = Urbs
		params = ctx.params
	})
	page('/sepulkralno/:topic?/:exhibit?', (ctx)=>{ 
		route = Sepul 
		params = ctx.params
	})
	page('/ranokrscansko/:topic?/:location?', (ctx)=>{ 
		route = Christ 
		params = ctx.params
	})
	page('/Impressuum', ()=>{ route = Impressuum })
	if ( !route ) page('/*', ()=>{ route = NotFound })
	
	page.start()
	
	const firstTimeHere = !window.localStorage.getItem('salona-uvod') || !isProduction // not to bug me in development mode
</script>

	{#if firstTimeHere}
		<Hero />
	{/if}

	{#await contents}
	<p>Učitavam...</p>
	<Spinner />
	{:then chapters}
	<Header tabs={ chapters[$language] }/>


	<!-- *** Main content *** -->
	{#if route === Home}
		<Home { ...params } content={ chapters[$language][0] } />
	{:else if route === Gliptoteka }
		<Gliptoteka { ...params } content={ chapters[$language][1] }/>
	{:else if route === Urbs}
		<Urbs { ...params } content={ chapters[$language][2] } />
	{:else if route === Sepul}
		<Sepul { ...params } content={ chapters[$language][3] } />
	{:else if route === Christ}
		<Christ { ...params } content={ chapters[$language][4] } />
	{:else if route === Impressuum }
		<Impressuum content={ chapters[$language][5] }/>
	{:else}
		<NotFound />
	{/if}
	<!-- *** /Main content *** -->

	<Footer />
	{:catch error}
	<p>{ error.message }</p>
	{/await}

<style>
	:global(body) {
		width: 90%;
		max-width: var(--max-screen);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto var(--header-height) 1fr var(--footer-height);
		grid-gap: var(--default-gap);
	}
	@media (max-width: 1200px) {
		:global(body) {
			width: 100%;
		}
	}
</style>
