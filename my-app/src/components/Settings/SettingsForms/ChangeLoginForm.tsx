import { Button, Space, Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { fetchUpdatePersonalInfo } from 'store/user/user-thunks';
import ButtonForForms from './ButtonsForForms';
import FormItem from './FormItem';
import styles from './SettingsForm.module.scss';

export interface ChangeEmailType {
  email: string;
}

const ChangeLoginForm = () => {
  const dispatch = useAppDispatch();
  const { email, _id } = useAppSelector((state) => state.userReducer.userData);

  const [isEditing, setIsEditing] = useState(false);

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();

  const switchIsEditing = () => {
    if (isEditing) {
      form.resetFields();
    }
    setIsEditing((prev) => !prev);
  };

  const onSave = (values: ChangeEmailType) => {
    dispatch(fetchUpdatePersonalInfo({ ...values, _id }));
    console.log(values);
    switchIsEditing();
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} form={form} ref={formRef} onFinish={onSave} name="personal-data" layout="vertical">
        <FormItem isEditing={isEditing} defaultValue={email} label="Email" inputName="email" />
        <ButtonForForms isEditing={isEditing} switchIsEditing={switchIsEditing} />
      </Form>
    </div>
  );
};

export default ChangeLoginForm;
