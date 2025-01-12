import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {Pane} from 'tweakpane';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const PARAMS = {
    visible: false,
    checkVisible: () => {
        if (PARAMS.visible){
            hemisphereLightHelper.visible = true == hemisphereLight.visible 
            directionalLightHelper.visible = true  == directionalLight.visible
            pointLightHelper.visible = true == pointLight.visible
            // spotLightHelper.visible = true == spotLight.visible
            // rectAreaLightHelper.visible = true == rectAreaLight.visible
        }
    },
    visibleLightHelper: () => {
        if (PARAMS.visible){
            hemisphereLightHelper.visible = true == hemisphereLight.visible 
            directionalLightHelper.visible = true  == directionalLight.visible
            pointLightHelper.visible = true == pointLight.visible
            // spotLightHelper.visible = true == spotLight.visible
            // rectAreaLightHelper.visible = true == rectAreaLight.visible
        }else{
            hemisphereLightHelper.visible = false    
            directionalLightHelper.visible = false  
            pointLightHelper.visible = false
            // spotLightHelper.visible = false
            // rectAreaLightHelper.visible = false
        }
        
    },
    download: () => {
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = document.getElementById("myCanvas").toDataURL('image/png');
        link.click()  
    }
};

const pane = new Pane();

pane.addButton({
    title: 'download'
}).on("click",PARAMS.download)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
pane.addInput(ambientLight, "intensity", {
    label: "amb. level",
    min: 0,
    max: 1,
    step: 0.001
})

pane.addInput(PARAMS, "visible",{
    label: "show helpers"
}).on("change",(ev)=>{
    PARAMS.visibleLightHelper()
})

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(5, 2.5, 0.5)
scene.add(directionalLight)
directionalLight.visible = true
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 3
directionalLight.shadow.camera.far = 11
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false

pane.addInput(directionalLight,"visible",{
    "label": "luz direcional",
}).on("change",(ev)=>{
    PARAMS.checkVisible()
})

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
hemisphereLight.visible = true
pane.addInput(hemisphereLight,"visible",{
    "label": "luz hemisphere",
}).on("change",(ev)=>{
    PARAMS.checkVisible()
})

const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(1, 1, 1)
scene.add(pointLight)
pointLight.visible = true
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 8

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLightCameraHelper.visible = false

pane.addInput(pointLight,"visible",{
    "label": "luz pontual",
}).on("change",(ev)=>{
    PARAMS.checkVisible()
})

// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
// rectAreaLight.position.set(-1.5, 0, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

// rectAreaLight.visible = false
// pane.addInput(rectAreaLight,"visible",{
//     "label": "luz area",
// }).on("change",(ev)=>{
//     PARAMS.checkVisible()
// })

// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 2, 3)
// spotLight.target.position.x = -0.75
// scene.add(spotLight.target)
// scene.add(spotLight)

// spotLight.visible = false
// spotLight.castShadow = true
// spotLight.shadow.mapSize.width = 1024
// spotLight.shadow.mapSize.height = 1024
// spotLight.shadow.camera.fov = 35
// spotLight.shadow.camera.near = 2
// spotLight.shadow.camera.far = 7


// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// scene.add(spotLightCameraHelper)
// spotLightCameraHelper.visible = false



// pane.addInput(spotLight,"visible",{
//     "label": "luz spot",
// }).on("change",(ev)=>{
//     PARAMS.checkVisible()
// })
/** 
 * Helpers
 */

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)
hemisphereLightHelper.visible = false

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false


const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)
pointLightHelper.visible = false


// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)
// spotLightHelper.visible = false

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
// scene.add(rectAreaLightHelper)
// rectAreaLightHelper.visible = false

/**
 * Models
 */

const gltfLoader = new GLTFLoader();
const gltfLoaderThunder = new GLTFLoader();

// gltfLoader.load('/static/models/Duck/glTF/Duck.gltf', (gltf) => {
//     scene.add(gltf.scene)
//     console.log(gltf)

// })

//Machado
gltfLoader.load(
    '/models/GOW-leviathan-axe/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].position.set(3,0.8,2),
    gltf.scene.children[0].rotation.set(-1.5,-2,0),
    scene.add(gltf.scene.children[0])

})

//Cabana
gltfLoader.load(
    '/models/forest_hut/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].position.set(0,1,0),
    gltf.scene.children[0].rotation.set(29.90,0,0),
    scene.add(gltf.scene.children[0])

})

//Rocha com neve
gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2,0,0),

    scene.add(gltf.scene.children[0])

})

gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2.2,0,0.5),

    scene.add(gltf.scene.children[0])

})

gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2.2,0,1),

    scene.add(gltf.scene.children[0])

})

gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2,0,1.7),

    scene.add(gltf.scene.children[0])

})

gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2,0,-2),

    scene.add(gltf.scene.children[0])

})

gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2,0,-1.5),

    scene.add(gltf.scene.children[0])

})

gltfLoader.load(
    '/models/snowy-rock/scene.gltf',
    (gltf) => {

    gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(2,0,-1),

    scene.add(gltf.scene.children[0])

})

//Arvore
gltfLoader.load(
    '/models/snow_covered_deadwood/scene.gltf',
    (gltf) => {

    // gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(3,-0.8,-3),

    scene.add(gltf.scene.children[0])

})

//Tronco
gltfLoader.load(
    '/models/snow_covered_logs/scene.gltf',
    (gltf) => {

    // gltf.scene.children[0].scale.set(0.001,0.0010,0.001),
    gltf.scene.children[0].position.set(3,1.5,3),

    scene.add(gltf.scene.children[0])

})

/**
 * Objects
 */

// Material
const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('/textures/Snow-Texture/Snow_001_COLOR.jpg');
const disp = textureLoader.load('/textures/Snow-Texture/Snow_001_DISP.png');
const normal = textureLoader.load('/textures/Snow-Texture/Snow_001_NORM.jpg');
const occ = textureLoader.load('/textures/Snow-Texture/Snow_001_OCC.jpg');
const rough = textureLoader.load('/textures/Snow-Texture/Snow_001_ROUGH.jpg');


const geometry = new THREE.BoxGeometry( 10, 2, 10 ); 
const material = new THREE.MeshStandardMaterial(
    { 
        map: color,
        normalMap: normal,
        displacementMap: disp,
        displacementScale: 0,
        roughnessMap: rough,
        roughness: 0.3,
        aoMap: occ,

    });
    
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

cube.position.y = -0.8;

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 4
camera.position.z = 9
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    preserveDrawingBuffer: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()