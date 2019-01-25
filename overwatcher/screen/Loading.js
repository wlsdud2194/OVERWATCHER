import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = ({child}) => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{child}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Loading