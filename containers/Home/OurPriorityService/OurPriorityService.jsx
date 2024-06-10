import React from 'react'
import styles from './index.module.css'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import Card from "@mui/material/Card";

const OurPriorityService = () => {
  return (
    <section className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.flex1}>
        <h3>Votre Déménagement, Notre Priorité</h3>
        <p>Chez Bsmove, nous adaptons nos services à vos besoins pour vous garantir un déménagement sans souci. Que ce soit pour une prise en charge complète ou pour des interventions spécifiques, nous sommes à votre écoute pour personnaliser votre expérience.</p>
        </div>
      <div className={styles.flex2}>
        <div className={styles.card}>
          <span>
            <WidgetsRoundedIcon fontSize='large'/>
          </span>
          <div>
            <h5>Flexibilité totale</h5>
            <p>Services parfaitement adaptés à vos besoins et horaires.</p>
          </div>
        </div>
          <div className={styles.card}>
            <span>
              <WidgetsRoundedIcon fontSize='large'/>
            </span>
            <div className={styles.card_flex}>
              <h5>Transparence des prix</h5>
              <p>Devis immédiat et complet, sans surprises cachées.</p>
            </div>
          </div>
          <div className={styles.card}>
            <span>
              <WidgetsRoundedIcon fontSize='large'/>
            </span>
            <div>
              <h5>Services complémentaires</h5>
              <p>Large choix de véhicules et matériel pour déménager.</p>
            </div>
          </div>
          
        </div>
      </div>
      
    </section>
  )
}

export default OurPriorityService