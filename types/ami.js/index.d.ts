/**
 * Декларация типов необходимых инструментов из библиотеки AMI v0.33.0
 * Типы могут быть определены не полностью
 */
declare module 'ami.js' {
    import type * as THREE from 'three';
    import {
        BufferGeometry,
        Camera,
        Matrix4,
        Mesh,
        Object3D,
        TypedArray,
        Vector3,
        Vector4,
    } from 'three';

    export class SeriesModel {
        constructor();

        /**
         * Validate a series.
         *
         * Requirements:
         *   - mergeSeries method
         *   - _seriesInstanceUID
         *   - _numberOfFrames
         *   - _numberOfChannels
         *   _ _stack
         *
         * @param {SeriesModel} model - Model to be validated as series.
         *
         * @return {boolean} True if series is valid. False if not.
         *
         * @override
         */
        validate(model: SeriesModel): boolean;

        /**
         * Merge current series with provided series.
         * 2 series can ONLY be merge if they have the same SeriesInstanceUID.
         *
         * Also merges the stacks inside a series.
         *
         * @param {SeriesModel} series - Series to be merged against current series.
         *
         * @return {boolean} True if series could be merge. False if not.
         *
         * @override
         */
        merge(series: SeriesModel): boolean;

        /**
         * Merge current series with provided array of series.
         * 2 series can ONLY be merge if they have the same SeriesInstanceUID.
         *
         * Also merges the stacks inside a series.
         *
         * @param {Array.<SeriesModel>} target - Series to be merged against current series.
         *
         * @return {Array.<SeriesModel>} Array of series properly merged.
         */
        mergeSeries(target: SeriesModel[]): SeriesModel[];

        get seriesInstanceUID(): any;
        set seriesInstanceUID(seriesInstanceUID: any): void;

        get transferSyntaxUID(): any;
        set transferSyntaxUID(transferSyntaxUID: any): void;

        get transferSyntaxUIDLabel(): string;

        get studyDate(): string;
        set studyDate(studyDate: string): void;

        get studyDescription(): string;
        set studyDescription(studyDescription: string): void;

        get seriesDate(): string;
        set seriesDate(seriesDate: string): void;

        get seriesDescription(): string;
        set seriesDescription(seriesDescription: string): void;

        get rawHeader(): any;
        set rawHeader(rawHeader: any): void;

        get patientID(): string;
        set patientID(patientID: string): void;

        get patientName(): string;
        set patientName(patientName: string): void;

        get patientAge(): string;
        set patientAge(patientAge: string): void;

        get patientBirthdate(): string;
        set patientBirthdate(patientBirthdate: string): void;

        get patientSex(): string;
        set patientSex(patientSex: string): void;

        get numberOfFrames(): number;
        set numberOfFrames(numberOfFrames: number): void;

        get numberOfChannels(): number;
        set numberOfChannels(numberOfChannels: number): void;

        get stack(): Stack[];
        set stack(stack: Stack[]);

        get modality(): string;
        set modality(modality: string): void;

        get segmentationType(): number;
        set segmentationType(segmentationType: number): void;

        get segmentationSegments(): any;
        set segmentationSegments(segmentationSegments: any): void;
    }

    export class BorderHelper extends Object3D {
        constructor(helperSlice: SliceHelper);

        get helpersSlice(): SliceHelper;
        set helpersSlice(helpersSlice: SliceHelper): void;

        get visible(): boolean;
        set visible(visible: boolean): void;

        get color(): number;
        set color(color: number): void;

        dispose();
    }

    export class StackHelper extends Object3D {
        constructor(stack: Stack);

        get stack(): Stack;
        set stack(stack: Stack): void;

        get bbox(): BoundingBoxHelper;
        get slice(): SliceHelper;
        get border(): BorderHelper;

        get index(): number;
        set index(index: number): void;

        get orientation(): number;
        set orientation(orientation: number): void;

        get outOfBounds(): boolean;
        set outOfBounds(outOfBounds: boolean): void;

        get orientationMaxIndex(): number;
        set orientationMaxIndex(orientationMaxIndex: number): void;

