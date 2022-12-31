import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';

import { Subtitle } from '../../components/Texts';
import SummaryComponent from '../../components/Summary';
import { useCustomer } from '../../hooks/customer';
import { ALERT, DELIVERY_MODES } from '../../helpers/constants';

import messages from './messages';
import styles from './index.module.css';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import RadioButton from '../../components/Radio';
import Button from '../../components/Button';
import Routes from '../../helpers/routes';
import API from '../../helpers/api';
import { isObjectEmpty } from '../../helpers/functions';
import { useOrder } from '../../hooks/order';
import { useLoading } from '../../hooks/loading';
import { useAlert } from '../../hooks/alert';
import { useGlobal } from '../../hooks/global';
import { omit } from 'ramda';

const DeliveryModeItem = ({ deliveryMode = {}, radioValue = 0, handleRadioChange }) => {
  return (
    <div className="delivery-container__delivery_mode_item">
      <div className="delivery-container__delivery_mode_item_left">
        <RadioButton
          checked={radioValue === deliveryMode?.value}
          onChange={handleRadioChange}
          value={deliveryMode?.value}
          name={deliveryMode?.name}
        />
        <div className="delivery-container__delivery_mode_item_infos">
          <div className="delivery-container__delivery_mode_item_title">{deliveryMode.messages.where}</div>
          <div className="delivery-container__delivery_mode_item_subtitle">{deliveryMode.messages.when}</div>
        </div>
      </div>
      <div className="delivery-container__delivery_mode_item_logo">

      </div>
    </div>
  )
}

const AddressForm = ({ initialValues, handleSubmit, handleCancel, validate, formMode }) => {
  const [saveAddress, setSaveAddress] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: () => {},
    onSubmit: values => handleSubmit(values),
  });

  function handleSaveAddressChange(event) {
    formik.setFieldValue('saveAddress', !saveAddress)
    return setSaveAddress(prevState => !prevState);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs[formMode].lastName.label}
            placeholder={messages.inputs[formMode].lastName.placeholder}
            error={formik.touched.lastName && (formik.errors.lastName || !!formik?.status?.errors.lastName)}
            name={messages.inputs[formMode].lastName.name}
            values={formik.values.lastName}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='text'
          />
        </div>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs[formMode].firstName.label}
            placeholder={messages.inputs[formMode].firstName.placeholder}
            error={formik.touched.firstName && (formik.errors.firstName || !!formik?.status?.errors.firstName)}
            name={messages.inputs[formMode].firstName.name}
            values={formik.values.firstName}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='text'
          />
          </div>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs[formMode].street.label}
            placeholder={messages.inputs[formMode].street.placeholder}
            error={formik.touched.street && (formik.errors.street || !!formik?.status?.errors.street)}
            name={messages.inputs[formMode].street.name}
            values={formik.values.street}
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='text'
          />
        </div>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs[formMode].city.label}
            placeholder={messages.inputs[formMode].city.placeholder}
            error={formik.touched.city && (formik.errors.city || !!formik?.status?.errors.city)}
            name={messages.inputs[formMode].city.name}
            values={formik.values.city}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='text'
          />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs[formMode].zipCode.label}
              placeholder={messages.inputs[formMode].zipCode.placeholder}
              error={formik.touched.zipCode && (formik.errors.zipCode || !!formik?.status?.errors.zipCode)}
              name={messages.inputs[formMode].zipCode.name}
              values={formik.values.zipCode}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='text'
            />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs[formMode].country.label}
              placeholder={messages.inputs[formMode].country.placeholder}
              error={formik.touched.country && (formik.errors.country || !!formik?.status?.errors.country)}
              name={messages.inputs[formMode].country.name}
              values={formik.values.country}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='text'
            />
          </div>
          {formMode === 'delivery' && (
            <div className={styles.input_container}>
              <CheckBox checked={saveAddress} name={messages.inputs.delivery.saveAddress} onChange={handleSaveAddressChange} />
              <span>{messages.inputs.delivery.saveAddress.label}</span>
            </div>
          )}
        <div className={styles.dialog_actions}>
          <Button onClick={handleCancel}>{messages.dialog.action.deny}</Button>
          <Button type="submit" disabled={!isObjectEmpty(formik.errors) || formik.isSubmitting}>{messages.dialog.action.confirm}</Button>
        </div>
      </form>
    </>
  )
}

