import React from 'react';
import Balance from './Balance';
import TransactionHistory from './TransactionHistory'
import { GenericPageStyle } from '../styles/GenericPage.style';


const Dashboard = () => {
    return <GenericPageStyle>
        <Balance />
        <TransactionHistory />
    </GenericPageStyle>;
};

export default Dashboard;
