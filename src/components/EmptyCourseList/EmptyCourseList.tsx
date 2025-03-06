import { useSelector } from "react-redux";
import { getUser } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import styles from "./emptyCourseList.module.css";

const EmptyCourseList = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector(getUser).role === "ADMIN";

  return (
    <div className={styles.container}>
      <h1>Your List is Empty</h1>
      {isAdmin === true ? (
        <>
          <p>Please use "Add New Course" button to add your first course</p>
          <Button
            buttonText="Add New Course"
            onClick={() => navigate("/courses/add")}
            className="btn btn-info"
          />
        </>
      ) : (
        <p>
          You don't have permissions to create a course. Please log in as ADMIN.
        </p>
      )}
    </div>
  );
};

export default EmptyCourseList;
