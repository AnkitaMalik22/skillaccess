export const editQuestionFun = (state, action) => {
  const { topicIndex, selfIndex, questionType, question } = action.payload;

  let copy = [];
  switch (questionType) {
    case "mcq":
      copy = [...state.topics[topicIndex].questions];
      copy[selfIndex] = question;
      state.topics[topicIndex].questions = copy;
      break;

    case "essay":
      copy = [...state.topics[topicIndex].essay];
      copy[selfIndex] = question;
      state.topics[topicIndex].essay = copy;

      break;

    case "compiler":
      copy = [...state.topics[topicIndex].compiler];
      copy[selfIndex] = question;
      state.topics[topicIndex].compiler = copy;
      // .filter((ques, index) => {
      //   return index !== selfIndex;
      // });
      break;
    case "findAnswer":
      copy = [...state.topics[topicIndex].findAnswers];
      copy[selfIndex] = question;
      state.topics[topicIndex].findAnswers = copy;
      break;
      case "video":
      copy = [...state.topics[topicIndex].video];
      copy[selfIndex] = question;
      state.topics[topicIndex].video= copy;
      break;
    default:
      break;
  }

  localStorage.setItem("topics", JSON.stringify(state.topics));
};
