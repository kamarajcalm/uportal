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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const tabs = [{name:'NOTES'},
              {name:'VIDEOS'}]






const notes=[{chap:'CHAPTER 1',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 2',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 3',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 4',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 5',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 6',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 7',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 8',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 9',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
             {chap:'CHAPTER 10',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},]


class MediaNotesVideo extends React.Component {

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
      notes:notes
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

 notes=()=>{
   return(
     <View style={{marginVertical:15}}>
       <FlatList  data={this.state.notes} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
         <TouchableOpacity   onPress={()=>{this.props.navigation.navigate('NotesVideosData',{notes:
         true})}} style={{flexDirection:'row',marginHorizontal:15,marginVertical:8,backgroundColor:'#333333',borderRadius:7,alignItems:'center',justifyContent:'space-between',paddingHorizontal:15}}>
            <View>
             <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,fontWeight:'700'}]}>{item.chap}</Text>
             <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,fontWeight:'700'}]}>{item.desc}</Text>
           </View>
           <View>
            <FontAwesome name={'angle-right'} size={20} color={'#fff'}/>
          </View>
         </TouchableOpacity>
       )}/>
     </View>
   )
 }
 videos=()=>{
   return(
     <View style={{marginVertical:15}}>
       <FlatList  data={this.state.notes} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
         <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('NotesVideosData',{videos:
         true})}} style={{flexDirection:'row',marginHorizontal:15,marginVertical:8,backgroundColor:'#333333',borderRadius:7,alignItems:'center',justifyContent:'space-between',paddingHorizontal:15}}>
            <View>
             <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,fontWeight:'700'}]}>{item.chap}</Text>
             <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,fontWeight:'700'}]}>{item.desc}</Text>
           </View>
           <View>
            <FontAwesome name={'angle-right'} size={20} color={'#fff'}/>
          </View>
         </TouchableOpacity>
       )}/>
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
            <Headers navigation={this.props.navigation} name={'MEDIA'}
            screen={'MediaNotesVideo'}/>
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
                              {this.notes()}
                            </ScrollView>
                           </View>
                        }
                        {i==1&&this.state.selectedTab==1&&
                          <View style={{flex:1,}}>
                           <ScrollView >
                              {this.videos()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaNotesVideo);
