import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './globalStyles';
import Memos from './components/Memos';
import IOUNotifications from './components/IOUNotifications';
import Banner from './components/Banner';
import LandingPage from './components/LandingPage.tsx';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Footer from "./components/Footer";


function App() {
    const [showMemos, setShowMemos] = useState(false);
    const [showIouRequests, setShowIouRequests] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);

    const refreshMemos = () => {
        if (showMemos === false) {
           return setShowMemos(true); 
        }
        return setRefreshPage(!refreshPage)
        
    };

    const refreshIous = () => {
        if (showIouRequests === false) {
           return setShowIouRequests(true); 
        }
        return setRefreshPage(!refreshPage)
        
    };
    
    
    return (
        <>
            <GlobalStyle />
            <ToastContainer />
            <section>{showMemos && <Memos refreshMemos={refreshMemos} />}
            {showIouRequests && <IOUNotifications refreshIous={refreshIous} />}</section>
            
            <Banner refreshMemos={refreshMemos} refreshIous={refreshIous} />
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sendmoney" element={<SendMoney refreshMemos={refreshMemos} />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
