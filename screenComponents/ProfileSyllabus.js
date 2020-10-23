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
import TimeTable from '../screenComponents/TimeTable';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const tabs = [{name:'SYLLABUS'},
              {name:'TIMETABLE'}]

const syllabusdetails=[{term:'TERM I',chap1:'Chapter 1 : Shapes and space',
                        chap2:'Chapter 2 : Number from one to nine',
                        chap3:'Chapter 3 : Addition',chap4:''},
                      {term:'EXAM I',chap1:'Chapter 4 : Subtraction',
                        chap2:'Chapter 5 : Numbers from ten to twenty',
                        chap3:'Chapter 6 : Time',chap4:''},
                      {term:'TERM II',chap1:'Chapter 7 : Measurment',
                        chap2:'Chapter 8 : Number from 20 to 50',
                        chap3:'Chapter 9 : Data Handling',chap4:'Chapter 10 : Patterns'},
                      {term:'EXAM II',chap1:'Chapter 11 : Numbers',
                        chap2:'Chapter 12 : Money',
                        chap3:'Chapter 13 : How Many',chap4:''},]

const semtimetable=[{day:'DAY',i:'I',ii:'II',iii:'III',iv:'IV',v:'V',vi:'VI',vii:'VII',viii:'VIII'},
                    {day:'MONDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'TUESDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'WEDNESDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'THURSDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'FRIDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'SATURDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},]

const syllabusdata =[{a1:false,name:'MATHEMATICS',pk:1,
                      img:require('../assets/Unknown_Boy.jpg'),syllabusdetails:syllabusdetails},
                      {a1:false,name:'ENGLISH',pk:2,
                      img:require('../assets/Unknown_Boy.jpg'),syllabusdetails:syllabusdetails},
                      {a1:false,name:'HINDI',pk:3,
                      img:require('../assets/Unknown_Boy.jpg'),syllabusdetails:syllabusdetails},]

const semesterdata=[{a1:false,name:'SEMESTER III',pk:1,
                      img:require('../assets/Unknown_Boy.jpg'),semtimetable:semtimetable}]


