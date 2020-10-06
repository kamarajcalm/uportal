import * as React from 'react';
import {Animated, StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,TouchableHighlight,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage , TextInput, ScrollView ,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Alert,ActivityIndicator, ToastAndroid , WebView,Easing} from 'react-native';
import  Constants  from 'expo-constants';
import { FontAwesome ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,Entypo,Fontisto,Feather} from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily =settings.fontFamily

export default class TabComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeColor:'#fff',
      inactiveColor:'#fff',
      scale: new Animated.Value(0),
      color:'#000',
      size:20,
    };

  }

  componentDidMount(){

  }

  navigate=async(nav)=>{
    this.props.navigation.navigate(nav, {}, NavigationActions.navigate({ routeName: 'Home' }))
  }


  render(){
    var routeName = this.props.navigation.state.routeName
    var home = ['Home']
    var pageFirst = ['PageFirst']
    var pageSecond = ['PageSecond']
    var pageThird = ['PageThird']
    var pageFourth = ['PageFourth']

    return (
    <View style={{position: 'absolute',bottom:0,height:55,left:0,width:'100%',borderTopWidth:0,borderColor:'#f2f2f2',backgroundColor:'transparent'}}>
    <View style={{flex:1,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.95)',alignItems: 'center',justifyContent:'space-between'}}>


    <View style={{flex:1}} >
     <Animated.View style={[{borderRadius:30,height:'100%',}]} >
      <TouchableOpacity onPress={()=>{this.navigate('Home')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
       <Entypo name="globe" size={this.state.size} color={home.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
       <Text style={[styles.text,{color:home.includes(routeName)?'#fff':'#fff',fontSize:12,margin:0,padding:0,fontWeight:'600'}]}>Univarsal</Text>
      </TouchableOpacity>
     </Animated.View>
    </View>


      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('PageFirst')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
          <FontAwesome name="institution" size={this.state.size} color={pageFirst.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
          <Text style={[styles.text,{color:pageFirst.includes(routeName)?'#fff':'#fff',fontSize:12,margin:0,padding:0,fontWeight:'600'}]}>Institution</Text>
        </TouchableOpacity>
       </Animated.View>
      </View>

      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('PageSecond')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
          <MaterialCommunityIcons name="google-classroom" size={this.state.size} color={pageSecond.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
          <Text style={[styles.text,{color:pageSecond.includes(routeName)?'#fff':'#fff',fontSize:12,margin:0,padding:0,fontWeight:'600'}]}>Class</Text>
        </TouchableOpacity>
       </Animated.View>
      </View>

      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('PageThird')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
          <MaterialIcons name="sports-tennis" size={this.state.size} color={pageThird.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
          <Text style={[styles.text,{color:pageThird.includes(routeName)?'#fff':'#fff',fontSize:12,margin:0,padding:0,fontWeight:'600'}]}>Sports</Text>
        </TouchableOpacity>
       </Animated.View>
      </View>

      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('PageFourth')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
          <FontAwesome name="user-circle-o" size={this.state.size} color={pageFourth.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
          <Text style={[styles.text,{color:pageFourth.includes(routeName)?'#fff':'#fff',fontSize:12,margin:0,padding:0,fontWeight:'600'}]}>Profile</Text>
        </TouchableOpacity>
       </Animated.View>
      </View>

    </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    fontStyle:'normal',
    fontFamily:fontFamily,
    lineHeight:22
  }
});
