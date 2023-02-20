import { Form, Input } from 'antd';
import { FC, memo } from 'react';
import styles from './OrderPageForms.module.scss';

interface ContactsFormItemsProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
const ContactsFormItems: FC<ContactsFormItemsProps> = ({ email, firstName, phone, lastName }) => {
  return (
    <fieldset>
      <legend>Contacts info</legend>
      <div className={styles.contactsInfo}>
        <div className={styles.contactsRowItem}>
          <Form.Item
            className={styles.contactFormItem}
            initialValue={firstName}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                min: 2,
                max: 40,
                whitespace: false,
                message: 'Incorrect name, try another',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            className={styles.contactFormItem}
            initialValue={lastName}
            name="surname"
            label="Surname"
            rules={[
              {
                required: true,
                min: 2,
                max: 40,
                whitespace: false,
                message: 'Incorrect surname, try another',
              },
            ]}
          >
            <Input type="text" placeholder="Surname" />
          </Form.Item>
        </div>
        <div className={styles.contactsRowItem}>
          <Form.Item
            className={styles.contactFormItem}
            initialValue={phone}
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                min: 8,
                max: 26,
                whitespace: false,
                message: 'Incorrect phone, try another',
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            className={styles.contactFormItem}
            name="email"
            label="Email"
            initialValue={email}
            rules={[
              {
                required: true,
                min: 8,
                max: 40,
                whitespace: false,
                message: 'Incorrect email, try another',
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ),
              },
            ]}
          >
            <Input type="text" placeholder="Email" />
          </Form.Item>
        </div>
      </div>
    </fieldset>
  );
};

export default memo(ContactsFormItems);
