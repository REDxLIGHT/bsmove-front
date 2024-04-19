import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Villeparisis from "../../containers/Villeparisis";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const VilleparisisPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Villeparisis - BS Move'
      description="Vous cherchez un déménagement sans souci à Villeparisis ? Découvrez nos options pratiques et abordables pour un déménagement tout compris."
      keywords='Déménagement Villeparisis,Villeparisis, Location de camion avec chauffeur Villeparisis, Location de monte-meuble Villeparisis, Achats de carton de déménagement Villeparisis, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='villeparisis'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/villeparisis" />
        <meta property="og:url" content="https://www.bsmove.com/villeparisis"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Villeparisis />
      <DynamicFooter />

    </Layout>
  )
}

export default VilleparisisPage