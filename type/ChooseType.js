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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily= settings.fontFamily

const listofdetails=[{id:1,icon:require('../assets/marks.png'),name:'MARKS'},
                     {id:2,icon:require('../assets/Attendance.png'),name:'ATTENDANCE'},
                     {id:3,icon:require('../assets/statistics.png'),name:'STATICS'},
                     {id:4,icon:require('../assets/statistics.png'),name:'RANKS'},
                     {id:4,icon:require('../assets/library.png'),name:'LIBRARY'},
                     {id:5,icon:require('../assets/syllabus.png'),name:'SYLLABUS & TIMETABLE'},
                     {id:6,icon:require('../assets/calendar.png'),name:'CALENDAR AND REMINDERS'},
                     {id:7,icon:require('../assets/facultydetails.png'),name:'FACULTY DETAILS'},
                     {id:8,icon:require('../assets/media.png'),name:'MEDIA'},
                     {id:9,icon:require('../assets/questionpaper.png'),name:'QUESTION PAPERS'},
                     {id:10,icon:require('../assets/forms.png'),name:'FORMS'},
                     {id:11,icon:require('../assets/feedback.png'),name:'FEEDBACK & REMARKS'},
                     {id:12,icon:require('../assets/settings.png'),name:'SETTINGS'},]

class ChooseType extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={

      college:false,
      school:false,
      }
    }

    componentDidMount(){

    }







  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>

          <TouchableOpacity style={{padding:20,backgroundColor:'#000',marginVertical:20}}
          onPress={()=>{this.props.navigation.navigate('Home',{college:true})}}>
          <Text style={[styles.text,{color:'#fff',fontSize:20,fontWeight:'700'}]}>College-Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:20,backgroundColor:'#000',marginVertical:20}}
          onPress={()=>{this.props.navigation.navigate('Home',{school:true})}}>
          <Text style={[styles.text,{color:'#fff',fontSize:20,fontWeight:'700'}]}>School-Student</Text>
          </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseType);
// <Headers navigation={this.props.navigation} name={'PageFirst'} screen={'PageFourth'}/>
