import * as AMI from 'ami.js';
import * as THREE from 'three';

export interface Renderer2D {
    gl?: THREE.WebGLRenderer;
    camera?: AMI.OrthographicCamera;
    controls?: AMI.TrackballOrthoControl;
    scene?: THREE.Scene;
    domElement?: HTMLDivElement;
    stackHelper?: AMI.StackHelper;
    localizerHelper?: AMI.LocalizerHelper;
    localizerScene?: THREE.Scene;
    plane?: THREE.Plane;
}

export default Renderer2D;
