import AdmissionServices from "@/sections/services/AdmissionServices";
import AfterVisaServices from "@/sections/services/AfterVisaServices";
import OnlineGuidance from "@/sections/services/OnlineGuidance";
import ServicesHero from "@/sections/services/ServicesHero";
import VisaServices from "@/sections/services/VisaServices";
import { RootStyle } from '../contact/style';



export default async function MentorsPage() {
  
  return (
    <RootStyle>
      <ServicesHero />
      <OnlineGuidance />
      <AdmissionServices />
      <VisaServices />
      <AfterVisaServices />
    </RootStyle>
  );
}
