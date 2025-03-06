import { useNavigate } from "react-router-dom";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { formatCreationDate } from "../../../../helpers/formatCreationDate";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/selectors";
import { deleteCourseThunk } from "../../../../store/courses/thunk";
import Button from "../../../../common/Button/Button";
import styles from "../../courses.module.css";

interface Props {
  id: string;
  title: string;
  description: string;
  authors: string[];
  duration: number;
  creationDate: string;
}

const CourseCard = ({
  id,
  title,
  description,
  authors,
  duration,
  creationDate,
}: Props) => {
  const navigate = useNavigate();
  const isAdmin = useSelector(getUser).role === "ADMIN";

  const handleDeleteCourse = () => {
    deleteCourseThunk(id);
    navigate("/courses");
  };

  const handleUpdateCourse = () => {
    navigate(`/courses/update/:${id}`);
  };

  return (
    <div className={styles.courseCard}>
      <h1 className={styles.courseTitle}>{title}</h1>
      <p className={styles.courseDescription}>{description}</p>
      <div className={styles.courseDetails}>
        <div className={styles.courseDetailsText}>
          <p>
            <strong>Authors: </strong>
            {authors.join(", ")}
          </p>
          <p>
            <strong>Duration: </strong>
            {getCourseDuration(duration)}
          </p>
          <p>
            <strong>Created: </strong>
            {formatCreationDate(creationDate)}
          </p>
        </div>
        <div className={styles.cardBtns}>
          <Button
            buttonText="Show Course"
            onClick={() => navigate(`/courses/${id}`)}
            className="btn"
          />
          {isAdmin && (
            <Button
              iconSrc="/imgs/bin.svg"
              altText="Bin icon"
              onClick={handleDeleteCourse}
              className="btn"
            />
          )}
          {isAdmin && (
            <Button
              iconSrc="/imgs/edit.svg"
              altText="Edit icon"
              onClick={handleUpdateCourse}
              className="btn"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
