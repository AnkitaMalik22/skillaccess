import React from 'react';
import { useCollegeProfile } from '../../../hooks/useCollegeProfile';
import Header from '../../../components/college/profile/Header';
import EditHeader from '../../../components/college/profile/EditHeader';


const Profile = () => {
  const { college, editable, setEditable, loading, handleUpdate } = useCollegeProfile();

  return (
    <>
      {college && editable && (
        <EditHeader
          loading={loading}
          editable={editable}
          setEditable={setEditable}
          handleUpdate={handleUpdate}
        />
      )}
      {college ? <Header /> : <h1>Loading...</h1>}
    </>
  );
};

export default Profile;

