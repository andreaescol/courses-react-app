import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCreateCourse } from "../../helpers/validateCreateCourse";
import { validateAuthor } from "../../helpers/validateAuthor";
import { useDispatch, useSelector } from "react-redux";
import { getAuthors } from "../../store/selectors";
import { addAuthorAction } from "../../store/authors/actions";
import { AppDispatch } from "../../store/store";
import { addCourseThunk } from "../../store/courses/thunk";
import Button from "../../common/Button/Button";
import MainInfoSection from "./components/MainInfoSection/MainInfoSection";
import AuthorsSection from "./components/AuthorsSection/AuthorsSection";
import styles from "./courseForm.module.css";
import { addCourseAction } from "../../store/courses/actions";

const CreateCourse = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const authors = useSelector(getAuthors);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availableAuthors, setAvailableAuthors] = useState<string[]>(
    authors.map((author) => author.id)
  );
  const [courseAuthors, setCourseAuthors] = useState<string[]>([]);
  const [newAuthorInput, setNewAuthorInput] = useState("");
  const [duration, setDuration] = useState("");

  const [courseErrors, setCourseErrors] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const [authorErrors, setAuthorErrors] = useState({
    name: "",
  });

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

  const handleCreateCourse = async () => {
    const validationErrors = validateCreateCourse({
      title,
      description,
      duration: Number(duration),
    });

    if (Object.values(validationErrors).some((value) => value !== "")) {
      setCourseErrors(validationErrors);
      return;
    }

    const newCourse = {
      title: title,
      description: description,
      duration: Number(duration),
      authors: courseAuthors,
    };

    await dispatch(addCourseThunk(newCourse));

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

      <Button buttonText="Create Course" onClick={handleCreateCourse} />
    </div>
  );
};

export default CreateCourse;
