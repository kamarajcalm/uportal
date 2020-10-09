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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

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
const months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September", "October",
                "November", "December"];

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
renderHeader=(date)=>{
  return(
    <View>
    <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>{months[date.getMonth()]}</Text>
    </View>
  )
}

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
      renderHeader={(date) => {this.renderHeader(date)}}
      enableSwipeMonths={false}
      markedDates={{
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
                  onVisibleMonthsChange={(months) => {this.changeMonth(months)}}
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
      <FlatList style={{}} data={this.state.presentdata} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
        <View>
          <Text style={[styles.text,{color:'#828282',fontSize:14,fontWeight:'700'}]}>{item.date}</Text>
          <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>{item.desc}</Text>
        <View style={{borderWidth:0.2,borderColor:'#fff',marginVertical:15}}></View>
        </View>
      )}
     />
    </View>
  )
}
  render() {
    let date =this.state.date.toDateString()
    let date1=days[this.state.date.getDay()]+", "+this.state.date.getDate() + " "+ months[this.state.date.getMonth()] +" "+ this.state.date.getFullYear();
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'CALENDAR AND REMINDERS'}
            screen={'ProfilCalendar'}/>
            <ScrollView style={{flex:1,paddingVertical:20,}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',textAlign:'center'}]}>{date}</Text>
              <View style={{marginHorizontal:15}}>
                {this.calendars()}

                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',textAlign:'left',paddingVertical:10,paddingHorizontal:10}]}>EVENTS</Text>
                <View>



                <View style={{marginHorizontal:10}}>{this.events()}</View>
                </View>

              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilCalendar);
