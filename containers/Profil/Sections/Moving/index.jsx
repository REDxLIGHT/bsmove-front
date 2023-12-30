import messages from "./messages";
import MovingComponent from "./components";
import SectionContainer from "../Section";

const ProfilMoving = () => (
  <SectionContainer
    sectionTitle={messages.sectionTitle.moving}
    component={MovingComponent}
  />
);

export default ProfilMoving;
