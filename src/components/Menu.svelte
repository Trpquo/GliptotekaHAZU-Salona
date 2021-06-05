<script>
    import SectionsDisplay from './SectionsDisplay.svelte'

    export let tabs

    let openSubmenu = tabs.reduce( ( ref, tab )=> ({ ...ref, [ tab.url ]: false }), {} ) 
    console.log( openSubmenu )
    
    const scrollToContent =()=> { 
        scroll({ top: document.querySelector('main').offsetTop - 100, behavior: "smooth"})
    }
    const handleSubmenu =sec=> {
        if ( window.scrollY < window.innerHeight - document.querySelector('header').offsetHeight ) scrollToContent()
        for (const key of Object.keys( openSubmenu )) {
            if ( key !== sec.url ) openSubmenu[ key ] = false
        }
        openSubmenu[ sec.url ] = !openSubmenu[ sec.url ]
    }
    const closeSubmenu =e=> {
        if ( e.target.nodeName === "A" ) {
            for ( let key of Object.keys( openSubmenu ) ) {
                openSubmenu[ key ] = false
            }
        }
    }

    window.addEventListener('click', closeSubmenu, false)


</script>

<ul>
    {#each tabs as tab}
        <li>
            <h1 on:click={()=>{ handleSubmenu( tab )}} class:active={ openSubmenu[ tab.url ] }>{ tab.tag }</h1>
            {#if !!tab.sections }
            <nav class="massive-sub-menu" class:open={ openSubmenu[ tab.url ] }>

                <SectionsDisplay section={ tab } />

            </nav>
            {/if}
        </li>
    {/each}
</ul>

<style>
    ul, li {
        padding: 0;
        margin: 0 var(--default-gap);
        height: 100%;
    }
    ul {
        list-style: none;
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        border-radius: 0 0 .5rem 0;
        background-color: var(--background-color2);
        font-family: var(--alternate-font-family);

        --tab-height: 75px;
    }
    li {
        display: flex;
    }
    li h1 {
        display: flex;
        font-size: inherit;
        font-weight: inherit;
        box-sizing: border-box;
        width: calc( var(--tab-height) * 2 );
        height: var(--tab-height);
        align-items: flex-end;
        justify-content: center;
        text-decoration: none;
        padding-bottom: 1rem;
        margin-top: calc( var(--header-height) - var(--tab-height) );
        background-color: var(--accent-color1);
        color: var(--background-color);
        border-radius: 999px 999px 0 0;
        position: relative;
        z-index: 1;

        transition: .25s .25s;
        overflow: hidden;
        cursor: pointer;
    }
    li h1:after {
        content: "";

        display: block;
        box-sizing: content-box;
        width: calc( var(--tab-height) * 2 );
        height: calc( var(--tab-height) * 2 );
        border-bottom: .5rem solid var(--background-color2);
        border-radius: 0 0 999px 999px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: .5s;
    }
    li h1:hover {
        background-color: var(--accent-color1);
    }
    li h1:active, li h1.active {
        background-color: var(--accent-color3);
    }
    li h1:hover:after {
        transform: rotate(180deg);
        border-color: var(--accent-color3);
    }

    .massive-sub-menu {
        position: absolute;
        top: var(--header-height);
        left: 0;
        display: block;
        box-sizing: border-box;
        margin: 0;
        padding: var(--default-padding);
        width: 100%;
        height: 0;
        opacity: 0;
        background-color: var(--accent-color3);
        z-index: 8;
        overflow: hidden;
        transition: height .5s linear, opacity .25s linear .25s;
    }
    .massive-sub-menu.open {
        height: calc( 100vh - var(--header-height) );
        overflow: auto;
        opacity: 1;
        transition: height 1s linear .25s, opacity .5s linear .35s;
    }

</style>