import * as React from 'react';
import {Animated, StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,TouchableHighlight,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage , TextInput, ScrollView ,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Alert,ActivityIndicator, ToastAndroid , WebView,Easing} from 'react-native';
import  Constants  from 'expo-constants';
import {AntDesign, FontAwesome ,MaterialCommunityIcons,MaterialIcons,
  SimpleLineIcons,Entypo,Fontisto,Feather,FontAwesome5,Ionicons} from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily = settings.fontFamily
export default class Headers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeColor:themeColor,
      inactiveColor:'#000',
      scale: new Animated.Value(0),
      color:'#f2f2f2',
      size:20,
    };
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

  render(){

      var notify = [ 'Home' , 'PageFirst',]

      var notifychat = [ 'PageSecond',]

      var notifysport = ['PageThird']

      var comp = ['ProfileForms','ProfileFillForm','ProfileLibrary','ProfileFacultyDetails',
                  'PFacultyDetailsCarousel','ProfileFeedback','ProfileSetting','LinkEmail',
                  'Language','ChangePassword','ProfileMarks','ProfileMedia',
                  'ProfileMediaChoose','MediaNotesVideo','NotesVideosData','MediaUniversity',
                  'MediaDepart','ProfileQuestionPaper','QuestionPaper','ProfileRank',
                  'ProfileStatistics','ProfileAttendance','ProfilCalendar','MyWallScreen',
                  'TeachersWall','InfoScreen','FacStuDetails','ProfileSchoolMarks',
                  'SchoolAdminMarks','SchoolAdminAttendance','ChooseSec','StudentAttendance',
                  'SchoolStafMarks','ChooseSubject','SchoolStafAttendance','ChoosePeriod',
                  'TakeAttendace','OtherAttendance','StafChooseSec','StafChooseSubject',
                  'SchoolStafStatistics','SchoolStafRank','SchoolStafMedia',
                  'SchoolStafMediaChoose','MediaChooseSubject','SchoolStafRemark',
                  'SchoolAdminStatics','Semester','ClassWall','GiveAccessScreen','GiveAccessDetails','SchoolStafSyllabus']

      var feed = ['MyWallScreen']

      var notes = ['Notes','Chat']

      var teach = ['TeachersWall','ClassWall']

      var createpost = ['CreatePost']
    return (
      <View style={{height:55,width:width,
              backgroundColor:comp.includes(this.props.screen)?'#000':themeColor,
              marginTop:Constants.statusBarHeight}}>
          <View style={{flexDirection: 'row',height:55,alignItems: 'center',}}>

             <View style={{ flex: 0.2,justifyContent: 'flex-start', alignItems: 'center',}}>
             {createpost.includes(this.props.screen)&&
                <TouchableOpacity  style={{paddingHorizontal: 15,paddingVertical:10}}
                   onPress={()=>{this.props.navigation.goBack()}}>
                  <AntDesign name="close" size={this.state.size} color="#fff" />
                </TouchableOpacity>
             }
               {notify.includes(this.props.screen)&&
                  <TouchableOpacity  style={{paddingHorizontal: 15,paddingVertical:10}}
                     onPress={()=>{}}>
                    <MaterialIcons name="notifications-none" size={this.state.size} color="#fff" />
                  </TouchableOpacity>
               }
              {notes.includes(this.props.screen)&&
                 <TouchableOpacity  style={{paddingHorizontal: 15,paddingVertical:10}}
                    onPress={()=>{}}>
                    <Text  numberOfLines={1} style={[styles.text,{color:'#fff',fontSize:16,
                              textAlign:'left',fontWeight:'700'}]}>EDIT</Text>
                 </TouchableOpacity>
               }

                {notifychat.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TeachersWall')}}
                      style={{paddingHorizontal: 15,paddingVertical:10}}>
                    <FontAwesome5 name="chalkboard-teacher" size={this.state.size} color="#fff" />
                 </TouchableOpacity>
                }
                {comp.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}
                      style={{paddingHorizontal: 15,paddingVertical:10}}>
                    <AntDesign name="arrowleft" size={this.state.size} color="#fff" />
                 </TouchableOpacity>
                }

             </View>

             <View style={{flex:0.6,flexDirection:'row',
                            justifyContent:'center',alignItems:'center',}}>
                 <Text  numberOfLines={1} style={[styles.text,{color:'#fff',
                 fontSize:comp.includes(this.props.screen)||notes.includes(this.props.screen)||createpost.includes(this.props.screen)?16:24,
                 textAlign:'center',fontWeight:'700'}]}>{this.props.name}</Text>
             </View>

              {notify.includes(this.props.screen)&&
               <TouchableOpacity onPress={()=>{}}
                  style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                          alignItems:'center',}}>
                  <Fontisto name="search" size={this.state.size} color="#fff" />
              </TouchableOpacity>
              }

              {notifychat.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('InfoScreen')}}
                  style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                          alignItems:'center',}}>
                   <Ionicons name="md-information-circle-outline" size={22} color="#fff" />
               </TouchableOpacity>
              }

              {teach.includes(this.props.screen)&&
                 <TouchableOpacity       onPress={()=>{this.props.navigation.navigate('InfoScreen',{stud:true})}}
                  style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                          alignItems:'center',}}>
                    <Ionicons name="md-information-circle-outline" size={22} color="#fff" />
                </TouchableOpacity>
              }

              {notifysport.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{}}
                  style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                          alignItems:'center',}}>
                  <Fontisto name="search" size={this.state.size} color="#fff" />
                </TouchableOpacity>
              }

              {feed.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{}}
                    style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                            alignItems:'center',}}>
                  <MaterialIcons name="notifications-none" size={this.state.size} color="#fff" />
                </TouchableOpacity>
              }

              {notes.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{}}
                    style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                          alignItems:'center',}}>
                  <FontAwesome5 name="edit" size={this.state.size} color="#fff" />
                </TouchableOpacity>
              }
              {createpost.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{}}
                    style={{flex:0.2,flexDirection:'row',justifyContent:'center',
                          alignItems:'center',}}>
                  <Ionicons name="md-send" size={this.state.size} color="#fff" />
                </TouchableOpacity>
              }


           </View>
       </View>
    )
  }
}

const styles=StyleSheet.create({
  text:{
    fontStyle:'normal',
    fontFamily:fontFamily,
    lineHeight:22
  }
})
