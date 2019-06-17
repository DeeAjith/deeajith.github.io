console.clear();
var renderer,
    scene, controls,element,
    pointLight, pointLight2, camera, cube, balls;
var myCanvas = document.getElementById('myCanvas');
var str_on = 'This is an example for information module';
init();
animate();

function init() {
    //RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true,
        
    });
    renderer.setClearColor(0x4a4a4a);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
        
    //CSS3D Renderer
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);
    //CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 1000);
    
   

    controls = new THREE.OrbitControls(camera);
    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(1.7, 1.2, 1.5);
    // controls.update();
    //SCENE
    scene = new THREE.Scene();
    //Scene2
    scene2 = new THREE.Scene();

    balls = innerWidth / innerHeight * .5;
    console.log(balls);
    var geometry = new THREE.SphereGeometry(balls, 64, 64);
    var material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        roughness: .2,
        metalness: 0
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    var domEvents = new THREEx.DomEvents(camera,renderer2.domElement)
    domEvents.addEventListener(cube, 'click', function (event) {
        console.log("clicked"),
        element = document.createElement('iframe');
    element.setAttribute("src", "/dis.html");
    // element.innerHTML = 'Annotation of bogie in 3d floor.';
    element.className = 'three-div';

    //CSS Object
    div = new THREE.CSS3DObject(element);
    // div.position.x = 0;
    // div.position.y = .5;
    // div.position.z = 0;
    // div.position.z= bog.size.z;
    div.rotation.y=45;
    div.position.y = bog.scale.y-.1;
    div.rotation.x = bog.position.z*2;
    div.scale.x = bog.scale.x*.009;
    div.scale.y = bog.scale.y*.008;
    
    scene2.add(div);
    }, false)
    /* For better use
        var domEvents = new THREEx.DomEvents(camera,renderer2.domElement)
    domEvents.addEventListener(cube, 'click', function (event) {
        console.log("clicked"),
        element = document.createElement('iframe');
    element.setAttribute("src", "/dis.html");
    // element.innerHTML = 'Annotation of bogie in 3d floor.';
    element.className = 'three-div';

    //CSS Object
    div = new THREE.CSS3DObject(element);

    div.position.y = 1;
    div.scale.x = .009;
    div.scale.y =.008;
    
    scene2.add(div);
    }, false)
    */

    // //label
    // var labDIV = document.createElement('div');
    // labDIV.className = 'label';
    // labDIV.textContent = str_on;
    // labDIV.style.marginTop = '-1em';
    // var earthLabel = new THREE.CSS2DObject(labDIV);
    // earthLabel.position.set(0, balls, -.2);
    // cube.add(earthLabel);


    // //light
    // var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    scene.add(new THREE.AmbientLight(0x111111));
    //light1
    pointLight = new THREE.PointLight(0xffffff, 2, 15);
    // pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
    scene.add(pointLight);
    pointLight.position.y = 5;
    pointLight.position.x = 1;
    pointLight.position.z = 1.5;
    //light2
    pointLight2 = new THREE.PointLight(0xffffff, 2, 15);
    // pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
    scene.add(pointLight2);
    pointLight3 = new THREE.PointLight(0x0ffffff, 2, 15);
    scene.add(pointLight3);
    pointLight3.position.z = 2;
    pointLight3.position.x = 3;

    camera.position.z = 6;
    camera.position.y = 1;
    camera.rotation.x = -.15;
    console.log(Math.random() * 0xffffff);
    // Onclick
    




    // //label renderer
    // labelRenderer = new THREE.CSS2DRenderer();
    // labelRenderer.setSize(window.innerWidth, window.innerHeight);
    // labelRenderer.domElement.style.position = 'absolute';
    // labelRenderer.domElement.style.top = 0;
    // document.body.appendChild(labelRenderer.domElement);

    //windows resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

}


//RENDER LOOP
function animate() {

    var time = Date.now() * 0.0005;
    requestAnimationFrame(animate);
    //light1 anim
    pointLight.position.x = Math.sin(time * 0.7) * .95;
    pointLight.position.y = Math.cos(time * 0.5) * 1.5;
    pointLight.position.z = Math.cos(time * 0.3) * 1;
    //light2 anim
    pointLight2.position.x = Math.sin(time * 0.45) * .95;
    pointLight2.position.y = Math.cos(time * .2) * 1.5;
    pointLight2.position.z = Math.cos(time * 0.7) * 1;
    //cube anim
    // cube.rotation.y-=.01;

    controls.update();
    renderer.render(scene, camera);
    renderer2.render(scene2,camera);
    // labelRenderer.render(scene, camera);
}