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
        border-radius: 0 0 .5rem 0;
        background-color: var(--background-color2);
        font-family: var(--alternate-font-family);
    }
    li {
        box-sizing: border-box;
        margin: 0;
        padding: .5rem;
        position: relative;
        transition: .3s ease-out .5s;
    }
    li a {
        text-decoration: none;
        position: relative;
    }
    li a:after {
        content: "";
        display: block;
        width: 0;
        height: 2px;
        background-color: var(--accent-color3);
        transition: .25s ease-out .1s;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 1000;
    }
    li span {
        opacity: .70;
    }
    li:hover > a:after {
        width: 100%;
    }
    :global(#headerNav > ul > li > ul) {
        display: block;
        position: absolute;
        min-width: 15rem;
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
        border-left: 1px solid var(--accent-color1);
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