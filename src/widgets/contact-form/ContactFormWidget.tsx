import { useState, useEffect, useRef } from "react";
import ContactFormUi from "../../shared/ui/contact-form/ContactFormUi";
import { validateEmail } from "../../shared/lib/validation/email";
import { sanitizeInput } from "../../shared/lib/validation/sanitize";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";

const ContactFormWidget = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const validate = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = t("validation.name.required");
    }

    if (!email.trim()) {
      newErrors.email = t("validation.email.required");
    } else if (!validateEmail(email)) {
      newErrors.email = t("validation.email.invalid");
    }

    if (!message.trim()) {
      newErrors.message = t("validation.message.required");
    } else if (message.trim().length < 10) {
      newErrors.message = t("validation.message.minLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Применяем санитизацию и сохраняем результат
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Используем санитизированные значения
    timeoutRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(t("contact.form.messageSent"));
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});

      // Скрыть сообщение через 3 секунды
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage(undefined);
      }, 3000);
    }, 500);
  };

  return (
    <ContactFormUi
      name={name}
      email={email}
      message={message}
      errors={errors}
      onNameChange={setName}
      onEmailChange={setEmail}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      successMessage={successMessage}
      t={t}
    />
  );
};

export default ContactFormWidget;
