import styles from "./ContactFormUi.module.scss";
import InputUi from "../form/InputUi";
import TextareaUi from "../form/TextareaUi";
import ButtonUi from "../form/ButtonUi";

interface ContactFormUiProps {
  name: string;
  email: string;
  message: string;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  successMessage?: string;
}

const ContactFormUi = ({
  name,
  email,
  message,
  errors,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onSubmit,
  isSubmitting = false,
  successMessage,
}: ContactFormUiProps) => {
  return (
    <form
      className={styles.contactForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles.contactForm__fields}>
        <InputUi
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          error={errors.name}
          onChange={onNameChange}
        />
        <InputUi
          label="Email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          error={errors.email}
          onChange={onEmailChange}
        />
        <TextareaUi
          label="Message"
          placeholder="Your message..."
          value={message}
          error={errors.message}
          onChange={onMessageChange}
          rows={6}
        />
      </div>
      {successMessage && (
        <div className={styles.contactForm__success}>{successMessage}</div>
      )}
      <ButtonUi type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </ButtonUi>
    </form>
  );
};

export default ContactFormUi;
