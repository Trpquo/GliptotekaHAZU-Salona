<script>
    //comps
    import Main from "../components/Main.svelte"
    import Breadcrumbs from "../components/Breadcrumbs.svelte"
	import Map from "../components/Map.svelte"
    import MapMarker from '../components/MapMarker.svelte';

	//utils
    import { px2LoLa, pixelMarkers } from '../utils/calculations'
	import { filterContents } from "../utils/server";
	
    export let region, topic, content

	let currentContent
	$: {
		currentContent = filterContents( { ...content }, [ region, topic ] )
	}
	
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


	const grid = ` 
            "h h h h . ."
            "m m m m m m"
            "t t t t a a"
            "s s s s a a"
            `
</script>


<Main content={ currentContent } { grid }>
	<Breadcrumbs path={{ region, topic }} slot="header" />
	<Map { ...mapSettings } slot="map">
		{#each mapMarkers as mark}
			<MapMarker {...mark} />
		{/each}
	</Map>
</Main>
