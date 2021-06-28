import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial, AmbientLight, PointLight, DirectionalLight, Mesh } from 'three'
import { OrbitControls as Controls } from 'three/examples/jsm/controls/OrbitControls'

export default ()=>{

    const scaleFactor = 15
    const scene = new Scene()
    scene.background = null;
    const camera = new PerspectiveCamera( 75,  3 / 2, 0.1, 1000 )
    camera.position.z = 1 * scaleFactor
    camera.position.y = 1.5 * scaleFactor
    
    const ambientLight = new AmbientLight( 0xffffff, .4 )
    scene.add( ambientLight )
    const directionalLight = new DirectionalLight( 0xffffff, .4 )
    scene.add( directionalLight )
    const directionalBackLight = new DirectionalLight( 0xffffff, .2 )
    directionalBackLight.position.z = -10
    directionalBackLight.position.y = -10
    scene.add( directionalBackLight )
    
    
    const renderer = new WebGLRenderer( { alpha: true } );
    renderer.setSize( window.innerWidth, window.innerWidth * 0.666 )
    
    const controls = new Controls( camera, renderer.domElement )
    
    const disco =()=> {
        // const sphereGeom = new SphereGeometry( scaleFactor / 300, 10, 10 )
    
        // const sphereMaterial1 = new MeshBasicMaterial( { color: 0xaa3388 } )
        // const bulb1 = new Mesh( sphereGeom, sphereMaterial1 )
        // scene.add( bulb1 )
        const pointLight1 = new PointLight( 0xaa3388, .1, scaleFactor * 3.5 )
        scene.add( pointLight1 )
        
        // const sphereMaterial2 = new MeshBasicMaterial( { color: 0xffaa00 } )
        // const bulb2 = new Mesh( sphereGeom, sphereMaterial2 )
        // scene.add( bulb2 )
        const pointLight2 = new PointLight( 0xffaa00, .2, scaleFactor * 5 )
        scene.add( pointLight2 )
       
        // const sphereMaterial3 = new MeshBasicMaterial( { color: 0x00aaff } )
        // const bulb3 = new Mesh( sphereGeom, sphereMaterial3 )
        // scene.add( bulb3 )
        const pointLight3 = new PointLight( 0x00aaff, .2, scaleFactor * 4.25 )
        scene.add( pointLight3 )
    
        return ()=>{
            const time = Date.now() * 0.0003
            pointLight1.position.x = pointLight2.position.z = pointLight3.position.y = Math.sin( time*0.7 ) * scaleFactor * .5
            pointLight1.position.y = pointLight2.position.x = pointLight3.position.z = Math.cos( time*0.5 ) * scaleFactor * .6
            pointLight1.position.z = pointLight2.position.y = pointLight3.position.x = Math.cos( time*0.3 ) * scaleFactor * .7
    
            // bulb1.position = pointLight1.position
            // bulb2.position = pointLight2.position
            // bulb3.position = pointLight3.position
        }
    }
    return {
        renderer,
        scene,
        camera,
        disco
    }
}

