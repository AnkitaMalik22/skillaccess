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
      state.topics[topicIndex].video = copy;
      break;
    default:
      break;
  }

  localStorage.setItem("topics", JSON.stringify(state.topics));
};

export const removeQfunc = (state, action) => {
  const { topicIndex, selfIndex, questionType } = action.payload;
  let copy = [];
  switch (questionType) {
    case "mcq":
      copy = [...state.topics[topicIndex].questions];
      state.topics[topicIndex].questions = copy.filter((ques, index) => {
        return index !== selfIndex;
      });
      break;

    case "essay":
      copy = [...state.topics[topicIndex].essay];
      state.topics[topicIndex].essay = copy.filter((ques, index) => {
        return index !== selfIndex;
      });
      break;

    case "compiler":
      copy = [...state.topics[topicIndex].compiler];
      state.topics[topicIndex].compiler = copy.filter((ques, index) => {
        return index !== selfIndex;
      });
      break;
    case "findAnswer":
      copy = [...state.topics[topicIndex].findAnswers];
      state.topics[topicIndex].findAnswers = copy.filter((ques, index) => {
        return index !== selfIndex;
      });
      break;

    case "video":
      copy = [...state.topics[topicIndex].video];
      state.topics[topicIndex].video = copy.filter((ques, index) => {
        return index !== selfIndex;
      });
      break;

    default:
      break;
  }

  localStorage.setItem("topics", JSON.stringify(state.topics));
};

export const addQuesFunc = (state, action) => {
  const { type, questions } = action.payload;
  switch (type) {
    case "essay":
      state.currentTopic.essay = [...state.currentTopic.essay, questions[0]];
      break;

    case "findAnswer":
      state.currentTopic.findAnswers = [
        ...state.currentTopic.findAnswers,
        questions[0],
      ];
      break;

    case "mcq":
      state.currentTopic.questions = [
        ...state.currentTopic.questions,
        questions[0],
      ];
      break;

    case "compiler":
      state.currentTopic.compiler = [
        ...state.currentTopic.compiler,
        questions[0],
      ];
      break;

    default:
      break;
  }
  localStorage.setItem("currentTopic", JSON.stringify(state.currentTopic));
};
