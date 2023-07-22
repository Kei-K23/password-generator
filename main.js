import shuffleString from "./scripts/shuffle";
import PasswordToRemember from "./scripts/character";
import { buildPasswordList, createDOMEle } from "./scripts/domEleCreate";
import { getLocalStorage, setLocalStorage } from "./scripts/localStorage";

const result = document.querySelector("#result");
const copyBtns = document.querySelectorAll('[data-copy="copy"]');
const generateBtn = document.querySelector("#generate");
const passLength = document.querySelector("#passLength");
const lowercase = document.querySelector("#lowercase");
const uppercase = document.querySelector("#uppercase");
const numberInclude = document.querySelector("#number");
const symbolsInclude = document.querySelector("#symbols");
const rememberPass = document.querySelector("#rememberPass");
const labelEleForSavePassword = document.querySelector(
  "#labelEleForSavePassword"
);
const checkToSave = document.querySelector("#checkToSave");
const savePassName = document.querySelector("#savePassName");
const savePassNameBtn = document.querySelector('[data-save="save"]');
const namePasswordContainer = document.querySelector(
  "#name-password-container"
);

let namePassArray = [];

// object that deal with random generation
const randomPassword = {
  // generate random a-z
  lower: () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  },

  // generate random A-Z
  upper: () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  },

  // generate random 0-9
  number: () => {
    return Math.floor(Math.random() * 10);
  },

  // generate random symbols
  symbolCha: () => {
    const symbolCha = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "-",
      "=",
      "/",
      "|",
    ];
    const randomIndex = Math.floor(Math.random() * symbolCha.length);
    return symbolCha[randomIndex];
  },
};

function checkForUserSelect(lower, upper, number, symbol) {
  return {
    lower: lower.checked,
    upper: upper.checked,
    number: number.checked,
    symbolCha: symbol.checked,
  };
}

function generatePassword(lower, upper, number, symbolCha, length, random) {
  let generatePassword = "";

  const charTypeCount = lower + upper + number + symbolCha;
  const charTypeArray = [
    { lower },
    { upper },
    { number },
    { symbolCha },
  ].filter((type) => Object.values(type)[0] === true);

  if (charTypeCount === 0) {
    return "";
  }

  // loop through the array of type
  for (let i = 0; i < length; i += charTypeCount) {
    charTypeArray.forEach((type) => {
      const typeName = Object.keys(type)[0];
      generatePassword += random[typeName]();
    });
  }

  return shuffleString(generatePassword).slice(0, length);
}

// loop both copy btn and add click event and call copyText()
function copyTextToClipBoard(
  btns,
  result,
  callableCopyText,
  callableShowCopiedTextNotification
) {
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      callableCopyText(result);
      callableShowCopiedTextNotification(e, "copied", result.value);
    });
  });
}

// copy result value when click to copy btn using navigator clipboard api
function copyText(resultText) {
  const password = resultText.value;
  // return if password is null
  if (password === "") {
    return;
  }

  navigator.clipboard.writeText(password);
}

// show copy notification and remove after 1s
function showTextNotification(event, message, result = null) {
  if (result === "") return;
  const newSpan = createDOMEle(
    "span",
    message,
    "px-2",
    "py-1",
    "rounded-md",
    "bg-slate-900",
    "text-white"
  );

  event.target.parentNode.insertBefore(
    newSpan,
    event.target.nextElementSibling
  );

  setTimeout(() => {
    event.target.parentNode.removeChild(newSpan);
  }, 1000);
}

// check to save password input only work when password generated
function checkPasswordGenerated(pass) {
  if (!pass.value) {
    labelEleForSavePassword.classList.remove("text-black");
    labelEleForSavePassword.classList.add("text-slate-400");
    checkToSave.disabled = true;
  } else {
    labelEleForSavePassword.classList.remove("text-slate-400");
    labelEleForSavePassword.classList.add("text-black");
    checkToSave.disabled = false;
  }
}

// check password name exit in the list
function checkPasswordNameExit(name) {
  const namePass = document.querySelectorAll(".namePass");
  return Array.from(namePass).filter((list) => list.innerText === name);
}

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const length = passLength.value;
  const { lower, upper, number, symbolCha } = checkForUserSelect(
    lowercase,
    uppercase,
    numberInclude,
    symbolsInclude
  );

  const generatePass = generatePassword(
    lower,
    upper,
    number,
    symbolCha,
    length,
    randomPassword
  );

  result.value = generatePass;

  rememberPass.innerText = PasswordToRemember(generatePass);
  checkPasswordGenerated(result);
});

savePassNameBtn.addEventListener("click", (e) => {
  const isNameExit = checkPasswordNameExit(savePassName.value);
  if (savePassName.value !== "") {
    if (isNameExit.length > 0) {
      showTextNotification(e, "name already taken!");
      return;
    }
    namePassArray.push({
      name: savePassName.value,
      pass: result.value,
    });
    setLocalStorage("PASS", namePassArray);
    buildPasswordList(namePasswordContainer, namePassArray);
  } else {
    showTextNotification(e, "not save!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  copyTextToClipBoard(copyBtns, result, copyText, showTextNotification);
  checkPasswordGenerated(result);
  namePassArray = [...namePassArray, ...getLocalStorage("PASS")];
  buildPasswordList(namePasswordContainer, namePassArray);
});
