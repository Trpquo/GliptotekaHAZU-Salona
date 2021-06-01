<script>
    export let tabs

    // console.log(tabs)
</script>

<ul>
    {#each tabs as tab}
        <li>
            {#if !!tab.document }
            <a href={ tab.url }>{ tab.tag }</a>
            {:else}
            <span>{ tab.tag }</span>
            {/if}
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
        background-color: var(--background-color2);
        transition: .3s ease-out .5s;
    }
    li a {
        text-decoration: none;
    }
    :global(#headerNav > ul > li > ul) {
        display: block;
        position: absolute;
    }
    :global(#headerNav li ul li) {
        height: 0;
        width: 0;
        padding: 0;
        overflow: hidden;
    }
    :global(#headerNav li:hover, #headerNav li:active) {
        height: auto !important;
    }
    :global(#headerNav li:hover ul, #headerNav li:active ul) {
        z-index: 666;
    }
    :global(#headerNav li:hover > ul > li, #headerNav li:active > ul > li) {
        transition: .3s ease-out .1s;
        height: auto;
        width: 100%;
        padding: .5rem;
    }
    :global(#headerNav li ul  li:hover ul, #headerNav li ul li:active ul) {
        z-index: 999;
    }
</style>