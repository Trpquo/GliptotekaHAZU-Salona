<script>
    export let tabs

    // console.log(tabs)
</script>

<ul>
    {#each tabs as tab}
        <li>
            <a href={ tab.url }>{ tab.tag }</a>
            {#if !!tab.sections}
                <svelte:self tabs={ tab.sections } />
            {/if}
        </li>
    {/each}
</ul>

<style>
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: flex-start;
        gap: .5rem;
    }
    li {
        margin: 0;
        padding: .5rem;
        position: relative;
        background-color: var(--background-color);
        background-color: var(--accent-color2);
    }
    li a {
        color: var(--background-color);

    }
    :global(#headerNav li ul) {
        display: block;
    }
    :global(#headerNav li ul li) {
        height: 0px;
        padding: 0;
        transition: .3s ease-out .1s;
        overflow: hidden;
    }
    :global(#headerNav li:hover, #headerNav li:active) {
        height: auto !important;
        min-height: 2rem;
    }
    :global(#headerNav li:hover > ul, #headerNav li:active > ul) {
        display: block;
    }
    :global(#headerNav li:hover > ul > li, #headerNav li:active > ul > li) {
        height: 2rem;
        padding: .5rem;
    }
</style>