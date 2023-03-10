// 

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from '../lib/firebase';
import styles from "../styles/Profile.module.css";
import ProfileNavbar from "../components/ProfileNavbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { authUser, loading } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!authUser) {
          return;
        }
        const docRef = doc(db, "usersProfile", authUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          // Get the profile image download URL
          if (data.image) {
            console.log(data.image)
            // const imageRef = ref(storage, `users/${authUser.uid}-${data.image}`);
            const imageRef = ref(storage, `${data.image}`);
            const downloadURL = await getDownloadURL(imageRef);
            setImageUrl(downloadURL);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [authUser]);

  if (loading || !userData || !imageUrl) {
    return <div>Loading...</div>;
  }

  const { firstname, lastname, occupation, website, email, phoneNumber } = userData;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div>
      <ProfileNavbar />
      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt="Profile Picture" className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.name}>{fullname}</h1>
            <h2 className={styles.occupation}>{occupation}</h2>
            <div className={styles.contact}>
              <p className={styles.email}>{email}</p>
              <p className={styles.phoneNumber}>{phoneNumber}</p>
              <p className={styles.website}>{website}</p>
              <div className={styles.social}>
                <a href="https://www.linkedin.com/in/johndoe">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/socials%2Fpng-transparent-linkedin-icon-linkedin-text-rectangle-logo-removebg-preview.png?alt=media&token=acfb99a3-7732-4eef-a365-4c85722ab7f5"
                    alt="LinkedIn"
                    className={styles.icon}
                  />
                </a>
                <a href="https://www.github.com/johndoe">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/socials%2F19-198304_github-logo-png-transparent-github-logo-png-png-removebg-preview.png?alt=media&token=fe61d559-ad91-429f-8adb-804578515fb5"
                    alt="GitHub"
                    className={styles.icon}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;