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
import DropDownPicker from 'react-native-dropdown-picker';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const year=[{label: '2000', value: '2000'},{label: '2001', value: '2001'},
              {label: '2002', value: '2002'},{label: '2003', value: '2003'},
              {label: '2004', value: '2004'},{label: '2005', value: '2005'},
              {label: '2006', value: '2006'},{label: '2007', value: '2007'},]

class ProfileQuestionPaper extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
        selectedyear:'',
        year : year,
        item:'QUESTION PAPERS'
    }
  }

  componentDidMount(){
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
            <Text style={[styles.text,{paddingVertical:10,color:'#fff',fontSize:14,
                        fontWeight:'700',textAlign:'center'}]}>CHOOSE YEAR</Text>
            <DropDownPicker
                    items={this.state.year}
                    defaultNull={ null}
                    dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
                    defaultValue={this.state.selectedyear}
                    placeholder="Choose"
                    arrowColor={'#fff'}
                    dropDownMaxHeight={width}
                    style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
                    placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
                    labelStyle={{fontSize: 14, color: '#fff'}}
                    containerStyle={{height: 40,width:width*0.3}}
                    onChangeItem={item => {this.setState({
                        selectedyear: item.value
                    });this.props.navigation.navigate('ProfileMedia',{item:this.state.item})}}
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
