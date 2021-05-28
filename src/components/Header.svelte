<script>
    // comps
</script>
<header>
    <h1>Salona</h1>
    <nav>
        <ul>
            <li><a href="/">O izložbi</a></li>
            <li><a href="/Gliptoteka">Gliptoteka</a></li>
            <li><a href="/Urbs">Grad Salona</a>
                <ul>
                    <li>
                        <a href="/Urbs/Vetus">Urbs Vetus</a>
                    </li>
                    <li>
                        <a href="/Urbs/Ocidentalis">Urbs Ocidentalis</a>
                    </li>
                    <li>
                        <a href="/Urbs/Orientalis">Urbs Orientalis</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</header>
<style>
    header {
        grid-area: h;
        background-color: beige;
        position: relative;
        z-index: 2;
    }
    h1 {
        margin: 0;
    }
    nav > ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        gap: 2rem;
    }
    li ul {
        display: none;
        padding-left: 1rem;
        list-style: none;
    }
    li:hover ul, li:active ul {
        display: block;
    }
</style>