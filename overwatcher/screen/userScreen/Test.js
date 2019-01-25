import React, { Component, Fragment } from 'react';
import { View, StyleSheet, StatusBar, Image, Text } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import LoadingScreen from '../Loading';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer

class Test extends Component {
  state = {
    isReady: false,
    region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.002,
    },
    latlng: {
      latitude: null,
      longitude: null,
    },
  }

  componentWillMount() {
    this._getLocation();
  };
  
  _getLocation = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted'){
        alert('위치 정보에 접근할 수 없습니다.');
    }

    let location = await Location.getCurrentPositionAsync({});
    
    this.setState({
        isReady: true,
        region: {
            ...this.state.region,
            latitude : location.coords.latitude,
            longitude : location.coords.longitude,
        },
        latlng: {
            latitude : location.coords.latitude,
            longitude : location.coords.longitude,
        },
    });
  };

  getCurrentPosition = (region) => {
    this.setState({
        region : {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
        },
    });
};    

    render() {
        const { getCurrentPosition } = this;
        const { isReady, latlng, region } = this.state;

    // Loading Page
    if(isReady===false){
        return(
            <LoadingScreen />
        )
    }

    // Map
    return (
        <Fragment>
            <StatusBar hidden={true} />
            <View style = { styles.containerMap }>
                <MapView
                    style={ styles.map }
                    region ={ region }
                    onRegionChangeComplete = {(region) => getCurrentPosition(region)}
                >
                    <MapView.Marker 
                        title = '현재 위치'
                        coordinate = {latlng}
                    />
                    {/* {
                        markers.map((mark)=>this.changeMarker(mark))
                    }  */}
                </MapView>
                <View style = {styles.imgArea}>
                        <Image style = {styles.img} source = {require('../../imgs/logo/blue.png')}/>
                </View>
            </View>
            <Text>{JSON.stringify(this.state.region)}</Text>
        </Fragment>
    );
  }
}
const styles = StyleSheet.create({
    imgArea : {
        justifyContent : "center",
        alignItems : "center",
        bottom : "54%",
    },
    img : {
        resizeMode : 'contain',
        width: "10%",
        position: "absolute",
        
    },
    containerMap: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex : 1,
    },
});

export default Test;