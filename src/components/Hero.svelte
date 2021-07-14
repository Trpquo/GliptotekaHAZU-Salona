<script>
    import { fade } from 'svelte/transition'
    import { heroImage, language } from "../utils/config"

     const scrollToContent =()=> { 
        scroll({ top: document.querySelector('main').offsetTop - 100, behavior: "smooth"}); 
    }

    const scrollHandler =e=>{
        const doc = document.documentElement;
        
        let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        if (top > window.innerHeight / 2) {
            scrollToContent()
            window.removeEventListener('scroll', scrollHandler, false)
            window.addEventListener('scroll', isItTop, false)
            // const hero = document.querySelector("#hero")
            // setTimeout(()=>{ if ( !!hero ) hero.remove() }, 1000)
        }
    }
    const isItTop =e=> {
        if (window.scrollY < window.innerHeight / 3.5) {
            scroll({ top: document.querySelector('#hero').offsetTop, behavior: "smooth"});
            window.removeEventListener('scroll', isItTop, false)
            window.addEventListener('scroll', scrollHandler, false)
        }
    }
    window.addEventListener('scroll', scrollHandler, false)

</script>
<div class="wrapper">
    <figure id="hero" style={ `--background-image: url("${ $heroImage }");` } transition:fade >
        
        <hgroup on:click={ scrollToContent }>
            {#if $language === "hr"}
            <h4>Izložba skulpture</h4>
            <h1><strong>Antičke Salone</strong> iz fundusa Gliptoteke HAZU</h1>
            {:else}
            <h4>The sculpture of</h4>
            <h1><strong>Antique Salona</strong> from the holdings of the Glyptotheque CASA</h1>
            {/if}
            <img src="/content/visuals/HAZU.svg" alt="logo HAZU" style="color: white;" />
        </hgroup>
    </figure>
</div>

<style>
    .wrapper {
        background-color: var(--text-color);
        box-shadow: 0px 0px 30px 5px #0005;
        font-size: 1.25vmax;
    }
    #hero { 
        height: calc( 100vh - var(--header-height) );
        background-image: radial-gradient( #0000, #0005, #000 ), linear-gradient(33deg, var(--accent-color1) 30%, var(--accent-color2), var(--accent-color3) 95%);
        position: relative;
        z-index: 1;
        opacity: 0;
        animation: fadein 1s linear 1s forwards;
        display: flex;
        align-items: center;
    }
    @keyframes fadein {
        from { opacity: 0; } 
        to { opacity: 1; } 
    }
    #hero:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: var(--background-image);
        background-size: cover;
        background-position: 50% 25%;
        z-index: -1;
        opacity: .75;
        mix-blend-mode: soft-light;
    }
    hgroup { 
        padding: calc( var(--default-padding) * 2 );
        font-size: 2em;
        color: var(--text-color-negative);
        text-shadow: 0px 0px 3rem var(--text-color);
        flex: 1 0 50%;
    }
    h4 {
        text-transform: uppercase;
        font-size: .85em;
        font-weight: var(--basic-font-weight);
        color: var(--background-color2);
        letter-spacing: .1em;
        font-family: var(--main-smallcaps);
    }
    h1 {
        font-size: 1.5em;
        margin: 0;
        font-weight: var(--basic-font-weight);
        letter-spacing: .05em;
    }
    h1 strong {
        font-weight: 300;
        display: block;
        font-size: 3em;
        line-height: 1em;
    }
    hgroup:after {
        content: "";
        display: block;
        width: 50px;
        height: 50px;
        margin: 10vmax auto;
        transform: rotate(45deg);
        border-bottom: 2px solid var(--background-color2);
        border-right: 2px solid var(--background-color2);
        cursor: pointer;
        animation: blink 3s linear 0s infinite alternate;
    }
    @keyframes blink {
        0%   { opacity: .5; transform: rotate(45deg); }
        30%  { opacity:  1; transform: translateY(5px) rotate(43deg); }
        50% { opacity: .3; transform: translateY(-2px) rotate(45deg); }
        70%  { opacity:  1; transform: translateY(3px) rotate(47deg); }
        100% { opacity: .3; transform: translateY(-5px) rotate(44deg); }
    }
    img {
        width: min(25vmax, 300px);
        position: absolute;
        left: 5vmax;
        bottom: 3vmax;
        mix-blend-mode: screen;
    }
</style>