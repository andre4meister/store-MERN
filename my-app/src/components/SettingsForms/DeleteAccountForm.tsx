import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Form, Checkbox } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { fetchDeleteAccount } from 'store/user/user';
import styles from './SettingsForm.module.scss';

const { confirm } = Modal;

const DeleteAccountForm = () => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.userReducer.userData);

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();

  const onDelete = () => {
    confirm({
      title: 'Do you want to delete your account?',
      icon: <ExclamationCircleFilled />,
      content: (
        <Form form={modalForm} labelAlign="left" layout="vertical">
          <span className={styles.confirmCheckbox}>
            <div>
              Your account, history of views, saved and liked items will be deleted and you won`t be able to get news,
              discounts and recommendations from our store
            </div>
            <Form.Item
              name="agree"
              rules={[{ required: true, message: 'You should accept terms of deleting your account' }]}
            >
              <Checkbox defaultChecked={false} />
              <span>I agree</span>
            </Form.Item>
          </span>
        </Form>
      ),
      okText: 'Delete',
      okButtonProps: {
        disabled: modalForm.getFieldValue('agree'),
        danger: true,
      },
      onOk() {
        dispatch(fetchDeleteAccount({ _id }));
      },
    });
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        form={form}
        ref={formRef}
        onFinish={onDelete}
        name="personal-data"
        layout="vertical"
      >
        <div className={styles.container__button}>
          <Button type="primary" htmlType="submit" danger className={styles.form__button}>
            Delete account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteAccountForm;
