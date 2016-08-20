export declare function template(name: string): ClassDecorator;
export declare function getImageSize(image: any): Promise<{
    width: number;
    height: number;
}>;
export declare function getCropping(size: {
    width: number;
    height: number;
}, ratio: number): {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
};
