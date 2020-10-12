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



class BarStatus extends Component<{}> {

render() {
    return (
      <StatusBar
         backgroundColor="#000"
         barStyle="light-content"
      />

   );
  }
}

const styless = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10,
    color:'#fff',
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
})


const serverURL = "https://app.syrow.com"
const wamp_prefix = "uniqueKey123.";
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class ChatApp extends Component {



  static navigationOptions =  ({ navigation }) => {
  const { params = {} } = navigation.state
     return {
          headerLeft: (
                 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginLeft:15 }}>
                  <TouchableOpacity  onPress={() => params.searchWorkouts()}  ><Icon type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-arrow-back"} color="#fff" style={{textAlignVertical: 'center'}}/></TouchableOpacity  >
                <Image
                     source={{uri : params.getDisplayPic}}
                     style={{ width: 40, height: 40, borderRadius: 40/2,marginLeft:10 ,marginRight:15 }}
                 />
                 </View>
              ),
           title: params.getAgentName,
           headerStyle: {
                 backgroundColor: params.themeColor,
               },
            headerTintColor: '#fff',
             headerRight: (
                  <View style={styless.iconContainer}>
                    <View style={{width: 12,height: 12,borderRadius: 44,backgroundColor:'green', alignSelf:"center"}} />
                  </View>
                ),
               headerTitleStyle: {
                  alignSelf: 'center',
                  marginLeft:50,

                }
               }
         };

  constructor(props) {
    super(props);
    this.state = {
       data: [],
       modalVisible: false,
       color: '',
       message:'',
       company : 2,
       firstMessage : null,
       uid : null,
       chatThreadPk : null,
       session : null,
       connection : new wamp.Connection({url: 'wss://ws.syrow.com:443/ws', realm: 'default'}),
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
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can Read');
        } else {
          console.log(' permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestReadPermission()


  }

        getPhotosFromGallery = () =>{

          return FilePickerManager.showFilePicker(null, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              return
            }
            else if (response.error) {
              return
            }
            else {
              this.setState({
                file: response
              });
              const photo = {
                uri: response.uri,
                type: response.type,
                name:response.fileName,
                data: response.data
              };
              this.textInput.clear()
              let dataToPublish = [this.state.uid, 'M', photo, this.state.company, false, this.state.chatThreadPk, this.state.companyName, this.state.company]

              this.state.connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish, {}, {
                acknowledge: true
              })

              this.setState(prevState => ({
                data: [ ...prevState.data, photo],
              }))

            }
          });
        }



  supportChat = (args)=>{
    console.log(args);

    if (args[0] == 'M') {
      args[1].type = 'in';
      args[1].timeDate = this.timeWithDate(new Date());
      this.setState(prevState => ({
        data: [  ...prevState.data, args[1]],
        agentPk : args[1].user
      }))
    }else if (args[0] == 'MF') {
      //args[1].filePk

      fetch(serverURL + "/api/support/supportChat/" + args[1].filePk + '/')
      .then((response) => response.json())
      .then((responseJson) => {

        responseJson.type = 'in';
        responseJson.timeDate = this.timeWithDate(new Date());
        responseJson.message = '<img src="'+ responseJson.attachment +'" >' ;
        this.setState(prevState => ({
          data: [  ...prevState.data, responseJson],
          agentPk : responseJson.user
        }))



      })
      .catch((error) => {
        console.error(error);
      });





    }else if (args[0] == 'ML') {

      if (args[1].attachmentType == 'youtubeLink') {
        args[1].message = '<a href="'+args[1].message+'">'+ args[1].message +'</a>';
        args[1].type = 'in';
        this.setState(prevState => ({
          data: [  ...prevState.data, args[1]],
          agentPk : args[1].user
        }))
      }

    }

    // if (args.length >2) {
    //   this.props.navigation.setParams({
    //     getAgentName: args[2].last_name,
    //     getDisplayPic : args[2].agentDp,
    //   });
    // }


  }



  checkHeartBeat = (args)=>{
    console.log(args);
    if (args[0]=='isOnline' ) {
        console.log(this.state.uid,'is publishing i am online');
        this.state.connection.session.publish(wamp_prefix+'service.support.checkHeartBeat.'+args[2], ['iAmOnline', this.state.uid, args[2]] , {}, {
          acknowledge: true
        }).
        then(function(publication) {
        },function(){
        });
      }

      // if (agentPk && args[0]=='iAmOnline' && args[1]==agentPk && args[2]==uid) {
      //   isAgentOnline = true;
      //   onlineStatus.innerHTML = 'Online';
      //   clearTimeout(agentOnlineTimeOut);
      // }
  }

  componentDidMount() {


    this.state.connection.onopen = (session)=>{
      this.setState({session : session});
       // 1) subscribe to a topic

       console.log('subscribing to' , wamp_prefix+'service.support.chat.' + this.state.uid);

      session.subscribe(wamp_prefix+'service.support.chat.' + this.state.uid, this.supportChat).then(
      (sub) => {
      },
      (err) => {
        console.log("failed to subscribe: service.support.chat"+err);
      });


      session.subscribe(wamp_prefix+'service.support.checkHeartBeat.'+this.state.uid, this.checkHeartBeat).then(
      function (res) {
        console.log("subscribed to service.support.createDetailCookie'");
      },
      function (err) {
        console.log("failed to subscribe: service.support.createDetailCookie");
      }
    );

    };

    this.state.connection.open();

    AsyncStorage.getItem('uid').then((value) => {
      if(value == null){
        console.log("reseting the UID");
        AsyncStorage.setItem('uid', ''+ new Date().getTime());
        this.setState({uid : value});
        return;
      }
      this.setState({uid : value});

      fetch(serverURL + "/api/support/supportChat/?uid=" + value)
      .then((response) => response.json())
      .then((responseJson) => {

        for (var i = 0; i < responseJson.length; i++) {
          console.log(responseJson[i]);
          responseJson[i].timeDate = this.timeWithDate(new Date(responseJson[i].created));
          if (responseJson[i].sentByAgent == true) {
            responseJson[i].type = 'in';
          }else{
            responseJson[i].type = 'out';
            responseJson[i].message = '<div style="color:white;">' + responseJson[i].message + '</div>';
          }

          if (responseJson[i].attachmentType == 'image') {
            responseJson[i].message = '<img style="width:50%;" src="'+ responseJson[i].attachment +'" >' ;
          }else if (responseJson[i].attachmentType == 'youtubeLink') {
            responseJson[i].message = '<a href="'+responseJson[i].message+'">'+ responseJson[i].message +'</a>';
            responseJson[i].type = 'in';
            this.setState(prevState => ({
              data: [  ...prevState.data, responseJson[i]]
            }))
          }

        }

        this.setState(prevState => ({
          data: [  ...prevState.data, ...responseJson]
        }))



      })
      .catch((error) => {
        console.error(error);
      });


      // AsyncStorage.removeItem('uid');
      // AsyncStorage.removeItem('chatThreadPk');

    })

    AsyncStorage.getItem('chatThreadPk').then((value) => {
      this.setState({chatThreadPk : value});
    })

    // Alert.alert('Loaded!')
    fetch( serverURL + '/api/support/customerProfile/?service=' + this.state.company)
    .then((response) => response.json())
    .then((responseJson) => {


      if(responseJson[0] == 'undefined') this.setState({color:'#f3961d'});
      else  this.setState({color:responseJson[0]['windowColor'] , firstMessage : responseJson[0]['firstMessage'] , companyName :  "iOS" });

      this.setState(prevState => ({
        data: [ {pk:0, type:'in',  message: responseJson[0]['firstMessage'] }, ...prevState.data],
        mascotIcon : responseJson[0]['dp'],
        mascotName : responseJson[0]['name'],
      }))

      // this.props.navigation.setParams({
      //   getAgentName: responseJson[0]['name'],
      //   getDisplayPic : responseJson[0]['dp'],
      //   themeColor : responseJson[0]['windowColor'],
      // });

    })
    .catch((error) => {
      console.error(error);
    });


    // this.props.navigation.setParams({
    //   searchWorkouts: this.searchWorkoutHandler,
    // });
    //
    // this.props.navigation.setParams({
    //   getAgentName: "Pradeep",
    // });
  }

  timeWithDate=(date)=> {
    console.log("date in put : " , date);
    var abc  = date
    var hours = abc.getHours();
    var minutes = abc.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime
  }

  publishMessage = (message)=>{
    console.log( "will send the message ", message , "with chat thread " , this.state.chatThreadPk);
    this.textInput.clear()
    fetch(serverURL + "/api/support/supportChat/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sentByAgent: false,
        uid : this.state.uid,
        is_hidden : false,
        created : new Date(),
        timeDate : this.timeWithDate(new Date())
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      let dataToPublish = [this.state.uid, 'M', responseJson, this.state.company, false, this.state.chatThreadPk, this.state.companyName, this.state.company]

      this.state.connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish, {}, {
        acknowledge: true
      })
      responseJson.message = '<div style="color:white;">' + responseJson.message + '</div>';
      responseJson.timeDate = this.timeWithDate(new Date())
      this.setState(prevState => ({
        data: [ ...prevState.data, responseJson],
      }))
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  createNewChatThread = (message)=>{
    fetch(serverURL + "/api/support/chatThread/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company: this.state.company,
        firstMessage: this.state.firstMessage,
        uid : this.state.uid
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.publishMessage(message)
      this.setState({chatThreadPk : responseJson.pk})
      AsyncStorage.setItem('chatThreadPk', ''+ responseJson.pk);

    })
    .catch((error) => {
      console.error(error);
      this.publishMessage(message)
    });;
  }

  sendMessage = (message) => {
    if(message.length < 1) this.setState({message:'   '}) ;
    if (this.state.chatThreadPk != null) {
      this.publishMessage(message);
    }else{
    console.log('createNewChatThread')
      this.createNewChatThread(message);
    }



  }

  userTextChanged = (text)=>{
    this.setState({message:text})
    if (this.state.agentPk == null) {
      return;
    }
    this.state.connection.session.publish(wamp_prefix+'service.support.agent.'+ this.state.agentPk, [this.state.uid , 'T' , text] , {}, {
        acknowledge: true
    })
  }

 // searchWorkoutHandler = () => {
 //   if (this.state.data.length >1) {
 //     if(this.state.modalVisible == false) this.setState({modalVisible:true});
 //     else this.setState({modalVisible:false})
 //   }
 //  };

  modalAttach = (event) => {

    this.setState({attachModal:!this.state.attachModal});
    if(event == 'gallery') this.getPhotosFromGallery();
    if(event == 'camera') {
     this.setState({ isCameraVisible: true });
     return this.openCamera()


    }


  };


  resetChat = ()=>{
    var uid = ''+ new Date().getTime();
    AsyncStorage.setItem('uid', uid);
    AsyncStorage.removeItem('chatThreadPk');
    this.setState({chatThreadPk : null, uid : uid , data : [{pk:0, type:'in',  message: this.state.firstMessage }]});
    // this.props.navigation.setParams({
    //   getAgentName: this.state.mascotName,
    //   getDisplayPic : this.state.mascotIcon,
    // });
    this.state.connection.onopen(this.state.connection._session)

    var dataToSend = {uid:this.state.uid , userEndedChat: 'CHAT CLOSED BY USER' , sentByAgent:false };
    this.state.connection.session.publish(wamp_prefix+'service.support.agent.'+this.state.agentPk, [this.state.uid , 'CL' , dataToSend ] , {}, {
       acknowledge: true
     })
  }

  setModalVisible = (feedback)=> {
    if (feedback == undefined || feedback == null) {
      this.resetChat();
      this.setState({modalVisible: false});
    }else{
      console.log(feedback);
      var dataToSend = {uid:this.state.uid , usersFeedback:feedback  , rating:this.state.starRating , sentByAgent:false };

       this.state.connection.session.publish(wamp_prefix+'service.support.agent.'+ this.state.agentPk, [this.state.uid , 'FB' , dataToSend ] , {}, {
         acknowledge: true
       })

     this.resetChat();

      this.setState({modalVisible: false});
    }
 }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }


 rating = (count) => {
  let arr = ['#000','#000','#000','#000','#000'];
  let starIcon =['md-star-outline','md-star-outline','md-star-outline','md-star-outline','md-star-outline'];
    arr.forEach((val,index)=>{
      if(index > count-1) return ;
      arr[index] = '#10254E'
     }) ;
     starIcon.forEach((val,index)=>{
      if(index > count-1) return ;
      starIcon[index] = 'md-star'
     })


  this.setState({starIcon:starIcon});
  this.setState({rateColor:arr});
  this.setState({starRating:count});
   console.log(this.state.rateColor,'p1p1p1p1pp')

 }





  openCamera = () => {
    return ImagePicker.launchCameraAsync(options, (response) => {
               if (response.didCancel) {
                 console.log('User cancelled image picker');
               } else if (response.error) {
                 console.log('ImagePicker Error: ', response.error);
               } else if (response.customButton) {
                 console.log('User tapped custom button: ', response.customButton);
               } else {
                 const source = { uri: response.uri };

                 // You can also display the image using data:
//                  const source = { uri: 'data:image/jpeg;base64,' + response.data };

                 this.setState({
                   avatarSource: source,
                 });

                 // let img = new FormData();
                 const photo = {
                   uri: response.uri,
                   type: response.type,
                   name:response.fileName,
                   data: response.data
                 };

                 // img.append('attachmentType', 'image');
                 // img.append('uid' , this.state.uid);
                 // img.append('attachment', photo);

                 this.textInput.clear()
                 // fetch(serverURL + "/api/support/supportChat/", {
                 //   method: 'POST',
                 //   headers: {
                 //     Accept: 'application/json',
                 //     'Content-Type': 'multipart/form-data',
                 //   },
                 //   body: img,
                 // }).then((response) => {
                 // console.log(response.status,'jjjjjjjjjjjjjjjjjjjjjjjj') ;
                 // return response.json()})
                 // .then((responseJson) => {
                 //   console.log(responseJson)
                   let dataToPublish = [this.state.uid, 'M', photo, this.state.company, false, this.state.chatThreadPk, this.state.companyName, this.state.company]

                   this.state.connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish, {}, {
                     acknowledge: true
                   })
                   // responseJson.message = '<img style="width:50%;height:30%" src="'+ responseJson.attachment +'" >' ;
                   // responseJson.timeDate = this.timeWithDate(new Date())
                   this.setState(prevState => ({
                     data: [ ...prevState.data, photo],
                   }))
                 // })
                 // .catch((error) => {
                 //   console.error(error);
                 // });
    };
  })

}


  render() {

    return (
      <View style={[styles.container,{width:'100%'}]}>


        <ScrollView

          ref='_scrollView'
          onContentSizeChange={() => { this.refs._scrollView.scrollToEnd({animated: true}); }}
        >
        <FlatList style={styles.list}
//          inverted
          data={this.state.data}
          keyExtractor= {(item , index) => {
            return index.toString();
          }}
          renderItem={(message) => {
            const item = message.item;
            let inMessage = item.type === 'in';
            if(item.message.length < 1 || item.message == 'undefined') var m = ' ';
            else var m = item.message
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[ itemStyle]}>
              {inMessage &&
                <View style={[styles.item,styles.balloon,{color:'#fff',backgroundColor:'#2F2F2F',}]}>
                  <HTML html={item.message}  style={{color:'#fff'}}/>
                </View>
                }
                {!inMessage &&
                <View style={[styles.itemout,styles.balloon,{backgroundColor:'#B0B0B0',}]}>
                  <HTML html={m}  />
                </View>
                }
                {inMessage && <Text style={styles.time}>{item.timeDate}</Text>}
                {!inMessage && <Text style={styles.timeout}>{item.timeDate}</Text>}

              </View>

            )
          }}/>
          </ScrollView>

        <View style={[styles.footer,{alignItems:'center',backgroundColor:'#000'}]}>
          <View style={[styles.inputContainer,{borderRadius:7,backgroundColor:'#2F2F2F'}]}>
            <TextInput style={[styles.inputs,{color:'#fff'}]}
                placeholder="Enter your message here"
                placeholderTextColor={'#828282'}
                underlineColorAndroid='transparent'
                ref={input => { this.textInput = input }}
                onChangeText={(text) => this.userTextChanged(text)}/>

          </View>
          <TouchableOpacity   onPress={() => this.modalAttach()} style={{marginHorizontal: 15,}}>
             <Icon type="ionicon" name="md-attach" color={'#fff'}  size={24} style={{textAlignVertical: 'center',}} />
          </TouchableOpacity>

            <TouchableOpacity style={[styles.btnSend,{backgroundColor:'#000'}]} onPress={() => this.sendMessage(this.state.message)}>
                <Icon type="ionicon" name= "md-send" color="#fff" style={{textAlignVertical: 'center'}}/>
            </TouchableOpacity>

        </View>

        <View style = { styles.modalcontainer }>
       <Modal isVisible={this.state.modalVisible} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} >
         <View style={styles.modalView}>
         <View style={styles.signupTextCont}>
             <TouchableOpacity   onPress={() => this.rating(1)}>
                <Icon type="ionicon" name={this.state.starIcon[0]} color={this.state.rateColor[0]}  size={32} style={{textAlignVertical: 'center',}} />
             </TouchableOpacity>
             <TouchableOpacity   onPress={() => this.rating(2)}>
                <Icon type="ionicon" name={this.state.starIcon[1]}  color={this.state.rateColor[1]} size={32} style={{textAlignVertical: 'center',}} />
             </TouchableOpacity>
             <TouchableOpacity   onPress={() => this.rating(3)}>
                <Icon type="ionicon" name={this.state.starIcon[2]}  color={this.state.rateColor[2]} size={32} style={{textAlignVertical: 'center',}} />
             </TouchableOpacity>
             <TouchableOpacity   onPress={() => this.rating(4)}>
                <Icon type="ionicon" name={this.state.starIcon[3]}  color={this.state.rateColor[3]} size={32} style={{textAlignVertical: 'center',}} />
             </TouchableOpacity>
             <TouchableOpacity   onPress={() => this.rating(5)}>
                <Icon type="ionicon" name={this.state.starIcon[4]}  color={this.state.rateColor[4]}  size={32} style={{textAlignVertical: 'center',}} />
             </TouchableOpacity>
          </View>
           <TextInput
                   style={{height: 150, borderWidth: 0, marginTop: 0,paddingHorizontal:20,fontSize:18,}}
                   underlineColorAndroid='#fff'
                   multiline={true}
                   numberOfLines={5}
                   placeholder="Write your review here"
                   onChangeText={(text) => this.setState({feedback:text})}
             />
         <View style={{flexDirection: 'row',flexDirection: 'row',alignItems: 'center',justifyContent: 'center',padding:0,margin:0,marginTop: 20,}}>
           <TouchableOpacity style={{flex: 1,backgroundColor:"#fff",borderWidth:1,borderColor:'#c2c2c2'}}  onPress={() => this.setModalVisible()}>
              <View  style={{alignSelf:'center',}}>
                <Text style={{color:"#000",fontSize:17,paddingVertical:8}}>Next Time</Text>
              </View>
           </TouchableOpacity>
            <TouchableOpacity  style={{flex: 1,backgroundColor:"#10254E",borderWidth:1,borderColor:'#10254E'}}  onPress={() => this.setModalVisible(this.state.feedback)}>
              <View style={{alignSelf:'center',}}>
                <Text style={{color:"#fff",fontSize:17,paddingVertical:8}}>Submit</Text>
              </View>
            </TouchableOpacity>
         </View>
         </View>
       </Modal>
        </View>

        <View style = { styles.modalcontainer }>
          <Modal isVisible={this.state.attachModal} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} onBackdropPress={() => {this.modalAttach()}}>
            <View style={[styles.modalView,{backgroundColor:"#10254E",}]}>
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
//      padding: 20,
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
    backgroundColor:'#000'
  },
  list:{
    paddingHorizontal: 17,
    paddingBottom: 80,

  },
  footer:{
   position: 'absolute',
    bottom:0,alignSelf:'center',
    flexDirection: 'row',
    width:'100%',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
//    backgroundColor:color,
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
//    borderColor: color,
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
    color:"#fff",
  },
  timeout: {
    alignSelf: 'flex-end',
    marginRight:15,
    fontSize:12,
    color:"#fff",
  },
  item: {
    marginVertical: 14,
    backgroundColor:'#fff',
    borderRadius:300,

    padding:5,
    color:'#fff'

//    flex: 1,
//    flexDirection: 'row',
//    backgroundColor:"#eeeeee",
//    borderRadius:300,
//    padding:5,
  },
  itemout: {
    marginVertical: 14,
    backgroundColor:'#fff',
    borderRadius:300,

    padding:5,
  },
   iconContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 120
    },
});
