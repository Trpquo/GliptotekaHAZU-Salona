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
		params = { 0: null }
	})
	page('/uvod/:1?/:2?', (ctx)=>{ 
		route = Home 
		params = ctx.params
	})
	page('/intro/:1?/:2?', (ctx)=>{ 
		route = Home 
		params = ctx.params
	})
	page('/Gliptoteka/:1?/:2?', (ctx)=>{ 
		route = Gliptoteka
		params = { 0: "Gliptoteka", ...ctx.params }
	})
	page('/Glyptotheque/:1?/:2?/:3?', (ctx)=>{ 
		route = Gliptoteka
		params = { 0: "Glyptotheque", ...ctx.params }
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
	
	let firstTime = true
	$: {
		if ( params !== null ) topic = Object.values( params ).filter(t=> !!t )
		const scrollUp = setInterval(()=>{
		
		let target = firstTime ? document.querySelector('#hero') : document.querySelector('main')
		if ( target ) {
			if ( window.scrollY > window.innerHeight / 2.5 ) firstTime = false
			clearInterval( scrollUp )
			// console.log("scrolling...")
			scroll({
				top: target.offsetTop - 100,
				behavior: "smooth"
			});
		}
		}, 100)

		// language.set("en")
	}
	

</script>

	<Hero />

	{#await contents}
	<Spinner />
	{:then chapters}
	<Header tabs={ chapters[$language] }/>


	<!-- *** Main content *** -->
	{#if route === Home}
		<Home content={ chapters[$language][0] } { topic } />
	{:else if route === Gliptoteka }
		<Gliptoteka content={ chapters[$language][0] }  { topic }/>
	{:else if route === Urbs}
		<Urbs content={ chapters[$language][1] }  { topic } />
	{:else if route === Sepul}
		<Sepul content={ chapters[$language][1] }  { topic } />
	{:else}
		<NotFound />
	{/if}
	<!-- *** /Main content *** -->

	<Footer />
	{:catch error}
	<p>{ error.message }</p>
	{/await}

<style>
	:global(html) {
		width: auto;
	}
</style>