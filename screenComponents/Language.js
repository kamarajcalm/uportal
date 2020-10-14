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
const fontFamily = settings.fontFamily

const languageList=[{name:'ENGLISH'},{name:'HINDI'},{name:'KANNADA'}]
class Language extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      languageList:languageList
      }
    }

 componentDidMount(){
 }

  render() {
    const receivedLanguage = this.props.navigation.getParam('receivedLanguage', () => {});
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'LANGUAGE'}
            screen={'Language'}/>
            <View style={{flex:1,paddingVertical:20}}>

            <FlatList
                 style={{paddingBottom:100}}
                 data={this.state.languageList}
                 keyExtractor={(item, index) => index.toString()}
                 renderItem={({item, index})=>(
               <TouchableOpacity style={{alignSelf:'center',paddingHorizontal:25,
                                         paddingVertical:10,backgroundColor:'#000',justifyContent:'space-between',width:width,marginVertical:10,
                                         borderRadius:7,flexDirection:'row',alignItems:'center'}}
                onPress={()=>{receivedLanguage(item.name)
            this.props.navigation.goBack()}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:16}]}>{item.name}</Text>
                  <FontAwesome name='angle-right' size={20} color='#fff' style={{alignSelf:'flex-end'}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Language);
