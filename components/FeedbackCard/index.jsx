import React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';

import styles from './index.module.css';

const S = {};

S.Card = styled(Card)`
  margin: 0 0.8rem;
  padding: 0;
  border-radius: 7px;
  min-width: 23rem;
  max-height: 288px;
  max-width: 20%;
  height: 100%;
`;

S.CardContent = styled(CardContent)`
  text-align: left;
  text-overflow: ellipsis;
  margin: 0;
`;

S.Avatar = styled(Avatar)`
  width: 3.7rem;
  height: 3.7rem;
`;

const fakefeedback = "Très bon professionnel. Nous sommes déjà passé trois fois par lui et toujours avec satisfaction. Très réactif et toujours à l'écoute pour gérer le déménagement."

const FeedbackCard = ({ feedback = 'coucou', user, imgSrc }) => {
  return (
    <>
      <S.Card elevation={4}>
        <CardContent>
          <div className={styles.feedback_user_container}>
            <S.Avatar src={imgSrc} />
            <div className={styles.feedback_user_infos}>
              <div className={styles.feedback_user_name}>{user.name}</div>
              {/* <div className={styles.feedback_tags}>"tags"</div> */}
            </div>
          </div>
        </CardContent>
        <S.CardContent>
          <div className={styles.feedback_content}>
            {fakefeedback}
          </div>
        </S.CardContent>
      </S.Card>
    </>
  );
}

export default FeedbackCard;
