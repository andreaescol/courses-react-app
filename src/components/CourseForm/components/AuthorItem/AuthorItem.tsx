import Button from "../../../../common/Button/Button";
import styles from "../../createCourse.module.css";

interface Props {
  name: string;
  buttonText: string;
  onClick: () => void;
}

const AuthorItem = ({ name, buttonText, onClick }: Props) => {
  return (
    <>
      <span className={styles.authorName}>{name}</span>
      <Button
        className={styles.authorBtn}
        buttonText={buttonText}
        onClick={onClick}
      />
    </>
  );
};

export default AuthorItem;
