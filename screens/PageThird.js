import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,NativeModules,
  TouchableOpacity,View,Animated,
  Slider,ImageBackground,LayoutAnimation,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl,TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native';
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Feather,Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';

import SwitchSelector from "react-native-switch-selector";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor


class PageThird extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={

      }
    }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'Sports Wall'} screen={'PageThird'}/>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

            <Text style={{color:'#000',fontSize:18}}>Page Third</Text>
          </View>
          <TabComponent navigation={this.props.navigation}  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageThird);
// <SwitchSelector
//     initial={0}
//     onPress={value => this.setState({ gender: value })}
//     textColor={colors.purple} //'#7a44cf'
//     selectedColor={colors.white}
//     buttonColor={colors.purple}
//     borderColor={colors.purple}
//     hasPadding
//     options={[
//       { label: "Feminino", value: "f", imageIcon: images.feminino }, //images.feminino = require('./path_to/assets/img/feminino.png')
//       { label: "Masculino", value: "m", imageIcon: images.masculino } //images.masculino = require('./path_to/assets/img/masculino.png')
//     ]}
//   />
