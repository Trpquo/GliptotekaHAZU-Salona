<script>
    import { onMount, getContext } from 'svelte';
    import { mapbox, key } from '../utils/mapbox.js';

    const { getMap } = getContext( key )
    const map = getMap()

    export let lat, lon, label

    let marker_label

    onMount(()=>{
        const popup = new mapbox.Popup({ offset: 5 })
            .setText( label )
    
        const marker = new mapbox.Marker({
                color: "#AA0000",
                pitchAlignment: "viewport",
                rotationAlignment: "viewport",
                element: marker_label,
                anchor: "bottom-left",
                offset: [0,-15],
                popup: false,
        })
            .setLngLat([lon, lat])
            // .setPopup(popup)
            .addTo(map)
    })

</script>

<style>
    figure { 
        position: absolute;
        font-family: var(--main-font-family);
    }
    figure:before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background-color: var(--accent-color1);
        border-radius: 50%;
        position: absolute;
        bottom: -5px;
        left: -5px;
    }
    mark { 
        display: block;
        float: left;
        background-color: var(--accent-color2);
        color: var(--text-color-negative);
        padding: .1em .5em ;
        letter-spacing: .1em;
        border-radius: .5em .5em .5em 0;
        margin-bottom: -.5em;
    }
    figcaption {
        background-color: #eeeb;
        padding: .25em .5em;
        clear: both;
    }
    var { 
        font-weight: bold;
    }
</style>

<figure bind:this={marker_label}>
    <mark>{label}</mark>
    <figcaption>
        <var>Lon: </var> {lon.toFixed(4)}, 
        <var>Lat: </var> {lat.toFixed(4)}
    </figcaption>
</figure>
