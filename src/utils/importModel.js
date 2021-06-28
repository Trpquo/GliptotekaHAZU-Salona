import sceneSetup from './scene/setup'
import getModel from './scene/model'

export default (url, component)=>{

    const { renderer, scene, camera, disco } = sceneSetup();

    (async () => {
        const model = await getModel( url )
        scene.add( model )
        console.log( scene.children )
    })()


    const discoLights = disco()

    const update =()=> {
        discoLights()    
    }
    const render =()=> {
        renderer.render( scene, camera )
    }
    const GameLoop =()=> {
        requestAnimationFrame( GameLoop )
        update()
        render()
    }
    GameLoop()
    
    window.addEventListener( 'resize', e=>{
        const width = component.clientWidth
        const height = component.clientWidth * 0.666
        renderer.setSize( width, height )
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    } )

   component.prepend( renderer.domElement )
}