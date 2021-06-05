<script>
    import { thumbnailCollector, pickRandom } from '../utils/articleFormatter'
    import { fade } from "svelte/transition"

    export let section

    

    let thumbnail, thumbnail2
    $: {
        thumbnail = thumbnailCollector( section )
        if ( !!section.exhibits ) if (section.exhibits.length > 5) { thumbnail2 = thumbnailCollector( section ) }
    }

    const pickRandomN =(arr, n)=> {
        let pick = []
        if ( n > arr.length ) return arr
        for ( let i = 0; i < n; i++ ) {
            let random = pickRandom( arr )
            if ( !pick.includes( random ) ) pick.push(random)
            else i--
        }
        return pick
    }

</script>


<section style={ `--thumbnail: url("${ thumbnail }"); ${ thumbnail2 !== thumbnail ? '--thumbnail2: url("' + thumbnail2 + '");' : "" }` } transition:fade>
    <figure>
        <h1><a href={ section.url }>{ section.title }</a></h1>
        {#if !!section.exhibits}
        <figcaption>
            <ul>
                {#each pickRandomN( section.exhibits, 3 ) as pic}
                    <li>{ pic.name }</li>
                {/each}
                . . .
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



<style>

    
    section {
        position: relative;
        z-index: 1;
        overflow: hidden;
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
        background-position: 2%;
        background-repeat: no-repeat;
        opacity: .55;
        mix-blend-mode: multiply;
        transform: rotate(-1.5deg);
        
    }
    section:after {
        content: "";
        display: block;
        width: 120%;
        height: 150%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background-image: var(--thumbnail2);
        background-size: 25%;
        background-position: center;
        background-repeat: no-repeat;
        opacity: .3;
        mix-blend-mode: overlay;
        transform: rotate(10deg);
        filter: blur(1.5px);

    }

</style>