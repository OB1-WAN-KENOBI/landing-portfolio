import { useState, useEffect, useRef } from "react";
import ContactFormUi from "../../shared/ui/contact-form/ContactFormUi";
import { validateEmail } from "../../shared/lib/validation/email";
import { sanitizeInput } from "../../shared/lib/validation/sanitize";

const ContactFormWidget = () => {
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
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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

    // Санитизация данных перед отправкой
    sanitizeInput(name);
    sanitizeInput(email);
    sanitizeInput(message);

    // Имитация отправки (без API)
    timeoutRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Message sent!");
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
    />
  );
};

export default ContactFormWidget;
