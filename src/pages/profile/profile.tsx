import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectUser,
  selectAuthError
} from '../../services/selectors/auth-selectors';
import { updateUser } from '@slices';
import { useForm } from '../../hooks';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);

  const {
    values: formValue,
    setValues,
    handleChange
  } = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      name: user?.name ?? '',
      email: user?.email ?? ''
    }));
  }, [user, setValues]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={error ?? ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
