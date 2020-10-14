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
const tabs = [{name:'GENERAL'},
              {name:'MY CLASS'}]

const notes=[{img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},
             {img:require('../assets/books.jpg'),name:'Post Handling'},]

const videos=[{img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},
              {img:require('../assets/video.jpg'),name:'Post Handling'},]


class NotesVideosData extends React.Component {

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
      notes:notes,
      videos:videos
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

  notesData=()=>{
    return(
      <View style={{marginVertical:15,marginHorizontal:10}}>
        <FlatList  data={this.state.notes} numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <TouchableOpacity style={{borderRadius:7,marginHorizontal:10}}>
            <View>
              <Image source={(item.img)} style={{height:width*0.3,width:width*0.27,borderRadius:7}}/>
              <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,
                    fontWeight:'700',textAlign:'center'}]}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}/>
     </View>
    )
  }

  videosData=()=>{
    return(
      <View style={{marginVertical:15,marginHorizontal:10}}>
        <FlatList  data={this.state.videos} numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <TouchableOpacity style={{borderRadius:7,marginHorizontal:10}}>
            <View>
              <Image source={(item.img)} style={{height:width*0.3,width:width*0.27,borderRadius:7}}/>
              <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,
                    fontWeight:'700',textAlign:'center'}]}>{item.name}</Text>
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
                 extrapolate: 'clamp'});

    let notes=this.props.navigation.getParam('notes',false)
    let videos=this.props.navigation.getParam('videos',false)
    console.log(notes,'notes')
    console.log(videos,'videos')

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={notes?'NOTES':'VIDEOS'}
            screen={'NotesVideosData'}/>
          <View style={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
            <Animated.View style={{flexDirection: 'row',}}>
                {tabs.map((item, i) => {
                  return (
                    <TouchableOpacity key={i}
                        onPress={()=>{this.setState({selectedTab:i});
                                    this.scroll.scrollTo({ x: (i)*width });
                                    this.setState({scrollY:new Animated.Value(0)})}}
                        style={{flex:1,borderBottomWidth: 0,borderColor:'#f2f2f2',
                                alignItems: 'center',justifyContent: 'center',height:45}} >
                        <Text  style={[styles.text,{fontSize:16,fontWeight:'700',
                            color:this.state.selectedTab==i?'#fff':'#d6d6d6'}]}>{item.name}</Text>
                    </TouchableOpacity>
                    );
                  })
                }
                <Animated.View
                  style={{height:4,width:'50%',backgroundColor:'#fff',position:'absolute',
                          bottom: 0,left:0,transform:[{translateX:left}]}}/>
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
                          {notes==true &&<View>{this.notesData()}</View>}
                          {videos==true &&<View>{this.videosData()}</View>}
                        </ScrollView>
                      </View>
                    }
                    {i==1&&this.state.selectedTab==1&&
                      <View style={{flex:1,}}>
                        <ScrollView >
                          {notes==true &&<View>{this.notesData()}</View>}
                          {videos==true &&<View>{this.videosData()}</View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(NotesVideosData);
