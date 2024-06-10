import Image from "next/legacy/image";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import data from "./HomeFeedbacksSection/data.json";
import data from "./HomeFeedbacksSection/data.json";
import Routes from "../../helpers/routes";
import Button from "../../components/Button";
import styles from "./index.module.css";
import messages from "./messages";
import { useAlert } from "../../hooks/alert";
import { useRouter } from "next/router";
import HomeEstimateSection from "./HomeEstimateSection/HomeEstimateSection";
import HomeFeedbacksSection from "./HomeFeedbacksSection/HomeFeedbacksSection";
import CategoryPreview from "./CategoryPreview/CategoryPreview";
import HomePrestationsSection from "./HomePrestationsSection/HomePrestationsSection";
import OurPriorityService from "./OurPriorityService/OurPriorityService";
import OurPriorityService from "./OurPriorityService/OurPriorityService";
import { useState } from "react";

const HomeGuidelineSection = () => (
  <div className={styles.container_guideline}>
  <div className={styles.container_guideline}>
  <div className={styles.guideline_section}>
    <div className={styles.left_guideline}>
      <h3>Obtenez votre devis immédiatement et gratuitement</h3>
      <p>Recevez instantanément votre devis gratuit en quelques clics ! Profitez d'une estimation rapide et sans engagement.</p>
      <button>Estimez votre déménagement</button>
    </div>
    <div className={styles.right_guideline}>
      <div className={styles.right_guideline_card}>
        <span>1</span>
        <div>
          <h5>Je fais ma demande de devis en ligne</h5>
          <p>Services parfaitement adaptés à vos besoins et horaires.</p>
    <div className={styles.left_guideline}>
      <h3>Obtenez votre devis immédiatement et gratuitement</h3>
      <p>Recevez instantanément votre devis gratuit en quelques clics ! Profitez d'une estimation rapide et sans engagement.</p>
      <button>Estimez votre déménagement</button>
    </div>
    <div className={styles.right_guideline}>
      <div className={styles.right_guideline_card}>
        <span>1</span>
        <div>
          <h5>Je fais ma demande de devis en ligne</h5>
          <p>Services parfaitement adaptés à vos besoins et horaires.</p>
        </div>
      </div>
      <div className={styles.right_guideline_card}>
        <span>2</span>
        <div>
          <h5>J’obtiens une estimation</h5>
          <p>Devis immédiat et complet, sans surprises cachées.</p>
      <div className={styles.right_guideline_card}>
        <span>2</span>
        <div>
          <h5>J’obtiens une estimation</h5>
          <p>Devis immédiat et complet, sans surprises cachées.</p>
        </div>
      </div>
      <div className={styles.right_guideline_card}>
        <span>3</span>
        <div>
          <h5>J’organise mon déménagement</h5>
          <p>Large choix de véhicules et matériel pour déménager.</p>
        </div>
      </div>
    </div>
  </div>
      <div className={styles.right_guideline_card}>
        <span>3</span>
        <div>
          <h5>J’organise mon déménagement</h5>
          <p>Large choix de véhicules et matériel pour déménager.</p>
        </div>
      </div>
    </div>
  </div>
  </div>
);

const S = {};

S.AdvantageCard = styled(Card)`
  max-width: 376px;
  min-width: 320px;
`;

const AdvantageCard = ({ title, content }) => {
  const [raised, setRaised] = useState(false);

  function toggleRaised() {
    return setRaised((prevRaised) => !prevRaised);
  }
  return (
    <Card
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
      sx={{ backgroundColor: "transparent !important" }}
    >
      <S.AdvantageCard elevation={1}>
        <div className={styles.advantages_card_container}>
          <div className={styles.advantages_card_title}>{title}</div>
          <div className={styles.section_content}>{content}</div>
        </div>
      </S.AdvantageCard>
    </Card>
  );
};

const HomeAdvantagesSection = () => (
  <div className={styles.advantages_section}>
      <Image width={600} height={640} src="/images/moving_together_illu.png" alt="competences" className={styles.AdvantageImage}/>
    <div className={styles.AdvantageFlex}>
      <h3>Pourquoi choisir BS Move</h3>
      <p>Gagnez du temps précieux grâce à notre équipe expérimentée qui prend en charge l'emballage, la logistique et les formalités administratives. Du premier contact à l'installation, nos experts vous accompagnent pour une transition sans stress. Avec Bs Move Déménagement, bénéficiez d'un service professionnel de qualité, où chaque détail compte pour assurer votre satisfaction totale.</p>
      <div className={styles.AdvantageFlex2}>
        <h5 style={{
          backgroundColor: '#ECFDF5',
          padding: '10px',
          borderRadius: '10px',
        }}>Gain de temps</h5>
        <h5 style={{
          backgroundColor: '#FFFBEB',
          padding: '10px',
          borderRadius: '10px',

        }}>Accompagnement expert</h5>
        <h5 style={{
          backgroundColor: '#E8EDFB',
          padding: '10px',
          borderRadius: '10px',

        }}>Service professionnel</h5>
      </div>
    </div>
  </div>
);

const HomeCompetencesSection = () => (
  <div className={styles.competences_section}>
    <div className={styles.competences_section_infos}>
      <div className={styles.section_subtitle}>
        {messages.competencesSection.subtitle1}
        <div className={styles.subtitle2}>{messages.competencesSection.subtitle2}</div>
        {messages.competencesSection.subtitle1}
        <div className={styles.subtitle2}>{messages.competencesSection.subtitle2}</div>
      </div>
      
      
      <div className={styles.competences_section_infos_content}>
        <div>{messages.competencesSection.contents.firstPart}</div>
      </div>
    </div>
  </div>
);

