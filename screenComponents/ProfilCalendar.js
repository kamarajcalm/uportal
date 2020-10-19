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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Modal from "react-native-modal";
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const day =1
const month= 1
const year= 2020
const date=new Date()
const dateString=date
const dateToString=date
const months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October","November", "December"];

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const presentdata=[{date:'Saturday,15 Aug',desc:'Holiday,73rd Indian Independance day '},
                   {date:'Wednesday,19 Aug',desc:'Class 4 Parents teachers meeting'},
                   {date:'Friday,28 Aug',desc:'Holiday,Vinayagar chathurthi celebration'},
                   {date:'Wed,02 Sept',desc:'Annual Sports day'},
                   {date:'Saturday,15 Aug',desc:'Holiday,73rd Indian Independance day '},
                   {date:'Wednesday,19 Aug',desc:'Class 4 Parents teachers meeting'},
                   {date:'Friday,28 Aug',desc:'Holiday,Vinayagar chathurthi celebration',},
                   {date:'Wed,02 Sept',desc:'Annual Sports day'},
                   {date:'Saturday,15 Aug',desc:'Holiday,73rd Indian Independance day '},
                    {date:'Wednesday,19 Aug',desc:'Class 4 Parents teachers meeting'},
                    {date:'Friday,28 Aug',desc:'Holiday,Vinayagar chathurthi celebration'},
                    {date:'Wed,02 Sept',desc:'Annual Sports day'},
                    {date:'Saturday,15 Aug',desc:'Holiday,73rd Indian Independance day '},
                    {date:'Wednesday,19 Aug',desc:'Class 4 Parents teachers meeting'},
                    {date:'Friday,28 Aug',desc:'Holiday,Vinayagar chathurthi celebration'},
                    {date:'Wed,02 Sept',desc:'Annual Sports day'},]

const dropdown=[{label:'CLASS I',label:'CLASS I'},
                {label:'CLASS I',label:'CLASS I'},
                {label:'CLASS I',label:'CLASS I'},
                {label:'CLASS I',label:'CLASS I'}]

