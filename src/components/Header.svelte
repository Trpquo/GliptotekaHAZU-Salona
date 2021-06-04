<script>
    import Menu from './Menu.svelte'

    export let tabs
</script>
<header>
    <h1><a href="/">Salona</a></h1>
    <nav id="headerNav">
        <Menu { tabs } />
    </nav>
</header>
<style>
    header {
        height: var(--header-height);
        margin-top: calc( var(--default-gap) * -1 );
        padding: var(--default-padding);
        background-color: var(--background-color2);
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 9;
        display: flex;
    }
    h1 {
        margin: 0;
        font-size: 5em;
        line-height: calc( var(--header-height) / 2 );
    }
    h1 a {
        color: var(--text-color);
        transition: .25s;
    }
    h1 a:hover {
        filter: brightness(150%);
        text-decoration: none;
    }

    nav { 
        margin: 1.6rem 3rem 0;
    }
</style>