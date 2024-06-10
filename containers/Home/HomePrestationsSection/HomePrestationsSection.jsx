import Routes from "../../../helpers/routes";
import styles from "../index.module.css";
import messages from "../messages";
import PrestationCategoryPreview from "../PrestationCategoryPreview/PrestationCategoryPreview";

const categories = [
  {
    href: Routes.ESTIMATE_DETAILS_PAGE,
    title: messages.prestationsSection.categories.moving,
    button: messages.prestationsSection.categories.movingButton,
    desc: messages.prestationsSection.categories.movingDesc,
    src: "/images/deme.png",
  },
  {
    href: Routes.FURNITURES_BUY_PAGE,
    title: messages.prestationsSection.categories.furnituresBuy,
    button: messages.prestationsSection.categories.furnituresBuyButton,
    desc: messages.prestationsSection.categories.furnituresBuyDesc,
    src: "/images/fragile.png",
  },
  {
    href: Routes.VEHICLE_RENT_PAGE,
    title: messages.prestationsSection.categories.vehicleRent,
    button: messages.prestationsSection.categories.vehicleRentButton,
    desc: messages.prestationsSection.categories.vehicleRentDesc,
    src: "/images/location.png",
  }
];

const HomePrestationsSection = () => (
  <section className={styles.prestations_section}>
    <section className={styles.prestation_section_subtitle_container}>
      <div className={styles.section_subtitle}>
        {messages.prestationsSection.subtitles.leftPart}
      </div>
    </section>
    <section className={styles.prestation_section_content}>
      <div className={styles.section_content}>
        {messages.prestationsSection.content}
      </div>
    </section>
    <section className={styles.prestation_section_categories_container}>
      {categories.map((category) => (
        <PrestationCategoryPreview key={category.title} category={category} />
      ))}
    </section>
  </section>
);

export default HomePrestationsSection;
