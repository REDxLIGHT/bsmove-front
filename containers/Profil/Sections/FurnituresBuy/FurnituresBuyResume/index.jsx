import React from 'react';
import { Divider } from '@material-ui/core';
import Image from 'next/image'
import { formatDate, getOrderStatus } from '../../../../../helpers/functions';
import SectionContainer from '../../section';

import messages from './messages';
import styles from './index.module.css';
import { CURRENCY } from '../../../../../helpers/constants';

const FurnituresBuyResumeComponent = ({ order, handleSeeDetails }) => {
  return (
    <>
      <div>
        <span onClick={() => handleSeeDetails()} className={styles.furnitures_buy_resume_navigation}>{messages.navigation.back}</span>
        <span>{`${messages.navigation.actual} ${order?.uniqueId || '[non_defini]'}`}</span>
      </div>
      <div className={styles.furnitures_buy_resume_container}>
        <div className={styles.furnitures_buy_resume_section}>
          <span>{messages.deliveryState.general.firstPart}</span>
          <span>{order?.uniqueId}</span>
          <span>{messages.deliveryState.general.secondPart}</span>
          <span>{formatDate(order?.createdAt)}</span>
          <span>{messages.deliveryState[getOrderStatus(order?.finished, order?.status)]}</span>
        </div>
        <div className={styles.furnitures_buy_resume_section}>
          <div className={styles.furnitures_buy_resume_title}>{messages.articlesResume.title}</div>
          <div className={styles.furnitures_buy_resume_items_container}>
            <div className={styles.furnitures_buy_resume_items_header}>
              <div className={styles.furnitures_buy_resume_items_section_articles}>{messages.articlesResume.headers.articles}</div>
              <div className={styles.furnitures_buy_resume_items_section_quantity}>{messages.articlesResume.headers.quantity}</div>
              <div className={styles.furnitures_buy_resume_items_section_total}>{messages.articlesResume.headers.total}</div>
            </div>
            <Divider />
            {order?.items?.map((item) => (
              <div key={item.id}>
                <div className={styles.furnitures_buy_resume_article_section}>
                  <div className={styles.furnitures_buy_resume_items_section_articles}>
                    <div className={styles.furnitures_buy_resume_article_description}>
                      <div className={styles.furnitures_buy_resume_article_img_container}>
                        <Image
                          className={styles.furnitures_buy_resume_article_img_illustration}
                          layout="fill"
                          src={item.photos[0]}
                          alt={`${item?.name}--${item?.id}`}
                        />
                      </div>
                      <div>{item.name}</div>
                    </div>
                  </div>
                  <div className={styles.furnitures_buy_resume_items_section_quantity}>
                    <div>{`x${item.quantity}`}</div>
                  </div>
                  <div className={styles.furnitures_buy_resume_items_section_total}>
                    <div>{`${item.quantity * item.price}${CURRENCY.EUR}`}</div>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
            <div className={styles.furnitures_buy_resume_article_total}>
              <div className={styles.furnitures_buy_resume_items_section_articles}>
                {messages.articlesResume.total}
              </div>
              <div className={styles.furnitures_buy_resume_items_section_quantity}>
                {order.total}
              </div>
              <div className={styles.furnitures_buy_resume_items_section_total}>
                {order.summedTotal}{CURRENCY.EUR}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.furnitures_buy_resume_section}>
          <div className={styles.furnitures_buy_resume_title}>{messages.facturationResume.title}</div>
          <div>{`${order?.facturationAddress?.lastName} ${order?.facturationAddress?.firstName}`}</div>
          <div>{order?.facturationAddress?.street}</div>
          <div>{`${order?.facturationAddress?.zipCode} ${order?.facturationAddress?.country}`}</div>
        </div>
      </div>
    </>
  )
}

const FurnituresBuyResume = ({ order = {}, handleSeeDetails }) => (
  <SectionContainer
    sectionTitle={`${messages.title} ${order?.uniqueId || '[non_defini]'}`}
    component={FurnituresBuyResumeComponent}
    order={order}
    handleSeeDetails={handleSeeDetails}
  />
)

export default FurnituresBuyResume;
