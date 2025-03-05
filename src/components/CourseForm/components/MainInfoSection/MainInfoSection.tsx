import Input from "../../../../common/Input/Input";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import styles from "../../createCourse.module.css";

interface Props {
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  duration: string;
  handleDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  courseErrors: { title: string; description: string; duration: string };
}

const MainInfoSection = ({
  title,
  handleTitleChange,
  description,
  handleDescriptionChange,
  duration,
  handleDurationChange,
  courseErrors,
}: Props) => {
  return (
    <>
      <h3>Main Info</h3>

      <div className={courseErrors.title && styles.errors}>
        <Input
          labelText="Title"
          placeholderText="Enter course title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        {courseErrors.title && <p>{courseErrors.title}</p>}
      </div>

      <div className={courseErrors.description && styles.errors}>
        <label>Description </label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter course description"
        />
        {courseErrors.description && <p>{courseErrors.description}</p>}
      </div>

      <h3>Duration</h3>

      <div className={courseErrors.duration && styles.errors}>
        <div className={styles.inputContainer}>
          <div className={styles.inputCol}>
            <Input
              labelText="Duration"
              placeholderText="Enter duration in minutes"
              name="duration"
              value={duration}
              onChange={handleDurationChange}
              type="number"
            />
          </div>
          <div className={styles.accessoryCol}>
            <p className={styles.formattedDuration}>
              {getCourseDuration(Number(duration))}
            </p>
          </div>
        </div>
        {courseErrors.duration && <p>{courseErrors.duration}</p>}
      </div>
    </>
  );
};

export default MainInfoSection;
