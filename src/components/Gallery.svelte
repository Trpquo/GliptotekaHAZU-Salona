<section class="gallery">
    <slot></slot>
</section>

<style>
    section {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(150px, 1fr));
        grid-auto-rows: 150px;
        grid-auto-flow: dense;
        align-content: start; 
        gap: var(--default-gap);
    }
</style>