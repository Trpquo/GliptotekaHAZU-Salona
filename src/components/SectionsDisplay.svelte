<script>
    import { thumbnailCollector } from '../utils/articleFormatter'
    import { fade } from "svelte/transition"

    export let section, openSubmenu

    const closeSubmenu =()=> {
        for ( let key of Object.keys( openSubmenu ) ) {
            openSubmenu[ key ] = false
        }
        console.log( openSubmenu )
    }

    let thumbnail
    $: {
        thumbnail = thumbnailCollector( section )
    }

</script>


<section style={ `--thumbnail: url("${ thumbnail }")` } transition:fade>
    <figure>
        <h1><a href={ section.url } on:click={ ()=>{  } }>{ section.title }</a></h1>
        {#if !!section.exhibits}
        <figcaption>
            <ul>
                {#each section.exhibits as pic}
                    <li>{ pic.name }</li>
                {/each}
            </ul>
        </figcaption>
        {/if}

    </figure>
    {#if !!section.sections}
    {#each section.sections as sect}
        <svelte:self section={ sect } />        
    {/each}
    {/if}
</section>

<svelte:head>
    <link href="navigation.css" rel="stylesheet">
</svelte:head>

<style>

    
    section {
        position: relative;
        z-index: 1;
    }
    

    section:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background-image: var(--thumbnail);
        background-size: contain;
        background-repeat: no-repeat;
        opacity: .5;
        mix-blend-mode: multiply;

    }

</style>