<script>

     const scrollToContent =()=> { 
        scroll({ top: document.querySelector('main').offsetTop - 100, behavior: "smooth"}); 
    }

    const scrollHandler =e=>{
        const doc = document.documentElement;
        let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        if (top > 300) {
            scrollToContent()
            window.removeEventListener('scroll', scrollHandler, false)
        } 
    }
    window.addEventListener('scroll', scrollHandler, false)

</script>
<figure id="hero">
    
    <hgroup on:click={ scrollToContent }>
        <h4>Izložba</h4>
        <h1>Skulptura antičke <span>Salone</span> iz fundusa Gliptoteke HAZU</h1>
        <section>
            logo HAZU
        </section>
    </hgroup>
</figure>

<style>
    #hero { 
        height: calc( 100vh - var(--header-height));
        background-image: linear-gradient(45deg, var(--accent-color1), var(--accent-color2));
    }
    hgroup { 
        padding: calc( var(--default-padding) * 2 );
        font-size: 2em;
        color: var(--text-color-negative);
    }
    h4 {
        text-transform: uppercase;
        font-weight: var(--basic-font-weight)
    }
    h1 {
        font-size: 1.5em;
        margin: 0;
        font-weight: var(--basic-font-weight);
        letter-spacing: .05em;
    }
    h1 span {
        display: block;
        font-size: 3em;
        line-height: 1em;
    }
    hgroup:after {
        content: "";
        display: block;
        width: 50px;
        height: 50px;
        margin: 6rem auto;
        transform: rotate(45deg);
        border-bottom: 1px solid var(--background-color);
        border-right: 1px solid var(--background-color);
        cursor: pointer;
        animation: blink 2s linear 0s infinite alternate;
    }
    @keyframes blink {
        0%   { opacity: .5; transform: rotate(45deg); }
        30%  { opacity:  1; transform: translateY(10px) rotate(45deg); }
        100% { opacity: .3; transform: translateY(-5px) rotate(45deg); }
    }
</style>