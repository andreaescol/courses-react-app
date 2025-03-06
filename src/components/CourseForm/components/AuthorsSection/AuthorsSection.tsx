import Input from "../../../../common/Input/Input";
import Button from "../../../../common/Button/Button";
import AuthorItem from "../AuthorItem/AuthorItem";
import styles from "../../courseForm.module.css";

interface Props {
  newAuthorInput: string;
  handleAuthorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateAuthor: () => void;
  authorError: string;
  authors: { id: string; name: string }[];
  availableAuthors: string[];
  courseAuthors: string[];
  handleAddAuthorToCourse: (id: string) => void;
  handleRemoveAuthorFromCourse: (id: string) => void;
}

const AuthorsSection = ({
  newAuthorInput,
  handleAuthorChange,
  handleCreateAuthor,
  authorError,
  authors,
  availableAuthors,
  courseAuthors,
  handleAddAuthorToCourse,
  handleRemoveAuthorFromCourse,
}: Props) => {
  return (
    <div className={styles.authorsContainer}>
      <div className={styles.authorsCol}>
        <h3>Authors</h3>

        <div className={`${authorError ? styles.errors : ""} `}>
          <div className={styles.inputContainer}>
            <div className={styles.inputCol}>
              <Input
                labelText="Author Name"
                placeholderText="Enter author name"
                name="newAuthor"
                value={newAuthorInput}
                onChange={handleAuthorChange}
              />
            </div>
            <div className={styles.accessoryCol}>
              <Button buttonText="Create Author" onClick={handleCreateAuthor} />
            </div>
          </div>
          {authorError && <p>{authorError}</p>}
        </div>

        <div className={styles.authorsList}>
          <h4>Authors List</h4>
          {availableAuthors.length > 0 ? (
            availableAuthors.map((authorId) => {
              const author = authors.find((a) => a.id === authorId);
              return author ? (
                <div key={author.id}>
                  <AuthorItem
                    name={author.name}
                    buttonText="+"
                    onClick={() => handleAddAuthorToCourse(author.id)}
                  />
                </div>
              ) : null;
            })
          ) : (
            <p>Available authors list is empty.</p>
          )}
        </div>
      </div>

      <div className={styles.courseAuthorsCol}>
        <h3>Course Authors</h3>
        {courseAuthors.length > 0 ? (
          courseAuthors.map((authorId) => {
            const author = authors.find((a) => a.id === authorId);
            return author ? (
              <div key={author.id}>
                <AuthorItem
                  name={author.name}
                  buttonText="-"
                  onClick={() => handleRemoveAuthorFromCourse(author.id)}
                />
              </div>
            ) : null;
          })
        ) : (
          <p>Course authors list is empty.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorsSection;
