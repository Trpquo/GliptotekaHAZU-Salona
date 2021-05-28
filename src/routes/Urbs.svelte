<script>
    //comps
    import Breadcrumbs from "../components/Breadcrumbs.svelte"
    import Map from "../components/Map.svelte"
    import MapMarker from '../components/MapMarker.svelte';
	import { px2LoLa, pixelMarkers } from '../utils/calculations'
	
    export let region, exhibit

	
	const lon = 16.4825, lat = 43.536
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

<Breadcrumbs path={{ region, exhibit }} />
<h1>
    Urbs { region || "" }
</h1>
<Map { ...mapSettings }>
    {#each mapMarkers as mark}
		<MapMarker {...mark} />
	{/each}
</Map>
