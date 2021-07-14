<script>
    import { onMount } from 'svelte'
    import { Dragdealer } from 'dragdealer'


    export let exhibits, path, carousel

    let lightbox, popup
    
    onMount(()=>{

        if ( !!lightbox ) {
            console.log( lightbox.id, exhibits.length )
                popup = new Dragdealer( lightbox.id, { 
                    steps: exhibits.length,
                    speed: .3,
                    loose: true,
                    horizontal: true,
                }
            )

        }
        
    })
    $: {
        if ( !!popup ) {
            console.log( "Setting popup to", carousel )
            popup.setStep( carousel + 1 )
        }
    }
    
    const closeCarousel = ()=>{     
        console.log( "Setting carousel to", false )
        carousel = false
    }

</script>

<div id="carousel" bind:this={ lightbox } on:dblclick={ closeCarousel }  style={ `--item-width: calc( 100vw - 2rem );` } class:hidden={ carousel === false }>
    <div class="handle" style={ `--handle-width: ${ exhibits.length }00%` } >
        {#each exhibits as exhibit, index}
            <figure class={ `img img${ index }` } style={ `background-image: url( "/content/hr${path}/images/${exhibit.file}" );` }>
                <figcaption>
                    <h1>{ exhibit.description }</h1>
                    <p>{ `${ index + 1 } / ${ exhibits.length }`  }</p>
                    <!-- <button on:click={ closeCarousel } title="close">X</button> -->
                </figcaption>
            </figure>

        {/each}
    </div>
</div>


<style>
    #carousel {
        position: fixed;
        z-index: 9999999;
        inset: 0;
        box-sizing: border-box;
        height: calc(100vh - 2rem);
        width: var(--item-width);
        margin: auto;
        overflow: hidden;
        box-shadow: 0 0 0 100vw #333a;
        border: 1rem solid var(--background-light); 
        background-color: var(--background-light);
        opacity: 1;
        transition: opacity 1s;
    }
    :global(#carousel.hidden) {
        display: none;
        opacity: 0;
    }
    .handle {
        width: var(--handle-width);
        height: 100%;
        display: flex;
    }
    .img {
        width: var(--item-width);
        height: 100%;       
        margin: 0;
        position: relative;
        display: flex;
        align-items: flex-end;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }
    figcaption {
        padding: 1rem;
        padding-bottom: 0;
        background-color: var(--background-light);
        opacity: .9;
    }
    figcaption h1 {
        font-size: 1rem;
        font-weight: normal;
    }
    figcaption p {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        color: var(--accent-color1);
        background-color: var(--background-color);
        font-weight: bold;
        padding: .1rem .25rem;
    }
    figcaption button {
        width: 0px;
        height: 0px;
        border-width: .5rem;
        border-style: solid;
        border-top-color: var(--accent-color1);
        border-bottom-color: var(--accent-color1);
        border-left-color: var(--accent-color2);
        border-right-color: var(--accent-color3);
        /* border-radius: 50%; */
        text-indent: -999999px;
        z-index: 9999999;
        background-color: var(--accent-color1);
        position: absolute;
        top: 0;
        right: 1rem;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }
</style>