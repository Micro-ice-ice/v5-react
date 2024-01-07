import { Camera, Color, Light, Scene, WebGLRenderer } from 'three';
import { TrackballControl } from 'ami.js';

interface RendererObj3D {
    domId?: string;
    domElement?: HTMLElement;
    renderer?: WebGLRenderer;
    color?: Color | number;
    targetID?: string;
    camera?: Camera;
    controls?: TrackballControl;
    scene?: Scene;
    light?: Light;
}

export default RendererObj3D;
