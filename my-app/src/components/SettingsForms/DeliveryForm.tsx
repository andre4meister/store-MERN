import { Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { fetchUpdatePersonalInfo } from 'store/user/user';
import ButtonForForms from './ButtonsForForms';
import FormItem from './FormItem';
import { ShipmentMethodType } from 'store/user/user-types';
import styles from './SettingsForm.module.scss';

export interface DeliveryFormType {
  email: string;
  phone: string;
}

const mock = [{ country: 'Ukraine', city: 'Lviv', postMethod: ShipmentMethodType.NovaPoshta, chosenDepartment: 56 }];
const valueMock = mock.map(
  ({ chosenDepartment, city, country, postMethod }) => `${country}, ${city}
${postMethod}, ${chosenDepartment}`,
);

const DeliveryForm = () => {
  const dispatch = useAppDispatch();
  const { _id, deliveryMethod } = useAppSelector((state) => state.userReducer.userData);

  const [isEditing, setIsEditing] = useState(false);

  // const [emailInput, setEmail] = useState(email);
  // const [phoneInput, setPhone] = useState(phone);

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();

  const switchIsEditing = () => {
    if (isEditing) {
      form.resetFields();
    }
    setIsEditing((prev) => !prev);
  };

  const onSave = (values: DeliveryFormType) => {
    dispatch(fetchUpdatePersonalInfo({ ...values, _id }));
    console.log(values);
    switchIsEditing();
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} form={form} ref={formRef} onFinish={onSave} name="personal-data" layout="vertical">
        {/* <FormItem
          isEditing={isEditing}
          changeInput={setEmail}
          defaultValue={email}
          input={emailInput}
          label="Email"
          inputName="email"
        />
        <FormItem
          isEditing={isEditing}
          changeInput={setPhone}
          defaultValue={phone}
          input={phoneInput}
          label="Phone"
          inputName="phone"
        /> */}
        <ButtonForForms isEditing={isEditing} switchIsEditing={switchIsEditing} />
      </Form>
    </div>
  );
};

export default DeliveryForm;
