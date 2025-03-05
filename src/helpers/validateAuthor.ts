interface ValidationErrors {
  name: string;
}

export const validateAuthor = (name: string): ValidationErrors => {
  return {
    name: !name.trim()
      ? "Author name is required."
      : name.trim().length < 2
      ? "Author name must be at least 2 characters long."
      : "",
  };
};
