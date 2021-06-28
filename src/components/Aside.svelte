<script>

    import Gallery from './Gallery.svelte'
    import Exhibit from './Exhibit.svelte'
    export let exhibits, path



</script>
<aside>
    <slot></slot>
    
    {#if exhibits }
    <Gallery>
    {#if exhibits.length > 1}
        {#each exhibits as exhibit}
            <Exhibit { exhibit } { path } />
        {/each}
    {:else}
        <Exhibit exhibit={ exhibits[0] } { path }  />
        <div></div><div></div><div></div><div></div><div></div>
    {/if}
    </Gallery>
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