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

class LinkEmail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      emailid:''
      }
    }

 componentDidMount(){
 }

  render() {
    const receivedValue = this.props.navigation.getParam('receivedValue', () => {});
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'LINK EMAIL ID'}
            screen={'LinkEmail'}/>
            <View style={{flex:1,paddingVertical:20}}>
            <View style={{marginVertical:20,marginHorizontal:25}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                    fontWeight:'700'}]}>ENTER EMAIL ID</Text>
              <TextInput style={{height: 45,borderWidth:1,borderColor:'#000',alignSelf:'center',
                                  width:'100%',borderRadius:10,color:'#fff',marginVertical:20,
                                  paddingHorizontal:15,backgroundColor:'#333333'}}
                  placeholder=""
                  selectionColor={'#000'}
                  onChangeText={emailid => { this.setState({ emailid: emailid }) }}
                  value={this.state.emailid}
              />
              <TouchableOpacity style={{alignSelf:'center',paddingHorizontal:25,paddingVertical:10,
                      backgroundColor:'#4F4F4F',marginVertical:20,borderRadius:7}}
                      onPress={()=>{receivedValue(this.state.emailid)
                                  this.props.navigation.goBack()}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700'}]}>LINK</Text>
              </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LinkEmail);