const DeliveryComponent = () => {
  const [radioValue, setRadioValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState({ open: false, dialog: 'delivery' });
  const [checked, setChecked] = useState(true);
  const router = useRouter();
  const { customer, setCustomer, auth } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  const { order, addDeliveryAddressToOrder, addFacturationAddressToOrder } = useOrder();

  useEffect(() => {
    if (customer && !order?.deliveryAddress) {
      addDeliveryAddressToOrder(customer?.address);
      addFacturationAddressToOrder(customer?.address);
    }
  }, [customer, order])

  function handleRadioChange(value) {
    if (radioValue === value) return ;
    return setRadioValue(value);
  }

  function handleDialogOpen(dialog) {
    return setDialogOpen(prevState => ({ ...prevState, dialog: (dialog || prevState?.dialog), open: !prevState?.open }));
  }

  function handleCheck() {
    handleDialogOpen('facturation');
    return setChecked(prevState => !prevState);
  }

  function handleNextStep() {
    return router.push(Routes.PAYMENT_PAGE);
  }

  async function handleDeliveryAddressChange(values) {
    if (isObjectEmpty(values)) return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.noAddress });
    const newAddress = omit(['saveAddress'], values);
    if (values.saveAddress) {
      setGlobalLoading(true);
      const response = await API.patch(`/Customers/${auth?.userId}`, { address: newAddress }, { headers: { Authorization: auth.id } });
      setGlobalLoading(false);
      if (!response || !response.ok) {
        return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.updateAddress });
      }
      setCustomer(response.data);
    }
    setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
    handleDialogOpen('delivery');
    return addDeliveryAddressToOrder(newAddress);
  }

  async function handleFacturationAddressChange(values) {
    if (isObjectEmpty(values)) return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.noAddress })
    setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success })
    handleDialogOpen('facturation');
    return addFacturationAddressToOrder(values);
  }

  function handleDeliveryAddressValidate() {
    return {};
  }

  function handleFacturationAddressValidate() {
    return {}
  }

  return (
    <div className={styles.delivery_component_container}>
      <Subtitle>{messages.title}</Subtitle>
      <div className={styles.delivery_component_grid}>
        <div className={styles.delivery_component_block}>
          <div className={styles.component_block_title}>{messages.grid.deliveryModeBlock.title}</div>
          <div className={styles.delivery_component_delivery_mode_block_content_template}>
          <div>
            {DELIVERY_MODES.map((deliveryMode) => (
              <DeliveryModeItem
                radioValue={radioValue}
                handleRadioChange={handleRadioChange}
                deliveryMode={deliveryMode} />
            ))}
          </div>
          </div>
        </div>
        <div className={styles.address_blocks_container}>
          <div className={styles.delivery_address_block}>
            <div className={styles.delivery_component_block}>
              <div className={styles.component_block_title}>{messages.grid.deliveryAddressBlock.title}</div>
              <div className={styles.delivery_component_addresses_block_content_template}>
                <div className={styles.delivery_address_block_content}>
                  <div className={styles.delivery_address_infos}>{`${order?.deliveryAddress?.lastName} ${order?.deliveryAddress?.firstName}`}</div>
                  <div className={styles.delivery_address_infos}>{order?.deliveryAddress?.street}</div>
                  <div className={styles.delivery_address_infos}>{`${order?.deliveryAddress?.zipCode} ${order?.deliveryAddress?.city}`}</div>
                  <div className={styles.delivery_address_infos}>{order?.deliveryAddress?.country}</div>
                  <div className={styles.delivery_address_infos}>{order?.deliveryAddress?.phoneNumber}</div>
                </div>
                <div className={styles.modify_span_button} onClick={() => handleDialogOpen('delivery')}>
                  <div>{messages.action.modify}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.billing_address_block}>
          <div className={styles.delivery_component_block}>
            <div className={styles.component_block_title}>{messages.grid.facturationAddressBlock.title}</div>
            <div className={styles.delivery_component_addresses_block_content_template}>
              <div className={styles.billing_address_block_content}>
                {checked
                  ? (
                    <div>
                      <CheckBox checked={true} onChange={handleCheck} />
                      <label>{messages.grid.facturationAddressBlock.checkbox}</label>
                    </div>
                  )
                  : (
                    <div className={styles.delivery_address_block_content}>
                      <div className={styles.delivery_address_infos}>{`${order?.facturationAddress?.lastName} ${order?.facturationAddress?.firstName}`}</div>
                      <div className={styles.delivery_address_infos}>{order?.facturationAddress?.street}</div>
                      <div className={styles.delivery_address_infos}>{`${order?.facturationAddress?.zipCode} ${order?.facturationAddress?.city}`}</div>
                      <div className={styles.delivery_address_infos}>{order?.facturationAddress?.country}</div>
                      <div className={styles.delivery_address_infos}>{order?.facturationAddress?.phoneNumber}</div>
                    </div>
                  )
                }
              </div>
              {!checked && <div className={styles.modify_span_button} onClick={() => handleDialogOpen('facturation')}>
                <div>{messages.action.modify}</div>
              </div>}
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className={styles.delivery_component_action_container}>
        <div className={styles.delivery_component_action_wrapper}>
          <Button onClick={handleNextStep}>{messages.action.continue}</Button>
        </div>
      </div>
      <Dialog
        fullWidth
        open={dialogOpen?.open}
        onClose={() => handleDialogOpen()}
      >
        <div className={styles.dialog_container}>
          <div className={styles.dialog_header}>
          <div className={styles.dialog_header_title}>{messages.dialog[dialogOpen?.dialog].title || ''}</div>
          <IconButton onClick={() => handleDialogOpen()} size="large">
            <CloseIcon />
          </IconButton>
          </div>
          <div className={styles.dialog_content}>
            <AddressForm
              initialValues={dialogOpen?.dialog === 'delivery' ? { ...order?.deliveryAddress, saveAddress: false } : order?.facturationAddress}
              handleSubmit={dialogOpen?.dialog === 'delivery' ? handleDeliveryAddressChange : handleFacturationAddressChange}
              handleCancel={() => handleDialogOpen()}
              validate={dialogOpen?.dialog === 'delivery' ? handleDeliveryAddressValidate : handleFacturationAddressValidate}
              formMode={dialogOpen?.dialog || 'delivery'}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

const DeliveryContainer = () => {
  const { global: { screenWidth } } = useGlobal();
  return (
    <div className={styles.delivery_page_container}>
      <DeliveryComponent />
      {screenWidth > 750 ? <SummaryComponent /> : null}
    </div>
  )
}

export default DeliveryContainer;
