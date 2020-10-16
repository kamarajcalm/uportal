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
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,
  MaterialCommunityIcons,Feather,Octicons,
  MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily= settings.fontFamily



class ChooseType extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      college:false,
      school:false,
      }
    }

    componentDidMount(){
    }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{width:width*0.5,paddingHorizontal:20,paddingVertical:6,
                                    marginVertical:20,borderRadius:17,borderWidth:1}}
              onPress={()=>{this.props.navigation.navigate('Home',{collegeStud:true})}}>
              <Text style={[styles.text,{fontSize:20,fontWeight:'700',
                            textAlign:'center'}]}>College-Student</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:width*0.5,paddingHorizontal:20,paddingVertical:6,
                                    marginVertical:20,borderRadius:17,borderWidth:1}}
              onPress={()=>{this.props.navigation.navigate('Home',{schoolStud:true})}}>
              <Text style={[styles.text,{fontSize:20,fontWeight:'700',
                            textAlign:'center'}]}>School-Student</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:width*0.5,paddingHorizontal:20,paddingVertical:6,
                                    marginVertical:20,borderRadius:17,borderWidth:1}}
              onPress={()=>{this.props.navigation.navigate('Home',{schoolAd:true})}}>
              <Text style={[styles.text,{fontSize:20,fontWeight:'700',
                            textAlign:'center'}]}>School-Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:width*0.5,paddingHorizontal:20,paddingVertical:6,
                                    marginVertical:20,borderRadius:17,borderWidth:1}}
              onPress={()=>{this.props.navigation.navigate('Home',{collegeAd:true})}}>
              <Text style={[styles.text,{fontSize:20,fontWeight:'700',
                            textAlign:'center'}]}>College-Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:width*0.5,paddingHorizontal:20,paddingVertical:6,
                                    marginVertical:20,borderRadius:17,borderWidth:1}}
              onPress={()=>{this.props.navigation.navigate('Home',{schoolStaf:true})}}>
              <Text style={[styles.text,{fontSize:20,fontWeight:'700',
                            textAlign:'center'}]}>School-Staff</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:width*0.5,paddingHorizontal:20,paddingVertical:6,
                                    marginVertical:20,borderRadius:17,borderWidth:1}}
              onPress={()=>{this.props.navigation.navigate('Home',{collegeStaf:true})}}>
              <Text style={[styles.text,{fontSize:20,fontWeight:'700',
                            textAlign:'center'}]}>College-Staff</Text>
          </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseType);
