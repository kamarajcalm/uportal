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
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily =settings.fontFamily
const semdata=[{name:'SEM I'},{name:'SEM V'},{name:'SEM II'},
                {name:'SEM VI'},{name:'SEM III'},
                {name:'SEM VII'},{name:'SEM IV'},{name:'SEM VIII'}]

class ProfileMedia extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      emailid:'',
      a1:false,
      a2:false,
      semdata:semdata
    }
  }

  componentDidMount=async()=>{}

  touch=(item,quespaper,collegeStaf,collegeAd)=>{
      if(quespaper!=null){
        this.props.navigation.navigate('ProfileMediaChoose',{item:{item:item,quespaper:quespaper}})
      }else if (collegeStaf!=null) {
        this.props.navigation.navigate('ProfileMediaChoose',{item:{collegeStaf:item}})
      }else if(collegeAd!=null){
        this.props.navigation.navigate('ProfileMediaChoose',{item:{collegeAd:item}})
      }else{
        this.props.navigation.navigate('ProfileMediaChoose',{item:{item:item}})
      }
  }

  otherTouch=(quespaper,collegeStaf)=>{
    if(quespaper!=null){
      this.props.navigation.navigate('ProfileMediaChoose',{item:{quespaper:quespaper}})
    }else if (collegeStaf!=null) {
      this.props.navigation.navigate('ProfileMediaChoose',{item:{collegeStafother:collegeStaf}})
    }else {
        this.props.navigation.navigate('ProfileMediaChoose',{item:{}})
    }
  }

  render() {
    const quespaper=this.props.navigation.getParam('item',null)
    console.log(quespaper,'quespaper')
    var collegeStaf = this.props.navigation.getParam('collegeStaf',null)
    var collegeAd = this.props.navigation.getParam('collegeAd',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={quespaper!=null?'QUESTION PAPERS':'MEDIA'}
            screen={'ProfileMedia'}/>
            <View style={{flex:1,paddingVertical:50,justifyContent:'center',alignItems:'center'}}>

              <FlatList
                contenContainerStyle={{justifyContent:'space-between',}}
                data={this.state.semdata}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({item, index})=>(
                  <TouchableOpacity
                    onPress={()=>{this.touch(item,quespaper,collegeStaf,collegeAd)}}  style={{marginHorizontal:10,marginVertical:10,paddingHorizontal:40,
                          backgroundColor:'#333333',borderRadius:7,width:width*0.35}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                            paddingVertical:10,fontWeight:'700'}]}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              {collegeAd!=null?<View></View>:<View>
                <TouchableOpacity onPress={()=>{this.otherTouch(quespaper,collegeStaf)}} style={{marginVertical:10,paddingHorizontal:40,backgroundColor:'#333333',borderRadius:7}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                                  paddingVertical:10,fontWeight:'700'}]}>OTHERS</Text>
                </TouchableOpacity></View>}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMedia);
