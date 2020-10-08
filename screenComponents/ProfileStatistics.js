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
import StaticsAcademic from '../screenComponents/StaticsAcademic';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const tabs = [{name:'SPORTS'},
              {name:'ACADEMIC'}]


const sportsdetails=[{no:'#',batting:'BATTINGS',tourna1:'TOURNAMENT 1',
                      tourna2:'TOURNAMENT 2',tourna3:'TOURNAMENT 3'},
                    {no:'1',batting:'MATCHES',tourna1:'90',tourna2:'80',tourna3:'70'},
                    {no:'2',batting:'INNINGS',tourna1:'80',tourna2:'70',tourna3:'90'},
                    {no:'3',batting:'RUNS',tourna1:'70',tourna2:'90',tourna3:'80'},
                    {no:'4',batting:'STRIKERATE',tourna1:'240',tourna2:'240',tourna3:'240'},
                    {no:'5',batting:'AVG',tourna1:'',tourna2:'',tourna3:''},
                    {no:'6',batting:'HIGHEST',tourna1:'',tourna2:'',tourna3:''},
                    {no:'7',batting:'4s',tourna1:'',tourna2:'',tourna3:''},
                    {no:'8',batting:'6s',tourna1:'',tourna2:'',tourna3:''},
                    {no:'9',batting:'Ducks',tourna1:'',tourna2:'',tourna3:''},
                    {no:'10',batting:'50',tourna1:'',tourna2:'',tourna3:''},
                    {no:'11',batting:'100',tourna1:'',tourna2:'',tourna3:''},
                    {no:'12',batting:'150',tourna1:'',tourna2:'',tourna3:''},]

const sportsdetails1=[{no:'#',batting:'BASKETBALL',tourna1:'TOURNAMENT 1',
                      tourna2:'TOURNAMENT 2',tourna3:'TOURNAMENT 3'},
                      {no:'1',batting:'GAMES PLAYED',tourna1:'90',tourna2:'80',tourna3:'70'},
                      {no:'2',batting:'TOTAL POINTS',tourna1:'80',tourna2:'70',tourna3:'90'},
                      {no:'3',batting:'3 POINTERS',tourna1:'70',tourna2:'90',tourna3:'80'},
                      {no:'4',batting:'2 POINTERS',tourna1:'240',tourna2:'240',tourna3:'240'},
                      {no:'5',batting:'1 POINTERS',tourna1:'',tourna2:'',tourna3:''},]

const sportsdetails2=[{no:'#',batting:'FOOTBALL',tourna1:'TOURNAMENT 1',
                      tourna2:'TOURNAMENT 2',tourna3:'TOURNAMENT 3'},
                      {no:'1',batting:'MATCHES',tourna1:'90',tourna2:'80',tourna3:'70'},
                      {no:'2',batting:'GOALS',tourna1:'80',tourna2:'70',tourna3:'90'},
                      {no:'3',batting:'MAN OF THE MATCHES',tourna1:'70',tourna2:'90',tourna3:'80'},
                      {no:'4',batting:'RED CARD',tourna1:'240',tourna2:'240',tourna3:'240'},
                      {no:'5',batting:'YELLOW CARD',tourna1:'',tourna2:'',tourna3:''},
                      {no:'6',batting:'FOULS',tourna1:'',tourna2:'',tourna3:''},]

const sportsdata =[{a1:false,name:'CRICKET',pk:1,
                    img:require('../assets/Unknown_Boy.jpg'),sportsdetails:sportsdetails},
                   {a1:false,name:'BASKETBALL',pk:2,
                    img:require('../assets/Unknown_Boy.jpg'),sportsdetails:sportsdetails1},
                   {a1:false,name:'FOOTBALL',pk:3,
                    img:require('../assets/Unknown_Boy.jpg'),sportsdetails:sportsdetails2},]


