import { ChangeEventHandler, SyntheticEvent } from 'react';

export type RegisterUIProps = {
  errorText: string | undefined;
  name: string;
  email: string;
  password: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: SyntheticEvent) => void;
};
