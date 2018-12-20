import * as React from 'react';
import ResizerContext from 'src/context/ResizerContext';

interface IState {
    theme: number
}
interface IProps {

}
export default class ThemeProvider extends React.Component<IProps, IState> {
    public state = {
        theme: 1
    };

    public changeTheme = () => {
        this.setState({
            theme: 1
        });
    }

    public render() {
        // aasdadsf
        return (
             <ResizerContext.Provider value={this.state.theme}>
                <div>
                     <button onClick={this.changeTheme}>Toggle Theme</button>
                                  </div>
             </ResizerContext.Provider>
        );
    }
}
