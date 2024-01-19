import * as THREE from 'three';
import * as AMI from 'ami.js';

interface Renderer3D {
    gl?: THREE.WebGLRenderer;
    camera?: THREE.PerspectiveCamera;
    controls?: AMI.TrackballControl;
    scene?: THREE.Scene;
    light?: THREE.DirectionalLight;
}

export default Renderer3D;
