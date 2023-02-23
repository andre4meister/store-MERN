import { FormOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Select } from 'antd';
import classNames from 'classnames';
import OrderItem from 'components/Item/OrderItem/OrderItem';
import EditOrderModal from 'components/OrderPage/EditOrderModal/EditOrderModal';
import OrderConfirmation from 'components/OrderPage/OrderConfirmation/OrderConfirmation';
import ContactsFormItems from 'components/OrderPage/OrderPageForms/ContactsFormItems';
import DeliveryFormItems from 'components/OrderPage/OrderPageForms/DeliveryFormItems';
import UserShouldLogin from 'components/UserShouldLogin/UserShouldLogin';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import { getCountriesAndCities } from 'services/thirdPartyAPI';
import { fetchCreateOrder } from 'store/order/order-thunks';
import { CreateOrderFormType, PaymentStatus } from 'store/order/order-types';
import { getTotalCountSum } from 'utils/userUtils/getTotalOrderSum';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const {
    _id: userId,
    cart,
    role,
    lastName,
    firstName,
    email,
    phone,
  } = useAppSelector((state) => state.userReducer.userData);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { order, orderStatus } = useAppSelector((state) => state.orderReducer);

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();
  const [disabledSave, setDisabledSave] = useState(true);

  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<{ country: string; cities: string[] }[]>([]);
  const [shouldUpdateCities, setShouldUpdateCities] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const handleOrderFormSubmit = () => {
    const values = form.getFieldsValue();
    const orderBody: CreateOrderFormType = {
      order: {
        items: cart,
        userId,
        paymentStatus: PaymentStatus.notpayed,
        price: getTotalCountSum(cart),
        shipmentMethod: values.postMethod,
        delivery: {
          country: values.country,
          city: values.city,
          postMethod: values.postMethod,
          chosenDepartment: values.chosenDepartment,
        },
        recipientInfo: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          phone: values.phone,
        },
      },
      userId,
    };
    dispatch(fetchCreateOrder(orderBody));
  };

  const generateOptions = (itemsForSelect: any[]) => {
    return Object.values(itemsForSelect).map((value) => (
      <Select.Option key={value} value={value}>
        {value}
      </Select.Option>
    ));
  };

  useEffect(() => {
    getCountriesAndCities().then((countriesArray) => setCountries(countriesArray));
  }, []);

  useEffect(() => {
    setCities(
      countries
        .filter((countryObj) => countryObj.country === form.getFieldValue('country'))
        .map((country) => country.cities)
        .flat(),
    );
  }, [form.getFieldValue('country'), shouldUpdateCities]);

  // WIP delete order and change status when unmounting
  // useEffect(() => {
  //   return () => {
  //     dispatch(setOrderStatus('' as OrderStatus));
  //     dispatch(setOrder({} as OrderType));
  //   };
  // }, [orderStatus]);

  if (!isAuth) {
    return <UserShouldLogin pageName="Order" />;
  }

  if (orderStatus) {
    return <OrderConfirmation order={order} orderStatus={orderStatus} />;
  }

  return (
    <div className={styles.orderPage}>
      {isModalVisible ? <EditOrderModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> : null}
      <div className={styles.container}>
        <h1>Placing an order</h1>
        <Form
          size="large"
          layout="vertical"
          ref={formRef}
          name="login"
          onFinish={handleOrderFormSubmit}
          form={form}
          onFieldsChange={handleFormChange}
        >
          <div className={styles.contentWrapperInForm}>
            <main>
              <ContactsFormItems email={email} firstName={firstName} lastName={lastName} phone={phone} />
              <div className={styles.order}>
                <div className={styles.orderHeader}>
                  <h2>Order</h2>
                </div>
                <fieldset>
                  <div className={styles.wrapper}>
                    <legend>Goods</legend>
                    <button className={styles.editButton} type="button" onClick={() => setIsModalVisible(true)}>
                      <FormOutlined />
                      <span>Edit</span>
                    </button>
                  </div>
                </fieldset>
                <ul className={styles.itemsList}>
                  {cart.map(({ item, quantity }) => {
                    return <OrderItem item={item} quantity={quantity} key={item._id} />;
                  })}
                </ul>
                <DeliveryFormItems
                  cities={cities}
                  countries={countries}
                  generateOptions={generateOptions}
                  setShouldUpdateCities={setShouldUpdateCities}
                />
              </div>
            </main>
            <aside className={styles.aside}>
              <div className={styles.checkoutTotal}>
                <h2>In total</h2>
                <div className={styles.checkoutTotalRow}>
                  <div className={styles.checkoutTotalLabel}>{`${cart.length} products for the sum`}</div>
                  <div className={styles.checkoutTotalValue}>{getTotalCountSum(cart)}&nbsp;$</div>
                </div>
                <div className={styles.checkoutTotalRow}>
                  <div className={styles.checkoutTotalLabel}>Cost of delivery</div>
                  <div className={styles.checkoutTotalValue}>according to the carrier's tariffs</div>
                </div>
                <div className={classNames(styles.checkoutTotalRow, styles.checkoutWithMargin)}>
                  <div className={styles.checkoutTotalLabel}>To pay</div>
                  <div className={classNames(styles.checkoutTotalValue, styles.textBig)}>
                    {getTotalCountSum(cart)}&nbsp;$
                  </div>
                </div>
                <div className={styles.asideButton}>
                  <Button type="primary" size="large" htmlType="submit" disabled={disabledSave}>
                    Confirm an order
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OrderPage;
