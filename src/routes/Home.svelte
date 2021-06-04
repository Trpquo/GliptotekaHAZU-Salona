<script>
    import Main from "../components/Main.svelte"
    import { filterContents } from '../utils/server'
    import { potentialGrids } from '../utils/articleFormatter'

    export let content, topic

    let currentContent
	$: {
        // console.log( content )
        if ( !topic ) { 
            currentContent = content
        }
        else { 
            currentContent = filterContents( { ...content }, topic )
        }
        // console.log( currentContent )
	}

    const grid = potentialGrids.noMap[ Math.floor( Math.random() * potentialGrids.noMap.length ) ]
           
</script>

<Main content={ currentContent } { grid } />