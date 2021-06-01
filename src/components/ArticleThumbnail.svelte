<script>
    import { root } from '../utils/config'


    export let article
    

    let randomImage, contentRoot

    $: {
        contentRoot = `${ root }/hr${ article.path }/images/thumbs/`

        let potentialBackgrounds
        if (!!article.exhibits) {
            potentialBackgrounds =  article.exhibits.filter(e=>e.background && e.type === "image")
            if ( !!potentialBackgrounds.length ) {
                randomImage = contentRoot + potentialBackgrounds[ Math.floor(Math.random() * potentialBackgrounds.length) ].file
            }
        }
        else { 
            let potentialCollector
            potentialBackgrounds = {}
            if ( !!article.sections ) {
                potentialCollector = article.sections.reduce((tot, curr)=>{ 
                    if ( !!curr.exhibits ) {
                        tot[ curr.path ] = curr.exhibits.filter(e=>e.background && e.type === "image")
                    }
                    return tot
                 }, {} )
                for ( let key of Object.keys( potentialCollector ) ) {
                    if ( !!potentialCollector[key].length ) {
                        potentialBackgrounds[key] = potentialCollector[key]
                    }
                }
                if ( !!Object.keys( potentialBackgrounds ).length ) {
                    const randomKey = Object.keys( potentialBackgrounds )[ Math.floor(Math.random() * Object.keys(potentialBackgrounds).length) ]
                    const randomSet = potentialBackgrounds[ randomKey ]
                    const randomExhibit = randomSet[ Math.floor(Math.random() * randomSet.length) ]
                    randomImage = `${ root }/hr${ randomKey }/images/thumbs/` + randomExhibit.file
                }
            }
        }
        console.log( randomImage )
    }

</script>

<svelte:head>
    <link rel="stylesheet" href="/article.css">
</svelte:head>

<a href={ article.url } style={ `--background-image: url("${ randomImage }");` } >
        <h1>{ article.title }</h1>
</a>

<style>
    a {
        padding: var(--default-padding);
        margin: 0;
        background-color: var(--background-color2);
        color: var(--background-color);
        display: block;
        min-height: 6em;
        position: relative;
        z-index: 1;
        text-shadow: 0px 0px 1rem var(--accent-color1);
        overflow: hidden;
    }
    a:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
        width: 100%;
        height: 100%;
        background-image: var(--background-image), linear-gradient( var(--background-color2), var(--accent-color3) );
        background-size: cover;
        mix-blend-mode: multiply;
        opacity: 1;
        transition: .5s ease-in;
    }
    a:after {
        content: "";
        display: block;
        position: absolute;
        top: 10%;
        left: 10%;
        z-index: -1;
        width: 80%;
        height: 80%;
        background-color: var(--accent-color2);
        mix-blend-mode: color-burn;
        opacity: .4;
    }
    
    a:hover {
        filter: brightness(110%);
    }
    a:hover:before {
        transform: scale(1.2);
        transition: 3s ease-out .1s;
    }
    </style>
