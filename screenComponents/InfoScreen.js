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
import {Fontisto, FontAwesome,Entypo,
  SimpleLineIcons,MaterialCommunityIcons,
  Feather,Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import Chat from '../screenComponents/Chat';
// import ChatApp from '../screenComponents/ChatApp';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor


class InfoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={

      }
    }



  render() {
     const { messages } = this.state;
     const stud = this.props.navigation.getParam('stud',false)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'Info'} screen={'InfoScreen'}/>
          <View style={{}}>

              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FacStuDetails',{faclty:true})}} style={{flex:1,flexDirection:'row',paddingHorizontal:20,alignItems:'center',justifyContent:'space-between',paddingVertical:20,marginVertical:20}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>Faculty details</Text>
                <FontAwesome name='angle-right' size={18} color='#fff'/>
              </TouchableOpacity>

            {stud &&
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FacStuDetails',{student:true})}} style={{flex:1,flexDirection:'row',paddingHorizontal:20,alignItems:'center',justifyContent:'space-between',paddingVertical:20,marginVertical:20}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>Student details</Text>
                  <FontAwesome name='angle-right' size={18} color='#fff'/>
              </TouchableOpacity>
              }

          </View>
          <TabComponent navigation={this.props.navigation}  />
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
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);
