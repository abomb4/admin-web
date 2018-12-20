import * as React from 'react';
import { clearTimeout, setTimeout } from 'timers';

/**
 * 基于屏幕宽度的计算方法
 * 当宽度为1920时，认为字体倍率为1（16px为基准）
 */
export function getRelativeFontScale() {
    const html = document.querySelector('html');
    if (html) {
        const width = html.getBoundingClientRect().width;
        return width / 1920;
    } else {
        return 1;
    }
}

/**
 * 基于屏幕宽度的计算方法
 * 当宽度为1920时，认为字体大小为16px
 */
export function getRelativeFontSize() {
    return 16 * getRelativeFontScale();
}

export interface IFontSize {
    fontScale: number;
    fontSize: number;
}

// 节流执行器
const throttle = (fn: () => any, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (this: IResizer) {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

export interface IResizer {
    bindEvent: () => any;
    unbindEvent: () => any;
    resize: () => any;
    registerHandler: (fn: () => any) => void;
    getRelativeFontSize: () => number;
}

class ResizerImpl implements IResizer {

    public getRelativeFontSize: (() => number) = getRelativeFontSize;
    public resize: () => any;
    private delay: number;
    private resizeHandlers: Array<() => any> = [];

    constructor(delay: number) {
        this.setRem();
        this.delay = delay;
        // internalResize() 的函数
        this.resize = throttle(this.internalResize, this.delay);
    }

    // 绑定事件到window.resize
    public bindEvent = () => {
        this.setRem();
        window.addEventListener('resize', this.setRem);
    }

    public unbindEvent = () => {
        window.removeEventListener('resize', this.setRem);
    }

    public registerHandler = (handler: () => any) => {
        this.resizeHandlers.push(handler);
    }

    /**
     * 修改html标签的字体
     */
    private setRem = () => {
        document.getElementsByTagName('html')[0].style.fontSize = getRelativeFontSize() + 'px';
    }

    /**
     * 原始的重新计算宽度，遍历执行所有已经注册的函数，
     * 频繁调用会有性能问题，所有需要用resize方法
     */
    private internalResize = () => {
        this.setRem();
        for (const handler of this.resizeHandlers) {
            handler();
        }
    }
}

export interface IReiszerContext extends React.Context<IResizer> {
    getDefaultResizer: (() => IResizer);
}

export const createResizerContext: ((d: number) => IReiszerContext) = (delay: number) => {
    const resizer = new ResizerImpl(delay);
    return {
        ...React.createContext(resizer),
        getDefaultResizer: () => resizer
    }
};

export default React.createContext();
