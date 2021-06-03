<script>
    import Article from "./Article.svelte"
    import ArticleThumbnail from "./ArticleThumbnail.svelte"
    import Aside from "./Aside.svelte"
 
    import { fade } from 'svelte/transition'

    export let content, grid = `"h h h h . ." "t t t t a a" "s s s s a a"`

    // console.log( content )
 
</script>

<main transition:fade={{ duration: 200 }} style={ `--content-grid: ${ grid };` }>
    <header>
        <h1>{ content.title }</h1>
        <slot name="header"></slot>
    </header>
    <section id="articles">
        {#if content.document }
            <Article article={ {...content, title: ""} } />
        {/if}
        {#if content.sections && content.sections.length > 0 }
            <nav id="sections-nav">
                {#each content.sections as article}
                    {#if !!article.document }
                        <ArticleThumbnail { article } />
                    {:else}
                        {#if !!article.sections}
                        {#each article.sections as section}
                            <ArticleThumbnail article={ section } />
                        {/each}
                        {/if}
                    {/if}
                {/each}
            </nav>
        {/if}
            <!-- {#each content.sections as article }
                <Article { article } { directory } />
            {/each} -->
    </section>
    <slot name="map"></slot>

    {#if content.exhibits }
    <Aside exhibits={ content.exhibits } path={ content.path } />
    {/if}
</main>


<style>
    main { 
        display: grid;
        padding: 0 var(--default-gap);
        gap: var(--default-gap);
        grid-template-columns: repeat(6, 1fr);
        grid-auto-flow: dense;
        grid-template-areas: var(--content-grid);
    }
    @media (max-width: 1000px) {
        main {
            display: block;
        }
    }
    header, #articles {
        padding: var(--default-padding);
    }
    header { grid-area: h; }
    #articles { grid-area: t; }
    #sections-nav {
        grid-area: s;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(22ch, 1fr) );
        gap: var(--default-gap);
    }
</style>