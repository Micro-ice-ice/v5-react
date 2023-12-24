import { Camera, Color, Light, Scene, WebGLRenderer } from 'three';
import * as AMI from 'ami.js';

interface Renderer2D {
    domId?: string;
    domElement?: HTMLElement;
    renderer?: WebGLRenderer;
    color?: Color;
    sliceOrientation: string;
    sliceColor: Color;
    targetID?: string;
    camera?: AMI.OrthographicCamera;
    controls?: AMI.TrackballControl;
    scene?: Scene;
    light?: Light;
    stackHelper?: AMI.StackHelper;
    localizerHelper?: any; //need add types
    localizerScene?: any; //need add types
}

export default Renderer2D;
