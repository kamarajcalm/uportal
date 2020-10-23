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
  TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native';
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
import Syllabus from '../screenComponents/Syllabus';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily

const month = ['January','February','March','April','May','Jun','July',
               'August','September','October','November','December']

class TimeTable extends React.Component{

  static navigationOptions=({navigation})=>{
    const {params={}}=navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      month:month,
      selectedDate:null
      }
    }

  componentDidMount(){
    this.setDate();
  }

  setDate=(newDate)=>{
    const date=newDate||new Date();
    this.setState({
      selectedDate:
        date.getDate()+" "+this.state.month[date.getMonth()]+" "+date.getFullYear()
    });
  };

  getPreviousDate=()=>{
    const {selectedDate}=this.state
    const currentDayInMilli=new Date(selectedDate).getTime()
    const oneDay=1000*60*60*24
    const previousDayInMilli=currentDayInMilli-oneDay
    const previousDate=new Date(previousDayInMilli)
    this.setDate(previousDate)
  }

  getNextDate=()=>{
    const {selectedDate}=this.state
    const currentDayInMilli=new Date(selectedDate).getTime()
    const oneDay=1000*60*60*24
    const nextDayInMilli=currentDayInMilli+oneDay
    const nextDate=new Date(nextDayInMilli)
    this.setDate(nextDate)
  }

  timeTable=()=>{
    return(
      <View style={{alignItems:'center',paddingVertical:20}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',
                    paddingHorizontal:10,paddingVertical:10,width:width*0.6,alignItems:'center'}}>
          <TouchableOpacity style={{padding:8}} onPress={()=>{this.getPreviousDate()}}>
            <FontAwesome name='angle-left' size={20} color='#fff'/>
          </TouchableOpacity>
          <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>{this.state.selectedDate}</Text>
          <TouchableOpacity style={{padding:8}} onPress={()=>{this.getNextDate()}}>
            <FontAwesome name='angle-right' size={20} color='#fff'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#000'}}>
      {this.timeTable()}
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
