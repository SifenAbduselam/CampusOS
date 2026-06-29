export function validateRegisterInput(data) {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.studentId || data.studentId.trim().length < 3) {
    errors.studentId = "Student ID must be at least 3 characters.";
  }

  if (!data.department || data.department.trim().length < 2) {
    errors.department = "Department is required.";
  }

  if (!data.year || Number(data.year) < 1 || Number(data.year) > 7) {
    errors.year = "Year must be between 1 and 7.";
  }

  if (!data.password || data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLoginInput(data) {
  const errors = {};

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}