function validateName(name) {
  if (name.length >= 1) {
    return true;
  } else {
    throw new Error('Name field is empty');
  }
}

function validateEmail(email) {
  if (/^\S+@\S+\.\S+$/.test(email)) {
    return true;
  } else {
    throw new Error('Invalid email');
  }
}

function validatePassword(password) {
  if (password.length >= 5) {
    return true;
  } else {
    throw new Error('Password should be at least 5 characters long');
  }
}

function confirmPassword(password, passwordConfirm) {
  if (password === passwordConfirm) {
    return true;
  } else {
    throw new Error("Passwords don't match");
  }
}

function validateAgreements(agreements) {
  if (agreements) {
    return true;
  } else {
    throw new Error('You should agree with terms and conditions');
  }
}

export function validateLoginData(email, password) {
  try {
    validateEmail(email);
    validatePassword(password);
    return true;
  } catch (error) {
    throw error;
  }
}

export function validateSignUpData(
  name,
  email,
  password,
  passwordConfirm,
  agreements
) {
  try {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    confirmPassword(password, passwordConfirm);
    validateAgreements(agreements);
    return true;
  } catch (error) {
    throw error;
  }
}
