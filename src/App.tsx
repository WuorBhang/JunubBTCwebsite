import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import HelpPage from './pages/HelpPage';
import MomoPage from './pages/MomoPage';
import LightningPage from './pages/LightningPage';
// import NetworkPage from './pages/NetworkPage';
import { useHistoryRoute } from './lib/router';

export default function App() {
    const [page] = useHistoryRoute();

    return (
        <div className="flex flex-col bg-[#F7F7F7] min-h-screen">
            {page === 'home' ? (
                <HomePage />
            ) : (
                <>
                    <Navbar current={page} />
                    {page === 'news' && <NewsPage />}
                    {page === 'help' && <HelpPage />}
                    {page === 'momo' && <MomoPage />}
                    {page === 'lightning' && <LightningPage />}
                    {/* {page === 'network' && <NetworkPage />} */}
                </>
            )}
            <Footer />
        </div>
    );
}
