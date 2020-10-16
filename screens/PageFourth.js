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
  ToastAndroid,RefreshControl,
  TouchableWithoutFeedback,
  TouchableNativeFeedback} from 'react-native';

import {Fontisto, FontAwesome,Entypo,
  SimpleLineIcons,MaterialCommunityIcons,Feather,
  Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';

import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import CollegeStudProfile from '../forthpage/CollegeStudProfile';
import CollegeStafProfile from '../forthpage/CollegeStafProfile';
import CollegeAdProfile from '../forthpage/CollegeAdProfile';
import SchoolStudProfile from '../forthpage/SchoolStudProfile';
import SchoolStafProfile from '../forthpage/SchoolStafProfile';
import SchoolAdProfile from '../forthpage/SchoolAdProfile';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily= settings.fontFamily

class PageFourth extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props){
    super(props);
    this.state={
      collegeStud:false,
      schoolStud:false,
      schoolAd:false,
      collegeAd:false,
      schoolStaf:false,
      collegeStaf:false,
      }
  }

  componentDidMount=async()=>{
    const collegeStud = await AsyncStorage.getItem('collegeStud');
    const schoolStud = await AsyncStorage.getItem('schoolStud');
    const schoolAd = await AsyncStorage.getItem('schoolAd');
    const collegeAd = await AsyncStorage.getItem('collegeAd');
    const schoolStaf = await AsyncStorage.getItem('schoolStaf');
    const collegeStaf = await AsyncStorage.getItem('collegeStaf');
    this.setState({collegeStud:collegeStud});
    this.setState({schoolStud:schoolStud});
    this.setState({schoolAd:schoolAd});
    this.setState({collegeAd:collegeAd});
    this.setState({schoolStaf:schoolStaf});
    this.setState({collegeStaf:collegeStaf});
    console.log(collegeStud,'collegeStud',this.state.collegeStud);
    console.log(schoolStud,'schoolStud',this.state.schoolStud);
    console.log(schoolAd,'schoolAd',this.state.schoolAd);
    console.log(collegeAd,'collegeAd',this.state.collegeAd);
    console.log(schoolStaf,'schoolStaf',this.state.schoolStaf);
    console.log(collegeStaf,'collegeStaf',this.state.collegeStaf);
  }


  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
          {this.state.collegeStud=='true'&&
          <CollegeStudProfile navigation={this.props.navigation}/>}
          {this.state.schoolStud =='true'&&
          <SchoolStudProfile navigation={this.props.navigation}/>}
          {this.state.schoolAd =='true'&&
          <SchoolAdProfile navigation={this.props.navigation}/>}
          {this.state.collegeAd =='true'&&
          <CollegeAdProfile navigation={this.props.navigation}/>}
          {this.state.schoolStaf =='true'&&
          <SchoolStafProfile navigation={this.props.navigation}/>}
          {this.state.collegeStaf =='true'&&
          <CollegeStafProfile navigation={this.props.navigation}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(PageFourth);