const HomePresentationSection = () => {
  const router = useRouter();
  return (
  <div style={{
    position: 'relative',
    height: '500px',
  }}>
const HomePresentationSection = () => {
  const router = useRouter();
  return (
  <div style={{
    position: 'relative',
    height: '500px',
  }}>
  <div className={styles.presentation_section}>
    
    
    <div className={styles.presentation_section_infos}>
      <div className={styles.section_subtitle}>
        {messages.presentationSection.subtitle}
      </div>
      <div className={styles.presentation_section_content}>
        {messages.presentationSection.content}
      </div>
      <button className={styles.presentationSectionButton} onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}>Estimez votre déménagement</button>
      <button className={styles.presentationSectionButton} onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}>Estimez votre déménagement</button>
    </div>
    <div className={styles.presentation_section_illustration_container}>
      <Image
        className={styles.presentation_section_illustration}
        layout="fill"
        src="/images/france1.png"
        src="/images/france1.png"
        alt="where_img_homescreen"
      />
    </div>
  </div>
  </div>
)};
  </div>
)};

// MOCK

const articles = [
  {
    title: messages.blogSection.articles.first.title,
    content: messages.blogSection.articles.first.content,
    action: messages.blogSection.articles.first.action,
    src: "/images/actuality_one.png",
  },
  {
    title: messages.blogSection.articles.second.title,
    content: messages.blogSection.articles.second.content,
    action: messages.blogSection.articles.second.action,
    src: "/images/actuality_two.png",
  },
  {
    title: messages.blogSection.articles.third.title,
    content: messages.blogSection.articles.third.content,
    action: messages.blogSection.articles.third.action,
    src: "/images/actuality_three.png",
  },
];

S.BlogCard = styled(Card)`
  border-radius: 12px;
  width: 20em;
  height: 30em;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ArticlePreview = ({ article, technicalIssueAlert }) => (
  <S.BlogCard elevation={4}>
    <div className={styles.blog_article_thumbnail}>
      <CategoryPreview title={article.title} src={article.src} />
    </div>
    <div className={styles.blog_article_infos}>
      <div className={styles.blog_article_title}>{article.title}</div>
      <div className={styles.blog_article_content}>{article.content}</div>
      <div className={styles.blog_article_action}>
        <div>{article.action}</div>
        <IconButton
          onClick={technicalIssueAlert}
          className={styles.blog_article_action_icon}
          size="large"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  </S.BlogCard>
);

const HomeBlogSection = ({ technicalIssueAlert }) => (
  <div className={styles.blog_section}>
    <div className={styles.section_title}>{messages.blogSection.title}</div>
    <div className={styles.section_subtitle}>
      {messages.blogSection.subtitle}
    </div>
    <div className={styles.blog_articles_container}>
      {articles.map((article) => (
        <ArticlePreview
          key={article.title}
          article={article}
          technicalIssueAlert={technicalIssueAlert}
        />
      ))}
    </div>
    <div
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div className={styles.blog_see_more}>
        <Button onClick={technicalIssueAlert}>
          {messages.blogSection.action}
        </Button>
      </div>
    </div>
  </div>
);

const HomeGettingStartedSection = ({ technicalIssueAlert }) => {
  const router = useRouter();
  return (
    <div className={styles.getting_started_section}>
      
      
      <div className={styles.getting_started_container}>
        <img width={73} height={73}  src={'/images/left_box.png'} className={styles.left_box}></img>
      <img width={73} height={73}  src={'/images/right_box.png'} className={styles.right_box}></img>
        <img width={73} height={73}  src={'/images/left_box.png'} className={styles.left_box}></img>
      <img width={73} height={73}  src={'/images/right_box.png'} className={styles.right_box}></img>
          <div className={styles.getting_started_infos}>
            <h3 >
            <h3 >
              {messages.gettingStartedSection.subtitle}
            </h3>
            <p>
            </h3>
            <p>
              {messages.gettingStartedSection.content}
            </p>
            <div className={styles.buttons}>
            <button
            </p>
            <div className={styles.buttons}>
            <button
              onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}
            >
              Estimez votre déménagement
            </button>
            <button
              onClick={() => router.push(Routes.CONTACT_PAGE)}
            >
              Contactez-nous
            </button>
            </div>
          </div>
        </div>
            >
              Estimez votre déménagement
            </button>
            <button
              onClick={() => router.push(Routes.CONTACT_PAGE)}
            >
              Contactez-nous
            </button>
            </div>
          </div>
        </div>
    </div>
  );
};

const HomePageContainer = () => {
  const { setAlert } = useAlert();

  function technicalIssueAlert() {
    return setAlert({ severity: "info", content: "Bientôt disponible!" });
  }
  return (
    <div className={styles.container}>
      <HomeEstimateSection technicalIssueAlert={technicalIssueAlert} />
      <OurPriorityService />
      <OurPriorityService />
      <HomePrestationsSection technicalIssueAlert={technicalIssueAlert} />
      <HomeFeedbacksSection testimonialData={data} technicalIssueAlert={technicalIssueAlert} />
      <HomeFeedbacksSection testimonialData={data} technicalIssueAlert={technicalIssueAlert} />
      <HomeGuidelineSection technicalIssueAlert={technicalIssueAlert} />
      <HomeAdvantagesSection technicalIssueAlert={technicalIssueAlert} />
      <HomeCompetencesSection technicalIssueAlert={technicalIssueAlert} />
      <div className={styles.presentation_section_illustration_container_bg}></div>
      <div className={styles.presentation_section_illustration_container_bg}></div>
      <HomePresentationSection technicalIssueAlert={technicalIssueAlert} />
      {/* <HomeBlogSection technicalIssueAlert={technicalIssueAlert} /> */}
      <HomeGettingStartedSection technicalIssueAlert={technicalIssueAlert} />
    </div>
  );
};

export default HomePageContainer;
