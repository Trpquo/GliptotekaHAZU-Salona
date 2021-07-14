<script>
    import { root } from '../utils/config'
    import { onMount } from 'svelte'
    import { slide } from 'svelte/transition'

    export let exhibit, path, carousel, index
    
    
    let component

    onMount(()=>{
        if ( !!component ) {
            let img, mouse = {}, span = null, currSpan = component.style.cssText.match(/[0-9]+/g)
            if ( !!span ) span = { cols: parseInt( currSpan[0] ), rows: parseInt( currSpan[0] ) }
            else span = { cols: 1, rows: 1 }

            
            let isVideo = Array.from( component.children ).some(el=> el.nodeName === "VIDEO"  )
            if ( !isVideo ) { // is image
                img = Array.from( component.children ).find(el=> el.nodeName === "IMG"  )
                setTimeout(()=>{
                    if ( img.height > img.width * 1.4 ) {
                        span.rows++
                        img.src = img.src.replace('thumbs/', "")
                    }
                    if ( img.width > img.height * 1.5 ) {
                        span.cols++
                        img.src = img.src.replace('thumbs/', "")
                    }
                    component.style.cssText = `grid-area: span ${ span.rows } / span ${ span.cols }; `
                }, 100)
            }

            

            component.addEventListener('mousedown', e=> {
                if (e.target === component) {
                    mouse.x = e.clientX
                    mouse.y = e.clientY
                    component.style.zIndex = 999
                    component.classList.add("resizing")
                }
            })
            component.addEventListener('mouseup', e=> {
                if (e.target === component) {
                    const limit = { one: 75, two: 175 }

                    if ( e.clientX > mouse.x + limit.one || e.clientY > mouse.y + limit.one ) {
                        if ( e.clientX > mouse.x + limit.one) {
                            span.cols++
                            if ( e.clientX > mouse.x + limit.two ) span.cols++
                        }
                        if ( e.clientY > mouse.y + limit.one  ) {
                            span.rows++
                            if ( e.clientY > mouse.y + limit.two ) span.rows++
                        }
                        if ( !!img ) img.src = img.src.replace('thumbs/', "")
                    }
                    else if ( e.clientX < mouse.x - limit.one || e.clientY < mouse.y - limit.one ) {
                        if ( e.clientX < mouse.x - limit.one) {
                            span.cols--
                            if ( e.clientX > mouse.x - limit.two ) span.cols--
                        }
                        if ( e.clientY < mouse.y - limit.one  ) {
                            span.rows--
                            if ( e.clientY > mouse.y - limit.two ) span.rows--
                        }
                    }
                    if ( span.cols < 1 ) span.cols = 1
                    if ( span.rows < 1 ) span.rows = 1
                    if ( span.cols > 3 ) span.cols = 3
                    if ( span.rows > 3 ) span.rows = 3
                    component.style.cssText = `grid-area: span ${ span.rows } / span ${ span.cols }; `
                    component.classList.remove("resizing")
                }
            })

            component.addEventListener('dblclick', ()=>{
                carousel = index
            })
        }
    })
    const chance = Math.random() < .15
</script>

<figure style={ chance || exhibit.type === "video" ? "grid-area: span 2 / span 2; align-items: center;" : "" } bind:this={ component } transition:slide >
    {#if exhibit.type === "image"}
        <img src={ `${ root }/hr${ path }/images/${chance ? "" : "thumbs/"}${ exhibit.file }` } alt={ exhibit.name } />
    {/if}
    {#if exhibit.type === "video"}
        <video controls alt={ exhibit.name } >
            <source src={ `${ root }/hr${ path }/images/${ exhibit.file }` } type="video/mp4" >
            <track src="#" kind="captions">
        </video>

    {/if}
    <figcaption>
        {@html exhibit.description }
    </figcaption>
</figure>

<style>
    figure {
        margin-top: 0;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: flex-start;
        cursor: help;
        background-color: var(--background-light);
        resize: both;
        transition: height .25s, width .25s;
        min-width: var(--figure-height);
        min-height: var(--figure-height);
    }
    img { 
        display: block;
        height: 100%;
        width: auto;
    }
    video {
        width: 100%;
        display: block;
        justify-self: flex-end;
    }
    figcaption {
        box-sizing: border-box;
        padding: 45px .5rem .25rem;
        clip-path: polygon(0 40px, 100% 0, 95% 100%, 0 100%);
        border-radius: 0 10px 0 0;
        max-height: 100%;
        overflow: auto;
        font-size: var(--small-text);
        background-color: var(--accent-color2);
        color: var(--background-color);
        position: absolute;
        width: 100%;
        bottom: 0;
        transform: translateY(100%);
        transition: .25s ease-out;
    }
    figure:not(.resizing):hover img + figcaption {
        transform: none;
        transition: .5s ease-out 1s;
    }
    video + figcaption {
        top: 0;
        bottom: auto;
        margin: 0;
        height: 23%;
        background-color: #000d;
        color: transparent;
        padding-top: .25rem;
        border-radius: 0;
        transform: none;
        clip-path: none;
        overflow: hidden;
    }
    figure:not(.resizing):hover video + figcaption {
        color: var(--background-color2);
        height: auto;
    }

</style>