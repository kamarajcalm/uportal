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
import {Fontisto,FontAwesome,Entypo,
  SimpleLineIcons,MaterialCommunityIcons,
  Feather,Octicons,MaterialIcons,
  FontAwesome5,AntDesign} from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import HttpsClient from '../helpers/HttpsClient';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily = settings.fontFamily

const warriorsmodallist=[{name:'Tom Banton'},{name:'Baristow (wk)'},{name:'Malan'},
                         {name:'Billings'},{name:'Moeen (c)'},{name:'J Denly'},
                         {name:'Chris jordan'},{name:'Tom curron'},{name:'Adil Rashid'},
                         {name:'Jofra Archer'},{name:'Mark Wood'},]





class Notes extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      like:0,
      timelinepost:'',

      comment:'',
      warriorsmodallist:warriorsmodallist,
      lionsmodallist:warriorsmodallist,
      lionsmodel:false,
      warriorsmodel:false
      }
    }


 componentDidMount(){

 }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'gray'}}>
            <Headers navigation={this.props.navigation} name={'NOTES'} screen={'Notes'}/>

            <View style={{flex:1,}}>
            <ScrollView>

            </ScrollView>
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
  text:{
    fontStyle:'normal',
    fontFamily:fontFamily,
    lineHeight:22
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text1: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
