/**
 * This component is used to display a side navigation for the
 * application's UI.
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { classNames } from 'classnames';
import { subscribe } from 'react-contextual';

import logo from './logo.png';
import styles from './sideNav.module.scss';

const navItems = [
  {
    name: 'Messenger',
    icon: 'messenger',
    path: '/messenger/'
  },
  {
    name: 'Marketplace',
    icon: 'marketplace',
    path: '/marketplace'
  },
  {
    name: 'Events',
    icon: 'events',
    path: '/events'
  },
  {
    name: 'Maintenace',
    icon: 'maintenance',
    path: '/maintenance'
  },
  {
    name: 'Security',
    icon: 'security',
    path: '/security'
  }
];

const SideNav = props => {

  /**
   * Renders a set of nav items as nav links
   * using the specified array of navItems.
   */
  function renderNavItems() {
    return navItems.map((item, i) => (
      <NavLink
        exact
        activeClassName={styles.activeNavItem}
        to={item.path}
        key={i}
      >
        <Icon
          name={item.icon}
          size={!props.sideNavOpen ? 'large' : null}
          className={item.indent ? styles.indentedIcon : null}
        />
        <span className={styles.linkName}>{item.name}</span>
      </NavLink>
    ));
  }



  const sideNavStyle = classNames(styles.container, {
    [styles.collapsed]: !props.sideNavOpen
  });

  console.log(sideNavStyle)

  return (
    <div className={sideNavStyle}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Livvy Logo" />
        </div>
      </Link>

      <div className={styles.navLinks}>
        {renderNavItems()}
      </div>

      {props.sideNavOpen && (
        <div className={styles.copyright}>
          <a href="https://www.livvy.io/privacy" target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
          <div>
            <a href="https://www.livvy.io" target="_blank" rel="noopener noreferrer">
              Powered by Livvy
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default subscribe()(SideNav);
