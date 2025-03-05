import { useNavigate } from "react-router-dom";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import styles from "./courses.module.css";
import { fetchCourses, fetchAuthors } from "../../helpers/services";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthors, getCourses } from "../../store/selectors";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && courses.length === 0) {
      loadCourses(token);
      loadAuthors(token);
    }
  }, [dispatch]);

  const loadCourses = async (token: string) => {
    const coursesData = await fetchCourses(token);
    dispatch({ type: "SAVE_COURSES", payload: coursesData });
  };

  const loadAuthors = async (token: string) => {
    const authorsData = await fetchAuthors(token);
    dispatch({ type: "SAVE_AUTHORS", payload: authorsData });
  };

  return (
    <>
      {!courses || courses.length === 0 ? (
        <EmptyCourseList />
      ) : (
        <div className={styles.container}>
          <div className={styles.coursesHeader}>
            {/* <SearchBar /> */}
            <Button
              buttonText="Add new course "
              onClick={() => navigate("/courses/add")}
              className="btn"
            />
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
