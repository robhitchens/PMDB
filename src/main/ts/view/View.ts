export default abstract class View{

    base: string = '<html></html>';

    render(): string{
        return this.base;
    };
}