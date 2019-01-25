import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Permissions, Location } from 'expo';

import LoginScreen from './screen/login';
import LoadingScreen from './screen/Loading';
import AppRoot from "./screen/userScreen";

import { inject, observer } from 'mobx-react';

@inject('store')
@observer

export default class SubApp extends React.Component {
  state = {
    loadingEnd: false
  };

  componentWillMount(){
    this._getLocation();
    this._getNotice();
  }

  _getLocation = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted'){
        alert('위치 정보에 접근할 수 없습니다.');
    }

    let location =  await Location.getCurrentPositionAsync({});
    console.log("위치 불러오기 성공");
    
    this.props.store.map.getLocation(location);
    this.setState({
      loadingEnd: true
    });
  };

  _getNotice = () => {
    this.props.store.notice.getNotice();
    
    this.setState({
      loadingEnd: true
    });
  };

  handleLogin = (responseObject) => {
    if (responseObject.code > 100) {
      this.props.store.user.signedOn = true;
    }
  };

  render() {
    const { handleLogin } = this;
    const { signedOn } = this.props.store.user;
    const { region } = this.props.store.map;

    if(signedOn === true){
      return (
        <AppRoot />
      )
    }
    if(this.state.loadingEnd === false){
      return (
        <LoadingScreen />
      )
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
            <LoginScreen
              handleLogin={handleLogin}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});