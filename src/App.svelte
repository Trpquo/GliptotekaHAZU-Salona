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


	
	let route, params, topic
	
	page('/', ()=>{ 
		route = Home 
		params = null
	})
	page('/uvod/:1?', (ctx)=>{ 
		route = Home 
		params = ctx.params
	})
	page('/Gliptoteka/:1?', (ctx)=>{ 
		route = Gliptoteka
		params = ctx.params
	})
	page('/Gliptotheque/:1?/:2?/:3?', (ctx)=>{ 
		route = Gliptoteka
		params = ctx.params
	})
	page('/Salona/:1?/:2?/:3?/:4?', (ctx)=>{ 
		route = Urbs
		params = ctx.params
	})
	page('/sepulkralno/:1?/:2?/:3?/:4?', (ctx)=>{ 
		route = Sepul 
		params = ctx.params
	})
	page('/Impressuum', ()=>{ route = Impressuum })
	
	page.start()

	$: {
		topic = Object.values( params ).filter(t=> !!t )
		console.log( topic )
	}

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
		{#if !params}
			<Home content={ chapters[$language][0] } />
		{:else if params.topic === "salonitanski-spomenici"}
			<Home content={ chapters[$language][2] } { topic } />
		{:else}
			<Home content={ chapters[$language][0] } { topic } />
		{/if}
	{:else if route === Gliptoteka }
		<Gliptoteka content={ chapters[$language][1] }  { topic }/>
	{:else if route === Urbs}
		<Urbs content={ chapters[$language][3] }  { topic } />
	{:else if route === Sepul}
		<Sepul content={ chapters[$language][4] }  { topic } />
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
