import * as React from 'react';
import {Animated, StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,TouchableHighlight,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage , TextInput, ScrollView ,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Alert,ActivityIndicator, ToastAndroid , WebView,Easing} from 'react-native';
import  Constants  from 'expo-constants';
import {AntDesign, FontAwesome ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,Entypo,Fontisto,Feather,FontAwesome5,Ionicons} from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily=settings.fontFamily
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

  componentDidMount(){
  }



  render(){
    //If you intent to create customize header create screen itself
      var notify = [ 'Home' , 'PageFirst',]
      var notifychat = [ 'PageSecond',]
      var notifysport = ['PageThird']
      var comp=['ProfileForms','ProfileFillForm','ProfileLibrary','ProfileFacultyDetails',
                'PFacultyDetailsCarousel','ProfileFeedback','ProfileSetting',
                'LinkEmail','Language','ChangePassword','ProfileMarks',
                'ProfileMedia','ProfileMediaChoose','MediaNotesVideo','NotesVideosData',
                'MediaUniversity','MediaDepart','ProfileQuestionPaper','QuestionPaper',
                'ProfileStatistics','ProfileAttendance','ProfilCalendar','MyWallScreen','TeachersWall']
      var feed =['MyWallScreen']
      var notes=['Notes']
      var chat=['Chat']
      var teach=['TeachersWall']
    return (
      <View style={{height:55,width:width,backgroundColor:comp.includes(this.props.screen)?'#000':themeColor,marginTop:Constants.statusBarHeight}}>
          <View style={{flexDirection: 'row',height:55,alignItems: 'center',}}>

             <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
             {notify.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                  <MaterialIcons name="notifications-none" size={this.state.size} color="#fff" />
                </TouchableOpacity>
              }
              {notes.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                   <Feather name="camera" size={this.state.size} color="#fff" />
                 </TouchableOpacity>
               }
               {chat.includes(this.props.screen)&&
                  <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                    <Image source={require('../assets/questionpaper.png')} style={{height:width*0.07,width:width*0.07,}}/>
                  </TouchableOpacity>
                }
              {notifychat.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TeachersWall')}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                   <FontAwesome5 name="chalkboard-teacher" size={this.state.size} color="#fff" />
                 </TouchableOpacity>
               }


               {comp.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                   <AntDesign name="arrowleft" size={this.state.size} color="#fff" />
                 </TouchableOpacity>
               }
             </View>

             <View style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
               <Text   style={[styles.text,{color:'#fff',fontSize:comp.includes(this.props.screen)||notes.includes(this.props.screen)?16:24,textAlign:'center',fontWeight:'700'}]} numberOfLines={1}>{this.props.name}</Text>
             </View>
              {notify.includes(this.props.screen)&&
               <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <Fontisto name="search" size={this.state.size} color="#fff" />
              </TouchableOpacity>
            }

            {notifychat.includes(this.props.screen)&&
              <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                 <Ionicons name="md-information-circle-outline" size={22} color="#fff" />
             </TouchableOpacity>
             }
             {teach.includes(this.props.screen)&&
               <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <Ionicons name="md-information-circle-outline" size={22} color="#fff" />
              </TouchableOpacity>
              }

             {notifysport.includes(this.props.screen)&&
               <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <Fontisto name="search" size={this.state.size} color="#fff" />
              </TouchableOpacity>
              }

              {feed.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                   <MaterialIcons name="notifications-none" size={this.state.size} color="#fff" />
                 </TouchableOpacity>
               }

               {notes.includes(this.props.screen)&&
                  <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <FontAwesome5 name="edit" size={this.state.size} color="#fff" />
                  </TouchableOpacity>
                }
                {chat.includes(this.props.screen)&&
                   <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                     <Text   style={[styles.text,{color:'#fff',fontSize:16,textAlign:'center',fontWeight:'700'}]} numberOfLines={1}>+ADD</Text>
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
