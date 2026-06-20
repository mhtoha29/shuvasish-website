import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Engineer from '@/components/sections/Engineer';
import CleanEnergy from '@/components/sections/CleanEnergy';
import BaapKaBeta from '@/components/sections/BaapKaBeta';
import Speaker from '@/components/sections/Speaker';
import Frequency from '@/components/sections/Frequency';
import ContentHub from '@/components/sections/ContentHub';
import Connect from '@/components/sections/Connect';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Engineer />
        <CleanEnergy />
        <BaapKaBeta />
        <Speaker />
        <Frequency />
        <ContentHub />
        <Connect />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
