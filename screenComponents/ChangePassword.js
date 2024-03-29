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
  ToastAndroid,RefreshControl,TouchableWithoutFeedback,
  TouchableNativeFeedback} from 'react-native';
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

class ChangePassword extends React.Component {

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

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={'CHANGE PASSWORD'}
            screen={'ChangePassword'}/>
        <View style={{flex:1,paddingVertical:20}}>
          <View style={{marginVertical:20,marginHorizontal:25}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                    fontWeight:'700'}]}>ENTER CURRENT PASSWORD</Text>
            <TextInput style={{height: 45,borderWidth:1,borderColor:'#000',alignSelf:'center',
                              width:'100%',borderRadius:7,color:'#fff',marginVertical:20,
                              paddingHorizontal:15,backgroundColor:'#333333'}}
                  placeholder=""
                  selectionColor={'#000'}
                  onChangeText={currentpass => {this.setState({currentpass:currentpass})}}
                  value={this.state.currentpass}/>
            <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                  fontWeight:'700'}]}>ENTER NEW PASSWORD</Text>
            <TextInput style={{height: 45,borderWidth:1,borderColor:'#000',alignSelf:'center',
                               width:'100%',borderRadius:7,color:'#fff',marginVertical:20,
                               paddingHorizontal:15,backgroundColor:'#333333'}}
                   placeholder=""
                   selectionColor={'#000'}
                   onChangeText={newpass => {this.setState({newpass:newpass})}}
                   value={this.state.newpass}/>
            <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                        fontWeight:'700'}]}>RE-ENTER NEW PASSWORD</Text>
            <TextInput style={{height: 45,borderWidth:1,borderColor:'#000',alignSelf:'center',
                              width:'100%',borderRadius:7,color:'#fff',marginVertical:20,
                              paddingHorizontal:15,backgroundColor:'#333333'}}
                    placeholder=""
                    selectionColor={'#000'}
                    onChangeText={renewpass => { this.setState({ renewpass: renewpass }) }}
                    value={this.state.renewpass}/>
            <TouchableOpacity style={{alignSelf:'center',paddingHorizontal:25,paddingVertical:10,
                              backgroundColor:'#4F4F4F',marginVertical:20,borderRadius:7}}
            onPress={()=>{this.props.navigation.goBack()}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700'}]}>UPDATE</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
