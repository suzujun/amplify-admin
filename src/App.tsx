import { Admin, Resource, ListGuesser } from "react-admin";
import { Layout } from "./Layout";

export const App = () => (
  <Admin layout={Layout}>
    <Resource name="posts" list={ListGuesser} />
    <Resource name="comments" list={ListGuesser} />
  </Admin>
);
