import { Button, ButtonProps, Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

interface SubmitButtonProps {
  props?: ButtonProps;
  form: FormInstance;
}

export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  props,
  children,
}) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button disabled={!submittable} {...props}>
      {children}
    </Button>
  );
};
