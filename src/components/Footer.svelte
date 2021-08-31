<script>
    import { language } from '../utils/config'

    const setLanguage=lang=>()=>{ 
        language.set( lang ) 
        window.sessionStorage.setItem( 'lang', lang )
    }
</script>

<footer>
    <nav>
        <button on:click={ setLanguage("hr") } class:active={ $language !== 'en' } >HR</button>
        <button on:click={ setLanguage("en") } class:active={ $language === 'en' }>EN</button>
    </nav>
</footer>

<style>
    footer {
        height: var(--footer-height);
        background-color: var(--accent-color2);
        padding: 0 var(--default-padding);
        color: var(--text-color-negative);
        font-family: var(--main-smallcaps);
    }
    nav {
        padding: 1rem;
        text-align: right;
    }

    button {
        background-color: var(--accent-color2);
        color: var(--text-color-negative);
        margin-left: .5rem;
        transition: .5s;
    }
    button.active {
        border-color: var(--accent-color3)
    }
    button:hover:not( .active ) {
        background-color: var(--text-color-negative);
        color: var(--accent-color2);
        cursor: pointer;
    }
</style>