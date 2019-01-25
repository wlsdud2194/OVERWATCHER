import React from 'react';
import {StyleSheet, View, Image, Text, StatusBar } from "react-native";
import {Container, Item, Icon, Form, Button} from "native-base";
import user from '../../imgs/system/user.png';

import {inject, observer} from 'mobx-react';

@inject('store')
@observer

export default class ProfileScreen extends React.Component {
    handleSignOut = () => {
        this.props.store.user.signedOn = false;
    }

    render() {
        const { handleSignOut } = this;
        const { account, phone, email, createdAt } = this.props.store.user.userInfo;

        return (
            <Container>
                <StatusBar hidden={true} /> 
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>프로필</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.containerUpper}>
                        <Image
                            source = {user}
                            style={styles.imageStyle}/>
                        <Text style={{fontSize: 20}}>{account}</Text>
                    </View>

                    <View style={styles.containerLower}>
                        <Form style={{marginLeft: 30, marginRight: 30}}>
                            <Item style={styles.menu}>
                                <Icon active name='phone' type='FontAwesome' style={styles.menuIcon}/>
                                <Text style={styles.menuFont}>{phone}</Text>
                            </Item>
                            <Item style={styles.menu}>
                                <Icon active name='transgender' type='FontAwesome' style={styles.menuIcon}/>
                                <Text style={styles.menuFont}>Human</Text>
                            </Item>
                            <Item style={styles.menu}>
                                <Icon active name='email' type='MaterialCommunityIcons' style={styles.menuIcon}/>
                                <Text style={styles.menuFont}>{email}</Text>
                            </Item>
                            <Item style={styles.menu}>
                                <Icon active name='sign-in' type='FontAwesome' style={styles.menuIcon}/>
                                <Text style={styles.menuFont}>{createdAt}</Text>
                            </Item>
                        </Form>
                    </View>

                    <View style={styles.containerBottom}>
                        <Button style={styles.signOutBtn} onPress={handleSignOut}>
                            <Icon active name='sign-in' type='FontAwesome' style={styles.signOutIcon}/>
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height:  "8%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1ab2ff"
    },
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
    container: {
        flex: 1,
    },
    containerUpper: {
        flex: 3,
        alignItems: 'center',
        marginTop: "10%",
        marginBottom: "12%",
    },
    imageStyle: {
        height: 150,
        width: 150,
    },

    containerLower: {
        flex: 4,
    },
    menu: {
        marginBottom : "7%",
    },
    menuIcon:{
        marginBottom : 15, 
        marginRight : 15
    },
    menuFont: {
        marginBottom: 15,
    },

    containerBottom: {
        flex: 2,
        marginRight: "5%",
        marginLeft: "auto",
    },
    signOutBtn: {
        paddingLeft: "2%",
        paddingRight: "5%"
    },
    signOutIcon: {
        marginTop: "auto",
        marginBottom: "auto",
    },
    signOutText: {
        color: "white"
    }
})