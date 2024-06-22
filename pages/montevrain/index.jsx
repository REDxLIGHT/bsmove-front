import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Montevrain from "../../containers/Montevrain";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const MontevrainPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Montévrain - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Montévrain ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Montévrain, Location de camion avec chauffeur Montévrain, Location de monte-meuble Montévrain, Achats de carton de déménagement Montévrain, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='montevrain'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/montevrain" />
        <meta property="og:url" content="https://www.bsmove.com/montevrain"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Montevrain />
      <DynamicFooter />

    </Layout>
  )
}

export default MontevrainPage