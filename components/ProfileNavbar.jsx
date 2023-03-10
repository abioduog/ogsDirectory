import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import Pstyles from '.././styles/Signup.module.css';
import { useAuth } from "../context/AuthUserContext";
import { Button } from 'reactstrap';

const ProfileNavbar = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const isActive = (pathname) => {
    return router.pathname === pathname ? styles.active : '';
  };

  return (
    <div className={styles.hero}>
          <nav className={styles.navbar}>
              <Link href="/home">
                  <a className={styles.link}>
                      <span className={styles.logo}>OGS Directory</span>
                  </a>
              </Link>
              <ul className={styles.menu}>
                  <li className={styles.menuItem}>
                      <Link href="/home">
                          <a className={`${styles.link} ${isActive('/home')}`}>Home</a>
                      </Link>
                  </li>
                  <li className={styles.menuItem}>
                      <Link href="/logged_in">
                          <a className={`${styles.link} ${isActive('/members')}`}>Members</a>
                      </Link>
                  </li>
                  <li className={styles.menuItem}>
                      <Link href="/events">
                          <a className={`${styles.link} ${isActive('/events')}`}>Events</a>
                      </Link>
                  </li>
                  <li className={styles.menuItem}>
                      <Link href="/edit_profile">
                          <a className={`${styles.link} ${isActive('/edit_profile')}`}>Edit Profile</a>
                      </Link>
                  </li>
                  {/* <li className={styles.menuItem}>
                    <Button onClick={signOut}>Sign out</Button>
                  </li> */}
              </ul>
          </nav>
    </div>

  );
};

export default ProfileNavbar;
