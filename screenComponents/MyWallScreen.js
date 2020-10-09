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
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Feather,Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily= settings.fontFamily

const tabs=[{img:require('../assets/grid.webp')},
              {img:require('../assets/grid.webp')}]
const listofdetails=[{id:1,icon:'',name:'MARKS'},{id:2,icon:'',name:'ATTENDANCE'},
                     {id:3,icon:'',name:'STATICS'},{id:4,icon:'',name:'LIBRARY'},
                     {id:5,icon:'',name:'SYLLABUS & TIMETABLE'},{id:6,icon:'',name:'CALENDAR AND REMINDERS'},
                     {id:7,icon:'',name:'FACULTY DETAILS'},{id:8,icon:'',name:'MEDIA'},
                     {id:9,icon:'',name:'QUESTION PAPERS'},{id:10,icon:'',name:'FORMS'},
                     {id:11,icon:'',name:'FEEDBACK & REMARKS'},{id:12,icon:'',name:'SETTINGS'},]
const images=[{img:require('../assets/dog.webp')},
              {img:require('../assets/dog.webp')},
              {img:require('../assets/dog.webp')},
              {img:require('../assets/dog.webp')},
              {img:require('../assets/dog.webp')},
              {img:require('../assets/dog.webp')},
              {img:require('../assets/dog.webp')},
                            {img:require('../assets/dog.webp')},
                            {img:require('../assets/dog.webp')},
                            {img:require('../assets/dog.webp')},
                            {img:require('../assets/dog.webp')},
                            {img:require('../assets/dog.webp')}]
class MyWallScreen extends React.Component {

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
      listofdetails:listofdetails,
      images:images,
      }
    }

  profileHead=()=>{
    return(
      <View style={{justifyContent:'center',backgroundColor:'#000'}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:15,paddingVertical:10}}>
          <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.2,width:width*0.2,borderRadius:50}}/>
          <View>
            <Text style={[styles.text,{fontSize:14,color:'#fff',fontWeight:'700'}]}>LINDA</Text>
            <Text style={[styles.text,{fontSize:14,color:'#fff',fontWeight:'700'}]}>AA001</Text>
          </View>
          <View>
            <Entypo name='folder-images' size={20} color='#fff' style={{alignSelf:'center'}}/>
            <Text style={[styles.text,{fontSize:14,color:'#fff',fontWeight:'700'}]}>IMAGES</Text>
          </View>
          <View>
            <Entypo name='video' size={20} color='#fff' style={{alignSelf:'center'}}/>
            <Text style={[styles.text,{fontSize:14,color:'#fff',fontWeight:'700'}]}>VIDEOS</Text>
          </View>
        </View>
        <Text style={[styles.text,{fontSize:12,color:'#fff',fontWeight:'700',textAlign:'left',paddingHorizontal:20,paddingVertical:10}]}>Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur adipiscing elit</Text>

        <View style={{backgroundColor:'#323232',marginHorizontal:10}}>
          <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',textAlign:'center',paddingVertical:4}]}>EDIT PROFILE</Text>
        </View>
      </View>
    )
  }
images=()=>{
  return(
    <View style={{marginTop:2,borderRadius:10}}>
       <FlatList style={{}} data={this.state.images} keyExtractor={(item, index) => index.toString()}numColumns={3} renderItem={({item, index})=>(
         <View>
           <Image source={(item.img)} style={{height:width*0.33,width:width*0.33}}/>
       </View>
       )}
       />
    </View>
  )
}
imagesSingle=()=>{
  return(
    <View style={{marginTop:2,borderRadius:10}}>
       <FlatList style={{}} data={this.state.images}horizontal={true} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
         <View>
           <Image source={(item.img)} style={{height:width,width:width}}/>
       </View>
       )}
       />
    </View>
  )
}
tabs=()=>{
  let left = this.state.scrollX.interpolate({
               inputRange: [0,1*width, ],
               outputRange: [0, width*0.5,],
               extrapolate: 'clamp'
             });
  return(
    <View style={{marginTop:10}}>
    <Animated.View
    style={{ height: 1, width: '50%', backgroundColor: '#fff',position: 'absolute',top: 0,left:0,transform: [{translateX:left}]}}/>
    <Animated.View style={{flexDirection: 'row',}}>

        {tabs.map((item, i) => {
          return (
            <TouchableOpacity key={i} onPress={()=>{this.setState({selectedTab:i});this.scroll.scrollTo({ x: (i)*width });this.setState({scrollY:new Animated.Value(0)})}} style={{flex:1,borderBottomWidth: 0,borderColor:'#f2f2f2',alignItems: 'center',justifyContent: 'center',height:45}} >
             <Image source={(item.img)}  color="#fff" style={{height:30,width:30,tintColor:'#fff'}}/>
            </TouchableOpacity>
          );
        })}

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
                 <View style={{flex:1,backgroundColor:'#fff'}}>
                  <ScrollView>
                    {this.imagesSingle()}
                  </ScrollView>
                 </View>
              }
              {i==1&&this.state.selectedTab==1&&
                <View style={{flex:1,backgroundColor:'#fff'}}>
                 <ScrollView >
                 {this.images()}
                 </ScrollView>
                </View>
              }
              </View>
            );
          })}
      </ScrollView>

    </View>
  )
}


  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'FEEDS'}
            screen={'MyWallScreen'}/>
          <View>
            {this.profileHead()}
            <ScrollView>
            {this.tabs()}

            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyWallScreen);
