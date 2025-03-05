import Button from "../../common/Button/Button";
import styles from "./emptyCourseList.module.css";

const EmptyCourseList = () => {
  return (
    <div className={styles.container}>
      <h1>Your List is Empty</h1>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button
        buttonText="Add New Course"
        onClick={() => {}}
        className="btn btn-info"
      />
    </div>
  );
};

export default EmptyCourseList;
