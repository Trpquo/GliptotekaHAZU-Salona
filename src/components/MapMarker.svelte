<script>
    import { onMount, getContext } from 'svelte';
    import { mapbox, key } from '../utils/mapbox.js';

    const { getMap } = getContext( key )
    const map = getMap()

    export let mark

    let marker_label

    onMount(()=>{
        const popup = new mapbox.Popup({ offset: 5 })
            .setText( mark.label )
    
        const marker = new mapbox.Marker({
                color: "#AA0000",
                pitchAlignment: "viewport",
                rotationAlignment: "viewport",
                element: marker_label,
                anchor: "bottom-left",
                offset: [0,-15],
                popup: false,
        })
            .setLngLat([mark.lon, mark.lat])
            // .setPopup(popup)
            .addTo(map)
    })
    
</script>

<figure bind:this={ marker_label } style={ `--thumbnail: url(${ mark.thumb });`  } >
    <a href={ mark.url }> 
        <mark>{ mark.label }</mark>
        {#if !!mark.url }
        <figcaption>
            <div>
                <var>Lon: </var> { mark.lon.toFixed(4) }, 
                <var>Lat: </var> { mark.lat.toFixed(4) }
            </div>
        </figcaption>
        {/if}
    </a> 
</figure>
        

<style>
    figure { 
        display: block;
        position: absolute;
        font-family: var(--main-font-family);
        width: 22ch;
        line-height: 1.2em;
    }
    figure:after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: -5px;
        left: -5px;
        z-index: -1;

        background-color: var(--accent-color1);
        border-radius: 50%;
    }
    a {
        display: block;
        width: 100%;
        height: 100%;
    }
    mark { 
        display: block;
        background-color: var(--accent-color2);
        color: var(--text-color-negative);
        padding: .1rem .5rem;
        letter-spacing: .1em;
        border-radius: .25rem .25rem 0 0;
    }
    div {
        padding: .1rem .5rem;
        width: 100%;
        box-sizing: border-box;
        background-color: var(--accent-color2);
        color: var(--text-color-negative);
        font-size: .85em;
        opacity: 0;
        transition: opacity .25s linear 0s;
    }
    figcaption {
        --local-padding: 0;
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 0;
        overflow: hidden;
        border: 0;
        
        background-color: var(--background-color2);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        border-radius: .25rem .25rem 25px 0;
        transition: 2s ease-in .1s;
    }
    figcaption:before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: var(--thumbnail);
        background-size: cover;
        background-position: top center;
        z-index: -1;
        opacity: .75;
    }
    figure:hover figcaption {
        height: 15ch;
        border: 1px solid var(--accent-color2);
    }
    figure:hover div {
        opacity: 1;
        transition: .5s ease .75s;
    }
    var { 
        font-weight: bold;

    }
</style>

