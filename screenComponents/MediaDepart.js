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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const tabs = [{name:'NOTES'},
              {name:'VIDEOS'}]









class MediaDepart extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={

      }
    }

 componentDidMount(){
 }




 depart=(depart)=>{
   return(
     <View style={{marginVertical:15,width:width}}>
       <FlatList  data={depart.item.depart} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
         <TouchableOpacity   style={{flexDirection:'row',marginHorizontal:15,marginVertical:8,borderRadius:7,alignItems:'center',justifyContent:'space-between',paddingHorizontal:15,}}>
            <View style={{}}>
             <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,fontWeight:'700',textAlign:'center'}]}>{item.name}</Text>
           </View>
           <View>
            <FontAwesome name={'angle-right'} size={20} color={'#fff'}/>
          </View>
         </TouchableOpacity>
       )}/>
     </View>
   )
 }

  render() {
const depart =this.props.navigation.getParam('item',null)
console.log(depart,'depart')
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={depart.quespaper?'QUESTION PAPERS':'MEDIA'}
            screen={'MediaDepart'}/>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
              <Text style={[styles.text,{paddingVertical:10,color:'#fff',fontSize:14,fontWeight:'700',textAlign:'center'}]}>CHOOSE DEPARTMENT</Text>
              {this.depart(depart)}
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
