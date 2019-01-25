import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Dimensions, Keyboard } from 'react-native';
import { Root, Header, Container, Content, Form, Item, Label, Input, Button, Toast,  } from 'native-base';
import { LinearGradient } from 'expo';
import Logo from '../imgs/logo/blue.png';

import {inject, observer} from 'mobx-react';

@inject('store')
@observer

class login extends Component {
  state = {
    account: "",
    password: ""
  }

  render() {
    const { handleidChange, handlepwChange, handleSignOn } = this;

    return (
        <Root>
            <Container>
                <LinearGradient
                    colors={['#ffffff', '#1a53ff']}
                    style={styles.container}
                >
                    <Content padder>
                        <View style={styles.containerUpper}>
                            <Image source={Logo} style={styles.logo} />
                        </View>

                        <View style={styles.containerLower}>
                            <Form style={styles.formArea}>
                                <Item floatingLabel>
                                    <Label>Username</Label>
                                    <Input style={styles.input} onChangeText={handleidChange} value={this.state.account} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>password</Label>
                                    <Input style={styles.input} onChangeText={handlepwChange} secureTextEntry={true} value={this.state.password} />
                                </Item>

                                 <Button block light style={styles.button} onPress={handleSignOn}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </Button>
                            </Form>

                        </View>
                        <Text style={styles.sign}>SIGN UP</Text>
                    </Content>
                </LinearGradient>
            </Container>
        </Root>
    )
  }


  handleidChange = (value) => {
    this.setState({
      account: value,
    });
  }
  handlepwChange = (value) => {
    this.setState({
      password: value,
    });
  }

  handleSignOn = async () => {
    try {
        console.log("hello");
        Keyboard.dismiss();

        let response = await fetch('http://118.219.10.109:8080/api/user/signon', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        });

        // console.log(response);

        let responseJson = await response.json();

        // console.log(JSON.stringify(responseJson));

        if (responseJson.code < 100) {
            console.log(responseJson.code);
            console.log("회원 정보 없음 다시 로그인 해주세요");

            Toast.show({
                text: responseJson.desc,
                buttonText: "확인",
                duration: 3000,
                type: 'warning'
            });

            this.setState({
                account: "",
                password: ""
            });
            return;
        }
        else {
            this.setState({
                account: "",
                password: ""
            });
            console.log(responseJson.data.account + "이 로그인 하셨습니다.");
        }
        
        this.props.store.user.userInfo = responseJson.data;

        this.props.handleLogin(responseJson);

        
    } 
    catch (error) {
        await Toast.show({
            text: JSON.stringify(error),
            buttonText: "확인",
            duration: 7000,
            type: 'danger'
        });
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerUpper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "25%",
    },
    logo: {
        width: Dimensions.get('window').width/3,
        resizeMode: 'contain'
    },
    containerLower: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formArea: {
        width: "100%",
        justifyContent: "center",
    },
    // input: {
    //     color: 'white',
    // },
    button: {
        width: "90%",
        marginTop: "15%",
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    buttonText:{
        marginBottom: "5%"
    },
    sign:{
        marginTop: "10%",
        textAlign: "center",
        color: '#660066',
    }
})

export default login;