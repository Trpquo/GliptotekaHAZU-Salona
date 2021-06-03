<script>
    import { root } from '../utils/config'
    import { onMount } from 'svelte'

    export let exhibit, path
    
    
    let component

    onMount(()=>{
        if ( !!component ) {
            component.addEventListener('mousedown', e=> {
                if (e.target === component) {
                    component.style.zIndex = 999
                    component.classList.add("resizing")
                }
            })
            component.addEventListener('mouseup', e=> {
                if (e.target === component) {
                    component.style = ""
                    component.classList.remove("resizing")
                }
            })
        }
    })
</script>

<figure style={ Math.random() < .1 ? "grid-column: span 2; grid-row: span 2;" : "" } bind:this={ component }>
    {#if exhibit.type === "image"}
        <img src={ `${ root }/hr${ path }/images/thumbs/${ exhibit.file }` } alt={ exhibit.name } />
    {/if}
    {#if exhibit.type === "video"}
        <video controls alt={ exhibit.name }>
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
        align-items: flex-start;
        justify-content: center;
        cursor: help;
        background-color: var(--background-light);
        resize: both;
        transition: height .25s, width .25s;
    }
    img { 
        display: block;
        min-height: 100%;
    }
    video {
        width: 100%;
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
    figure:not(.resizing):hover figcaption {
        transform: none;
        transition: .5s ease-out 1s;
    }

</style>