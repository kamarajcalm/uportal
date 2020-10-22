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

const depart=[{name:'Aeronautical Engineering',pk:1},{name:'Electronics & Communication',pk:2},
              {name:'Computer science & Engineering',pk:3},{name:'Aeronautical Engineering',pk:4},
              {name:'Electronics & Communication',pk:5},{name:'Computer science & Engineering',pk:6},
              {name:'Computer science & Engineering',pk:7},{name:'Aeronautical Engineering',pk:8},
              {name:'Electronics & Communication',pk:9},{name:'Computer science & Engineering',pk:10},
              {name:'Computer science & Engineering',pk:1},{name:'Aeronautical Engineering',pk:2}]

const university=[{name:'Ramaiah University',pk:1,depart:depart},
                  {name:'VTU University',pk:2,depart:depart},
                  {name:'Anna University',pk:3,depart:depart},
                  {name:'RGPV University',pk:4,depart:depart},
                  {name:'Ramaiah University',pk:5,depart:depart},
                  {name:'VTU University',pk:6,depart:depart},
                  {name:'Anna University',pk:7,depart:depart},
                  {name:'RGPV University',pk:8,depart:depart},
                  {name:'Ramaiah University',pk:9,depart:depart},
                  {name:'VTU University',pk:10,depart:depart},
                  {name:'Anna University',pk:1,depart:depart},
                  {name:'RGPV University',pk:2,depart:depart}]

class MediaUniversity extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      university:university
      }
    }

  componentDidMount(){
  }

  touchuniversity=(quespaper,item,collegeStaf,collegeStafother,collegeAdother)=>{
    if(quespaper!=null){
      this.props.navigation.navigate('MediaDepart',{item:{item:item,quespaper:quespaper}})
    }else if (collegeStaf!=null) {
      this.props.navigation.navigate('MediaDepart',{item:{item:item,collegeStaf:collegeStaf}})
    }else if(collegeStafother!=null){
      this.props.navigation.navigate('MediaDepart',{item:{item:item,collegeStafother:collegeStafother}})
    }else if (collegeAdother!=null) {
      this.props.navigation.navigate('MediaDepart',{collegeAd:{item:item,collegeAd:collegeAdother}})
    }else{
      this.props.navigation.navigate('MediaDepart',{item:{item:item}})
    }
  }

  university=(quespaper,collegeStaf,collegeStafother,collegeAdother)=>{
    return(
      <View style={{marginVertical:15,width:width}}>
        <FlatList  data={this.state.university}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <TouchableOpacity  onPress={()=>{this.touchuniversity(quespaper,item,collegeStaf,collegeStafother,collegeAdother)}} style={{flexDirection:'row',marginHorizontal:15,marginVertical:8,borderRadius:7,
                  alignItems:'center',justifyContent:'space-between',paddingHorizontal:15,}}>
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

  render() {
    const quespaper =this.props.navigation.getParam('quespaper',null)
    var collegeStaf = this.props.navigation.getParam('collegeStaf',null)
    var collegeStafother = this.props.navigation.getParam('collegeStafother',null)
    var collegeAdother = this.props.navigation.getParam('collegeAdother',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={quespaper?'QUESTION PAPERS':'MEDIA'}
            screen={'MediaUniversity'}/>
          <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
              <Text style={[styles.text,{paddingVertical:10,color:'#fff',fontSize:14,
                    fontWeight:'700',textAlign:'center'}]}>CHOOSE UNIVERSITY</Text>
              {this.university(quespaper,collegeStaf,collegeStafother,collegeAdother)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaUniversity);
