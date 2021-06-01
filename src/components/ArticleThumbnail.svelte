<script>
    export let article;
    const randomIndex = !!article.exhibits ? Math.floor( Math.random() * article.exhibits.lenght ) : 0
</script>

<svelte:head>
    <link rel="stylesheet" href="/article.css">
</svelte:head>

<a href={ article.url }>
        <h1>{ article.title }</h1>
        {#if article.exhibits }
            <img src={ `${ article.document.substring(0, article.document.lastIndexOf("/")) }/exhibits/${article.exhibits[randomIndex].src}`} alt={article.exhibits[randomIndex].desc} >
        {/if}
</a>

<style>
    a {
        padding: var(--default-padding);
        margin: 0;
        background-color: var(--accent-color3);
        color: var(--background-color);
        display: block;
        min-height: 6em;
    }

    a:hover {
        filter: brightness(110%);
    }
</style>
