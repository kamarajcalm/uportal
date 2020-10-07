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
import DropDownPicker from 'react-native-dropdown-picker';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily










class ProfileQuestionPaper extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
city:'',
cities : [{label: 'Madrid', value: 'madrid'},{label: 'Madrid', value: 'madrid'}],
      }
    }

 componentDidMount(){
 }




 changeCity(item) {
         this.setState({
             city: item.value
         });
     }
  render() {
const depart =this.props.navigation.getParam('item',null)
console.log(depart,'depart')
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'QUESTION PAPERS'}
            screen={'ProfileQuestionPaper'}/>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#000',}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.6}}>
              <Text style={[styles.text,{paddingVertical:10,color:'#fff',fontSize:14,fontWeight:'700',textAlign:'center'}]}>CHOOSE YEAR</Text>
              <DropDownPicker
                    items={this.state.cities}
                    defaultNull={ null}
                    value={this.state.city}
                    defaultValue={this.state.city}
                    placeholder="Choose"
                    placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
                    labelStyle={{fontSize: 14, color: '#000'}}
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.changeCity(item)}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileQuestionPaper);
