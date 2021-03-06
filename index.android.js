/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 var MOCKED_MOVIES_DATA = [
   {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
 ];

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';


var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var API_URL = 'http://10.0.2.2:3000/tvshows';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      APISource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      APIloaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchAPI();
  }

  fetchAPI(){
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          APISource: this.state.APISource.cloneWithRows(responseData),
          APIloaded: true,
        });
      })
      .done();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.APISource}
        renderRow={this.renderPaco}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  renderPaco(shows) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: shows.poster}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{shows.title}</Text>
          <Text style={styles.year}>{shows.year}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
  thumbnail: {
   width: 53,
   height: 81,
 },
 rightContainer: {
   flex: 1,
 },
 title: {
  fontSize: 20,
  marginBottom: 8,
  textAlign: 'center',
},
year: {
  textAlign: 'center',
},
listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
