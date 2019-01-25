import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, StatusBar } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import LoadingScreen from '../Loading';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react';

import star from "./pins/pin.png";

@inject('store')
@observer

class MapScreen extends Component {
  state = {
    isReady: false,
    isReady2: false,
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

  componentDidMount() {
    this._getMarkers();
  }

  changeMarkers = (marker) => {
    let latlng = {
        latitude: marker.lat,
        longitude: marker.lng
    };

    return latlng;
  }


  render() {
    const { zoomInMap, zoomOutMap, _getCurrentPosition, reloadMap } = this;
    const { isReady, region, latlng } = this.state;
    const { markers, placeMarkers } = this.props.store.map;

    console.log("마커스 : " + JSON.stringify(placeMarkers));

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
                onRegionChangeComplete ={(region) => _getCurrentPosition(region)}
            >
                {/* <MapView.Marker 
                    title = '현재 위치'
                    coordinate = {latlng}
                /> */}
                {
                    (this.state.isReady2 && placeMarkers !== null) && (
                    <MapView.Marker 
                        title={placeMarkers.name} 
                        image={require('./pins/pin.png')} 
                        coordinate = {this.changeMarkers(placeMarkers)}
                    />
                    )
                }
                
                {
                    markers.map((marker)=><MapView.Marker key = {marker.userId} title={marker.name} coordinate = {this.changeMarkers(marker)}/>)
                }
            </MapView>
        </View>

        {/* state Bar */}
        <View style={styles.noticeArea} elevation={5}>
            <Ionicons name="ios-people" size={25}/>
            <Text style={styles.noticeAreaText}>집합장소 : 대구시교육연구정보원</Text>
        </View>

        {/* Zoom btn */}
        <View style={styles.scopeArea} elevation={15} >
            <TouchableHighlight 
                onPress={ zoomInMap } 
                style={styles.scopeAreaEle1} 
                underlayColor="#e6e6e6"
            >
                <AntDesign style={styles.scopeAreaEleIcon} name="plus" size={24} color="gray" />
            </TouchableHighlight>

            <TouchableHighlight 
                onPress={ zoomOutMap } 
                style={styles.scopeAreaEle2} 
                underlayColor="#e6e6e6"
            >
                <AntDesign style={styles.scopeAreaEleIcon} name="minus" size={24} color="gray" />
            </TouchableHighlight>
        </View>

        {/* reload btn */}
        <View style={styles.reloadArea} elevation={5}>
            <TouchableHighlight 
                onPress={ reloadMap }
                style={styles.reloadAreaBtn} 
                underlayColor="#e6e6e6"
            >
                <Ionicons style={styles.reloadIcon} name="md-refresh" size={35} color="gray"/>
            </TouchableHighlight>
        </View>

      </Fragment>
    );
  }

  //function
  _getLocation = () => {
    const { region } = this.props.store.map;
    this.setState({
        isReady: true,
        region: {
            ...this.state.region,
            latitude: region.latitude,
            longitude: region.longitude,
        },
        latlng: {
            latitude : region.latitude,
            longitude : region.longitude,
        }
    });
  };

  _getMarkers = () => {
    console.log("마커를 가져오기 위해 요청을 시도 합니다");

    this.props.store.map.getMarkers();
    this.setState({
        isReady2: true
    })
  }

  _getCurrentPosition = (region) => {
    this.setState({
        region : {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
        }
    });
  };

  zoomInMap = () => {
    this.setState({
        region: {
            ...this.state.region,
            latitudeDelta: this.state.region.latitudeDelta * 0.8,
            longitudeDelta: this.state.region.longitudeDelta * 0.8,
        }
    });
  };
  zoomOutMap = () => {
    this.setState({
        region: {
            ...this.state.region,
            latitudeDelta: this.state.region.latitudeDelta * 1.25,
            longitudeDelta: this.state.region.longitudeDelta * 1.25,
        }
    });
  };

  reloadMap = () => {
    console.log("hello fucking Map");
  }
}
  

const styles = StyleSheet.create({
    containerMap: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex : 1,
    },
    noticeArea: {
        width: "85%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "4%",
        left: "8%",
        backgroundColor: "white",
        borderRadius: 10,
    },
    noticeAreaText: {
        padding: "5%",
    },
    scopeArea: {
        flexDirection: 'column',
        position: "absolute",
        bottom: '5%',
        right: "5%",
        backgroundColor: "white",
        borderRadius: 8,
    },
    scopeAreaEle1: {
        borderRadius: 8,
    },
    scopeAreaEle2: {
        borderTopWidth: 1,
        borderTopColor: "#b3b3b3",
        borderStyle: "solid",
        borderRadius: 8,
    },
    scopeAreaEleIcon: { 
        padding: "3%",
    },
    reloadArea: {
        width: "15%",
        height: "8%",
        position: "absolute",
        bottom: "5%",
        left: "4%",
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 8
    },
    reloadAreaBtn: {
        borderRadius: 8,
    },
    reloadIcon: {
        padding: "20%",
        paddingLeft: "27%",
        paddingRight: "27%",
    }
});

export default MapScreen;