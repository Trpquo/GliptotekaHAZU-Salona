<script>
    import axios from 'axios'
    import { onMount } from 'svelte'
    import formatter, { articleLayout } from '../utils/articleFormatter'
    import { language, root } from '../utils/config'

    export let article
    let component, articleLoaded = false, noModel = true, contentRoot

    $: {
        contentRoot = `${ root }/${ $language }${ article.path }/`
        noModel = true
    }
    
   
    const fetchSection =( articleUrl )=> { 
        const storedArticle = isProduction && $language !== 'en' ? window.localStorage.getItem( `salona-article-${ article.tag.replace(" ", "_") }` ) : null
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
    
    // onMount(()=>{
    //     const checkArticle = setInterval(()=>{
    //         if ( !!component && articleLoaded ) {
    //             clearInterval( checkArticle )
    //             formatter( component, article, contentRoot )
    //         }
    //     }, 100)

    //     return ()=>{ article = null }
    // })

    $: {
        if ( !!component && articleLoaded && noModel ) {
            const canvases = component.querySelectorAll('canvas')
            canvases.forEach(el=>{ el.remove() })
            formatter( component, article, contentRoot )
            noModel = false
        }
    }
    let layouts = article.directory.indexOf( "uvod" ) >= 0 ? articleLayout.withFootnotes : articleLayout.noFootnotes
    let article_layout = layouts[ Math.floor( Math.random() * layouts.length ) ]



</script>

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
