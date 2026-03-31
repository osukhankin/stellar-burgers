import { ChangeEventHandler, SyntheticEvent } from 'react';

export type LoginUIProps = {
  errorText: string | undefined;
  email: string;
  password: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: SyntheticEvent) => void;
};
