<section class="gallery">
    <slot></slot>
</section>

<style>
    section {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(150px, 1fr));
        gap: var(--default-gap);
    }
</style>