import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './globalStyles';
import Memos from './components/Memos';
import Banner from './components/Banner';
import LandingPage from './components/LandingPage.tsx';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Footer from "./components/Footer";


function App() {
    
    return (
        <>
            <GlobalStyle />
            <ToastContainer />
            <Memos />
            <Banner />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sendmoney" element={<SendMoney />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