        get orientationSpacing(): number;
        set orientationMaxIndex(orientationSpacing: number): void;

        get canvasWidth(): number;
        set canvasWidth(canvasWidth): void;

        get canvasHeight(): number;
        set canvasHeight(canvasHeight): void;

        get borderColor(): number;
        set borderColor(borderColor: number): void;

        dispose(): void;
    }

    export class LocalizerHelper extends Object3D {
        constructor(stack: Stack, geometry: BufferGeometry, referencePlane: Vector4);

        get geometry(): Geometry;
        set geometry(geometry: Geometry): void;

        get referencePlane(): Vector4;
        set referencePlane(referencePlane: Vector4);

        get plane1(): Vector4;
        set plane1(plane1: Vector4);

        get color1(): number;
        set color1(color1: number): void;

        get plane2(): Vector4;
        set plane2(plane2: Vector4);

        get color2(): number;
        set color2(color2: number): void;

        get plane3(): Vector4;
        set plane3(plane2: Vector4);

        get color3(): number;
        set color3(color3: number): void;

        get canvasWidth(): number;
        set canvasWidth(canvasWidth): void;

        get canvasHeight(): number;
        set canvasHeight(canvasHeight): void;

        dispose(): void;
    }

    export class helpersMaterialMixin extends Object3D {}

    export class SliceHelper extends helpersMaterialMixin {
        constructor(
            stack: Stack,
            index = 0,
            position = new Vector3(0, 0, 0),
            direction = new Vector3(0, 0, 1),
            aabbSpace = 'IJK'
        );

        get stack(): Stack;
        set stack(stack: Stack): void;

        get spacing(): number;
        set spacing(spacing: number): void;

        get thickness(): number;
        set thickness(thickness: number): void;

        get thicknessMethod(): number;
        set thicknessMethod(thicknessMethod: number): void;

        get windowWidth(): number;
        set windowWidth(windowWidth: number): void;

        get windowCenter(): number;
        set windowCenter(windowCenter: number): void;

        get opacity(): number;
        set opacity(opacity: number): void;

        get upperThreshold(): number;
        set upperThreshold(upperThreshold: number): void;

        get lowerThreshold(): number;
        set lowerThreshold(lowerThreshold: number): void;

        get rescaleSlope(): number;
        set rescaleSlope(rescaleSlope: number): void;

        get rescaleIntercept(): number;
        set rescaleIntercept(rescaleIntercept: number): void;

        get invert(): boolean;
        set invert(invert: boolean): void;

        get lut(): string;
        set lut(lut: string): void;

        get lutTexture(): any;
        set lutTexture(lutTexture: any): void;

        get intensityAuto(): boolean;
        set intensityAuto(intensityAuto: boolean): void;

        get interpolation(): number;
        set interpolation(interpolation: number): void;

        get index(): number;
        set index(index: number): void;

        get planePosition(): Vector3;
        set planePosition(position: Vector3);

        get planeDirection(): Vector3;
        set planeDirection(planeDirection: Vector3): void;

        get halfDimensions(): any;
        set halfDimensions(halfDimensions: any): void;

        get center(): any;
        set center(center: any): void;

        get aabbSpace(): string;
        set aabbSpace(aabbSpace: string): void;

        get mesh(): Mesh;
        set mesh(mesh: Mesh): void;

        get geometry(): BufferGeometry;
        set geometry(geometry);

        get canvasWidth(): number;
        set canvasWidth(canvasWidth): void;

        get canvasHeight(): number;
        set canvasHeight(canvasHeight): void;

        get borderColor(): number;
        set borderColor(borderColor);

        updateIntensitySettings(): void;
        updateIntensitySettingsUniforms(): void;
        updateIntensitySetting(setting: any): void;
        dispose(): void;

        cartesianEquation(): Vector4;
    }

    export class BoundingBoxHelper extends Object3D {
        constructor(stack: Stack);

        get visible(): boolean;
        set visible(visible: boolean): void;

        get color(): number;
        set color(color: number): void;

        dispose(): void;
    }

    export class VolumeLoader {
        constructor(container = null, ProgressBar = HelpersProgressBar);

