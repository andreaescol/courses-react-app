import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthors, getCourses, getUser } from "../../store/selectors";
import { getCoursesThunk } from "../../store/courses/thunk";
import { getAuthorsThunk } from "../../store/authors/thunk";
import { AppDispatch } from "../../store/store";
import { getUserThunk } from "../../store/user/thunk";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import styles from "./courses.module.css";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const user = useSelector(getUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserThunk());

      if (courses.length === 0) {
        dispatch(getCoursesThunk());
        dispatch(getAuthorsThunk());
      }
    }
  }, [dispatch]);

  const isAdmin = user && user.role === "ADMIN";

  return (
    <>
      {!courses || courses.length === 0 ? (
        <EmptyCourseList />
      ) : (
        <div className={styles.container}>
          <div className={styles.coursesHeader}>
            {/* <SearchBar /> */}
            {isAdmin && (
              <Button
                buttonText="Add new course "
                onClick={() => navigate("/courses/add")}
                className="btn"
              />
            )}
          </div>

          {courses.map((course) => {
            const authorsNames = course.authors.map((authorId) => {
              const author = authors.find((a) => a.id === authorId);
              return author ? author.name : "Unknown Author";
            });

            return (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                authors={authorsNames}
                duration={course.duration}
                creationDate={course.creationDate}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Courses;
