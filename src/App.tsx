// import { Admin, Resource, ListGuesser } from "react-admin";
// import { Layout } from "./Layout";

// export const App = () => (
//   <Admin layout={Layout}>
//     <Resource name="posts" list={ListGuesser} />
//     <Resource name="comments" list={ListGuesser} />
//   </Admin>
// );

import {
  Admin,
  ListGuesser,
  Resource,
  // ListGuesser,
  // EditGuesser,
  // ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
// import { StackList, StackCreate, StackEdit, StackShow } from "./resources/stacks";
// import { ServiceEdit, ServiceShow } from "./resources/services";
// import { InstanceEdit } from "./resources/instances";
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
// import RoomServiceIcon from '@mui/icons-material/RoomService';
// import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
// import { Dashboard } from "./Dashboard";
import { Login } from 'ra-auth-cognito';
// import i18nProvider from "./i18n/ja";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    // dashboard={Dashboard}
    loginPage={Login}
  // i18nProvider={i18nProvider}
  >
    <Resource name="posts" list={ListGuesser} />
    <Resource name="comments" list={ListGuesser} />
    {/* <Resource name="stacks" icon={SettingsApplicationsIcon} list={StackList} show={StackShow} create={StackCreate} edit={StackEdit} />
    <Resource name="services" icon={RoomServiceIcon} list={ListGuesser} show={ServiceShow} edit={ServiceEdit} />
    <Resource name="instances" icon={OfflineBoltIcon} list={ListGuesser} show={ShowGuesser} edit={InstanceEdit} /> */}
  </Admin>
);
