import { Test } from "../../../components/collage/test/home/Test";
import useTranslate from "../../../hooks/useTranslate";

const TestPage = () => {
  useTranslate();
  return <Test />;
};

export default TestPage;
