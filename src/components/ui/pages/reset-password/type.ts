import { ChangeEventHandler, SyntheticEvent } from 'react';

export type ResetPasswordUIProps = {
  errorText: string | undefined;
  password: string;
  token: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: SyntheticEvent) => void;
};
