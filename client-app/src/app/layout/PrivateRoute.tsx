import React, { useContext } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect
} from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}
const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  //(component: Component) bc we have to call it Component in order to use it!
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};
export default observer(PrivateRoute);
