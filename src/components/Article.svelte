<script>
    import axios from 'axios'
    import { onMount } from 'svelte'
    import formatter, { articleLayout } from '../utils/articleFormatter'
    import { language, root } from '../utils/config'

    export let article
    let component, articleLoaded = false, contentRoot

    $: {
        contentRoot = `${ root }/${ $language }${ article.path }/`
    }
    
   
    const fetchSection =( articleUrl )=> { 
        const storedArticle = isProduction ? window.localStorage.getItem( `salona-article-${ article.tag.replace(" ", "_") }` ) : null
        if ( !storedArticle ) {
            
            return axios.get( articleUrl )
            .then(response=>{
                // console.log(`Fetching article ${ articleUrl }`)
                if (isProduction) window.localStorage.setItem( `salona-article-${ article.tag.replace(" ", "_") }`, response.data )
                articleLoaded = true
                return response.data
            })
            .catch(console.error)
        }
        else {
            articleLoaded = true
            return Promise.resolve( storedArticle )
        }
    }
    
    onMount(()=>{
        const checkArticle = setInterval(()=>{
            if ( !!component && articleLoaded ) {
                clearInterval( checkArticle )
                formatter( component, article, contentRoot )
            }
        }, 100)
    })

    let article_layout = articleLayout[ Math.floor( Math.random() * articleLayout.length ) ]

</script>

<svelte:head>
    <link rel="stylesheet" href="/article.css">
</svelte:head>

<article bind:this={ component } style={ article_layout } >
    {#if article.title}
        <h1>{ article.title }</h1>
    {/if}
    {#if !!article.document }
        {#await fetchSection( contentRoot + article.document ) then text}
            {@html text }
        {/await}
    {/if}
</article>

<style>
    article {
        margin: 0;
        padding: 0;
        padding-right: var(--default-padding);

        /* background-color: var(--background-color2); */
    }
</style>
