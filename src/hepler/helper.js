export const createAnswersList = ({ options = [], answer = "" }) => {
  let newOptions = deepClone(options);
  newOptions.splice(generateRandomIndex(newOptions.length), 0, answer);
  newOptions = newOptions.map((item) => {
    return {
      answer: item,
    };
  });
  return newOptions;
};
export const generateRandomIndex = (length) => {
  const randomIndex = Math.floor(Math.random() * (length + 1));

  return randomIndex;
};

export const deepClone = (value) => {
  return JSON.parse(JSON.stringify(value));
};
