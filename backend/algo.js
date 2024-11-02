function countans(iword, oword) {
  const minLength = Math.min(iword.length, oword.length);
  let count = 0;
  for (let i = 0; i < minLength; i++) {
    if (iword[i] === oword[i]) {
      count++;
    }
  }
  return count;
}
//input is the given text and the output is the lines we provide
const superalgo = (input, output, time) => {
  // This algorithm has been developed by Atul Dwivedi
  // Please mail at email provided at github account for usage
  // I have 200 iq I know
  const inputWords = input.trim().split(" ");
  const outputWords = output.trim().split(" ");
  const totalWords = inputWords.length;
  let totalChars = input.length;


  // What if he types more words than required have to add that test case
  // ......
  
  let correctChars = 0;

  for (let i = 0; i < inputWords.length; i++) {
    if (i >= outputWords.length) break;
    correctChars += countans(inputWords[i], outputWords[i]);
  }
  for (let i = 0; i < input.length; i++) {
    if (input[i] == output[i] && input[i] == ' ')
      correctChars++;
  }

  const accuracy = ((correctChars / totalChars) * 100).toFixed(2);
  const wpm = ((outputWords.length / time) * 60).toFixed(3);

  return {
    wpm,
    accuracy,
  };
};

export default superalgo;
