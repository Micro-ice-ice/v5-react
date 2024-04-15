import { WebGLRenderer, Scene, Light, PerspectiveCamera } from 'three';
import * as THREE from 'three';
import { BoundingBoxHelper, TrackballControl, trackballControlFactory } from 'ami.js';

class Renderer3D {
    gl?: WebGLRenderer;

    camera?: PerspectiveCamera;

    controls?: TrackballControl;

    domElement?: HTMLDivElement;

    scene?: Scene;

    light?: Light;

    boxHelper?: BoundingBoxHelper;

    private _isInit: boolean = false;

    get isInit() {
        return this._isInit;
    }

    handleResize?: () => void;

    public init(domElement: HTMLDivElement, color: number, targetId: string) {
        const gl = new THREE.WebGLRenderer({
            antialias: true,
        });
        // gl.autoClear = false;
        // gl.localClippingEnabled = true;
        gl.setClearColor(color, 1);
        gl.domElement.id = targetId;
        domElement.appendChild(gl.domElement);

        //create camera
        const camera = new PerspectiveCamera(45, 1, 0.1, 10000);
        camera.position.x = 250;
        camera.position.y = 250;
        camera.position.z = 250;

        //create controls
        const AmiTrackballControl = trackballControlFactory(THREE);
        const controls = new AmiTrackballControl(camera, domElement);
        controls.rotateSpeed = 10.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        //create scene
        const scene = new THREE.Scene();

        // const clipScene = new THREE.Scene();

        const light = new THREE.DirectionalLight(0xffffff, 1);
        scene.add(light);

        this.domElement = domElement;
        this.gl = gl;
        this.controls = controls;
        this.camera = camera;
        this.scene = scene;
        this.light = light;

        this.handleResize = () => {
            const width = this.domElement!.clientWidth;
            const height = this.domElement!.clientHeight;
            this.gl!.setSize(width, height);

            this.camera!.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        this.handleResize();
        window.addEventListener('resize', this.handleResize, false);

        this._isInit = true;
    }
}

export default Renderer3D;
