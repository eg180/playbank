import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';

import Banner from './components/Banner';
import LandingPage from './components/LandingPage.tsx';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';

function App() {
    return (
        <>
            <GlobalStyle />
            <Banner />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sendmoney" element={<SendMoney />} />
            </Routes>
        </>
    );
}

export default App;
