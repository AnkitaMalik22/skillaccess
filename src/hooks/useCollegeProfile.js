import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollege, setUploadImg, updateAvatar, updateCollege } from '../redux/college/auth/authSlice';
import { isUni } from '../util/isCompany';

export const useCollegeProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, uploadImg } = useSelector((state) => state.collegeAuth);
  const [college, setCollege] = useState(user);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCollege()).then((res) => {
      setCollege(res.payload.user);
    });
  }, [dispatch]);

  useEffect(() => {
    if (uploadImg) {
      dispatch(setUploadImg(false));
    }
  }, [uploadImg, dispatch]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (avatar) {
        await dispatch(updateAvatar({ avatar, id: user._id }));
      }
      const userUpdate = await dispatch(updateCollege(college));
      setCollege(userUpdate.payload);
      setEditable(false);
      localStorage.setItem('editable', 'false');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    college,
    setCollege,
    avatar,
    setAvatar,
    avatarPreview,
    editable,
    setEditable,
    loading,
    handleUpdate,
    handleAvatarChange,
    isUni: isUni(),
  };
};
