import { useNavigate } from "react-router-dom";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { formatCreationDate } from "../../../../helpers/formatCreationDate";
import Button from "../../../../common/Button/Button";
import styles from "../../courses.module.css";

import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const handleDeleteCourse = () => {
    dispatch({ type: "DELETE_COURSE", payload: id });
    navigate("/courses");
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
          <Button
            iconSrc="/imgs/bin.svg"
            altText="Bin icon"
            onClick={handleDeleteCourse}
            className="btn"
          />
          <Button
            iconSrc="/imgs/edit.svg"
            altText="Edit icon"
            onClick={() => {}}
            className="btn"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
