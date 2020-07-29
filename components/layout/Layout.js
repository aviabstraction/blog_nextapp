//Custom Imports
import styles from './layout.module.scss';

//Common layout for the Page Components

export default function Layout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}
