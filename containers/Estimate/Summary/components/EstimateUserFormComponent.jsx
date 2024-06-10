import { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import styles from './UserDataForm.module.css';
import api from '../../../../helpers/api';

const EstimateUserFormComponent = ({ onSubmit, handleContinue, initialFormData, step = 3 }) => {
  const [formDataState, setFormDataState] = useState({
      prename: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      ...initialFormData // Initialize with prop data if provided
    } || {});
  const [isEditMode, setIsEditMode] = useState(true);

  useEffect(() => {
    handleContinue(true);
  }, [handleContinue]);


  // Function to handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setFormDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSave = () => {
    onSubmit(formDataState);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    
    <div className={styles["form-container"]}>
      <h2 className={styles["form-title"]}>Votre Informations</h2>
      <form >
        <div className={styles["form-group"]}>
          <label htmlFor="name">Prénom</label>
          <input
            type="text"
            id="prename"
            name="prename"
            placeholder='votre prénom'
            value={formDataState.prename}
            onChange={handleChange}
            required
            disabled={!isEditMode}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='votre nom'
            value={formDataState.name}
            onChange={handleChange}
            required
            disabled={!isEditMode}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='votre email'
            value={formDataState.email}
            onChange={handleChange}
            required
            disabled={!isEditMode}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="phone">Numero de telephone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder='votre numero de telephone'
            value={formDataState.phone}
            onChange={handleChange}
            required
            disabled={!isEditMode}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder='votre address'
            value={formDataState.address}
            onChange={handleChange}
            required
            disabled={!isEditMode}
          />
        </div>
        <div className={styles["form-actions"]}>
          {isEditMode ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
        </div>
      </form>
    </div>
      
  );
};

export default EstimateUserFormComponent;
