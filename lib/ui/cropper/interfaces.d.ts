export interface ICropping {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
}
export interface ICropper {
    getCroppedCanvas(o?: any): any;
    getCanvasData(): any;
    getContainerData(): any;
    destroy(): any;
}
