import React from 'react';

import HeroSection from './HeroSection';
import OverviewSection from './OverviewSection';
import CharactersSection from './CharactersSection';
import TimelineSection from './TimelineSection';
import CouplesSection from './CouplesSection';
import QuotesSection from './QuotesSection';
import LocationsSection from './LocationsSection';
import FashionSection from './FashionSection';
import SoundtrackSection from './SoundtrackSection';
import CastNowSection from './CastNowSection';
import TriviaSection from './TriviaSection';
import FooterSection from './FooterSection';

const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0">
      <section className="w-full" id="hero">
        <HeroSection />
      </section>

      <section className="w-full" id="overview">
        <OverviewSection />
      </section>

      <section className="w-full" id="characters">
        <CharactersSection />
      </section>

      <section className="w-full" id="timeline">
        <TimelineSection />
      </section>

      <section className="w-full" id="couples">
        <CouplesSection />
      </section>

      <section className="w-full" id="quotes">
        <QuotesSection />
      </section>

      <section className="w-full" id="locations">
        <LocationsSection />
      </section>

      <section className="w-full" id="fashion">
        <FashionSection />
      </section>

      <section className="w-full" id="soundtrack">
        <SoundtrackSection />
      </section>

      <section className="w-full" id="cast-now">
        <CastNowSection />
      </section>

      <section className="w-full" id="trivia">
        <TriviaSection />
      </section>

      <section className="w-full" id="footer">
        <FooterSection />
      </section>
    </div>
  );
};

export default HomePage;
