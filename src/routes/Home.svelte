<script>
    import Main from "../components/Main.svelte"
    import { filterContents } from '../utils/server'

    export let content, topic

    console.log( topic )

    let currentContent
	$: {
        if ( !topic || topic === "salonitanski-spomenici" ) { // zbarka nastala zbog premještanja poglavlja po sadržaju
            currentContent = content
        }
        else { 
            currentContent = filterContents( { ...content }, topic )
        }
	}

    const grid = Math.round( Math.random() ) ? 
            ` 
            "h h h h a a"
            "t t t t a a"
            "s s s s s s"
            `
            :
            ` 
            "h t t t t ."
            "s t t t t ."
            "a a a a a a"
            `
</script>

<Main content={ currentContent } { grid } />