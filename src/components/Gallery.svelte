<section class="gallery">
    <slot></slot>
</section>

<style>
    section {
        display: grid;
        grid-template-columns: repeat( auto-fill, minmax(var(--figure-height), 1fr));
        grid-auto-rows: var(--figure-height);
        grid-auto-flow: dense;
        align-content: start; 
        gap: var(--default-gap);
        margin: 0;
    }
</style>