import wamp from 'wamp.js2';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Platform,
  TouchableHighlight,
  Dimensions,
  WebView,
  StatusBar,
  AsyncStorage,
  CameraRoll,
  PermissionsAndroid,
  ListView,
} from 'react-native';
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import HTML from 'react-native-render-html';
import { RNCamera } from 'react-native-camera';
import FilePickerManager from 'react-native-file-picker';
import * as ImagePicker from 'expo-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const data = [{id:1, date:"9:50 am",type:'in',message:"Lorem ipsum dolor sit amet",
                attachment :require('../assets/imgboy.jpeg')},
              {id:2, date:"9:50 am", type:'out',
              message: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
              attachment :require('../assets/imgboy.jpeg')} ,
              {id:3, date:"9:50 am", type:'in',
              message: "Lorem ipsum dolor sit a met",
              attachment :require('../assets/imgboy.jpeg')},
              {id:4, date:"9:50 am", type:'in',
              message: "Lorem ipsum dolor sit a met",
              attachment :require('../assets/imgboy.jpeg')},
              {id:5, date:"9:50 am", type:'out',
              message: "Lorem ipsum dolor sit a met",
              attachment :require('../assets/imgboy.jpeg')},
              {id:6, date:"9:50 am", type:'out',
              message: "Lorem ipsum dolor sit a met",
              attachment :require('../assets/imgboy.jpeg')},
              {id:7, date:"9:50 am", type:'in',
              message: "Lorem ipsum dolor sit a met",
              messageimg:"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540neesi%252FU-portal/ImagePicker/3df37d06-b3e8-4719-bbc8-38bfc6ec8f54.jpg",
              attachment :require('../assets/imgboy.jpeg')},
              {id:8, date:"9:50 am", type:'in',
              message: "Lorem ipsum dolor sit a met",
              attachment :require('../assets/imgboy.jpeg')},
              {id:9, date:"9:50 am", type:'in',
              message: "",
              messageimg:"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540neesi%252FU-portal/ImagePicker/3df37d06-b3e8-4719-bbc8-38bfc6ec8f54.jpg",
              attachment :require('../assets/imgboy.jpeg')},]

export default class ChatApp extends Component {

  static navigationOptions =  ({ navigation }) => {
  const { params = {} } = navigation.state
     return null
         };

  constructor(props) {
    super(props);
    this.state = {
       data: data,
       modalVisible: false,
       color: '',
       message:'',
       company : 2,
       firstMessage : null,
       uid : null,
       chatThreadPk : null,
       session : null,
       companyName : null,
       mascotName : null,
       mascotIcon : null,
       agentPk : null,
       starIcon :['md-star','md-star','md-star','md-star','md-star'],
       starRating : 5 ,
       rateColor:['#10254E','#10254E','#10254E','#10254E','#10254E'],
       attachModal:false,
       file:{},
    };
    async function requestReadPermission() {
      try {
        const { status } = await ImagePicker.getCameraRollPermissionsAsync(
          Permissions.getAsync(Permissions.CAMERA_ROLL),{
            title: 'Cool Photo App Camera Permission',
            message:'Cool Photo App needs access to your camera ' +
                      'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        if(status === 'granted') {
          console.log('You can Read');
        }else{
          console.log(' permission denied');
        }
      }catch (err) {
        console.warn(err);
      }
      try{
        const { status1 } = await ImagePicker.getCameraPermissionsAsync(
          Permissions.getAsync(Permissions.CAMERA),{
            title: 'Cool Photo App Camera Permission',
            buttonPositive: 'OK',
          },
        )
        if (status1 === 'granted') {
          console.log('You can Read');
        }else{
          console.log(' permission denied');
        }
      }catch(err){
        console.warn(err);
      }
    }
    requestReadPermission()
  }

  getPhotosFromGallery = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    this.setState({imgdoc:result.uri})
    console.log(this.state.imgdoc,'imgdoc')
  }

