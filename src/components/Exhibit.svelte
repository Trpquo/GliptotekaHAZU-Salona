<script>
    import { root } from '../utils/config'


    export let exhibit, path
</script>

<figure>
    {#if exhibit.type === "image"}
        <img src={ `${ root }/hr${ path }/images/thumbs/${ exhibit.file }` } alt={ exhibit.name } />
    {/if}
    {#if exhibit.type === "video"}
        <video controls alt={ exhibit.name }>
            <source src={ `${ root }/hr${ path }/images/${ exhibit.file }` } type="video/mp4" > 
        </video>

    {/if}
    <figcaption>
        {@html exhibit.description }
    </figcaption>
</figure>

<style>
    figure {
        margin-top: 0;
        height: 200px;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img { 
        display: block;
        margin-top: 100px;
        transform: translateY(-50%);
        min-width: 100%;
        min-height: 100%;
    }
    video {
        width: 100%;
    }
    figcaption {
        box-sizing: border-box;
        padding: .25rem .5rem;
        font-size: var(--small-text);
        background-color: var(--accent-color2);
        color: var(--background-color);
        position: absolute;
        width: 100%;
        bottom: 0;
    }
</style>