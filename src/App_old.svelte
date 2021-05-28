<script>
	import Map from './components/Map.svelte'
	import Header from './components/Header.svelte'
	import Sidebar from './components/Sidebar.svelte'
	import Footer from './components/Footer.svelte'
	import MapMarker from './components/MapMarker.svelte';
	import { px2LoLa, pixelMarkers } from './scripts/calculations'
	

	
	const lon = 16.48, lat = 43.536
	let mapSettings = {
		lon,
		lat,
		maxBounds: [[lon-.05, lat-.05], [lon+.05, lat+.05]],
		zoom: 14.5,
		pitch: 20,
		bearing: -13.5,
	}

	const mapMarkers = pixelMarkers.map(px=>{
		const coords = px2LoLa(px)
		return { label: px.name, ...coords }
	})
	

</script>


<Header />
<Map { ...mapSettings }>
	{#each mapMarkers as mark}
		<MapMarker {...mark} />
	{/each}
</Map>
<Sidebar />
<Footer />


<style>
	:global(body) {
		width: 90%;
		max-width: var(--max-screen);
		display: grid;
		grid-template-columns: 1fr 200px;
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
</style>