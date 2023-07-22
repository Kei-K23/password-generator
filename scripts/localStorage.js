// set name and password key value pare to localStorage
function setLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

// retrieve name and password key value pare array from localStorage
function getLocalStorage(name) {
  const storedData = localStorage.getItem(name);
  if (storedData !== null) {
    return JSON.parse(storedData);
  }
}

export { setLocalStorage, getLocalStorage };
