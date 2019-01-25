import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Keyboard, Image } from 'react-native';
import { 
    Title, Header, Container, Content, List, ListItem,
    Left, Body, Right,Icon, Button, Text, Item, Label, Input, Textarea, Toast
} from 'native-base';
import markerImg from '../../imgs/logo/blue.png';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { MapView } from 'expo';

import { inject, observer } from 'mobx-react';
import LoadingScreen from '../Loading';

@inject("store")
@observer

class NoticeScreen extends Component {
    state = {
        pickerActivation: false,
        mapActivation: false,
        
        region: {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.01,
            longitudeDelta: 0.002,
        }
    };

    componentWillMount(){
        const { region } = this.props.store.map;
        
        this.setState({
            region: {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }
        });
    }

    // time Picker state
    _showPicker = () => {
        this.setState({
            pickerActivation: true
        });
    };
    _hidePicker = () => {
        this.setState({
            pickerActivation: false
        });
    };
    _handlePicked = (date) => {
        this.props.store.notice.handlePicked(date);
        this._hidePicker();
    };

    _ToggleMap = () => {
        const { region, mapActivation } = this.state;

        if(mapActivation === true) {
            this.props.store.notice.getSetLocation(region);
        }

        this.setState({
            mapActivation: !(this.state.mapActivation)
        });

    }

    _getSetLocation = (region) => {
        this.props.store.notice.getSetLocation(region);

        this.setState({
            region: {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }
        });
    }     

    render() {
        const { _showPicker, _hidePicker, _handlePicked, _getSetLocation, _ToggleMap } = this;
        const { region, latlng, mapActivation } = this.state;
        const { 
            nextPage, 
            notice, 
            responseNotice,
            handleToggle, 
            handleSubjectChange, 
            handleContentChange,
            handleSubmit
        } = this.props.store.notice;

        if(nextPage === true) {
            
            //공지 알림
            return(
                <View style={styles.submitPage}>
                    <StatusBar hidden={true}/>

                {/* header */}
                <Header style={styles.submitHeader}>
                    <Left>
                        <Button transparent onPress={handleToggle}>
                            <Icon name='arrow-back' />
                            <Text>Back</Text>
                        </Button>
                    </Left>

                    <Body>
                        <Title>공지 등록</Title>
                    </Body>
                    <Right/>
                </Header>

                {/* body */}
                <View style={styles.submitBodyWrap}> 
                    <View style={styles.submitBody}>
                        {/* title */}
                        <View style={styles.titleArea}>
                            <Item floatingLabel last>
                                <Label>제목</Label>
                                <Input onChangeText={(value)=>handleSubjectChange(value)} value={notice.title}/>
                            </Item>
                        </View>
                        
                        {/* time */}
                        <View style={styles.timeSetArea}>
                            <Item style={styles.timeSetInput} floatingLabel last>
                                <Label>집합시간</Label>
                                <Input value={notice.time} editable = {false}/>
                            </Item>

                            <Button style={styles.timeSetBtn} onPress={_showPicker}>
                                <Text>Time Set</Text>
                            </Button>    
                        </View>

                        {/* map */}
                        <View style={styles.mapBtnArea}>
                            <Button style={styles.mapBtn} onPress={_ToggleMap}>
                                <Text style={{fontSize: 15}}>
                                    { (mapActivation)? "집합 장소 설정 완료" :"집합 장소 설정" }
                                </Text>
                            </Button>
                        </View>

                        {/* content */}
                        {
                            (mapActivation) ? (
                                <View style={styles.descArea}>
                                    <MapView
                                        region={region}
                                        onRegionChangeComplete = {(region)=>_getSetLocation(region)}
                                        style={styles.map}
                                    >

                                    </MapView>
                                    <View style = {styles.markerArea}>
                                        <Image source={markerImg} style = {styles.marker}/>
                                    </View>    
                                    <Button bordered style={styles.button} onPress={handleSubmit}>
                                        <Text style={styles.SubmitBut} >등록</Text>
                                    </Button>
                                </View>
                            ) : (
                                <View style={styles.descArea}>
                                    <Textarea
                                        onChangeText = { (value) => handleContentChange(value) }
                                        value={notice.content}
                                        rowSpan={10}
                                        bordered placeholder="공지 내용"
                                        style={styles.textCon}
                                    />
                                            
                                    <Button bordered style={styles.button} onPress={handleSubmit}>
                                        <Text style={styles.SubmitBut} >등록</Text>
                                    </Button>
                                </View>
                            )
                        }
                       
                    </View>

                </View>

                <DateTimePicker
                    isVisible={this.state.pickerActivation}
                    onConfirm={ _handlePicked }
                    onCancel={ _hidePicker }
                    mode="time"
                />

            </View>
        );
    }

    // 공지 알림
    return (
        <Container>
            <StatusBar hidden={true} />
            <View style={styles.tit}>
                <Text style={styles.not}>NOTICE</Text>
                <Button style={styles.button} onPress={handleToggle}>
                    <Text style={styles.buttonText} >공지 추가 +</Text>
                </Button>
            </View>

            <Content>

                {
                    responseNotice.map((notice)=>(
                        <List style={{paddingTop: "5%"}} key={notice.noticeId}>
                            <ListItem avatar>
                                <Body>
                                    <Text>{notice.subject}</Text>
                                    <Text note>{notice.content}</Text>
                                </Body>
                                <Right>
                                    <Text note style={styles.time}>집합시간: {notice.time.slice(11)}</Text>
                                </Right>
                            </ListItem>
                        </List>
                    ))
                }

            </Content>
        </Container>
    );
  }

}


const styles = StyleSheet.create({
    //헤더
    submitHeader: {
        backgroundColor: "#4dc3ff",//
        padding: "auto"
    },
    submitBodyWrap: {
        flex: 1,
        marginLeft: "4%",
        marginRight: "4%",
    },
    submitBody: {
        flex: 1,
        paddingLeft: "3%",
        paddingRight: "3%",
    },

    //바디
    submitBody: {
        position: "relative",
    },

    //제목
    titleArea: {
        flex: 1,
        marginTop: "5%",
        marginBottom: "10%",
    },

    //집합시간
    timeSetArea:{
        flex: 1,
        flexDirection: "row",
        marginTop: "15%",
        marginBottom: "10%",
        alignItems: "baseline"
    },

    timeSetInput: {
        flex: 2,
    },
    timeSetBtn: {
        flex: 1,
        marginTop: "auto",
        justifyContent: "center",
    },

    //지도 버튼 영역
    mapBtnArea: {
        marginTop: "15%",
    },
    mapBtn: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    map:{
        width: "100%",
        height: "300%"
    },
    markerArea : {
        alignItems: 'center',
        justifyContent: 'center',
        bottom : '158%',
    },
    marker : {
        resizeMode : 'contain',
        width: "10%",
        position : 'absolute'
    },

    //공지사항 입력란
    descArea: {
        flex: 2,
        marginTop: "20%"
    },
    textCon:{
        padding: "4%",
    },

    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    SubmitBut:{
        marginBottom:"2%",
        color:"#0033cc",//
    },


    /////////////////////////////////////

    //공지 사항 스타일
    tit:{
        backgroundColor: "#4dc3ff",//
        height:'30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    not:{
        fontSize: 40,
        // fontFamily:'GodoB',
        color:'#ffffff',
        marginTop: "15%",
    },
    button:{
        width:'80%',
        paddingTop: "auto",
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
        backgroundColor:"#ffffff",
    },
    buttonText:{
        // fontFamily:'GodoM',
        color:"#000000",
    },
    time:{
        color: '#858585',
    },
})

export default NoticeScreen;