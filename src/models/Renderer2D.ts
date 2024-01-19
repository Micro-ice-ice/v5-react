import * as AMI from 'ami.js';
import * as THREE from 'three';

export interface Renderer2D {
    gl?: THREE.WebGLRenderer;
    camera?: AMI.OrthographicCamera;
    controls?: AMI.TrackballOrthoControl;
    scene?: THREE.Scene;
    domElement?: HTMLDivElement;
}

export default Renderer2D;
