export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Username must be min characters 5 and max characters 32",
    },
    notEmpty: { errorMessage: "Username cannot be empty" },
    isString: true,
  },
  password: {
    notEmpty: { errorMessage: "password cannot be empty" },
  },
};
