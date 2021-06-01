<script>
    import { root } from '../utils/config'


    export let article
    const randomIndex = !!article.exhibits ? Math.floor( Math.random() * article.exhibits.lenght ) : 0

    let potentialBackgrounds, randomImage, contentRoot

    $: {
        contentRoot = `${ root }/hr${ article.path }/images/thumbs/`
        if (!!article.exhibits) {
            potentialBackgrounds =  article.exhibits.filter(e=>e.background)
            if ( !!potentialBackgrounds.length ) {
                randomImage = contentRoot + potentialBackgrounds[Math.floor(Math.random() * potentialBackgrounds.length)].file
            }
        }
    }

</script>

<svelte:head>
    <link rel="stylesheet" href="/article.css">
</svelte:head>

<a href={ article.url } style={ `--background-image: url(${ randomImage });` } >
        <h1>{ article.title }</h1>
</a>

<style>
    a {
        padding: var(--default-padding);
        margin: 0;
        background-color: var(--accent-color3);
        background-image: var(--background-image);
        background-size: cover;
        color: var(--background-color);
        display: block;
        min-height: 6em;
    }

    a:hover {
        filter: brightness(110%);
    }
</style>
