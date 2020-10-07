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
import ProfileMarks from '../screenComponents/ProfileMarks';
import ProfileSyllabus from '../screenComponents/ProfileSyllabus';
import ProfileMedia from '../screenComponents/ProfileMedia';
import ProfileMediaChoose from '../screenComponents/ProfileMediaChoose';
import MediaNotesVideo from '../screenComponents/MediaNotesVideo';
import NotesVideosData from '../screenComponents/NotesVideosData';
import MediaUniversity from '../screenComponents/MediaUniversity';
import MediaDepart from '../screenComponents/MediaDepart';
import ProfileQuestionPaper from '../screenComponents/ProfileQuestionPaper';

const HomeStack = createStackNavigator({
   Home:Home,
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
   ProfileMarks:ProfileMarks,
   ProfileSyllabus:ProfileSyllabus,
   ProfileMedia:ProfileMedia,
   ProfileMediaChoose:ProfileMediaChoose,
   MediaNotesVideo:MediaNotesVideo,
   NotesVideosData:NotesVideosData,
   MediaUniversity:MediaUniversity,
   MediaDepart:MediaDepart,
   ProfileQuestionPaper:ProfileQuestionPaper
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

export default createAppContainer(TabNavigator);
