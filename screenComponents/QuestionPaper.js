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
const tabs = [{name:'GENERAL'},
              {name:'MY CLASS'}]

const questionpapers=[{img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},]

class QuestionPaper extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      questionpapers:questionpapers
    }
  }

  componentDidMount(){
  }

  questionPapers=()=>{
    return(
     <View style={{marginVertical:15,marginHorizontal:10}}>
       <FlatList  data={this.state.questionpapers} numColumns={3} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
         <TouchableOpacity style={{borderRadius:7,marginHorizontal:10}}>
            <View>
             <Image source={(item.img)} style={{height:width*0.3,width:width*0.27,borderRadius:7}}/>
             <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,
             fontWeight:'700',textAlign:'center'}]}>{item.name}</Text>
           </View>
         </TouchableOpacity>
       )}/>
     </View>
   )
 }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'QUESTION PAPERS'}
            screen={'QuestionPaper'}/>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>

             {this.questionPapers()}
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPaper);
