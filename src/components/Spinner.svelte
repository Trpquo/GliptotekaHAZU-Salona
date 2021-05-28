<article>
    <div id="spinner"></div>
</article>

<style>
    article { 
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    #spinner {
        border: 5px solid var(--accent-color3);
        border-top: 5px solid var(--accent-color1);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
</style>