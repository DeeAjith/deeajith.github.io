"use strict";
var renderer, renderer2, scene, scene2, controls, element, div, intersects, camera;
var myCanvas = document.querySelector("#myCanvas");

//inputModels
var frameinp, air_brakeinp, boltinp, brakerodinp, wheel_axleinp, oiltankinp, suspmaininp, bearbodinp, bearrollerinp, bearspringinp;

var SHADOW_MAP_WIDTH = 2048,
    SHADOW_MAP_HEIGHT = 2048;

//Initialize
init();

function init() {

    //RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true
    });
    renderer.info.reset();
    // renderer.setClearColor(0x4a4a4a);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; //Shadow
    renderer.shadowMapSoft = true; // Shadow
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 1;
    document.body.appendChild(renderer.domElement);

    //CSS3D Renderer
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);

    //CAMERA
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    controls = new THREE.OrbitControls(camera);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.RIGHT
    }
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.08;
    controls.maxPolarAngle = Math.PI / 2;
    camera.position.set(0, 3.5,0);

    var raycaster = new THREE.Raycaster(); // Needed for object intersection
    var mouse = new THREE.Vector2(); //Needed for mouse coordinates
    //SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5a5a5a);
    scene.fog = new THREE.Fog(0x4a5a5a, 1, 10);
    //Scene2
    scene2 = new THREE.Scene();
    //LIGHTS

    var skyColor = 0xB1E1FF; // light blue
    var groundColor = 0xB97A20; // brownish orange
    var intensity = 1;
    var light1 = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light1);
    var color = 0xFFFFFF;
    var intensity = 1;

    var light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(5, 10, 2);
    light2.shadow.mapSize.width = 2048; // default
    light2.shadow.mapSize.height = 2048; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500 // default
    light2.castShadow = true;
    light2.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000));
    light2.shadow.bias = -0.0001;
    light2.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    light2.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    scene.add(light2);
    // scene.add(light.target);

    var dom = new THREEx.DomEvents(camera, renderer.domElement);

    var mss = (window.innerWidth / window.innerHeight) * .5;
    // console.log(mss); //console check

    ///Initialize All models

    //Framemodel 
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/frame.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            frameinp = gltf.scene;

            frameinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(frameinp);
        });


    //wheel_axle model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/wheel_axel.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            wheel_axleinp = gltf.scene;

            wheel_axleinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(wheel_axleinp);
        });

    //OilTank
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/oil_tank.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            oiltankinp = gltf.scene;

            oiltankinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(oiltankinp);
        });
    //airbrake model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/abc.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            air_brakeinp = gltf.scene;

            air_brakeinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(air_brakeinp);
        });

    //susensionpmain model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/spm.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            suspmaininp = gltf.scene;

            suspmaininp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(suspmaininp);
        });


    //Brakerod model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/brod.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            brakerodinp = gltf.scene;

            brakerodinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(brakerodinp);
        });


    //bearingbody model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/beac.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            bearbodinp = gltf.scene;

            bearbodinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(bearbodinp);
        });


    //bea model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/supto.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            bearspringinp = gltf.scene;

            bearspringinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(bearspringinp);
        });


    //bolts model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/bol.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            boltinp = gltf.scene;

            boltinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(boltinp);
        });


    //rollers_bearing model
    var loader = new THREE.GLTFLoader();
    loader.load('/dis/bea.gltf',

        function frameIn(gltf) {
            // console.log(gltf);
            bearrollerinp = gltf.scene;

            bearrollerinp.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                }

            });
            scene.add(bearrollerinp);
        });




    var geom = new THREE.PlaneGeometry(2000, 2000, .01);
    var mat =
        new THREE.ShadowMaterial({
            // color: 0x4a4a4a,
            side: THREE.DoubleSide
        });
    var shadowPlane = new THREE.Mesh(geom, mat);
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    shadowPlane.rotateX(-Math.PI / 2);


    //lable display on object
    function adiv() {
        // console.log("clicked")

        element = document.createElement('div');
        element.setAttribute("src", "http://railmaniac.blogspot.com/2015/07/icf-detailed.html");
        element.innerHTML = 'Annotation of bogie in 3d floor.';
        element.className = 'three-div';

        //CSS Object
        div = new THREE.CSS3DObject(element);
        div.rotation.y = 45;
        div.position.y = bog.scale.y - .1;
        div.rotation.x = bog.position.z * 2;
        div.scale.x = bog.scale.x * .009;
        div.scale.y = bog.scale.y * .008;

        scene2.add(div);
    }

    //lable remove on object
    function rmdiv() {
        scene2.remove(div)
    }


    //RayCaster
    // Onclick on bogie to add label
    window.addEventListener('click', onClickadd, true);
    // Onclick on bogie again to remove label
    window.addEventListener('mouseup', onClickRmv, true);

    function onClickadd(event) {
        /*frameinp, air_brakeinp, boltinp, brakerodinp,
        wheel_axleinp, oiltankinp, suspmaininp, 
        bearbodinp, bearrollerinp, bearspringinp;*/

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(frame);
        console.log(frame);
        if (intersects.length > 0) {
            //here comes event
            adiv();
            console.log("Added Lable");
        }
    }


    function onClickRmv(event) {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObject(bog);

        //here comes event
        rmdiv();
        console.log("Removed Lable");

    }



    //resize window event
    window.addEventListener('resize', onWindowResize, false);
}

render();
animate();


function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    renderer2.render(scene2, camera);
}