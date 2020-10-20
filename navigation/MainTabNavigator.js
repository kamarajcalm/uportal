import React from 'react';
import { Platform ,Image,View,TouchableOpacity} from 'react-native';
import { FontAwesome ,Ionicons,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';
import { createAppContainer,createSwitchNavigator,withNavigation} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import settings from '../appSettings';

const loginType = settings.loginType

import Home from '../screens/Home';
import PageFirst from '../screens/PageFirst';
import PageSecond from '../screens/PageSecond';
import PageThird from '../screens/PageThird';
import PageFourth from '../screens/PageFourth';
import OtpLogin from '../OtpBasedLogin/OtpLogin';
import OtpScreen from '../OtpBasedLogin/OtpScreen';
import DrawerContent from '../navigationComponents/DrawerContent';

import CollegeStudProfile from '../forthpage/CollegeStudProfile';
import CollegeStafProfile from '../forthpage/CollegeStafProfile';
import CollegeAdProfile from '../forthpage/CollegeAdProfile';
import SchoolStudProfile from '../forthpage/SchoolStudProfile';
import SchoolStafProfile from '../forthpage/SchoolStafProfile';
import SchoolAdProfile from '../forthpage/SchoolAdProfile';

import ProfileForms from '../screenComponents/ProfileForms';
import ProfileFillForm from '../screenComponents/ProfileFillForm';
import ProfileLibrary from '../screenComponents/ProfileLibrary';
import ProfileFacultyDetails from '../screenComponents/ProfileFacultyDetails';
import PFacultyDetailsCarousel from '../screenComponents/PFacultyDetailsCarousel';
import ProfileFeedback from '../screenComponents/ProfileFeedback';
import ProfileSetting from '../screenComponents/ProfileSetting';
import LinkEmail from '../screenComponents/LinkEmail';
import Language from '../screenComponents/Language';
import ChangePassword from '../screenComponents/ChangePassword';
import ProfileSyllabus from '../screenComponents/ProfileSyllabus';
import ProfileMedia from '../screenComponents/ProfileMedia';
import ProfileMediaChoose from '../screenComponents/ProfileMediaChoose';
import MediaNotesVideo from '../screenComponents/MediaNotesVideo';
import NotesVideosData from '../screenComponents/NotesVideosData';
import MediaUniversity from '../screenComponents/MediaUniversity';
import MediaDepart from '../screenComponents/MediaDepart';
import ProfileQuestionPaper from '../screenComponents/ProfileQuestionPaper';
import QuestionPaper from '../screenComponents/QuestionPaper';
import ProfileStatistics from '../screenComponents/ProfileStatistics';
import StaticsAcademic from '../screenComponents/StaticsAcademic';
import ProfileRank from '../screenComponents/ProfileRank';

import ProfilCalendar from '../screenComponents/ProfilCalendar';
import Notes from '../screenComponents/Notes';
import MyWallScreen from '../screenComponents/MyWallScreen';

import TeachersWall from '../screenComponents/TeachersWall';
import InfoScreen from '../screenComponents/InfoScreen';
import FacStuDetails from '../screenComponents/FacStuDetails';

import ChooseType from '../type/ChooseType';

import SchoolStafMarks from '../screenComponents/SchoolStafMarks';
import ChooseSubject from '../screenComponents/ChooseSubject';
import SchoolStafAttendance from '../screenComponents/SchoolStafAttendance';
import ChoosePeriod from '../screenComponents/ChoosePeriod';
import TakeAttendace from '../screenComponents/TakeAttendace';
import OtherAttendance from '../screenComponents/OtherAttendance';
import StafChooseSec from '../screenComponents/StafChooseSec';
import StafChooseSubject from '../screenComponents/StafChooseSubject';
import SchoolStafStatistics from '../screenComponents/SchoolStafStatistics';
import SchoolStafRank from '../screenComponents/SchoolStafRank';
import SchoolStafMedia from '../screenComponents/SchoolStafMedia';
import SchoolStafMediaChoose from '../screenComponents/SchoolStafMediaChoose';
import MediaChooseSubject from '../screenComponents/MediaChooseSubject';
import SchoolStafRemark from '../screenComponents/SchoolStafRemark';

import ProfileMarks from '../screenComponents/ProfileMarks';
import ProfileAttendance from '../screenComponents/ProfileAttendance';

import ProfileSchoolMarks from '../screenComponents/ProfileSchoolMarks';

import SchoolAdminMarks from '../screenComponents/SchoolAdminMarks';
import SchoolAdminAttendance from '../screenComponents/SchoolAdminAttendance';
import ChooseSec from '../screenComponents/ChooseSec';
import StudentAttendance from '../screenComponents/StudentAttendance';
import SchoolAdminStatics from '../screenComponents/SchoolAdminStatics';
import Semester from '../screenComponents/Semester';

const HomeStack = createStackNavigator({
   Home:Home,
   MyWallScreen:MyWallScreen,
   Notes:Notes,
},
{
  initialRouteName: 'Home',
});

const PageFirstStack = createStackNavigator({
   PageFirst:PageFirst,
},
{
  initialRouteName: 'PageFirst',
});

const PageSecondStack = createStackNavigator({
   PageSecond:PageSecond,
   TeachersWall:TeachersWall,
   InfoScreen:InfoScreen,
   FacStuDetails:FacStuDetails
},
{
  initialRouteName: 'PageSecond',
});

const PageThirdStack = createStackNavigator({
   PageThird:PageThird,
},
{
  initialRouteName: 'PageThird',
});

const PageFourthStack = createStackNavigator({
   PageFourth:PageFourth,

   CollegeStudProfile:CollegeStudProfile,
   CollegeStafProfile:CollegeStafProfile,
   CollegeAdProfile:CollegeAdProfile,
   SchoolStudProfile:SchoolStudProfile,
   SchoolStafProfile:SchoolStafProfile,
   SchoolAdProfile:SchoolAdProfile,

   ProfileForms:ProfileForms,
   ProfileFillForm:ProfileFillForm,
   ProfileLibrary:ProfileLibrary,
   ProfileFacultyDetails:ProfileFacultyDetails,
   PFacultyDetailsCarousel:PFacultyDetailsCarousel,
   ProfileFeedback:ProfileFeedback,
   ProfileSetting:ProfileSetting,
   LinkEmail:LinkEmail,
   Language:Language,
   ChangePassword:ChangePassword,
   ProfileSyllabus:ProfileSyllabus,
   ProfileMedia:ProfileMedia,
   ProfileMediaChoose:ProfileMediaChoose,
   MediaNotesVideo:MediaNotesVideo,
   NotesVideosData:NotesVideosData,
   MediaUniversity:MediaUniversity,
   MediaDepart:MediaDepart,
   ProfileQuestionPaper:ProfileQuestionPaper,
   QuestionPaper:QuestionPaper,
   ProfileStatistics:ProfileStatistics,
   StaticsAcademic:StaticsAcademic,
   ProfilCalendar:ProfilCalendar,
   ProfileRank:ProfileRank,

   SchoolStafMarks:SchoolStafMarks,
   ChooseSubject:ChooseSubject,
   ChoosePeriod:ChoosePeriod,
   SchoolStafAttendance:SchoolStafAttendance,
   TakeAttendace:TakeAttendace,
   OtherAttendance:OtherAttendance,
   StafChooseSec:StafChooseSec,
   StafChooseSubject:StafChooseSubject,
   SchoolStafStatistics:SchoolStafStatistics,
   SchoolStafRank:SchoolStafRank,
   SchoolStafMedia:SchoolStafMedia,
   SchoolStafMediaChoose:SchoolStafMediaChoose,
   MediaChooseSubject:MediaChooseSubject,
   SchoolStafRemark:SchoolStafRemark,

   ProfileMarks:ProfileMarks,
   ProfileAttendance:ProfileAttendance,

   ProfileSchoolMarks:ProfileSchoolMarks,

   SchoolAdminMarks:SchoolAdminMarks,
   SchoolAdminAttendance:SchoolAdminAttendance,
   ChooseSec:ChooseSec,
   StudentAttendance:StudentAttendance,
   SchoolAdminStatics:SchoolAdminStatics,
   Semester:Semester,
},
{
  initialRouteName: 'PageFourth',
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};
PageFirstStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};
PageSecondStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};
PageThirdStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};
PageFourthStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};


