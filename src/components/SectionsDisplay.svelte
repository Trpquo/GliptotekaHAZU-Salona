<script>
    import { thumbnailCollector, pickRandom } from '../utils/articleFormatter'
    import { fade } from "svelte/transition"

    export let section

    

    let thumbnail
    $: {
        thumbnail = thumbnailCollector( section )
    }

    const pickRandomN =(arr, n)=> {
        let pick = [], temp = [ ...arr ]
        if ( n > arr.length ) return arr
        for ( let i = 0; i < n; i++ ) {
            let random = pickRandom( arr )
            if ( !pick.includes( random ) ) pick.push(random)
            else i--
        }
        return pick
    }

</script>


<section style={ `--thumbnail: url("${ thumbnail }")` } transition:fade>
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
        background-size: max(50%, contain);
        background-repeat: no-repeat;
        opacity: .5;
        mix-blend-mode: multiply;

    }

</style>