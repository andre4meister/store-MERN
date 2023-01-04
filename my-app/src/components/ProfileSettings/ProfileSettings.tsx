import { Collapse } from 'antd';
import ChangeLoginForm from 'components/SettingsForms/ChangeLoginForm';
import ChangePasswordForm from 'components/SettingsForms/ChangePasswordForm';
import ContactsForm from 'components/SettingsForms/ContactsForm';
import DeleteAccountForm from 'components/SettingsForms/DeleteAccountForm';
import DeliveryForm from 'components/SettingsForms/DeliveryForm';
import PersonalForm from 'components/SettingsForms/PersonalForm';
import styles from '../../pages/SettingPage/Settings.module.scss';

const { Panel } = Collapse;

export const profileSettings: ProfileSettingType[] = [
  { header: 'Personal info', children: <PersonalForm /> },
  { header: 'Email', children: <ChangeLoginForm /> },
  { header: 'Password', children: <ChangePasswordForm /> },
  { header: 'Contacts', children: <ContactsForm /> },
  { header: 'Delivery method', children: <DeliveryForm /> },
];

interface ProfileSettingType {
  header: string;
  children: React.ReactNode;
}

export const CustomPanel: React.FC<ProfileSettingType> = ({ header, children, ...props }) => {
  return (
    <Panel header={header} {...props} key={header} className={styles.panel}>
      {children}
    </Panel>
  );
};

const AllProfileSettings: React.FC = () => {
  return (
    <>
      <h1>Your settings and data</h1>
      <Collapse className={styles.collapse}>
        {profileSettings.map((item) => (
          <CustomPanel children={item.children} header={item.header} key={item.header} />
        ))}
        <CustomPanel children={<DeleteAccountForm />} header="Delete account" />
      </Collapse>
    </>
  );
};

export default AllProfileSettings;
