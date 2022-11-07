import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';

import Test from './components/Test';
import LandingPage from './components/LandingPage.tsx';

function App() {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    );
}

export default App;
