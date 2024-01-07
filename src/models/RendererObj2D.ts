import { Camera, Color, Light, Scene, WebGLRenderer } from 'three';
import * as AMI from 'ami.js';

interface RendererObj2D {
    domId?: string;
    domElement?: HTMLElement;
    renderer?: WebGLRenderer;
    color?: Color | number;
    sliceOrientation?: string;
    sliceColor?: number;
    targetID?: string | number;
    camera?: AMI.OrthographicCamera;
    controls?: AMI.TrackballControl;
    scene?: Scene;
    light?: Light;
    stackHelper?: AMI.StackHelper;
    localizerHelper?: AMI.LocalizerHelper;
    localizerScene?: any; //need add types
}

export default RendererObj2D;
