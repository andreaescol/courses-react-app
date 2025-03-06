const API_BASE_URL = "http://localhost:4000";

export const fetchCourses = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const coursesData = await response.json();
    return coursesData.result;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};

export const fetchAuthors = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/authors/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const authorsData = await response.json();
    return authorsData.result;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};

export const fetchUser = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData.result;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Registration failed");
    return response.ok;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};

export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Login failed");

    const token = await response.json();
    return token.result;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logoutUser = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Logout failed");
    return response.ok;
  } catch (error) {
    console.error("Logout error:", error);
    return null;
  }
};

export const addCourse = async (formData: {
  title: string;
  description: string;
  duration: number;
  authors: string[];
  token?: string;
}) => {
  const { title, description, duration, authors, token } = formData;

  try {
    const response = await fetch(`${API_BASE_URL}/courses/add`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, duration, authors }),
    });

    if (!response.ok) throw new Error("Add Course failed");
    const courseData = await response.json();
    return courseData.result;
  } catch (error) {
    console.error("Add Course error:", error);
    return null;
  }
};

export const deleteCourse = async (courseId: string, token?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Course deletion failed");
    return response.ok;
  } catch (error) {
    console.error("Course deletion error:", error);
    return null;
  }
};

export const updateCourse = async (
  courseId: string,
  formData: {
    title: string;
    description: string;
    duration: number;
    authors: string[];
    token?: string;
  }
) => {
  const { title, description, duration, authors, token } = formData;

  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, duration, authors }),
    });

    if (!response.ok) throw new Error("Update Course failed");
    const courseData = await response.json();
    return courseData.result;
  } catch (error) {
    console.error("Update Course error:", error);
    return null;
  }
};

export const addAuthor = async (formData: { name: string; token?: string }) => {
  const { name, token } = formData;

  try {
    const response = await fetch(`${API_BASE_URL}/authors/add`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) throw new Error("Add Author failed");
    const authorData = await response.json();
    return authorData.result;
  } catch (error) {
    console.error("Add Author error:", error);
    return null;
  }
};
