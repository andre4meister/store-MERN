import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useAppDispatch } from 'hooks/redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormType } from 'services/userAPI';
import { fetchRegister } from 'store/user/user';
import styles from './Auth.module.scss';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigateFromLogin = useNavigate();
  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();

  const [disabledSave, setDisabledSave] = useState(true);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const onSubmit = (values: RegistrationFormType) => {
    dispatch(fetchRegister({ values, navigateFromLogin }));
  };

  return (
    <Card className={styles.form}>
      <Form
        size="large"
        layout="vertical"
        ref={formRef}
        name="registration"
        onFinish={onSubmit}
        form={form}
        onFieldsChange={handleFormChange}
      >
        <center>
          <h1>Registration</h1>
        </center>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
              min: 8,
              max: 26,
              whitespace: false,
              message: 'Incorrect email, try another',
              pattern: new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              ),
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="userName"
          label="Nickname"
          rules={[{ required: true, min: 8, max: 16, whitespace: false, message: 'Incorrect nickname, try another' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nickname" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, min: 8, max: 16, whitespace: false, message: 'Incorrect password, try another' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm password"
          dependencies={['password']}
          rules={[
            { required: true, min: 8, max: 16, whitespace: false, message: 'Incorrect password, try another' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          initialValue=""
          name="phone"
          label="Phone Number"
          rules={[{ required: false, min: 10, max: 14, message: 'Input your phone number', type: 'string' }]}
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone" />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={disabledSave}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
