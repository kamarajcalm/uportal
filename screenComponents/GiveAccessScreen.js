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

class GiveAccessScreen extends React.Component {

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





  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'GIVE ACCESS'}
            screen={'GiveAccessScreen'}/>
            <View style={{flex:1,paddingVertical:20}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9,alignItems:'center',paddingVertical:20}}
                  onPress={()=>{this.props.navigation.navigate('GiveAccessDetails')}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,
                            fontWeight:'700'}]}>Universal wall</Text>
                    <FontAwesome name='angle-right' size={18} color='#fff'
                                  style={{alignSelf:'flex-end'}}/>
                  </TouchableOpacity>


                  <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9,alignItems:'center',paddingVertical:20}}
                  onPress={()=>{this.props.navigation.navigate('GiveAccessDetails')}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,
                            fontWeight:'700'}]}>Librarian</Text>
                    <FontAwesome name='angle-right' size={18} color='#fff'
                                  style={{alignSelf:'flex-end'}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(GiveAccessScreen);
