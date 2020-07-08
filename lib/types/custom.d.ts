// 声明 所有 svg 文件，加一个默认导出
declare module '*.svg' {
    const content: any;
    export default content;
}