        //loader base methods

        free(): void;
        fetch(url: string, requests: Map<any, any>);
        parse(response: object): Promise;

        load(files: string[]): Promise;
        loadSequence(file: File, requests: Map<any, any>): Promise;
        loadSequenceGroup: (files: File[], requests: Map<any, any>) => Promise[];
        get data(): SeriesModel[];
        set data(data: SeriesModel[]): void;
    }

    class FrameModel {
        constructor();

        validate(model: any): boolean;
        merge(frame: FrameModel): boolean;

        /**
         * Generate X, y and Z cosines from image orientation
         * Returns default orientation if _imageOrientation was invalid.
         *
         * @returns {array} Array[3] containing cosines X, Y and Z.
         */
        cosines(): [Vector3, Vector3, Vector3];

        /**
         * Get x/y spacing of a frame.
         *
         * @return {*}
         */
        spacingXY(): [number, number];

        /**
         * Get data value
         *
         * @param {*} column
         * @param {*} row
         * @return {*}
         */
        getPixelData(column: number, row: number): number | null;

        /**
         * Set data value
         *
         * @param {*} column
         * @param {*} row
         * @param {*} value
         * @return {*}
         */
        setPixelDat(column: number, row: number, value: number): void;

        /**
         * Get frame preview as data:URL
         *
         * @return {string}
         */
        getImageDataUrl(): string;

        get frameTime(): any;
        set frameTime(frameTime: any): void;

        get ultrasoundRegions(): any;
        set ultrasoundRegions(ultrasoundRegions: any): void;

        get rows(): number;
        set rows(rows: number);

        get columns(): number;
        set columns(columns: number): void;

        get spacingBetweenSlices(): number;
        set spacingBetweenSlices(spacingBetweenSlices: number): void;

        get sliceThickness(): number;
        set sliceThickness(sliceThickness: number);

        get imagePosition(): [number, number, number];
        set imagePosition(imagePosition: [number, number, number]): void;

        get imageOrientation(): [number, number, number, number, number, number];
        set imageOrientation(
            imageOrientation: [number, number, number, number, number, number]
        ): void;

        get windowWidth(): number;
        set windowWidth(windowWidth: number): void;

        get windowCenter(): number;
        set windowCenter(windowCenter: number): void;

        get rescaleSlope(): number;
        set rescaleSlope(rescaleSlope: number): void;

        get rescaleIntercept(): number;
        set rescaleIntercept(rescaleIntercept: number): void;

        get bitsAllocated(): number;
        set bitsAllocated(bitsAllocated: number): void;

        get dist(): number;
        set dist(dist: number): void;

        get pixelSpacing(): [number, number];
        set pixelSpacing(pixelSpacing: [number, number]): void;

        get pixelAspectRatio(): [number, number];
        set pixelAspectRatio(pixelAspectRatio: [number, number]): void;

        get minMax(): [number, number];
        set minMax(minMax: [number, number]): void;

        get dimensionIndexValues(): number;
        set dimensionIndexValues(dimensionIndexValues: number): void;

        get instanceNumber(): number;
        set instanceNumber(instanceNumber: number): void;

        get pixelData(): TypedArray;
        set pixelData(pixelData: TypedArray): void;

        get sopInstanceUID(): string;
        set sopInstanceUID(sopInstanceUID: string): void;

        get pixelPaddingValue(): number;
        set pixelPaddingValue(pixelPaddingValue: number): void;

        get pixelRepresentation(): number;
        set pixelRepresentation(pixelRepresentation: number): void;

        get pixelType(): number;
        set pixelType(pixelType: number): void;

        get url(): File | string;
        set url(url: File): File | string;

        get referencedSegmentNumber(): number;
        set referencedSegmentNumber(referencedSegmentNumber: number): void;

        get rightHanded(): boolean;
        set rightHanded(rightHanded: boolean): void;

        get index(): number;
        set index(index: number): void;

        get invert(): boolean;
        set invert(invert: boolean): void;

        get numberOfChannels(): number;
        set numberOfChannels(numberOfChannels: number): void;
    }

