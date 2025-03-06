import { useParams, useNavigate } from "react-router-dom";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { formatCreationDate } from "../../helpers/formatCreationDate";
import { useSelector } from "react-redux";
import { getAuthors, getCourses } from "../../store/selectors";
import Button from "../../common/Button/Button";
import styles from "./courseInfo.module.css";

const CourseInfo = () => {
  const navigate = useNavigate();
  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);

  const params = useParams();
  const course = courses.find((course) => course.id === params.courseId);

  if (!course) {
    return <h2>Unable to show course details.</h2>;
  }

  const authorsNames: string[] = course.authors.map((authorId) => {
    const author = authors.find((a) => a.id === authorId);
    return author ? author.name : "Unknown Author";
  });

  return (
    <div className={styles.container}>
      <h1>{course.title}</h1>
      <div className={styles.courseCard}>
        <h3 className={styles.descriptionTitle}>Description:</h3>
        <p className={styles.courseDescription}>{course.description}</p>
        <div className={styles.courseDetails}>
          <div className={styles.detail}>
            <strong>Course ID: </strong>
            <span>{course.id}</span>
          </div>
          <div className={styles.detail}>
            <strong>Duration: </strong>
            <span>{getCourseDuration(course.duration)}</span>
          </div>
          <div className={styles.detail}>
            <strong>Created: </strong>
            <span>{formatCreationDate(course.creationDate)}</span>
          </div>
          <div className={styles.detail}>
            <strong>Authors: </strong>
            <span>{authorsNames.join(", ")}</span>
          </div>
        </div>
      </div>
      <Button
        buttonText="Back"
        onClick={() => navigate(`/courses`)}
        className="btn"
      />
    </div>
  );
};

export default CourseInfo;
