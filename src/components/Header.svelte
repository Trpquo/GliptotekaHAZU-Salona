<script>
    export let tabs
</script>
<header>
    <h1>Salona</h1>
    <nav>
        <ul>
            {#each tabs as tab}
                <li>
                    <a href={ tab.url }>{ tab.title }</a>
                    {#if tab.sections}
                        <ul>
                            {#each tab.sections as section}
                                <li><a href={ section.url }>{ section.title }</a></li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
</header>
<style>
    header {
        grid-area: h;
        background-color: beige;
        position: relative;
        z-index: 2;
    }
    h1 {
        margin: 0;
    }
    nav > ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        gap: 2rem;
    }
    li ul {
        display: none;
        padding-left: 1rem;
        list-style: none;
    }
    li:hover ul, li:active ul {
        display: block;
    }
</style>