import React from 'react';
import { useRouter } from 'next/router';

import Card from '../../../../../components/Card';
import Button from '../../../../../components/Button';

import styles from './index.module.css';
import messages from './messages';
import Image from "next/legacy/image";
import Routes from '../../../../../helpers/routes';

const DashboardMovingDetailCardInformations = ({
  informations = [],
}) => {
  return (
    <div className={styles.dashboard_moving_detail_card_informations_grid_container}>
      {
        informations?.map((information, index) => (
          <div key={information?.title || index} className={styles.dashboard_moving_detail_card_informations_grid_item}>
            <span className={styles.dashboard_moving_detail_card_informations_grid_item_title}>
              {information.title || '[introuvable]'}
            </span>
            <span className={styles.dashboard_moving_detail_card_informations_grid_content}>
              {information.content || '[introuvable]'}
            </span>
          </div>
        ))
      }
    </div>
  )
}

const DashboardMovingDocumentsSection = () => {
  return (
    <Card title={messages.content.cards.documents.title}>
      <Button
        outlined
        $color='rgba(71, 85, 105, 0.5)'
        onClick={() => console.log('render document : ', messages.content.cards.documents.actions.estimate)}
      >
        <div className={styles.dashboard_moving_detail_card_documents_actions_container}>
          <div className={styles.dashboard_moving_detail_card_documents_actions_icon_container}>
            <Image
              className={styles.dashboard_moving_detail_card_documents_actions_icon}
              layout="fill"
              src={'/images/pdf-icon.png'}
              alt={`pdf-icon`}
              />
          </div>
          <span className={styles.dashboard_moving_detail_card_documents_actions_label}>
            {messages.content.cards.documents.actions.estimate}
          </span>
        </div>
      </Button>
    </Card>
  )
}

const contactInformationsMock = [
  { title: 'Nom', content: 'Sami Boudoukha' },
  { title: 'Téléphone', content: '07 34 53 54 54' },
  { title: 'Email', content: 'email@test.fr' },
]

const DashboardMovingDetailContactSection = () => {
  return (
    <Card title={messages.content.cards.contact.title}>
      <DashboardMovingDetailCardInformations informations={contactInformationsMock} />
    </Card>
  );
}

const movingInformationsMock = [
  { title: 'Départ', content: '1 rue des Martyrs 75009 Paris' },
  { title: 'Arrivé', content: '1 allée René Leriche 91300 Massy' },
  { title: 'Date', content: '15 septembre 2032' },
  { title: 'Volume', content: '32m³' },
]

const DashboardMovingDetailMovingDetailsSection = () => {
  function handleRenderPdf() {
    console.log('render pdf Devis');
  }

  return (
    <Card title={messages.content.cards.movingDetails.title}>
      <DashboardMovingDetailCardInformations informations={movingInformationsMock} />
      <span onClick={handleRenderPdf} className={`${styles.dashboard_moving_detail_card_informations_grid_item_title} ${styles.dashboard_moving_detail_underlined_text}`}>
        {messages.content.cards.movingDetails.action}
      </span>
    </Card>
  )
}

const DashboardMovingDetail = () => {
  const router = useRouter();
  const { ref } = router.query;

  function handleAcceptRedirect() {
    router.push(`${Routes.DASHBOARD_MOVING_DETAILS_ACCEPTED_PAGE}?ref=${ref}`);
  }

  function handleDenyRedirect() {
    router.push(`${Routes.DASHBOARD_MOVING_DETAILS_DENIED_PAGE}?ref=${ref}`);
  }

  return (
    <div className={styles.dashboard_moving_detail_container}>
      <div className={styles.dashboard_moving_detail_left_container}>
        <DashboardMovingDetailMovingDetailsSection />
        <DashboardMovingDetailContactSection />
        <div className={styles.dashboard_moving_detail_left_container_buttons_wrapper}>
          <Button onClick={handleAcceptRedirect}>{messages.content.actions.accept}</Button>
          <Button onClick={handleDenyRedirect} outlined $color='rgba(220, 38, 38, 1)'>{messages.content.actions.decline}</Button>
        </div>
      </div>
      <div className={styles.dashboard_moving_detail_right_container}>
        <DashboardMovingDocumentsSection />
      </div>
    </div>
  )
}

export default DashboardMovingDetail;
