<script>
	import { onMount, setContext } from 'svelte';
	import { mapbox, key, activateMapOverlay } from '../utils/mapbox.js';
	// import StylesControl from 'mapbox-gl-controls/lib/styles'
	import syncMaps from '@mapbox/mapbox-gl-sync-move'
	import { API_KEY, CARRARA_KEY } from '../utils/config'
	



	
	export let lat, lon, zoom, pitch, bearing, maxBounds;
	
	let container, defaultMap, historicMap, standard, historic, link;
    setContext(key, {
        getMap: () => defaultMap
    });	


	
	onMount(() => {
		
		const default_style = n=>`mapbox://styles/mapbox/${["satellite", "light", "dark", "street"][n]}-v9`

		const custom_styles = { 
			arheologija: "mapbox://styles/trpquo/cknf6o5cs1qwz17mms3nc5fr4",
			carrara: "mapbox://styles/trpquo/cknhr26c05n8d17nk2d9knl8l",
		}
		link.onload = () => {
			mapbox.accessToken = API_KEY
			defaultMap = new mapbox.Map({
				container: standard,
				style: default_style(0), 
				center: [lon, lat],
				zoom,
				pitch,
				bearing,
				maxBounds, 
				maxZoom: 21,
			});
			mapbox.accessToken = CARRARA_KEY
			historicMap = new mapbox.Map({
				container: historic,
				style: custom_styles.carrara, 
				center: [lon, lat],
				zoom,
				pitch,
				bearing,
				maxBounds, 
				maxZoom: 21,
			});
			// defaultMap.addControl(new StylesControl({
			// 	styles: [
			// 		{
			// 			label: 'Satelit',
			// 			styleName: 'Satellite',
			// 			styleUrl: default_style(0),
			// 		},
			// 		{
			// 		label: 'Osnovna',
			// 		styleName: 'Arheologija',
			// 		styleUrl: default_style(3),
			// 		}, 
			// 	],
			// 	onChange: (style) => { standard.classList.toggle("satellite") },
			// }), 'bottom-left')

			syncMaps(defaultMap, historicMap)
			activateMapOverlay(historic, container)
		};




		return () => {
			defaultMap.remove();
			historicMap.remove();
			// link.parentNode.removeChild(link);
			window.removeEventListener("mousedown", activateMapOverlay);
		};
	});


</script>

<svelte:head>
	<link bind:this={ link } href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<figure bind:this={container} >
	<div bind:this={standard} class="map satellite">
		{#if defaultMap}
			<slot></slot>
		{/if}
	</div>
	<div bind:this={historic} id="overlay-map" class="map"></div>
</figure>

<svg style="display: none">
	<defs>
	  <filter id="satelliteFilter" x="0" y="0">
		<feColorMatrix type="matrix" values="
			.75 .25 .25 0  0
			.25 .7 .25  0 .01  
             .3 .3  .7  0 .02
              0  0   0  1  0" in="SourceGraphic" result="colormatrix"/>
		<!-- <feComponentTransfer in="colormatrix" result="componentTransfer">
			<feFuncR type="table" tableValues="0.02 0.26 0.95"/>
			<feFuncG type="table" tableValues="0.04 0.42 0.93"/>
			<feFuncB type="table" tableValues="0.05 0.48 0.93"/>
			<feFuncA type="table" tableValues="0 1"/>
		</feComponentTransfer>
		<feBlend mode="color" in2="colormatrix" in="SourceGraphic" result="blend"/> -->
	  </filter>
	</defs>
	<rect width="90" height="90" stroke="green" stroke-width="3" fill="yellow" filter="url(#f1)" />
</svg>

<style>

	:global(.mapboxgl-ctrl-attrib-inner) {
		display: none !important;
	}
	:global(canvas:focus) {
		outline: none;
	}
	/* .map {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	} */
	figure {
		grid-area: m;
		display: block;
		position: relative;
		margin: 0;
		padding: 0;
		height: 33vw;
		width: 100%;
	}
	.map {
		position: absolute;
		margin: 0;
		width:100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: var(--text-color);
	}
	/*
	:global(.map.satellite canvas) {
		 filter: url(#satelliteFilter); 
	}
	*/
	#overlay-map {
		left: auto;
		right: 0;
		clip-path: polygon(90% 0, 100% 0, 100% 100%, 90% 100%);
	}
	:global(#slider) {
		height: 0;
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 3;
	}
	:global(#slider .handle) {
		height: calc(33vw - 1rem);
		width: 2px;
		margin-top: calc(-33vw - .5rem);
		/* margin-left: -10px; */
		border-top: 1rem solid var(--accent-color1);
		border-bottom: 1rem solid var(--accent-color1);
		border-left: .5rem solid transparent;
		border-right: .5rem solid transparent;
		cursor: pointer;
		position: relative;
	}
	:global(#slider .handle:after) {
		content: "";
		display: block;
		height: 100%;
		background-color: var(--accent-color1);
	}
	:global(#slider .handle:active) {
		cursor: col-resize;
	}
	:global(.mapboxgl-marker) {
		z-index: 2;
	}

</style>