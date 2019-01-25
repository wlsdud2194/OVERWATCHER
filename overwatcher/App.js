import React from 'react';
import SubApp from './SubApp'
import LoadingScreen from './screen/Loading';

import { Provider } from 'mobx-react';
import stores from './stores';

export default class App extends React.Component {
  state = {
    systemLoading : false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({
        systemLoading: true,
    });
  }

  render() {
    if(this.state.systemLoading === false){
      return (
        <LoadingScreen />
      )
    }

    return (
      <Provider store={stores}>
        <SubApp />
      </Provider>
    );
  }
}
