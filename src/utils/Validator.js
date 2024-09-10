export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return "Email is not valid!";
  } else {
    return "";
  }
};

export const passwordValidator = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  if (!re.test(password)) {
    return "Password must contain at least 5 characters, including UPPER/lowercase and numbers!";
  } else {
    return "";
  }
};
