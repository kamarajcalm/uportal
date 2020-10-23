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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily= settings.fontFamily

const listofdetails=[{id:1,icon:require('../assets/marks.png'),name:'MARKS'},
                     {id:2,icon:require('../assets/Attendance.png'),name:'ATTENDANCE'},
                     {id:3,icon:require('../assets/statistics.png'),name:'STATICS'},
                     {id:4,icon:require('../assets/RANKS.png'),name:'RANKS'},
                     {id:5,icon:require('../assets/media.png'),name:'MEDIA'},
                     {id:6,icon:require('../assets/library.png'),name:'LIBRARY'},
                     {id:7,icon:require('../assets/syllabus.png'),name:'SYLLABUS & TIMETABLE'},
                     {id:8,icon:require('../assets/calendar.png'),name:'CALENDAR AND REMINDERS'},
                     {id:9,icon:require('../assets/facultydetails.png'),name:'FACULTY DETAILS'},
                     {id:10,icon:require('../assets/questionpaper.png'),name:'QUESTION PAPERS'},
                     {id:11,icon:require('../assets/forms.png'),name:'FORMS'},
                     {id:12,icon:require('../assets/feedback.png'),name:'FEEDBACK & REMARKS'},
                     {id:13,icon:require('../assets/settings.png'),name:'SETTINGS'},]

class CollegeAdProfile extends React.Component {

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
      listofdetails:listofdetails,
      college:false,
      school:false,
      }
  }

  profileHead=()=>{
    return(
      <View style={{justifyContent:'center',backgroundColor:'#292929'}}>

        <Text style={[styles.text,{color:'#fff',textAlign:'center',paddingVertical:10,
            fontSize:14,fontWeight:'700'}]}>K L N COLLEGE OF ENGINEERING</Text>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
                      paddingHorizontal:15,paddingVertical:10}}>
          <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.2,width:width*0.2,borderRadius:50}}/>
          <View>
            <Text style={[styles.text,{fontSize:12,color:'#fff',fontWeight:'700'}]}>Unique ID : AAA1111</Text>
            <Text style={[styles.text,{fontSize:12,color:'#fff',fontWeight:'700'}]}>Name : LINDO</Text>
            <Text style={[styles.text,{fontSize:12,color:'#fff',fontWeight:'700'}]}>Student ID : AAA00001</Text>
            <Text style={[styles.text,{fontSize:12,color:'#fff',fontWeight:'700'}]}>Class : III,V,VII</Text>
          </View>
          <View style={{height:width*0.18,borderWidth:0.5,borderColor:'#8c8c8c'}}></View>
          <View>
            <Text style={[styles.text,{fontSize:12,color:'#fff',fontWeight:'700'}]}>REQUIRE JOB</Text>
            <TouchableOpacity style={{borderRadius:7,backgroundColor:'#000',borderWidth:1,paddingVertical:6,marginTop:2}}>
              <Text style={[styles.text,{fontSize:14,color:'#fff',fontWeight:'700',textAlign:'center'}]}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  listOfDetails=()=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofdetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               onPress={()=>{this.onListTouch(item)}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={(item.icon)} style={{height:width*0.07,width:width*0.07,}}/>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
              </View>
              <FontAwesome name='angle-right' size={18} color='#fff'/>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  onListTouch=(item)=>{
    console.log(item,'item')
    if(item.name=='FORMS'){
      this.props.navigation.navigate('ProfileForms')
    }
    else if (item.name=='LIBRARY') {
      this.props.navigation.navigate('ProfileLibrary',{collegeAd:item})
    }
    else if(item.name=='FACULTY DETAILS'){
      this.props.navigation.navigate('ProfileFacultyDetails',{collegeAd:item})
    }
    else if(item.name=='FEEDBACK & REMARKS'){
      this.props.navigation.navigate('ProfileFeedback')
    }
    else if(item.name=='SETTINGS'){
      this.props.navigation.navigate('ProfileSetting',{collegeAd:item})
    }
    else if(item.name=='MARKS'){
      this.props.navigation.navigate('SchoolAdminMarks',{collegeAd:item})
    }
    else if(item.name=='SYLLABUS & TIMETABLE'){
      this.props.navigation.navigate('SchoolStafSyllabus')
    }
    else if(item.name=='MEDIA'){
      this.props.navigation.navigate('MediaDepart',{collegeAd:item})
    }
    else if(item.name=='QUESTION PAPERS'){
      this.props.navigation.navigate('ProfileQuestionPaper')
    }
    else if(item.name=='STATICS'){
      this.props.navigation.navigate('SchoolAdminStatics',{collegeAd:item})
    }
    else if(item.name=='ATTENDANCE'){
      this.props.navigation.navigate('SchoolAdminAttendance',{collegeAd:item})
    }
    else if (item.name=='CALENDAR AND REMINDERS') {
      this.props.navigation.navigate('ProfilCalendar',{collegeAdCal:item})
    }
    else if (item.name=='RANKS'){
      this.props.navigation.navigate('ProfileRank')
    }
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>

            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
              {this.profileHead()}
              <ScrollView>
                {this.listOfDetails()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CollegeAdProfile);
