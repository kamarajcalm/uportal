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
const semdata=[{name:'LANGUAGE'},{name:'MATHEMATICS'},
               {name:'ENGLISH'},{name:'LANGUAGE'},
               {name:'MATHEMATICS'},{name:'ENGLISH'},]
const semdata1=[{name:'LANGUAGE'},{name:'MATHEMATICS'},
              {name:'ENGLISH'},]
const otherdata =[{name:'ENGINEERING'},{name:'MEDICAL'},{name:'COMMERCE'}]

class ProfileMediaChoose extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var semesters=this.props.navigation.getParam('item',null)
    console.log(semesters,'semesters')

    this.state={
      emailid:'',
      a1:false,
      a2:false,
      semdata:semdata,
      semdata1:semdata1,
      otherdata:otherdata,
      semesters:semesters,
    }
  }

  componentDidMount=()=>{
  }

  touchsem=(semesters)=>{
    if(semesters.quespaper!=null){
      this.props.navigation.navigate('QuestionPaper')
    }else{
        this.props.navigation.navigate('MediaNotesVideo')
    }
  }

  touch=(semesters)=>{
    if(semesters.quespaper!=null){
        this.props.navigation.navigate('MediaUniversity',{quespaper:semesters.quespaper})
    }else if (semesters.collegeStaf!=null) {
      this.props.navigation.navigate('MediaUniversity',{collegeStaf:semesters.collegeStaf})
    }else if(semesters.collegeStafother!=null){
      this.props.navigation.navigate('MediaUniversity',{collegeStafother:semesters.collegeStafother});
      console.log(semesters.collegeStafother,'semesters.collegeStafother')
    }else if (semesters.collegeAdother!=null) {
      this.props.navigation.navigate('MediaUniversity',{collegeAdother:semesters.collegeAdother});
      console.log(semesters.collegeAdother,'semesters.collegeAdother')
    }else{
      this.props.navigation.navigate('MediaUniversity')
    }
  }
  
  click =(sem)=>{
    if(sem.item!=null){
      this.touchsem(this.state.semesters)
    }else if(sem.collegeStaf!=null){
      this.touchsem(this.state.semesters)
    }
    else if(sem.collegeAdother!=null){
      this.touch(this.state.semesters)
    }else if(sem.collegeStafother!=null){
      this.touch(this.state.semesters)
    }else if(sem.collegeAd!=null){
      this.touchsem(this.state.semesters)
    }else{
      this.touch(this.state.semesters)
    }
  }
  render() {


    // const itemother=this.props.navigation.getParam('itemother',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={this.state.semesters.quespaper?'QUESTION PAPERS':'MEDIA'}
            screen={'ProfileMediaChoose'}/>

            <View style={{flex:1,paddingVertical:50,justifyContent:'center',alignItems:'center'}}>
              {(this.state.semesters.item!=null||this.state.semesters.collegeStaf!=null) &&
                <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:15,fontWeight:'700'}]}>CHOOSE SUBJECT</Text>
              }
              {(this.state.semesters.collegeStafother!=null||this.state.semesters.collegeAdother!=null) &&
                <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:15,fontWeight:'700'}]}>CHOOSE BOARD</Text>}
              <FlatList
                contenContainerStyle={{justifyContent:'space-between',}} data={this.state.semesters.item!=null?this.state.semdata:this.state.semesters.collegeStaf!=null?this.state.semdata1:this.state.semesters.collegeAd!=null?this.state.semdata1:this.state.otherdata}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>(
                  <TouchableOpacity  onPress={()=>{this.click(this.state.semesters)}}
                   style={{marginHorizontal:10,marginVertical:15,paddingHorizontal:40,
                          backgroundColor:'#333333',borderRadius:7,}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:10,fontWeight:'700'}]}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMediaChoose);
