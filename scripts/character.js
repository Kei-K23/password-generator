const APLHABETWORDS = {
  a: "apple",
  b: "banana",
  c: "cat",
  d: "dog",
  e: "elephant",
  f: "fox",
  g: "grape",
  h: "horse",
  i: "ice cream",
  j: "jellyfish",
  k: "kiwi",
  l: "lion",
  m: "monkey",
  n: "nest",
  o: "orange",
  p: "pear",
  q: "queen",
  r: "rabbit",
  s: "snake",
  t: "tiger",
  u: "umbrella",
  v: "vase",
  w: "watermelon",
  x: "xylophone",
  y: "yak",
  z: "zebra",
  A: "Astronaut",
  B: "Bicycle",
  C: "Camera",
  D: "Dolphin",
  E: "Eagle",
  F: "Fireworks",
  G: "Globe",
  H: "Helicopter",
  I: "Island",
  J: "Jellyfish",
  K: "Kangaroo",
  L: "Lightning",
  M: "Mountain",
  N: "Nightingale",
  O: "Octopus",
  P: "Penguin",
  Q: "Quokka",
  R: "River",
  S: "Starfish",
  T: "Telescope",
  U: "Unicorn",
  V: "Volcano",
  W: "Waterfall",
  X: "X-ray",
  Y: "Yacht",
  Z: "Zipline",
};

function PasswordToRemember(password) {
  const passArr = password.split("");
  let formatPass = "";
  passArr.map((cha) => {
    if (APLHABETWORDS[cha]) {
      formatPass += ` ${APLHABETWORDS[cha]}`;
    } else {
      formatPass += ` ${cha}`;
    }
  });

  return formatPass.trim();
}

export default PasswordToRemember;
