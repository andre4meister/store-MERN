import { Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { fetchUpdatePassword } from 'store/user/user-thunks';
import ButtonForForms from './ButtonsForForms';
import FormItem from './FormItem';
import styles from './SettingsForm.module.scss';

export interface ChangePasswordType {
  old: string;
  new: string;
  confirm: string;
}

const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.userReducer.userData);

  const [isEditing, setIsEditing] = useState(false);

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();

  const switchIsEditing = () => {
    if (isEditing) {
      form.resetFields();
    }
    setIsEditing((prev) => !prev);
  };

  const onSave = (values: ChangePasswordType) => {
    dispatch(fetchUpdatePassword({ ...values, _id }));
    console.log(values);
    switchIsEditing();
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        form={form}
        ref={formRef}
        onFinish={onSave}
        name="change-password"
        layout="vertical"
      >
        <FormItem isEditing={isEditing} defaultValue="" label="Old password" inputName="old" />
        <FormItem isEditing={isEditing} defaultValue="" label="New password" inputName="new" />
        <FormItem isEditing={isEditing} defaultValue="" label="Confirm new password" inputName="confirm" />
        <ButtonForForms isEditing={isEditing} switchIsEditing={switchIsEditing} />
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
