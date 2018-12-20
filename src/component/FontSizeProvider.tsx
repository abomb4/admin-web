import * as React from 'react';
import ResizerContext from 'src/context/ResizerContext';

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

interface IState {
    theme: number
}
interface IProps {

}
export default class FontSizeProvider extends React.Component<IProps, IState> {
    public state = {
        theme: 1
    };

    public changeTheme = () => {
        this.setState({
            theme: 1
        });
    }

    public render() {
        return (
            <ResizerContext.Provider value={this.state.theme}>
                <div>
                    <button onClick={this.changeTheme}>Toggle Theme</button>
                </div>
            </ResizerContext.Provider>
        );
    }
}
