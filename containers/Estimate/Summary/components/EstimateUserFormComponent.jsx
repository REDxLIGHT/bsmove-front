import { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import styles from './UserDataForm.module.css';
import Input from '../../../../components/Input'

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
      <form >
        <div className={styles.rent_summary__left_container}>
        <h2 className={styles["form-title"]}>Informations personnelles</h2>
          <Input
            type="text"
            id="prename"
            name="prename"
            label={"Prénom"}
            placeholder={"Ex: Jean"}
            value={formDataState.prename}
            onChange={handleChange}
            required
            fullWidth
            disabled={!isEditMode}
          />
          <Input
            type="text"
            id="name"
            name="name"
            label={"Nom"}
            placeholder={"Ex: Dupont"}
            value={formDataState.name}
            onChange={handleChange}
            required
            fullWidth
            disabled={!isEditMode}
          />
          <Input
            type="email"
            id="email"
            name="email"
            label={"Prénom"}
            placeholder={"Ex: Jean"}
            value={formDataState.email}
            onChange={handleChange}
            required
            fullWidth
            disabled={!isEditMode}
          />
          <Input
            type="tel"
            id="phone"
            name="phone"
            label={"Téléphone"}
            placeholder={"Ex: 0712345678"}
            value={formDataState.phone}
            onChange={handleChange}
            required
            fullWidth
            disabled={!isEditMode}
          />
          <Input
            type="text"
            id="address"
            name="address"
            label={"Addresse"}
            placeholder={"Ex: 10 rue des champs élysées"}
            value={formDataState.address}
            onChange={handleChange}
            required
            fullWidth
            disabled={!isEditMode}
          />
        <div className={styles["form-actions"]}>
          {isEditMode ? (
            <Button onClick={handleSave}>Sauvegarder</Button>
          ) : (
            <button onClick={handleEdit} style={{
              width: "100%",
              border: '1px solid #38c798',
              color: '#38c798',
              padding: '10px',
              borderRadius: '8px',
              height: '3rem',
              fontSize: '1em',
            }}>Modifier</button>
          )}
        </div>
        </div>
      </form>
  );
};

export default EstimateUserFormComponent;
