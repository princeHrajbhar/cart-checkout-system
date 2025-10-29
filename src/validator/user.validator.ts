interface UserInput {
  name?: string;
  email?: string;
  password?: string;
}

export const validateRegister = (data: UserInput) => {
  const allowedKeys = ["name", "email", "password"];
  const keys = Object.keys(data);

  // Strict field validation
  if (!keys.every((key) => allowedKeys.includes(key)) || keys.length !== 3) {
    return "Only 'name', 'email', and 'password' fields are allowed.";
  }

  if (!data.name || data.name.trim().length < 3) return "Name must be at least 3 characters.";
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) return "Invalid email format.";
  if (!data.password || data.password.length < 6) return "Password must be at least 6 characters.";
  return null;
};

export const validateLogin = (data: UserInput) => {
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) return "Invalid email.";
  if (!data.password) return "Password is required.";
  return null;
};
