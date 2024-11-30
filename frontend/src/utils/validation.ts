export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email is not valid";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) {
    return "Password is required";
  }
  if (password.length < 8 || password.length > 15) {
    return "Password should contain min 8 and max 15 characters";
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) {
    return "Username is required";
  }
  if (username.length < 3 || username.length > 10) {
    return "Username should contain minimum 3 and maximum 10 characters";
  }
  return null;
};
