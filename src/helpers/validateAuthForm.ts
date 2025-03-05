interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  name: string;
  email: string;
  password: string;
}

export const validateAuthForm = (formData: FormData): ValidationErrors => {
  return {
    name:
      "name" in formData && !formData.name?.trim() ? "Name is required." : "",
    email: !formData.email.trim() ? "Email is required." : "",
    password: !formData.password.trim() ? "Password is required." : "",
  };
};
