import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import CurrencyCrisisSection from '../components/CurrencyCrisisSection';
import BridgeCalculatorSection from '../components/BridgeCalculatorSection';
import BackedBySection from '../components/BackedBySection';
import UseCasesSection from '../components/UseCasesSection';

export default function HomePage() {
    return (
        <>
            <div className="h-screen flex flex-col overflow-hidden relative">
                <Navbar current="home" overlay />
                <HeroSection />
            </div>
            <InfoSection />
            <CurrencyCrisisSection />
            <BridgeCalculatorSection />
            <BackedBySection />
            <UseCasesSection />
        </>
    );
}
