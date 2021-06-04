<script>

    import Gallery from './Gallery.svelte'
    import Exhibit from './Exhibit.svelte'
    export let exhibits, path



</script>
<aside>
    <slot></slot>
    
    {#if exhibits }
     {#if exhibits.length > 1}
        <Gallery>
            {#each exhibits as exhibit}
                <Exhibit { exhibit } { path } />
            {/each}
        </Gallery>
    {:else}
        <Exhibit exhibit={ exhibits[0] } { path }  />
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