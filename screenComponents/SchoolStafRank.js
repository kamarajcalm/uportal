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
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import DropDownPicker from 'react-native-dropdown-picker';

// import ChatApp from '../screenComponents/ChatApp';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor

const dropdown=[{label:'ALL SEMESTERS',value:'ALL SEMESTERS'},{label:'SEM I',value:'SEM I'},
                {label:'SEM II',value:'SEM II'},{label:'SEM III',value:'SEM III'},
                {label:'SEM IV',value:'SEM IV'},{label:'SEM V',value:'SEM V'},
                {label:'SEM VI',value:'SEM VI'},{label:'SEM VII',value:'SEM VII'},
                {label:'SEM VIII',value:'SEM VIII'},]

const droptest=[{label:'TEST-1',value:'TEST-1'},{label:'TEST-1',value:'TEST-1'},
                {label:'TEST-1',value:'TEST-1'}]

const dropclass=[{label:'CLASS-1',value:'CLASS-1'},{label:'CLASS-1',value:'CLASS-1'},
                {label:'CLASS-1',value:'CLASS-1'}]

const ranksdata=[{rank:'4',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},
                  {rank:'5',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},
                  {rank:'6',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},
                  {rank:'7',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},
                  {rank:'8',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},
                  {rank:'9',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},
                  {rank:'10',img:require('../assets/Unknown_Boy.jpg'),
                  name:'KAMAL HASAN',nameid:'AAA001'},]

class SchoolStafRank extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      dropdown:dropdown,
      droptest:droptest,
      ranksdata:ranksdata,
      dropclass:dropclass,
    }
  }

  dropTest=()=>{
    return(
      <View style={{justifyContent:'flex-end',marginVertical:20,
                    alignSelf:'flex-end',marginHorizontal:15}}>
        <DropDownPicker
              items={this.state.droptest}
              defaultNull={ null}
              dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
              defaultValue={this.state.test}
              placeholder="LANGUAGE"
              arrowColor={'#fff'}
              dropDownMaxHeight={width}
              style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
              placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
              labelStyle={{fontSize: 14, color: '#fff'}}
              containerStyle={{height: 40,width:width*0.3}}
              onChangeItem={item => this.setState({test:item.value})}
        />
      </View>
    )
  }

  dropClass=()=>{
    return(
      <View style={{justifyContent:'flex-end',marginVertical:20,
                    alignSelf:'flex-end',marginHorizontal:0}}>
        <DropDownPicker
              items={this.state.dropclass}
              defaultNull={ null}
              dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
              defaultValue={this.state.test}
              placeholder="CLASS"
              arrowColor={'#fff'}
              dropDownMaxHeight={width}
              style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
              placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
              labelStyle={{fontSize: 14, color: '#fff'}}
              containerStyle={{height: 40,width:width*0.25}}
              onChangeItem={item => this.setState({test:item.value})}
        />
      </View>
    )
  }

  dropdown=()=>{
    return(
      <View style={{justifyContent:'flex-end',marginVertical:20,
                    alignSelf:'flex-end',marginHorizontal:15}}>
        <DropDownPicker
              items={this.state.dropdown}
              defaultNull={ null}
              dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
              defaultValue={this.state.drop}
              placeholder="TEST1"
              arrowColor={'#fff'}
              dropDownMaxHeight={width}
              style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
              placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
              labelStyle={{fontSize: 14, color: '#fff'}}
              containerStyle={{height: 40,width:width*0.25}}
              onChangeItem={item => this.setState({drop: item.value})}
        />
      </View>
    )
  }

  rankers=()=>{
    return(
      <View>
        <FlatList style={{}} data={this.state.ranksdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View style={{flexDirection:'row',alignItems:'center',
                          justifyContent:'space-around',paddingHorizontal:20,
                          paddingVertical:10,width:width*0.7}}>
              <Text style={[styles.text,{color:'#fff',fontSize:24,
                          fontWeight:'700'}]}>{item.rank}</Text>
              <Image source={(item.img)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
              <View style={{borderWidth:1,borderColor:'#fff',borderRadius:15,padding:4}}>
                <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                              textAlign:'center'}]}>{item.name}</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                              textAlign:'center'}]}>{item.nameid}</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }

  topRanks=()=>{
    return(
    <View style={{flexDirection:'row',
                  justifyContent:'space-between',
                  paddingHorizontal:10,paddingVertical:20}}>
      <View style={{paddingHorizontal:6,paddingVertical:10,alignItems:'center'}}>
        <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
        <View style={{borderWidth:1,borderColor:'#fff',borderRadius:15,padding:4,
                      width:width*0.25,marginVertical:10}}>
          <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                      textAlign:'center'}]}>KAMAL HASAN</Text>
          <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                      textAlign:'center'}]}>AAA001</Text>
        </View>
        <Text style={[styles.text,{color:'#fff',fontSize:24,fontWeight:'700'}]}>2</Text>
        <View style={{alignItems:'center'}}>
          <View style={{height:40,width:40,backgroundColor:'#242424',zIndex:1}}/>
          <View style={{height:15,width:15,borderRadius:50,transform:[{scaleX:4}],
                      position:'absolute',top:32,backgroundColor:'#2b2b2b'}}/>
        </View>
      </View>
      <View style={{paddingHorizontal:6,paddingVertical:10,alignItems:'center',marginTop:30}}>
        <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
        <View style={{borderWidth:1,borderColor:'#fff',borderRadius:15,padding:4,
                      width:width*0.25,marginVertical:10}}>
          <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                      textAlign:'center'}]}>KAMAL HASAN</Text>
          <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                      textAlign:'center'}]}>AAA001</Text>
        </View>
        <Text style={[styles.text,{color:'#fff',fontSize:24,fontWeight:'700'}]}>1</Text>
        <View style={{alignItems:'center'}}>
          <View style={{height:40,width:40,backgroundColor:'#242424',zIndex:1}}/>
          <View style={{height:15,width:15,borderRadius:50,transform:[{scaleX:4}],
                      position:'absolute',top:32,backgroundColor:'#2b2b2b'}}/>
        </View>
      </View>
      <View style={{paddingHorizontal:6,paddingVertical:10,alignItems:'center'}}>
        <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
        <View style={{borderWidth:1,borderColor:'#fff',borderRadius:15,padding:4,
                      width:width*0.25,marginVertical:10}}>
          <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                      textAlign:'center'}]}>KAMAL HASAN</Text>
          <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'700',
                      textAlign:'center'}]}>AAA001</Text>
        </View>
        <Text style={[styles.text,{color:'#fff',fontSize:24,fontWeight:'700'}]}>3</Text>
        <View style={{alignItems:'center'}}>
          <View style={{height:40,width:40,backgroundColor:'#242424',zIndex:1}}/>
          <View style={{height:15,width:15,borderRadius:50,transform:[{scaleX:4}],
                      position:'absolute',top:32,backgroundColor:'#2b2b2b'}}/>
        </View>
      </View>
    </View>
  )
}

  render() {
     const { messages } = this.state;
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={'Ranks'} screen={'ProfileRank'}/>
        <ScrollView stickyHeaderIndices={[0]}>
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#000'}}>
              {this.dropTest()}
              {this.dropClass()}
              {this.dropdown()}
            </View>
          </View>
          <View>
            {this.topRanks()}
            {this.rankers()}
          </View>
          <View style={{height:50}}></View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolStafRank);
