import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
//
import StickyBasket from '../../components/StickyBasket';
import FurnitureCard from '../../components/FurnitureCard';
import Subtitle from '../../components/Texts/Subtitle.jsx';

import Button from '../../components/Button';
import { useAlert } from '../../hooks/alert';
import { useLoading } from '../../hooks/loading';
import api from '../../helpers/api';
import { ALERT } from '../../helpers/constants';
import messages from './messages';
import styles from './index.module.css';
import { useGlobal } from '../../hooks/global';

const darkWithOpacity = 'rgba(27, 32, 50, 0.4)';
//
const S = {};

S.Category = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5em;
  width: 9em;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid ${({ theme, active }) => active ? theme.colors.mainGreen : darkWithOpacity};
  background-color: ${({ theme, active }) => active ? theme.colors.mainGreen : theme.colors.lightGrey};
  color: ${({ theme, active }) => active ? theme.colors.white : darkWithOpacity};
`;

const categories = [
  { label: messages.items.filters.all, filter: null, value: 0 },
  { label: messages.items.filters.boxes, filter: 'boxes', value: 1 },
  { label: messages.items.filters.bonding, filter: 'bonding', value: 2 },
  { label: messages.items.filters.others, filter: 'others', value: 3 },
];
//
const Categories = ({ categories = [], handleFetchItems }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  async function handleCategoryChange(category) {
    setActiveCategory(category?.value);
    handleFetchItems(category?.filter);
  }
  return (
    <div className={styles.furnitures_buy_items_categories_container}>
      {categories?.map(category => (
        <S.Category
            key={category?.label}
            active={category?.value === activeCategory}
            onClick={() => handleCategoryChange(category)}
        >
          {category?.label}
        </S.Category>
      ))}
    </div>
  )
}

const EmptyItemsList = () => (
  <div className={styles.empty_items_list}>
    {messages.emptyList}
  </div>
)

const FurnituresBuyItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const { setAlert = () => {} } = useAlert();
  const { setGlobalLoading = () => {} } = useLoading();

  async function handleFetchItems(filter) {
    console.log('handle fetch items called')
    setGlobalLoading(true);
    console.log('charging first')
    const response = filter
      ? await api.get(`/Products?filter={"where": {"tags": {"inq": ["${filter}"] }, "stock": { "gt": 0 } }}`)
      : await api.get('/Products?filter={"where": {"stock": {"gt": 0 } } }');
    setGlobalLoading(false);
    console.log('response furnitures is : ', response)
    if (!response || !response.ok) {
      setAlert({ severity: ALERT.ERROR, content: messages.alert.error.noProduct });
      return setItemsList([]);
    }
    setItemsList(response?.data);
  }

  useEffect(() => {
    console.log('should fetch item soon')
    handleFetchItems();
  }, [])

  return (
    <div className={styles.furnitures_buy_items_container}>
      <div id="furnitures_container" className={styles.furnitures_buy_items}>
        <div className={styles.furnitures_buy_items_container}>
          {console.log('here in furnitures buy 1')}
          <Categories handleFetchItems={handleFetchItems} categories={categories} />
        </div>
        {
          itemsList?.length ? (
            <div className={styles.furnitures_buy_items_grid}>
              <div className={styles.furnitures_buy_items_grid_content}>
                {console.log('here in furnitures buy 5')}
                {itemsList?.map((item, id) => <FurnitureCard key={id} item={item} />)}
              </div>
            </div>
          ) : (
            <EmptyItemsList />
          )}
      </div>
    </div>
  );
}

const FurnituresBuyContainer = () => {
  const { global: { screenWidth } } = useGlobal()
  //
  function scrollIntoView() {
    document.getElementById('furnitures_container').scrollIntoView({ behavior: 'smooth' })
  }
  //
  useEffect(() => {
    console.log('should be called once in the useeffect at least')
  }, [])

  return (
    <div>
      <StickyBasket />
      <div className={styles.container}>
        <div className={styles.furnitures_buy_description}>
          {
              screenWidth && screenWidth >= 750
              ? (
                <>
                  <div className={styles.furnitures_buy_description_content}>
                    <Subtitle>{messages.description.title}</Subtitle>
                    <div className={styles.furnitures_buy_description_content_text}>{messages.description.content}</div>
                    <div className={styles.furnitures_buy_description_action} onClick={scrollIntoView}>
                      <div>{messages.description.action}</div>
                      <ArrowDownwardIcon className={styles.furnitures_buy_description_action_icon} />
                    </div>
                  </div>
                  <div className={styles.furnitures_buy_description_illustration}>
                    <Image
                      className={styles.furnitures_buy_description_illustration_img}
                      layout="fill"
                      src='/images/furnitures_buy_illustration.png'
                      alt='illustration_achat_fournitures'
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.furnitures_buy_description_illustration}>
                    <Image
                      className={styles.furnitures_buy_description_illustration_img}
                      layout="fill"
                      src='/images/furnitures_buy_illustration.png'
                      alt='illustration_achat_fournitures'
                    />
                  </div>
                  <div className={styles.furnitures_buy_description_content}>
                    <Subtitle>{messages.description.title}</Subtitle>
                    <div className={styles.furnitures_buy_description_content_text}>{messages.description.content}</div>
                    <div className={styles.furnitures_buy_description_action} onClick={scrollIntoView}>
                      <div>{messages.description.action}</div>
                      <div className={styles.furnitures_buy_description_action_icon}><ArrowDownwardIcon /></div>
                    </div>
                  </div>
                </>
              )
          }
      </div>
      <FurnituresBuyItems />
      <div className={styles.furnitures_buy_footer}>
        <div className={styles.furnitures_buy_footer_content}>
          <div className={styles.furnitures_buy_footer_title}>{messages?.footer?.title}</div>
          <div className={styles.furnitures_buy_footer_subtitle}>{messages?.footer?.subtitle}</div>
          <div className={styles.furnitures_buy_footer_action_container}>
            <Button outlined color='rgb(255, 255, 255)' backgroundColor='transparent'>{messages?.footer?.action}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default FurnituresBuyContainer;