    export class Stack {
        constructor();

        prepareSegmentation(): void;
        prepare(): void;
        packEchos(): void;
        computeNumberOfFrames(): boolean | undefined;
        computeCosines(): void;
        orderFrames(): void;
        computeSpacing(): void;
        zSpacing(): void;
        xySpacing(): void;
        computeMinMaxIntensities(): void;
        computeIJK2LPS(): void;
        computeLPS2AABB(): void;
        merge(stack: Stack);
        pack(): void;
        worldCenter(): Vector3;
        worldBoundingBox(): [number, number, number, number, number, number];
        AABBox(): Vector3;
        centerAABBox(): Vector3;

        static indexInDimensions(index: Vector3, dimensions: Vector3): boolean;

        get numberOfChannels(): number;
        set numberOfChannels(numberOfChannels);

        get frame(): FrameModel[];
        set frame(frame: FrameModel[]): void;

        get prepared(): boolean;
        set prepared(prepared: boolean): void;

        get packed(): boolean;
        set packed(packed: boolean): void;

        get packedPerPixel(): number;
        set packedPerPixel(packedPerPixel: number): void;

        get dimensionsIJK(): Vector3;
        set dimensionsIJK(dimensionsIJK: Vector3): void;

        get halfDimensionsIJK(): Vector3;
        set halfDimensionsIJK(halfDimensionsIJK: Vector3): void;

        get regMatrix(): Matrix4;
        set regMatrix(regMatrix: Matrix4): void;

        get ijk2LPS(): Matrix4;
        set ijk2LPS(ijk2LPS: Matrix4): void;

        get lps2IJK(): Matrix4;
        set lps2IJK(lps2IJK: Matrix4): void;

        get lps2AABB(): Matrix4;
        set lps2AABB(lps2AABB: Matrix4): void;

        get textureSize(): number;
        set textureSize(textureSize: number): void;

        get textureUnits(): number;
        set textureUnits(textureUnits: number): void;

        get textureType(): number;
        set textureType(textureType: number): void;

        get bitsAllocated(): number;
        set bitsAllocated(bitsAllocated: number): void;

        get rawData(): any;
        set rawData(rawData: any): void;

        get windowWidth(): number;
        set windowWidth(windowWidth: number): void;

        get windowCenter(): number;
        set windowCenter(windowCenter: number): void;

        get rescaleSlope(): number;
        set rescaleSlope(rescaleSlope: number): void;

        get rescaleIntercept(): number;
        set rescaleIntercept(rescaleIntercept: number): void;

        get xCosine(): Vector3;
        set xCosine(xCosine: Vector3): void;

        get yCosine(): Vector3;
        set yCosine(yCosine: Vector3): void;

        get zCosine(): Vector3;
        set zCosine(zCosine: Vector3): void;

        get minMax(): [number, number];
        set minMax(minMax: [number, number]): void;

        get stackID(): number;
        set stackID(stackID: number);

        get pixelType(): number;
        set pixelType(pixelType: number): void;

        get pixelRepresentation(): number;
        set pixelRepresentation(pixelRepresentation: number): void;

        get invert(): boolean;
        set invert(invert: boolean): void;

        get modality(): string;
        set modality(modality: string): void;

        get rightHanded(): boolean;
        set rightHanded(rightHanded: boolean): void;

        get spacingBetweenSlices(): number;
        set spacingBetweenSlices(spacingBetweenSlices: number): void;

        get segmentationSegments(): any;
        set segmentationSegments(segmentationSegments: any): void;

        get segmentationType(): number;
        set segmentationType(segmentationType: number): void;

        get segmentationLUT(): any;
        set segmentationLUT(segmentationLUT: any): void;

        get segmentationLUTO(): any;
        set segmentationLUTO(segmentationLUTO: any): void;

        static value(stack: Stack, coordinate: Vector3): any;
        static valueRescaleSlopeIntercept(value: any, slope: any, intercept: any): any;
        static worldToData(stack: Stack, worldCoordinates: Vector3): any;
    }

