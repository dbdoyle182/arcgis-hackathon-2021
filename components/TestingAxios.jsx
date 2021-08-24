import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { ApiKey } from '@esri/arcgis-rest-auth';
import { request } from "@esri/arcgis-rest-request";


const apiKey = "AAPK72922960a0054545b292efb01c4a9c1c3CX_R41U1R5WSMRueBchUerUZqx-OytSagE0NuPlHNzH0CoUvzCyfWkxqzsKBxRo";

const authentication = new ApiKey({
  key: apiKey
})


class TestingAxios extends Component {
  state = {
    fromFetch: '',
    loading: ''
  }
  goForAxios = () => {
    this.setState({
        fromFetch: false,
        loading: true,

    })
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            console.log('getting data from axios', response.data);
            setTimeout(() => {
                this.setState({
                    loading: false,
                    axiosData: response.data
                })
            }, 2000)
        })
        .catch(error => {
            console.log(error);
        });
  }

  arcGicLoader = () => {
    request("https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0", {
      authentication
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.arcGicLoader}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default TestingAxios;