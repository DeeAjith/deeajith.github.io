var renderer,
    scene,
    pointLight,pointLight2,camera,cube,balls,
    myCanvas = document.getElementById('myCanvas');
init();
animate();
function init(){
//SCENE
scene = new THREE.Scene();
balls = innerWidth/innerHeight * .5; 
console.log(balls);
var geometry = new THREE.SphereGeometry(balls,64,64);
var material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    roughness:.2,
    metalness:0
});
cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// //light
// var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
scene.add( new THREE.AmbientLight( 0x111111 ) );
//light1
pointLight = new THREE.PointLight( 0xffffff, 2,15 );
// pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
scene.add( pointLight );
pointLight.position.y=5;
pointLight.position.x=1;
pointLight.position.z=1.5;
//light2
pointLight2 = new THREE.PointLight( 0xffffff, 2,15 );
// pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
scene.add( pointLight2 );
pointLight3 = new THREE.PointLight( 0x0ffffff, 2,15 );
scene.add( pointLight3 );
pointLight3.position.z=2;
pointLight3.position.x=3;

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.z = 6;
camera.position.y = 1;
camera.rotation.x =-.15;
console.log(Math.random() * 0xffffff);



//RENDERER
renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//windows resize
window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect=(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
   
}

animate();
//RENDER LOOP
function animate() {

    var time = Date.now() * 0.0005;
    requestAnimationFrame(animate);
    //light1 anim
    pointLight.position.x = Math.sin( time * 0.7 ) * .95 ;
    pointLight.position.y = Math.cos( time * 0.5 ) * 1.5;
    pointLight.position.z = Math.cos( time * 0.3 ) * 1;
    //light2 anim
    pointLight2.position.x = Math.sin( time * 0.45 ) * .95 ;
    pointLight2.position.y = Math.cos( time * .2 ) * 1.5;
    pointLight2.position.z = Math.cos( time * 0.7 ) * 1;
    //cube anim
    // cube.rotation.y-=.01;
    
    
    renderer.render(scene, camera);
}