    export class OrthographicCamera extends THREE.OrthographicCamera {
        constructor(
            left: number,
            right: number,
            top: number,
            bottom: number,
            near: number,
            far: number
        );

        init(
            xCosine: Vector3,
            yCosine: Vector3,
            zCosine: Vector3,
            controls,
            box,
            canvas
        ): boolean | undefined;

        update(): void;

        leftDirection(): number;
        posteriorDirection(): number;
        superiorDirection(): number;

        invertRows(): void;
        invertColumns(): void;
        center();
        rotate(angle: number | null = null): void;
        fitBox(direction = 0, factor = 1.5): void;

        get controls(): THREE.EventDispatcher;
        set controls(controls: THREE.EventDispatcher): void;

        get box(): { center: THREE.Vector3; halfDimensions: THREE.Vector3 };
        set box(box: { center: THREE.Vector3; halfDimensions: THREE.Vector3 }): void;

        canvas: { width: number; height: number };
        orientation: string;
        stackOrientation: number;

        fitBox(a: number, b: number): void;
        directions: [Vector3, Vector3, Vector3];
    }

    export class TrackballControl extends THREE.EventDispatcher {
        constructor(camera: Camera, element: HTMLElement);

        //API
        enabled = true;

        screen = { left: 0, top: 0, width: 0, height: 0 };

        rotateSpeed: number;
        zoomSpeed: number;
        panSpeed: number;

        noRotate: boolean;
        noZoom: boolean;
        noPan: boolean;
        noCustom: boolean;

        forceState: number;

        staticMoving: boolean;
        dynamicDampingFactor: number;

        minDistance: number;
        maxDistance: number;

        keys: number[] | [number, number, number];

        target: Vector3;

        target0: Vector3;
        position0: Vector3;
        up0: Vector3;

        handleResize(): void;
        handleEvent(event: any): void;
        rotateCamera: () => void;
        zoomCamera(): void;
        panCamera: () => void;
        checkDistances(): void;
        update(): void;
        reset(): void;
        setState(targetState: number): void;
        custom(customStart: any, customEnd: any): void;

        keydown(event: any): void;
        keyup(event: any): void;
        mousedown(event: any): void;
        mousemove(event: any): void;
        mouseup(event: any): void;
        mousewheel(event: any): void;
        touchstart(event: any): void;
        touchmove(event): void;
        touchend(event): void;
        contextmenu(event): void;
        dispose(): void;
    }

    export class TrackballOrthoControl extends THREE.EventDispatcher {
        constructor(camera: Camera, element: HTMLElement);

        //API
        enabled = true;

        screen = { left: 0, top: 0, width: 0, height: 0 };

        radius: number;

        zoomSpeed: number;

        noZoom: boolean;
        noPan: boolean;

        staticMoving: boolean;
        dynamicDampingFactor: number;

        minDistance: number;
        maxDistance: number;

        keys: number[] | [number, number, number];

        target: Vector3;

        target0: Vector3;
        position0: Vector3;
        up0: Vector3;
        left0: number;
        right0: number;
        top0: number;
        bottom0: number;

        handleResize(): void;
        handleEvent(event: any): void;
        zoomCamera(): void;
        panCamera: () => void;
        update(): void;
        reset(): void;
        setState(targetState: number): void;
        custom(customStart: any, customEnd: any): void;

        keydown(event: any): void;
        keyup(event: any): void;
        mousedown(event: any): void;
        mousemove(event: any): void;
        mouseup(event: any): void;
        mousewheel(event: any): void;
        touchstart(event: any): void;
        touchmove(event): void;
        touchend(event): void;
        contextmenu(event): void;
        dispose(): void;
    }

    export class UtilsCore {
        static worldToData(lps2IJK: Matrix4, worldCoordinates: Vector3): Vector3;
    }

    /* Factory Section */
    function orthographicCameraFactory(three: THREE): OrthographicCamera.prototype;
    function stackHelperFactory(three: THREE): StackHelper.prototype;
    function trackballOrthoControlFactory(three: THREE): TrackballOrthoControl.prototype;
    function trackballControlFactory(three: THREE): TrackballControl.prototype;
}
