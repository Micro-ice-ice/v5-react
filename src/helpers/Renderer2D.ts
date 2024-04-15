import { WebGLRenderer, Scene } from 'three';
import * as THREE from 'three';
import {
    LocalizerHelper,
    OrthographicCamera,
    orthographicCameraFactory,
    StackHelper,
    TrackballOrthoControl,
    trackballOrthoControlFactory,
} from 'ami.js';

class Renderer2D {
    gl?: WebGLRenderer;

    camera?: OrthographicCamera;

    controls?: TrackballOrthoControl;

    domElement?: HTMLDivElement;

    scene?: THREE.Scene;

    localizerHelper?: LocalizerHelper;

    stackHelper?: StackHelper;

    private _isInit: boolean = false;

    get isInit() {
        return this._isInit;
    }

    handleResize?: () => void;

    public init(domElement: HTMLDivElement, color: number, targetId: string) {
        const gl = new WebGLRenderer({
            antialias: true,
        });
        // gl.autoClear = false;
        // gl.localClippingEnabled = true;
        gl.setClearColor(color, 1);
        gl.domElement.id = targetId;
        domElement.appendChild(gl.domElement);

        const width = domElement.clientWidth;
        const height = domElement.clientHeight;

        //create camera
        const AmiOrthographicCamera = orthographicCameraFactory(THREE);
        const camera = new AmiOrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            1,
            1000
        );

        //create controls
        const AmiTrackballOrthoControl = trackballOrthoControlFactory(THREE);
        const controls = new AmiTrackballOrthoControl(camera, domElement);
        controls.staticMoving = true;
        camera.controls = controls;

        //create scene
        const scene = new Scene();

        //create clip plane
        // const plane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);

        this.domElement = domElement;
        this.gl = gl;
        this.controls = controls;
        this.camera = camera;
        this.scene = scene;

        this.handleResize = () => {
            const width = this.domElement!.clientWidth;
            const height = this.domElement!.clientHeight;
            this.gl!.setSize(width, height);
        };

        this.handleResize();
        window.addEventListener('resize', this.handleResize, false);

        this._isInit = true;
    }
}

export default Renderer2D;
