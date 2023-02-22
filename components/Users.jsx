import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard';
import styles from '.././styles/global.module.css';
import { db } from '../lib/firebase';

const UsersProfile = () => {
const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await db.collection('usersProfile').get();
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserProfiles(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.gridContainer}>
      {userProfiles.map((usersProfile) => (
        <UserProfileCard key={usersProfile.id} {...usersProfile} />
      ))}
    </div>
  );
};

export default UsersProfile;




// import { useState, useEffect } from 'react';
// import UserProfileCard from './UserProfileCard';
// import styles from '../styles/global.module.css';
// import { db } from '../lib/firebase';

// const UsersProfile = ({ searchValue }) => {
//   const [userProfiles, setUserProfiles] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await db.collection('usersProfile').get();
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setUserProfiles(data);
//     };
//     fetchData();
//   }, []);

//   const onSearch = (data) => {
//     if (searchValue === '') {
//       return data;
//     } else {
//       const filteredData = data.filter((profile) =>
//         profile.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
//         profile.lastname.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       return filteredData;
//     }
//   };

//   const filteredProfiles = onSearch(userProfiles);

//   return (
//     <div className={styles.gridContainer}>
//       {userProfiles.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         filteredProfiles.map((usersProfile) => (
//           <UserProfileCard key={usersProfile.id} {...usersProfile} />
//         ))
//       )}
//     </div>
//   );
// };

// export default UsersProfile;