  openCamera = async() => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    this.setState({imgdoc:result.uri})
    console.log(this.state.imgdoc,'imgdoc')
  }

  componentDidMount(){}

  renderDate = (date) => {
    return(
      <Text style={[styles.text,{alignSelf:'flex-end',color:'#fff',fontSize:12,fontWeight:'400',marginRight:20}]}>
        {date}
      </Text>
    );
  }


  publishMessage = (message,messageimg)=>{
    var date=new Date();
    console.log("date in put : " , date);
    var abc  = date
    var hours = abc.getHours();
    var minutes = abc.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log( "will send the message ", message , "with chat thread " , this.state.chatThreadPk);
    var newdata=[];
    newdata.push({id:4,
                  date:strTime,
                  type:"out",
                  messageimg:messageimg,
                  message:message ,
                  attachment :require('../assets/imgboy.jpeg')})
    console.log(newdata,'newdata')
    this.textInput.clear()
     var arr=this.state.data
    arr.push(newdata[0])
    this.setState({data:arr})
    this.setState({id:'',date:"",type:"",messageimg:'',message:'',attachment:'',imgdoc:null})
    console.log(this.state.data,'data')
  }

  createNewChatThread = (message,messageimg)=>{
      this.publishMessage(message,messageimg)
  }

  sendMessage = (message,messageimg) => {
    if(message.length < 1) this.setState({message:' '}) ;
    if (this.state.chatThreadPk != null) {
      this.publishMessage(message,messageimg);
    }else{
    console.log('createNewChatThread')
      this.createNewChatThread(message,messageimg);
    }
  }

  userTextChanged = (text)=>{
    this.setState({message:text})
  }

  modalAttach = (event) => {
    this.setState({attachModal:!this.state.attachModal});
    if(event == 'gallery') this.getPhotosFromGallery();
    if(event == 'camera') {
     this.setState({ isCameraVisible: true });
     return this.openCamera()
    }
  };

  render() {
    return (
      <View style={[styles.container,{backgroundColor:'#000',width:'100%'}]}>
        <ScrollView
          ref='_scrollView'
          onContentSizeChange={()=>{this.refs._scrollView.scrollToEnd({animated:true});}}
        >
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor={(item,index)=>{return index.toString();}}
          renderItem={(message) => {
            const item = message.item;
            let inMessage = item.type === 'in';
            if( item.message == 'undefined') var m = ' ';
            else var m = item.message
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[ itemStyle]}>

                {inMessage &&
                  <View style={{flexDirection:'row',alignItems:'flex-start',borderWidth:1,
                        borderColor:'#000',backgroundColor:'#000',marginVertical:10}}>
                        <Image source={(item.attachment)}
                        style={{width:50,height:50,borderRadius:30}}/>
                        <View>
                          { item.message!=''&&
                            <View style={[styles.balloon,{backgroundColor:'#2f2f2f',
                                          marginHorizontal:10,marginBottom:10}]}>
                              <Text style={{color:'#fff'}}>{item.message}</Text>
                          </View>}
                          {item.messageimg&&
                            <View style={{height:210,width:210,alignItems:'center',backgroundColor:'#333333',borderRadius:17,justifyContent:'center'}}>
                            <Image source={{uri:item.messageimg}} style={{height:200,width:200,borderRadius:17}}/>
                          </View>}
                          {this.renderDate(item.date)}
                        </View>
                  </View>}
                {!inMessage &&
                  <View style={{flexDirection:'row',alignItems:'flex-start',borderWidth:1,
                        borderColor:'#000',backgroundColor:'#000',marginVertical:10}}>
                    <View>
                      { item.message!=''&&
                        <View style={[styles.balloon,{backgroundColor:'#fff',
                                marginHorizontal:10,marginBottom:10}]}>
                            <Text style={{color:'#000'}}>{item.message}</Text>
                      </View>}
                      {item.messageimg&&
                        <View style={{height:210,width:210,justifyContent:'center',alignItems:'center',backgroundColor:'#333333',borderRadius:17}}>
                        <Image source={{uri:item.messageimg}} style={{height:200,width:200,borderRadius:17}}/>
                      </View>}
                      {item.message==''&&<View>
                      <View style={styles.balloon}></View>
                      {this.renderDate(item.date)}</View>}
                    </View>
                    <Image source={(item.attachment)} style={{width:50,height:50,borderRadius:30}}/>
                 </View>}
              </View>
            )
          }}/>
          </ScrollView>

        <View style={[styles.footer,{backgroundColor:'#000',alignItems:'center',borderWidth:0}]}>

          {this.state.imgdoc!=null&&
            <View style={{height:80,width:'100%',alignItems:'center',justifyContent:'center',marginVertical:6,backgroundColor:'#363636',borderRadius:10}}>
          <Image source={{uri:this.state.imgdoc}} style={{height:50,width:250,borderRadius:10}}/>
          </View>}

          <View style={[styles.inputContainer,{backgroundColor:'#000'}]}>
            <TextInput style={[styles.inputs,{backgroundColor:'#2f2f2f',color:'#fff',
                            borderRadius:7,padding:6}]}
                placeholder="Type a message..."
                underlineColorAndroid='transparent'
                ref={input => { this.textInput = input }}
                onChangeText={(text) => this.userTextChanged(text)}/>
             <TouchableOpacity   onPress={() => this.modalAttach()} style={{marginHorizontal: 15,}}>
                <Icon type="ionicon" name="md-attach" color={'#fff'}  size={22} style={{textAlignVertical: 'center',}} />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.btnSend,{backgroundColor:this.state.color}]}
                  onPress={() => this.sendMessage(this.state.message,this.state.imgdoc)}>
                 <Icon type="ionicon" name= "md-send" color="#fff" style={{textAlignVertical:'center'}}/>
             </TouchableOpacity>
          </View>
        </View>

        <View style = { styles.modalcontainer }>
          <Modal isVisible={this.state.attachModal} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} onBackdropPress={() => {this.modalAttach()}}>
            <View style={[styles.modalView,{backgroundColor:"#333333",}]}>
               <Text style={{color:"#FFF",fontSize:20,alignSelf:'center',padding:10,fontWeight:'bold'}}>Attach Document</Text>
               <View style={{flexDirection: 'row',flexDirection: 'row',alignItems: 'center',justifyContent: 'center',paddingBottom:20,margin:0,marginTop: 20,}}>
                 <TouchableOpacity style={{flex: 1,}}  onPress={() => this.modalAttach('camera')}>
                    <View  style={{alignSelf:'center',}}>
                      <Icon type="ionicon" name='md-camera' color="#fff"  size={50} style={{textAlignVertical: 'center',}} />
                      <Text style={{color:"#FFF",fontSize:20,fontWeight:'bold'}}>Camera</Text>
                    </View>
                 </TouchableOpacity>
                  <TouchableOpacity  style={{flex: 1,}}  onPress={() => this.modalAttach('gallery')}>
                    <View style={{alignSelf:'center',}}>
                      <Icon type="ionicon" name='md-photos'  color="#fff" size={50} style={{textAlignVertical: 'center',}} />
                      <Text style={{color:"#FFF",fontSize:20,fontWeight:'bold'}}>Gallery</Text>
                    </View>
                  </TouchableOpacity>
              </View>
           </View>
         </Modal>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalcontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    marginHorizontal: 20 ,
    borderRadius:5,
  },
  signupTextCont:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  container:{
    flex:1,
  },
  list:{
    paddingHorizontal: 17,
    paddingBottom: 80,
  },
  footer:{
    position: 'absolute',
    bottom:0,right:0,
    width:'100%',
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
    borderWidth:1,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-start',
    marginLeft:15,
    fontSize:12,
    color:"#000",
  },
  timeout: {
    alignSelf: 'flex-end',
    marginRight:15,
    fontSize:12,
    color:"#000",
  },
  item: {
    marginVertical: 14,
    backgroundColor:'#fff',
    borderRadius:300,
    borderTopLeftRadius:0,
    padding:5,
  },
  itemout: {
    marginVertical: 14,
    backgroundColor:'#fff',
    borderRadius:300,
    borderTopRightRadius:0,
    padding:5,
  },
   iconContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 120
    },
});

// {inMessage &&
//   <View style={[styles.item,styles.balloon,{backgroundColor:'#000'}]}>
//     <HTML html={item.message}  />
//   </View>
//   }
//   {!inMessage &&
//   <View style={[styles.itemout,styles.balloon,{backgroundColor:this.state.color}]}>
//     <HTML html={m}   />
//   </View>
//   }
