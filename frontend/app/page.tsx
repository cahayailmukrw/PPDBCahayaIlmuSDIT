import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProgramSection } from '../components/ProgramSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { PPDBTimeline } from '../components/PPDBTimeline';
import { RegistrationForm } from '../components/RegistrationForm';
import { AnnouncementCheck } from '../components/AnnouncementCheck';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { LoadingScreen } from '../components/LoadingScreen';
import { DashboardPreview } from '../components/DashboardPreview';

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramSection />
      <FacilitiesSection />
      <PPDBTimeline />
      <RegistrationForm />
      <AnnouncementCheck />
      <DashboardPreview />
      <ContactSection />
      <Footer />
    </main>
  );
}
