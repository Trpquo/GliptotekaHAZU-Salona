<script>
    import { language } from '../utils/config'

    const setLanguage=lang=>()=>{ language.set(lang) }
</script>

<footer>
    <p>Footer</p>
    <p>
        <button on:click={ setLanguage("hr") } >HR</button>
        <button on:click={ setLanguage("en") } >EN</button>
    </p>
</footer>

<style>
    footer {
        grid-area: f;
        background-color: var(--accent-color2);
        padding: 0 var(--default-padding);
        color: var(--text-color-negative);
    }
</style>