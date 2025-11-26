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
  t: (key: string) => string;
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
  t,
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
          label={t("contact.form.name")}
          type="text"
          placeholder={t("contact.form.placeholder.name")}
          value={name}
          error={errors.name}
          onChange={onNameChange}
        />
        <InputUi
          label={t("contact.form.email")}
          type="email"
          placeholder={t("contact.form.placeholder.email")}
          value={email}
          error={errors.email}
          onChange={onEmailChange}
        />
        <TextareaUi
          label={t("contact.form.message")}
          placeholder={t("contact.form.placeholder.message")}
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
        {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
      </ButtonUi>
    </form>
  );
};

export default ContactFormUi;
