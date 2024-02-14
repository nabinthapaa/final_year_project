class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const INVALID_AGE = new ValidationError("Please enter a valid age");
export const INVALID_EMAIL = new ValidationError("Please enter a valid email");
export const PASSWORD_DID_NOT_MATCH = new ValidationError(
  "Password did not match"
);