class ProfileStatistics extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      scrollX : new Animated.Value(0),
      scrollY: new Animated.Value(0),
      selectedTab:0,
      itemIndex:1,
      sportsdata:sportsdata,
      }
    }

 componentDidMount(){
 }

 handlePageChange=(e)=>{
   var offset = e.nativeEvent.contentOffset;
    if(offset) {
      var page = Math.round(offset.x / width) ;
      this.setState({selectedTab:page})
    }
    this.setState({scrollY:new Animated.Value(0)})
 }

 touch=(item,index)=>{
     this.state.sportsdata[index].a1=!this.state.sportsdata[index].a1
     this.setState({sportsdata})
     this.setState({itemIndex:item.pk})
 }
 sportsDetails=(item,index)=>{
   console.log(item.sportsdetails,'item.syllabusdetails')
   return(
     <View style={{marginTop:10,borderRadius:0,borderWidth:0.5,borderColor:'#fff',margin:6}}>
        <FlatList style={{}} data={item.sportsdetails} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
          <View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:6,}}>

              <View style={{flex:0.15,justifyContent:'flex-start',paddingVertical:10,}}>
              <Text style={[styles.text,{fontSize:12,fontWeight:item.no=="#"?'700':'400',textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.no}</Text>
              </View>
              <View style={{borderWidth:0.2,borderColor:'#fff'}}/>
              <View style={{flex:0.25,justifyContent:'flex-start',paddingVertical:10}}>
              <Text style={[styles.text,{fontSize:12,fontWeight:item.no=="#"?'700':'400',textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.batting}</Text>
              </View>
              <View style={{borderWidth:0.2,borderColor:'#fff'}}/>
              <View style={{flex:0.2,justifyContent:'flex-start',paddingVertical:10}}>
              <Text style={[styles.text,{fontSize:item.no=="#"?10:12,fontWeight:item.no=="#"?'700':'400',textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.tourna1}</Text>
              </View>
              <View style={{borderWidth:0.2,borderColor:'#fff'}}/>
              <View style={{flex:0.2,justifyContent:'flex-start',paddingVertical:10}}>
              <Text style={[styles.text,{fontSize:item.no=="#"?10:12,fontWeight:item.no=="#"?'700':'400',textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.tourna2}</Text>
              </View>
              <View style={{borderWidth:0.2,borderColor:'#fff'}}/>
              <View style={{flex:0.2,justifyContent:'flex-start',paddingVertical:10}}>
              <Text style={[styles.text,{fontSize:item.no=="#"?10:12,fontWeight:item.no=="#"?'700':'400',textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.tourna3}</Text>
              </View>

            </View>
            {item.no=='#'&&
            <View style={{borderWidth:0.2,borderColor:'#fff'}}></View>}
        </View>
        )}
        />
     </View>
   )
 }

 sports=()=>{
   return(
     <View style={{marginVertical:10}}>
     <FlatList style={{}} data={this.state.sportsdata} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
      <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,backgroundColor:'#3F3F3F'}}>
        <TouchableOpacity style={{height:width*0.35,alignItems:'center',justifyContent:'center',shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}} onPress={()=>{this.touch(item,index)}}>
            <Image source={(item.img)} style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
            <View style={{alignSelf:'center',position:'absolute',alignItems:'center',justifyContent:'center',zIndex:1}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700'}]}>{item.name}</Text>
              <FontAwesome name='angle-down' size={20} color='#fff'/>
            </View>
        </TouchableOpacity>
        {(item.a1&&item.pk==this.state.itemIndex)&&
          <ScrollView style={{backgroundColor:'#3F3F3F',borderRadius:10,paddingVertical:10}}>
              {this.sportsDetails(item,index)}
          </ScrollView>
        }
      </View>
      )}
      />
     </View>
   )
 }

  render() {
    let left = this.state.scrollX.interpolate({
                 inputRange: [0,1*width, ],
                 outputRange: [0, width*0.5,],
                 extrapolate: 'clamp'
               });

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'STATISTICS'}
            screen={'ProfileStatistics'}/>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
              <Animated.View style={{flexDirection: 'row',}}>
                  {tabs.map((item, i) => {
                    return (
                      <TouchableOpacity key={i} onPress={()=>{this.setState({selectedTab:i});this.scroll.scrollTo({ x: (i)*width });this.setState({scrollY:new Animated.Value(0)})}} style={{flex:1,borderBottomWidth: 0,borderColor:'#f2f2f2',alignItems: 'center',justifyContent: 'center',height:45}} >
                       <Text   style={[styles.text,{fontSize:16,fontWeight:'700',color:this.state.selectedTab==i?'#fff':'#d6d6d6'}]}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  <Animated.View
                  style={{ height: 4, width: '50%', backgroundColor: '#fff',position: 'absolute',bottom: 0,left:0,transform: [{translateX:left}]}}/>
             </Animated.View>
             <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]  )}
                scrollEventThrottle={16}
                onMomentumScrollEnd={this.handlePageChange}
                ref={(node) => {this.scroll = node}}
                style={{flex:1,backgroundColor:'#000'}}
                onContentSizeChange={() =>this.scroll.scrollTo({ x: (this.state.selectedTab)*width })}
                >
                  {tabs.map((item, i) => {
                      return (
                        <View key={i} style={{flex:1,backgroundColor: '#000',width:width*1,}} >
                        {i==0&&this.state.selectedTab==0&&
                           <View style={{flex:1,}}>
                            <ScrollView>
                              {this.sports()}
                            </ScrollView>
                           </View>
                        }
                        {i==1&&this.state.selectedTab==1&&
                          <View style={{flex:1,}}>
                           <ScrollView >
                              <StaticsAcademic  navigation={this.props.navigation}/>
                           </ScrollView>
                          </View>
                        }
                        </View>
                      );
                    })}
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatistics);