const OtpLoginStack = createStackNavigator({
   OtpLogin:OtpLogin,
   OtpScreen:OtpScreen,
},
{
  initialRouteName: 'OtpLogin',
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  PageFirst: PageFirstStack,
  PageSecond: PageSecondStack,
  PageThird: PageThirdStack,
  PageFourth: PageFourthStack,
});

const Navigater = createStackNavigator({
   ChooseType:ChooseType,
   TabNavigator:TabNavigator
},
{
  initialRouteName: 'ChooseType',
  headerMode:'none'
});
Navigater.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return null
};

const drawerNavigator = createDrawerNavigator({
  Home:{
      screen:HomeStack,
      navigationOptions: {
        drawerLabel: () => null
      }
  },
  PageFirst:{
      screen:PageFirstStack,
      navigationOptions: {
          drawerLabel: () => null
      }
  } ,
  PageSecond:{
    screen:PageSecondStack,
    navigationOptions:{
      drawerLabel: () => null
    }
  },
  PageThird:{
    screen:PageThirdStack,
    navigationOptions:{
      drawerLabel: () => null
    }
  },
  PageFourth:{
    screen:PageFourthStack,
    navigationOptions:{
      drawerLabel: () => null
    }
  },
  Login:{
    screen:loginType=='otp'?OtpLoginStack:OtpLoginStack,
    navigationOptions:{
      drawerLabel: () => null
    }
  },

  },
  {
    drawerBackgroundColor:'#fff',
    drawerPosition:'left',
    drawerType:'slide',
    hideStatusBar:false,
    contentComponent:props =><DrawerContent  {...props}  />,
    contentOptions: {
        activeTintColor: '#ee5034',
        inactiveTintColor: '#efa834',
        itemsContainerStyle: {
            marginVertical: 0,
            paddingVertical:0
        },
        iconContainerStyle: {
            opacity: 1
        }
    },
    initialRouteName:'Home'
  }
);

export default createAppContainer(Navigater);
