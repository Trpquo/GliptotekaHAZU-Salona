<article>
    <div id="spinner"></div>
</article>

<style>
    article { 
        position: fixed;
        inset: 0;
    }
    #spinner {
        position: absolute;
        inset: 0;
        width: 50px;
        height: 50px;
        margin: auto;
        padding: 0;
        border: 5px solid var(--accent-color3);
        border-top: 5px solid var(--accent-color1);
        border-radius: 50%;
        animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
</style>