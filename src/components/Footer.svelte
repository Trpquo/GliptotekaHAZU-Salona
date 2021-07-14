<script>
    import { language } from '../utils/config'

    const setLanguage=lang=>()=>{ language.set( lang ) }
</script>

<footer>
    <nav>
        <button on:click={ setLanguage("hr") } >HR</button>
        <button on:click={ setLanguage("en") } >EN</button>
    </nav>
</footer>

<style>
    footer {
        height: var(--footer-height);
        background-color: var(--accent-color2);
        padding: 0 var(--default-padding);
        color: var(--text-color-negative);
    }
</style>