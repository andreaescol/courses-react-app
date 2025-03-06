import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCreateCourse } from "../../helpers/validateCreateCourse";
import { validateAuthor } from "../../helpers/validateAuthor";
import { useDispatch, useSelector } from "react-redux";
import { getAuthors, getCourses } from "../../store/selectors";
import { addAuthorAction } from "../../store/authors/actions";
import { AppDispatch } from "../../store/store";
import { addCourseThunk, updateCourseThunk } from "../../store/courses/thunk";
import { useParams } from "react-router-dom";
import Button from "../../common/Button/Button";
import MainInfoSection from "./components/MainInfoSection/MainInfoSection";
import AuthorsSection from "./components/AuthorsSection/AuthorsSection";
import styles from "./courseForm.module.css";

const CourseForm = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const authors = useSelector(getAuthors);
  const courses = useSelector(getCourses);
  const params = useParams();
  const courseId = params.courseId;
  const isUpdateMode = Boolean(courseId);

  const course = isUpdateMode
    ? courses.find((course) => course.id === courseId)
    : null;

  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [duration, setDuration] = useState(course?.duration?.toString() || "");
  const [courseAuthors, setCourseAuthors] = useState<string[]>(
    course?.authors || []
  );

  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);

  const [newAuthorInput, setNewAuthorInput] = useState("");

  const [courseErrors, setCourseErrors] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [authorErrors, setAuthorErrors] = useState({
    name: "",
  });

  useEffect(() => {
    if (authors.length > 0) {
      const allAuthors = authors.map((author) => author.id);
      if (isUpdateMode && course) {
        setAvailableAuthors(
          allAuthors.filter((authorId) => !course.authors.includes(authorId))
        );
      } else {
        setAvailableAuthors(authors.map((author) => author.id));
      }
    }
  }, [isUpdateMode, course, authors]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (courseErrors.title) {
      setCourseErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    if (courseErrors.description) {
      setCourseErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
    if (courseErrors.duration) {
      setCourseErrors((prev) => ({ ...prev, duration: "" }));
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthorInput(e.target.value);
    if (authorErrors.name) {
      setAuthorErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleAddAuthorToCourse = (id: string) => {
    if (!courseAuthors.includes(id)) {
      setCourseAuthors([...courseAuthors, id]);
      setAvailableAuthors(
        availableAuthors.filter((authorId) => authorId !== id)
      );
    }
  };

  const handleRemoveAuthorFromCourse = (id: string) => {
    setCourseAuthors(courseAuthors.filter((authorId) => authorId !== id));
    setAvailableAuthors([...availableAuthors, id]);
  };

  const handleCreateAuthor = () => {
    const authorValidationErrors = validateAuthor(newAuthorInput);
    if (Object.values(authorValidationErrors).some((value) => value !== "")) {
      setAuthorErrors(authorValidationErrors);
      return;
    }

    const newAuthor = { id: crypto.randomUUID(), name: newAuthorInput };
    dispatch(addAuthorAction(newAuthor));
    setAvailableAuthors([...availableAuthors, newAuthor.id]);
    setNewAuthorInput("");
  };

  const handleSaveCourse = async () => {
    const validationErrors = validateCreateCourse({
      title,
      description,
      duration: Number(duration),
    });

    if (Object.values(validationErrors).some((value) => value !== "")) {
      setCourseErrors(validationErrors);
      return;
    }

    const courseData = {
      title: title,
      description: description,
      duration: Number(duration),
      authors: courseAuthors,
    };

    if (isUpdateMode && courseId) {
      await dispatch(updateCourseThunk(courseId, courseData));
    } else {
      await dispatch(addCourseThunk(courseData));
    }

    setTitle("");
    setDescription("");
    setDuration("");
    setCourseAuthors([]);

    navigate("/courses");
  };

  return (
    <div className={styles.container}>
      <h2>Course Edit/Create Page</h2>

      <div className={styles.formContainer}>
        <MainInfoSection
          {...{
            title,
            handleTitleChange,
            description,
            handleDescriptionChange,
            duration,
            handleDurationChange,
            courseErrors,
          }}
        />
        <AuthorsSection
          {...{
            newAuthorInput,
            handleAuthorChange,
            handleCreateAuthor,
            authors,
            availableAuthors,
            courseAuthors,
            handleAddAuthorToCourse,
            handleRemoveAuthorFromCourse,
            authorError: authorErrors.name,
          }}
        />
      </div>

      <Button
        buttonText={isUpdateMode ? "Update Course" : "Create Course"}
        onClick={handleSaveCourse}
      />
    </div>
  );
};

export default CourseForm;
