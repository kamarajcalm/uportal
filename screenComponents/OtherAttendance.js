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
const semdata=[{name:'CLASS I'},{name:'CLASS VII'},{name:'CLASS II'},
                {name:'CLASS VIII'},{name:'CLASS III'},{name:'CLASS IX'},
                {name:'CLASS IV'},{name:'CLASS X'},{name:'CLASS V'},
                {name:'CLASS XI'},{name:'CLASS VI'},{name:'CLASS XII'}]

class OtherAttendance extends React.Component {

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

  componentDidMount(){
    var stafMarks = this.props.navigation.getParam('item',null)
    this.setState({stafMarks:stafMarks})
    console.log(this.props.navigation.getParam('item',null),this.state.stafMarks,'ugggggggg');
  }

  touch=(item,stafMarks)=>{
    console.log(item,'ffffffffffff')
    if(stafMarks=!null){
      this.props.navigation.navigate('StafChooseSec',{stafMarks:{item:item}})
    }else{
      this.props.navigation.navigate('StafChooseSec',{item:item})
    }
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={this.state.stafMarks=!null?'ACADEMIC MARKS':'ATTENDANCE'}
            screen={'OtherAttendance'}/>
            <View style={{flex:1,paddingVertical:50,justifyContent:'center',alignItems:'center'}}>

              <FlatList
                contenContainerStyle={{justifyContent:'space-between',}}
                data={this.state.semdata}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({item, index})=>(
                  <TouchableOpacity onPress={()=>{this.touch(item,this.state.stafMarks)}}
                     style={{marginHorizontal:10,marginVertical:10,alignItems:'center',
                          backgroundColor:'#333333',borderRadius:7,width:width*0.35}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherAttendance);
