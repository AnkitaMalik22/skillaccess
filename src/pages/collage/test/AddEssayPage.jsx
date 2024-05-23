import React from "react";

import AddEssay from "../../../components/collage/test/addEssay/AddEssay";
import useTranslate from "../../../hooks/useTranslate";

const AddEssayPage = () => {
  useTranslate();
  return <AddEssay />;
};

export default AddEssayPage;
