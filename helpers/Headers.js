import * as React from 'react';
import {Animated, StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,TouchableHighlight,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage , TextInput, ScrollView ,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Alert,ActivityIndicator, ToastAndroid , WebView,Easing} from 'react-native';
import  Constants  from 'expo-constants';
import {AntDesign, FontAwesome ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,Entypo,Fontisto,Feather,FontAwesome5,Ionicons} from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor

export default class Headers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeColor:themeColor,
      inactiveColor:'#000',
      scale: new Animated.Value(0),
      color:'#f2f2f2',
      size:25,
    };

  }

  componentDidMount(){

  }

  headerChange=(notify,notifychat)=>{
    {notify.includes(this.props.screen)&&
       <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
         <MaterialIcons name="notifications-none" size={20} color="#fff" />
       </TouchableOpacity>
     }
     {notifychat.includes(this.props.screen)&&
        <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
          <FontAwesome5 name="chalkboard-teacher" size={20} color="#fff" />
        </TouchableOpacity>
      }
  }

  render(){
    //If you intent to create customize header create screen itself
      var notify = [ 'Home' , 'PageFirst',]
      var notifychat = [ 'PageSecond',]
      var notifysport = ['PageThird']
      var comp=['ProfileForms','ProfileFillForm','ProfileLibrary','ProfileFacultyDetails','PFacultyDetailsCarousel','ProfileFeedback','ProfileSetting','LinkEmail','Language','ChangePassword','ProfileMarks']
    return (
      <View style={{height:55,width:width,backgroundColor:comp.includes(this.props.screen)?'#000':themeColor,marginTop:Constants.statusBarHeight}}>
          <View style={{flexDirection: 'row',height:55,alignItems: 'center',}}>

             <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
             {notify.includes(this.props.screen)&&
                <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                  <MaterialIcons name="notifications-none" size={20} color="#fff" />
                </TouchableOpacity>
              }
              {notifychat.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                   <FontAwesome5 name="chalkboard-teacher" size={20} color="#fff" />
                 </TouchableOpacity>
               }
               {comp.includes(this.props.screen)&&
                 <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{paddingHorizontal: 15,paddingVertical:10}}>
                   <AntDesign name="arrowleft" size={20} color="#fff" />
                 </TouchableOpacity>
               }
             </View>

             <View style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
               <Text   style={{ color:'#fff',fontWeight:'700',fontSize:20,textAlign:'center',}} numberOfLines={1}>{this.props.name}</Text>
             </View>
              {notify.includes(this.props.screen)&&
               <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <Fontisto name="search" size={22} color="#fff" />
              </TouchableOpacity>
            }

            {notifychat.includes(this.props.screen)&&
              <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                 <Ionicons name="md-information-circle-outline" size={22} color="#fff" />
             </TouchableOpacity>
             }

             {notifysport.includes(this.props.screen)&&
               <TouchableOpacity onPress={()=>{}} style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <Fontisto name="search" size={22} color="#fff" />
              </TouchableOpacity>
              }


           </View>
       </View>
    )
  }
}
