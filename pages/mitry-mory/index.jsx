import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import MitryMory from "../../containers/Mitry-Mory";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const MitryMoryPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Mitry-Mory - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Mitry-Mory? Profitez de nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Mitry-Mory, Location de camion avec chauffeur Mitry-Mory, Location de monte-meuble Mitry-Mory, Achats de carton de déménagement Mitry-Mory, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='mitry-mory'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/mitry-mory" />
        <meta property="og:url" content="https://www.bsmove.com/mitry-mory"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <MitryMory />
      <DynamicFooter />

    </Layout>
  )
}

export default MitryMoryPage