class ProfilCalendar extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      date:new Date(),
      selectedStartDate: null,
      presentdata:presentdata,
      iconColour: "#bb5a51",
      day:1,
      selectedDay:null,
      holyday:true,
      present:false,
      absent:false,
      partial:false,
      modal:false,
      dropdown:dropdown,
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(day) {
    this.setState({
      selectedStartDate: day,
    });
  }

  componentDidMount(){
  }


  onDayPress = (day) => {
    this.setState({day:day});
  };



  calendars=()=>{
    return(
      <Calendar
        onVisibleMonthsChange={(months)=>{console.log(months,'months')}}
        current={this.state.date}
        minDate={'2012-05-10'}
        maxDate={'2022-05-30'}
        allowRangeSelection={true}
        onDayPress={(day) => {console.log('selected day', day);this.setState({selectedDay:day})}}
        onDayLongPress={(day) => {console.log('selected day', day)}}
        monthFormat={' MM  yyyy'}
        onMonthChange={(months) => {this.changeMonth(months)}}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        renderHeader={(date)=>{}}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={false}
        renderHeader={date => {
          return(
            <View>
              <Text style={[styles.text,{color:'#fff',fontSize:14,
                    fontWeight:'700'}]}>{months[date.getMonth()]}</Text>
            </View>
          )
        }}
        enableSwipeMonths={false}
        markedDates={this.state.markedDates}
        markedDates={{
          '2020-10-31':{customStyles:{
            container:{backgroundColor:'gray'},text:{color:'#fff',fontWeight:'bold'}}},
          '2020-10-15':{customStyles:{
            container:{backgroundColor:'#C60000'},text:{color:'#fff',fontWeight:'bold'}}},
          '2020-10-19':{customStyles:{
            container:{backgroundColor:'gray'},text:{color:'#fff',fontWeight:'bold'}}},
          '2020-10-2':{customStyles:{
            container:{backgroundColor:'#C60000'},text:{color:'#fff',fontWeight:'bold'}}},
          '2020-10-28':{customStyles:{
             container:{backgroundColor:'#C60000'},text:{color:'#fff',fontWeight:'bold'}}},
         }}
        markingType={'custom'}
        style={{borderWidth: 0,borderColor: 'gray',height: 350}}
        theme={{
            backgroundColor: '#000',
            calendarBackground: '#000',
            textSectionTitleColor: '#515151',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#f5eb00',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#ffffff',
            todayBackgroundColor:"#0c20cd",
            todayBorderRadius:30,
            selectedDayColor:"#FFC926",
            dayTextColor: '#ffffff',
            textDisabledColor: '#8f8181',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#fff',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#fff',
            indicatorColor: '#fff',
            textDayFontFamily: fontFamily,
            textMonthFontFamily: fontFamily,
            textDayHeaderFontFamily: fontFamily,
            textDayFontWeight: '400',
            textMonthFontWeight: '700',
            textDayHeaderFontWeight: '400',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14
          }}
      />
    )
  }

  changeMonth=(arr)=>{
       console.log(arr,'kkkkk');
  }

  calendarlist=()=>{
    return(
      <CalendarList
          onVisibleMonthsChange={(months)=>{this.changeMonth(months)}}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          horizontal={true}
          pagingEnabled={true}
          showScrollIndicator={true}
          markedDates={this.state.markedDates}
      />
    )
  }



  events=()=>{
    return(
      <View>
        <FlatList style={{}}
          data={this.state.presentdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View>
            <Text style={[styles.text,{color:'#828282',fontSize:14,
                          fontWeight:'700'}]}>{item.date}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:14,
                          fontWeight:'700'}]}>{item.desc}</Text>
            <View style={{borderWidth:0.2,borderColor:'#fff',marginVertical:15}}></View>
          </View>
        )}
       />
      </View>
    )
  }

  dropdown=()=>{
    return(
      <View style={{justifyContent:'flex-end',alignSelf:'flex-end',}}>
        <DropDownPicker
            items={this.state.dropdown}
            defaultNull={ null}
            dropDownStyle={{backgroundColor:'#464545',borderWidth:0}}
            defaultValue={this.state.drop}
            placeholder="CHOOSE"
            arrowColor={'#fff'}
            dropDownMaxHeight={width}
            style={{backgroundColor:'#464545',borderWidth:1,borderColor:'#464545'}}
            placeholderStyle={{fontWeight:'bold',color:'#fff'}}
            labelStyle={{fontSize:14,color:'#fff'}}
            containerStyle={{height:40,width:width*0.45}}
            onChangeItem={item =>this.setState({drop:item.value})}
        />
      </View>
    )
  }

  reminderModal=()=>{
    return(
      <View>
        <Modal isVisible={this.state.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            hasBackdrop={true}
            backdropColor={'transparent'}
            onBackdropPress={()=>{this.setState({modal:false});}}>
              <View style={{paddingVertical:20,alignItems:'center',
                            paddingHorizontal:20,backgroundColor:'#333333',borderRadius:10,
                            }}>
                {this.state.proceed==true?
                <View style={{}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',
                          alignItems:'flex-start'}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,paddingVertical:4,
                                fontWeight:'700'}]}>Remind what?* </Text>
                    <View style={{paddingLeft:20,height:100,borderRadius:10,
                                  width:width*0.45,backgroundColor:'#464545'}}></View>
                  </View>
                  <TouchableOpacity style={{marginTop:40,padding:10,borderRadius:10,
                                  width:width*0.45,backgroundColor:'#464545',alignSelf:'center'}}
                    onPress={()=>{this.setState({modal:false,proceed:false});}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,
                          fontWeight:'700',textAlign:'center'}]}>SUBMEET</Text>
                  </TouchableOpacity>
                </View>:<View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',
                        alignItems:'center'}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,paddingVertical:4,
                              fontWeight:'700'}]}>Select class</Text>
                    <View style={{paddingLeft:20}}>{this.dropdown()}</View>
                  </View>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,
                      fontWeight:'700',textAlign:'center'}]}>OR</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',
                        alignItems:'center',}}>
                    <Text numberOfLines={2} style={[styles.text,{color:'#fff',fontSize:16,paddingVertical:4,
                        fontWeight:'700',width:width*0.27}]}>Enter name / unique id</Text>
                    <View style={{paddingLeft:20,height:50,borderRadius:10,
                    width:width*0.45,backgroundColor:'#464545'}}></View>
                  </View>
                  <TouchableOpacity
                      style={{marginTop:40,padding:10,borderRadius:10,
                          width:width*0.45,backgroundColor:'#464545',alignSelf:'center'}}
                      onPress={()=>{this.setState({proceed:true})}}>
                      <Text style={[styles.text,{color:'#fff',fontSize:14,
                          fontWeight:'700',textAlign:'center'}]}>PROCEED</Text>
                  </TouchableOpacity>
                </View>}
              </View>
        </Modal>
      </View>
    )
  }

  render(){

    let date =this.state.date.toDateString()
    let date1=days[this.state.date.getDay()]+", "+this.state.date.getDate() + " "+ months[this.state.date.getMonth()] +" "+ this.state.date.getFullYear();
    var schoolStafCal =this.props.navigation.getParam('schoolStafCal',null);
    console.log(schoolStafCal,'schoolStafCal')

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'CALENDAR AND REMINDERS'}
            screen={'ProfilCalendar'}/>
          <ScrollView style={{flex:1,paddingVertical:20,}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',
                    textAlign:'center'}]}>{date}</Text>
              <View style={{marginHorizontal:15}}>
                {this.calendars()}
                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',
                        textAlign:'left',paddingVertical:10,paddingHorizontal:10}]}>EVENTS</Text>
                <View>
                  {schoolStafCal!=null&&<View>
                    {this.state.selectedDay!=null&&
                    <View style={{flexDirection:'row',justifyContent:'space-between',
                                  alignItems:'center',borderWidth:1,borderRadius:10,
                                  borderColor:'#fff',padding:10,margin:2,marginBottom:20}}>
                      <Text style={[styles.text,{color:'#fff'}]}>{new Date(this.state.selectedDay.dateString).getDate()+ " "+ months[new Date(this.state.selectedDay.dateString).getMonth()] +" "+ new Date(this.state.selectedDay.dateString).getFullYear()}</Text>
                      <TouchableOpacity style={{padding:6,backgroundColor:'red',borderRadius:10}}
                          onPress={()=>{this.setState({modal:true})}}>
                          <Text style={[styles.text,{color:'#fff'}]}>REMIND</Text>
                      </TouchableOpacity>
                    </View>}
                  </View>}
                  <View style={{marginHorizontal:10}}>{this.events()}</View>
                </View>
              </View>
          </ScrollView>
          {this.reminderModal()}
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilCalendar);
