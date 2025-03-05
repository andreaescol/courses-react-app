interface CreateCourseData {
  title: string;
  description: string;
  duration: number;
}

interface ValidationErrors {
  title: string;
  description: string;
  duration: string;
}

export const validateCreateCourse = ({
  title,
  description,
  duration,
}: CreateCourseData): ValidationErrors => {
  return {
    title: !title.trim()
      ? "Title is required."
      : title.trim().length < 2
      ? "Title must be at least 2 characters long."
      : "",
    description: !description.trim()
      ? "Description is required."
      : description.trim().length < 2
      ? "Description must be at least 2 characters long."
      : "",
    duration: !duration
      ? "Duration is required."
      : duration <= 0
      ? "Duration must be more than 0 minutes."
      : "",
  };
};
