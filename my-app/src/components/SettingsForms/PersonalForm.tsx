import { Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { fetchUpdatePersonalInfo } from 'store/user/user';
import ButtonForForms from './ButtonsForForms';
import FormItem from './FormItem';
import styles from './SettingsForm.module.scss';

export interface PersonalDataType {
  userName: string;
  firstName: string;
  lastName: string;
}

const PersonalForm = () => {
  const dispatch = useAppDispatch();
  const { firstName, lastName, userName, _id } = useAppSelector((state) => state.userReducer.userData);

  const [isEditing, setIsEditing] = useState(false);

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();

  const switchIsEditing = () => {
    if (isEditing) {
      form.resetFields();
    }
    setIsEditing((prev) => !prev);
  };

  const onSave = (values: PersonalDataType) => {
    dispatch(fetchUpdatePersonalInfo({ ...values, _id }));
    console.log(values);
    switchIsEditing();
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} form={form} ref={formRef} onFinish={onSave} name="personal-data" layout="vertical">
        <FormItem isEditing={isEditing} defaultValue={userName} label="Nickname" inputName="userName" />
        <FormItem isEditing={isEditing} defaultValue={firstName} label="Firstname" inputName="firstName" />
        <FormItem isEditing={isEditing} defaultValue={lastName} label="Lastname" inputName="lastName" />
        <ButtonForForms isEditing={isEditing} switchIsEditing={switchIsEditing} />
      </Form>
    </div>
  );
};

export default PersonalForm;
