// create DOM element
function createDOMEle(eleName, text = null, ...className) {
  const ele = document.createElement(eleName);
  if (text !== null) ele.innerText = text;
  if (className.length > 0) ele.classList.add(...className);
  return ele;
}

// build password list with their associated name
function buildPasswordList(parentUlEle, namePassArray) {
  if (namePassArray.length === 0) {
    return;
  }
  parentUlEle.innerHTML = "";
  namePassArray.map((li) => {
    const liEle = createDOMEle(
      "li",
      "",
      "flex",
      "justify-between",
      "px-4",
      "py-2",
      "border-b",
      "border-black",
      "even:bg-slate-400",
      "last:border-b-0"
    );
    const pNameEle = createDOMEle("p", li.name, "namePass");
    const pPassEle = createDOMEle("p", li.pass);
    liEle.append(pNameEle);
    liEle.append(pPassEle);
    parentUlEle.append(liEle);
  });
}

export { createDOMEle, buildPasswordList };
