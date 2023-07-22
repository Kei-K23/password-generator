// shuffle string

function shuffleString(password) {
  const arrayPass = password.split(""); // change string into array
  for (let i = arrayPass.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i + 1); // random number base on array length
    [arrayPass[i], arrayPass[j]] = [arrayPass[j], arrayPass[i]]; // shuffle by using array destructuring
  }

  return arrayPass.join(""); // change array back into string
}

export default shuffleString;
