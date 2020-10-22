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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const tabs = [{name:'NOTES'},
              {name:'VIDEOS'}]
const depat = [{name:'AE',fullname:'Aeronautical Engineering'},
                    {name:'AE',fullname:'Aeronautical Engineering'},
                    {name:'CSE',fullname:'Computer Science & Engineering'},
                {name:'CSE',fullname:'Computer Science & Engineering'},
                {name:'MECH',fullname:''},
                {name:'MECH',fullname:''},
                {name:'CIVIL',fullname:''},
                {name:'CIVIL',fullname:''},
                {name:'ARCH',fullname:''},
                {name:'ARCH',fullname:''},]
class MediaDepart extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      depat:depat
      }
    }

 componentDidMount(){
 }

 depart=(depart)=>{
   return(
     <View style={{marginVertical:15,width:width}}>
       <FlatList  data={depart.item.depart} keyExtractor={(item,index) => index.toString()} renderItem={({item, index})=>(
         <TouchableOpacity   style={{flexDirection:'row',marginHorizontal:15,marginVertical:8,
                borderRadius:7,alignItems:'center',
                justifyContent:'space-between',paddingHorizontal:15,}}
                onPress={()=>{this.props.navigation.navigate('ProfileMedia')}}>
            <View style={{}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,
                  fontWeight:'700',textAlign:'center'}]}>{item.name}</Text>
            </View>
            <View>
              <FontAwesome name={'angle-right'} size={20} color={'#fff'}/>
            </View>
          </TouchableOpacity>
       )}/>
     </View>
   )
 }

 depart1=(collegeAd)=>{
   return(

     <FlatList

       data={this.state.depat}
       keyExtractor={(item, index) => index.toString()}
       numColumns={2}
       renderItem={({item, index})=>(
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProfileMedia',{collegeAd:collegeAd})}}
            style={{marginHorizontal:10,marginVertical:10,alignItems:'center',
                 backgroundColor:'#333333',borderRadius:7,width:width*0.35}}>
           <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                   paddingVertical:15,fontWeight:'700'}]}>{item.name}</Text>
         </TouchableOpacity>
       )}
     />

   )
 }

  render() {
    const depart =this.props.navigation.getParam('item',null)
    console.log(depart,'depart')
    var collegeAd = this.props.navigation.getParam('collegeAd',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={depart!=null?depart.quespaper!=null?'QUESTION PAPERS':'MEDIA':'MEDIA'}
            screen={'MediaDepart'}/>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
            {depart!=null&&<View>
              {(depart.collegeStaf!=null||depart.collegeStafother!=null )?<View style={{flex:1,marginVertical:100,ignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                {this.depart1()}
                <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('MediaUniversity',{collegeStafother:depart.collegeStafother})}}
                   style={{marginHorizontal:10,marginVertical:10,alignItems:'center',
                        backgroundColor:'#333333',borderRadius:7,width:width*0.35}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:15,fontWeight:'700'}]}>OTHERS</Text>
                </TouchableOpacity>
                </View>:<View>
                <Text style={[styles.text,{paddingVertical:10,color:'#fff',fontSize:14,
                      fontWeight:'700',textAlign:'center'}]}>CHOOSE DEPARTMENT</Text>
                {this.depart(depart)}
                </View>}
              </View>}
              {collegeAd!=null &&<View style={{flex:1,marginVertical:100,ignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                {this.depart1(collegeAd)}
                <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('ProfileMediaChoose',{item:{collegeAdother:collegeAd}})}}
                   style={{marginHorizontal:10,marginVertical:10,alignItems:'center',
                        backgroundColor:'#333333',borderRadius:7,width:width*0.35}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:15,fontWeight:'700'}]}>OTHERS</Text>
                </TouchableOpacity>
                </View> }

            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaDepart);
