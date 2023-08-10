function isValidEmail(email) {
  const atIndex = email.indexOf('@');
  
  // Check for presence of "@" and that it's not the first or last character
  if (atIndex < 1 || atIndex === email.length - 1) {
    return false;
  }
  
  // Check for the presence of more than one "@" symbol
  if (email.indexOf('@', atIndex + 1) !== -1) {
    return false;
  }
  
  // Check for allowed characters before and after "@" and "."
  const allowedChars = /^[a-zA-Z0-9.-]*$/;
  const username = email.substring(0, atIndex);
  const domain = email.substring(atIndex + 1);
  
  if (!allowedChars.test(username) || !allowedChars.test(domain)) {
    return false;
  }
  
  // Check for presence of "." after "@" and that it's not the last character
  const dotIndex = domain.indexOf('.');
  if (dotIndex < 1 || dotIndex === domain.length - 1) {
    return false;
  }
  
  return true;
}


// Password Strength Validation
function isStrongPassword(password) {
  // Check if the password meets certain criteria (e.g., minimum length, complexity)
  const minLength = 8;
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasDigit = false;

  for (const char of password) {
    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true;
    } else if (char >= 'a' && char <= 'z') {
      hasLowerCase = true;
    } else if (char >= '0' && char <= '9') {
      hasDigit = true;
    }
  }

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigit
  );
}

module.exports = {
  isValidEmail,
  isStrongPassword,
};