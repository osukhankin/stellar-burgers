import { ChangeEventHandler, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: SyntheticEvent) => void;
};
