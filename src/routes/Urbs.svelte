<script>
    //comps
    import Main from "../components/Main.svelte"
    import Breadcrumbs from "../components/Breadcrumbs.svelte"
	import Map from "../components/Map.svelte"
    import MapMarker from '../components/MapMarker.svelte';

	//utils
    import { px2LoLa, pixelMarkers } from '../utils/calculations'
	import { filterContents } from "../utils/server";
	import { potentialGrids, pickRandom } from '../utils/articleFormatter'
	import { root } from '../utils/config'
	
    export let topic, content

	
	const calculateCenter =markers=> markers.reduce((center, curr)=> [ center[0] + curr.lon / markers.length, center[1] + curr.lat / markers.length  ], [0,0])
	const gatherMapMarkers =( markers, sections )=> {
		return sections.reduce((picks, section)=>{
			let locations = []
			if ( !!section.exhibits ) {
				locations = section.exhibits.filter(exh=> !!exh.location && exh.type !== "video" ).map(loc=> ({ 
					label: section.tag, 
					thumb: `${ root }/hr${ section.path }/images/thumbs/` + loc.file, 
					url: section.path, 
					...loc.location 
				}) )
			}
			// console.log( "Pregledavam", section.title )
			if ( !locations.length && !!section.sections ) {
				return gatherMapMarkers( picks, section.sections )
			} 
			else return [ ...picks,  pickRandom( locations ) ].filter( m=>!!m )
			
			}, markers || [])
	}


	let currentContent, grid, mapMarkers, mapSettings
	$: {
		// get right contnet for display
		currentContent = filterContents( { ...content }, topic )
		mapMarkers = []

		// pick random layout
		let hasExhibits = !!currentContent.exhibits
		let reasonableGrids = potentialGrids[ hasExhibits ? "Urbs" : "noExhibits" ]
		grid = pickRandom( reasonableGrids )
		// console.log("grid:", hasExhibits ? "Urbs[" : 'noExhibits[', reasonableGrids.indexOf(grid), ']' )

		// find markers for mapbox
		if ( hasExhibits ) {
			
			mapMarkers = currentContent.exhibits.filter(exh=> !!exh.location && exh.type !== "video" ).map(loc=> ({ 
				label: loc.label || loc.name, 
				thumb: `${ root }/hr${ currentContent.path }/images/thumbs/` + loc.file, 
				...loc.location 
			}) )
		}
		if ( !!currentContent.sections ) {
			mapMarkers = gatherMapMarkers( mapMarkers, currentContent.sections )
		}
		
		// console.log( mapMarkers )
		const [ lon, lat ] = !!mapMarkers && !!mapMarkers.length ? calculateCenter( mapMarkers ) : [ 16.4825, 43.536 ]
		mapSettings = {
			lon,
			lat,
			maxBounds: [[lon-.05, lat-.05], [lon+.05, lat+.05]],
			zoom: 14.5,
			pitch: 20,
			bearing: -13.5,
		}
		if ( !!mapMarkers ) if ( !mapMarkers.length ) mapMarkers = pixelMarkers.map(px=> ({ ...px2LoLa({ label: px.name, ...px }) }) )
		// console.log( "Markers", mapMarkers )
	}
	



</script>


<Main content={ currentContent } { grid }>
	<Breadcrumbs { topic } slot="header" />
	<Map { ...mapSettings } slot="map">
		{#if !!mapMarkers}
		{#each mapMarkers as mark}
			<MapMarker { mark } />
		{/each}
		{/if}
	</Map>
</Main>
