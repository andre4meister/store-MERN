import { Collapse } from 'antd';
import { CustomPanel } from 'components/Dropdown/DropdownPanel';
import ChangeLoginForm from 'components/Settings/SettingsForms/ChangeLoginForm';
import ChangePasswordForm from 'components/Settings/SettingsForms/ChangePasswordForm';
import ContactsForm from 'components/Settings/SettingsForms/ContactsForm';
import DeleteAccountForm from 'components/Settings/SettingsForms/DeleteAccountForm';
import DeliveryForm from 'components/Settings/SettingsForms/DeliveryForm';
import PersonalForm from 'components/Settings/SettingsForms/PersonalForm';
import React, { FC } from 'react';
import styles from '../../../pages/SettingPage/Settings.module.scss';

const { Panel } = Collapse;

export interface ProfileSettingType {
  header: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const profileSettings: ProfileSettingType[] = [
  { header: 'Personal info', children: <PersonalForm /> },
  { header: 'Email', children: <ChangeLoginForm /> },
  { header: 'Password', children: <ChangePasswordForm /> },
  { header: 'Contacts', children: <ContactsForm /> },
  { header: 'Delivery method', children: <DeliveryForm /> },
];

const AllProfileSettings: React.FC = () => {
  return (
    <>
      <h1>Your settings and data</h1>
      <Collapse className={styles.collapse}>
        {profileSettings.map((item) => (
          <CustomPanel children={item.children} header={item.header} key={item.header?.toString()} />
        ))}
        <CustomPanel children={<DeleteAccountForm />} header="Delete account" />
      </Collapse>
    </>
  );
};

export default AllProfileSettings;
