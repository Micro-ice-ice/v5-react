import { Camera, Color, Light, Scene, WebGLRenderer } from 'three';
import { TrackballControl } from 'ami.js';

interface Renderer3D {
    domId?: string;
    domElement?: HTMLElement;
    renderer?: WebGLRenderer;
    color?: Color;
    targetID?: string;
    camera?: Camera;
    controls?: TrackballControl; //need add types
    scene?: Scene;
    light?: Light;
}

export default Renderer3D;
