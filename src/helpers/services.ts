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
    console.error("Login error:", error);
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

export const logoutUser = async (authToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Logout failed");

    const token = await response.json();
    return token.result;
  } catch (error) {
    console.error("Logout error:", error);
    return null;
  }
};
