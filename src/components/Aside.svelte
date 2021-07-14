<script>

    import Gallery from './Gallery.svelte'
    import Exhibit from './Exhibit.svelte'
    import ExhibitCarousel from './ExhibitCarousel.svelte'
    export let exhibits, path

    let carousel = false

</script>
<aside>
    <slot></slot>
    
    {#if exhibits }
    <Gallery>
    {#if exhibits.length > 1}
        {#each exhibits as exhibit, index}
            <Exhibit { exhibit } { path } { index } bind:carousel />
        {/each}
    {:else}
        <Exhibit exhibit={ exhibits[0] } { path } index=0 bind:carousel />
        <div></div><div></div><div></div><div></div><div></div>
    {/if}
    </Gallery>
    {#if carousel !== false}
        <ExhibitCarousel { exhibits } { path } bind:carousel />
    {/if}
    {/if}
</aside>

<style>
    aside {
        padding: 0;
        margin: 0;
        width: 100%;
        grid-area: a;

    }
</style>