<script>
    import Gallery from './Gallery.svelte'
    import Exhibit from './Exhibit.svelte'
    export let exhibits, path

    console.log( exhibits )
</script>
<aside>
    <slot></slot>

    {#if exhibits }
        <Gallery>
            {#each exhibits as exhibit}
                <Exhibit { exhibit } { path } />
            {/each}
        </Gallery>
    {/if}
</aside>

<style>
    aside {
        padding: var(--default-padding) var(--default-gap);
        width: 100%;
        grid-area: a;

    }
</style>