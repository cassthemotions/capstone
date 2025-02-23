/**
 * This component is the main layout file which wraps the entire
 * application. You can call things here if you want them to load
 * when the application first loads.
 */

import React from 'react';
import { subscribe } from 'react-contextual';

import 'semantic-ui-css/semantic.css';

import TopNav from './topNav';
import SideNav from './sideNav';
import styles from './app.module.scss';

import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(aws_exports);

const App = (props) => {


  return (
    <div className={styles.container}>
      <SideNav />

      <div className={styles.main}>
        <TopNav />

        <div className={styles.children}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default subscribe()(withAuthenticator(App));
