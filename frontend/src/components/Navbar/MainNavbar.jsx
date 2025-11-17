import 'react';
import styles from './Navbar.module.css';  

const MainNavbar = () => {
  return (
    <nav className={styles.mainNavbar}>
      <button className={styles.button}>Rooms</button>
      <button className={styles.button}>Customers</button>
      <button className={styles.button}>Bookings</button>
      <button className={styles.button}>Billings</button>
      <button className={styles.button}>Settings</button>
    </nav>
  );
};

export default MainNavbar;
