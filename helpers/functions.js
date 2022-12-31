import cookie from 'cookie';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/fr'
import Routes from './routes';
import api from "./api";

export function isObjectEmpty(obj) {
  if (!obj) return true;
  if (Object.keys(obj).length > 0) return false;
  return true;
}

export async function parseCookies(req) {
  const serverCookie = await cookie.parse(req ? req.headers.cookie || "" : document?.cookie);
  return serverCookie;
}

export function findItemQuantityInBasket(item, basketItems = [], resetBasketQuantity, count) {
  const itemIsInBasket = basketItems.find(basketItem => basketItem?.id === item.id);
  if (isObjectEmpty(itemIsInBasket)) return 0;
  if (itemIsInBasket.quantity && itemIsInBasket.quantity > item?.stock) {
    /* if (isObjectEmpty(itemIsInBasket)) removeFromBasket(basketItems, item); */
    resetBasketQuantity(item, count);
    return 0;
  }
  return itemIsInBasket?.quantity;
}

export function redirectNotLogged(auth, router, pathname) {
  return router.push(auth?.id ? pathname : Routes.LOGIN_PAGE);
}

export function redirectLogged(auth, router, pathname) {
  return router.push(auth?.id ? Routes.LOGIN_PAGE : pathname);
}

// routeType should be either private for routes with necessary connexion,
// public for routes where you're not supposed to access with a connexion,
// common if connexion doesn't affect the route

export async function handlePageRedirect(cookies = {}, routeType = 'common', location = '', extraCondition = false) {
  const parsedCustomerCookie = (await isObjectEmpty(cookies?.customer)) ? {} : JSON.parse(cookies?.customer);
  const parsedAdminCookie = (await isObjectEmpty(cookies?.admin)) ? {} : JSON.parse(cookies?.admin)
  if (extraCondition) {
    return {
      redirect: {
        destination: Routes.HOME_PAGE,
        permanent: false,
      },
    }
  }
  if (routeType === 'private' && isObjectEmpty(parsedCustomerCookie)) {
      return {
        redirect: {
          destination: Routes.LOGIN_PAGE,
          permanent: false,
        },
    }
  } else if (parsedCustomerCookie?.passwordReset && location !== Routes.RESET_PASSWORD_PAGE) {
      return {
        redirect: {
          destination: Routes.RESET_PASSWORD_PAGE,
          permanent: false,
        },
      }
  } else if (routeType === 'public' && !isObjectEmpty(parsedCustomerCookie)) {
    return {
      redirect: {
        destination: Routes.HOME_PAGE,
        permanent: false,
      },
    }
  } else if (routeType === 'admin') {
    if  (isObjectEmpty(parsedAdminCookie)) return { redirect: { destination: Routes.DASHBOARD_LOGIN_PAGE, permanent: false } }
    // TODO : FIND A WAY TO CHECK THE ADMIN HERE
    // const admin = await api.get('/users')
  }
  return {
    props: {
      cookies,
    }
  }
}

const countryMaps = new Map();
countryMaps.set('France', 'FR');
countryMaps.set('United State', 'US');
countryMaps.set('Portugal', 'PT');
countryMaps.set('Espagne', 'ES');

export async function convertCountry(countryName) {
  return countryMaps.get(countryName);
}

export function getShortExpiry(month, year) {
  if (!year || !month) return null;
  const shortenedYear = year.toString().slice(-2);
  return `${month}/${shortenedYear}`;
}

export function formatDate(isoString, format = 'DD/MM/YYYY') {
  if (!isoString) return null;
  const date = moment(isoString);
  return date.locale('fr').format(format);
}

export function getOrderStatus(finished, status) {
  if (finished && status === 'PAID') return 'success';
  if (finished && status === 'UNPAID') return 'error';
  if (!finished && status === 'PAID') return 'pending';
  return 'incomplete';
}

export function getStringWithoutXChar(str, char) {
  if (!str || !char) return str;
  return str.replace(`/${char}/g`, '');
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function yesNoBooleanConversion(value) {
  switch (value) {
    case 'yes':
      return true;
    case 'no':
      return false;
    case true:
      return 'yes';
    case false:
      return 'no';
    default:
      return false;
  }
}

export function cutAfter(str, char) {
  if (!str || !str.length) return '';
  return str.slice(str.lastIndexOf(char) + 1);
}