class ProfileSyllabus extends React.Component {

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
      open:false,
      itemIndex:1,
      syllabusdata:syllabusdata,
      semesterdata:semesterdata,
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
    this.state.syllabusdata[index].a1=!this.state.syllabusdata[index].a1
    this.setState({syllabusdata})
    if(this.state.syllabusdata[index].a1==true){
      this.setState({open:true})
      this.setState({itemIndex:item.pk})
    }else{
      this.setState({open:false})
    }
    console.log(this.state.open,'open')
  }

  touch1=(item,index)=>{
    this.state.semesterdata[index].a1=!this.state.semesterdata[index].a1
    this.setState({semesterdata})
  }

  syllabusDetails=(item,index)=>{
    console.log(item.syllabusdetails,'item.syllabusdetails')
    return(
      <View style={{marginTop:10,borderRadius:10}}>
        <FlatList style={{}} data={item.syllabusdetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View>
            <View style={{flex:1,flexDirection:'row',
                    justifyContent:'space-between',paddingHorizontal:6,}}>
              <View style={{flex:0.25,justifyContent:'flex-start',paddingVertical:10}}>
                <Text style={[styles.text,{fontSize:16,fontWeight:'700',textAlign:'left',
                      color:'#fff',paddingHorizontal:10}]}>{item.term}</Text>
              </View>
              <View style={{flex:0.75,paddingHorizontal:10,paddingVertical:10}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                        fontWeight:'400'}]}>{item.chap1}</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                        fontWeight:'400'}]}>{item.chap2}</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                        fontWeight:'400'}]}>{item.chap3}</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                        fontWeight:'400'}]}>{item.chap4}</Text>
              </View>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
          </View>
        )}
        />
      </View>
    )
  }

  semTimeTable=(item,index)=>{
    console.log(item.semtimetable,'item.semtimetable')
    return(
      <View style={{margin:10,borderRadius:10}}>
        <FlatList style={{}} data={item.semtimetable}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flex:0.4,justifyContent:'flex-start',paddingVertical:10}}>
                <Text style={[styles.text,{fontSize:12,fontWeight:item.day=='DAY'?'700':'400',
                        textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.day}</Text>
              </View>
              <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
              <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between'}}>
                <ScrollView style={{}} horizontal={true}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.i}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.ii}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.iii}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.iv}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.v}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.vi}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.vii}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                              fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                              textAlign:'center',paddingVertical:10}]}>{item.viii}</Text>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:10}}/>
                  </View>
                </ScrollView>
              </View>
            </View>)}
          />
      </View>
    )
  }



  syllabus=()=>{
    return(
      <View style={{marginVertical:10}}>
        <FlatList style={{}} data={this.state.syllabusdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,
                          backgroundColor:'#3F3F3F'}}>
              <TouchableOpacity style={{height:width*0.35,alignItems:'center',justifyContent:'center',
              shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',
              shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}}
              onPress={()=>{this.touch(item,index)}}>
                <Image source={(item.img)} style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
                <View style={{alignSelf:'center',position:'absolute',alignItems:'center',
                        justifyContent:'center',zIndex:1}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:16,
                          fontWeight:'700'}]}>{item.name}</Text>
                  <FontAwesome name='angle-down' size={20} color='#fff'/>
                </View>
              </TouchableOpacity>
              {(item.a1&&item.pk==this.state.itemIndex)&&
                <ScrollView style={{backgroundColor:'#3F3F3F',borderRadius:10,paddingVertical:10}}>
                  {this.syllabusDetails(item,index)}
                </ScrollView>
              }
            </View>
          )}
        />
      </View>
    )
  }











  semester=()=>{
    return(
      <View style={{marginVertical:10}}>
        <FlatList style={{}} data={this.state.semesterdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,
                  backgroundColor:'#3F3F3F'}}>
            <TouchableOpacity style={{height:width*0.35,alignItems:'center',justifyContent:'center',
                  shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',
                  shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}} onPress={()=>{this.touch1(item,index)}}>
              <Image source={(item.img)} style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
              <View style={{alignSelf:'center',position:'absolute',alignItems:'center',
                    justifyContent:'center',zIndex:1}}>
                <Text style={[styles.text,{color:'#fff',fontSize:16,
                    fontWeight:'700'}]}>{item.name}</Text>
                <FontAwesome name='angle-down' size={20} color='#fff'/>
              </View>
            </TouchableOpacity>
            {item.a1&&
              <ScrollView style={{backgroundColor:'#3F3F3F',borderRadius:10,paddingVertical:10}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',
                      textAlign:'center',paddingVertical:10}]}>PERIODS</Text>
                {this.semTimeTable(item,index)}
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
                 extrapolate: 'clamp'});

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation}
        name={this.state.open?'SYLLABUS':'SYLLABUS & TIMETABLE'}
        screen={'ProfileFeedback'}/>
        <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
          {!this.state.open&&<Animated.View style={{flexDirection: 'row',}}>
            {tabs.map((item, i) => {
              return (
                <TouchableOpacity key={i} onPress={()=>{this.setState({selectedTab:i});
                  this.scroll.scrollTo({ x: (i)*width });
                  this.setState({scrollY:new Animated.Value(0)})}}
                  style={{flex:1,borderBottomWidth: 0,borderColor:'#f2f2f2',
                  alignItems: 'center',justifyContent: 'center',height:45}} >
                  <Text   style={[styles.text,{fontSize:16,fontWeight:'700',
                      color:this.state.selectedTab==i?'#fff':'#d6d6d6'}]}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View
                  style={{ height: 4, width: '50%', backgroundColor: '#fff',
                  position: 'absolute',bottom: 0,left:0,transform: [{translateX:left}]}}/>
          </Animated.View>}
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
                              {this.syllabus()}
                            </ScrollView>
                           </View>
                        }
                        {i==1&&this.state.selectedTab==1&&
                          <View style={{flex:1,}}>
                           <ScrollView >
                             <TimeTable/>
                             {this.semester()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSyllabus);
