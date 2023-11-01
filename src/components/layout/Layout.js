import React from 'react';
import Header from '../header/Header';
import styles from './layout.module.css';

export default function Layout(props) {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Header menu={props.menu} title={props.title} />
      <div className={styles.appContent}>{children}</div>
    </div>
  );
}
