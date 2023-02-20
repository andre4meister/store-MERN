import { Form, Input, Select } from 'antd';
import { FC, memo } from 'react';
import { ShipmentMethodType } from 'store/user/user-types';
import styles from './OrderPageForms.module.scss';

interface DeliveryFormItemsProps {
  cities: string[];
  countries: any[];
  setShouldUpdateCities: React.Dispatch<React.SetStateAction<boolean>>;
  generateOptions: (itemsForSelect: any[]) => JSX.Element[];
}

const DeliveryFormItems: FC<DeliveryFormItemsProps> = ({
  cities,
  countries,
  generateOptions,
  setShouldUpdateCities,
}) => {
  return (
    <div className={styles.deliveryBlock}>
      <fieldset>
        <legend>Delivery info</legend>
        <div className={styles.contactsInfo}>
          <div className={styles.contactsRowItem}>
            <Form.Item
              className={styles.contactFormItem}
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  min: 3,
                  max: 60,
                  whitespace: false,
                  message: 'Incorrect country, try another',
                },
              ]}
            >
              <Select
                onSelect={() => setShouldUpdateCities((prev) => !prev)}
                showSearch
                placeholder="Select a country"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  return String(option?.value ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }}
              >
                {generateOptions(Object.values(countries.map((country) => country.country)))}
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.contactFormItem}
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  min: 2,
                  whitespace: false,
                  message: 'Incorrect city, try another',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a city"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  return String(option?.value ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }}
              >
                {generateOptions(cities)}
              </Select>
            </Form.Item>
          </div>
          <div className={styles.contactsRowItem}>
            <Form.Item
              className={styles.contactFormItem}
              name="postMethod"
              label="Post Service"
              rules={[
                {
                  required: true,
                  min: 3,
                  max: 26,
                  whitespace: false,
                  message: 'Incorrect post service, try another',
                },
              ]}
            >
              <Select placeholder="Select a post service">{generateOptions(Object.values(ShipmentMethodType))}</Select>
            </Form.Item>
            <Form.Item
              className={styles.contactFormItem}
              name="chosenDepartment"
              label="Department"
              rules={[
                {
                  required: true,
                  min: 1,
                  max: 10,
                  whitespace: false,
                  message: 'Incorrect department, try another',
                },
              ]}
            >
              <Input type="text" placeholder="Number of post department" />
            </Form.Item>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default memo(DeliveryFormItems);
