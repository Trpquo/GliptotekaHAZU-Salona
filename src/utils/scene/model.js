import { LoadingManager, TextureLoader } from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"



const manager = new LoadingManager();

manager.onProgress = function ( item, loaded, total ) {
    // console.log( item, loaded, total );
};


// texture

// const textureLoader = new TextureLoader( manager );
// const texture = textureLoader.load( './models/textures/seamless_marble.jpg' );

// model

const onProgress =xhr=> {
    
    if ( xhr.lengthComputable ) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
    }
    
}
const loader = new OBJLoader( manager );


export default url=>new Promise(( resolve, reject )=>{
    loader.load( url, function ( object ) {
        if ( !!object ) {
            // object.traverse( child=>{
            //     // console.log('put texture')
            //     if ( child.isMesh ) {
            //         child.material.map = texture;
            //     }
            // } );
            resolve(object);
        }
    }, onProgress, reject );
})