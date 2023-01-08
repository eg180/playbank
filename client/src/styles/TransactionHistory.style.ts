import styled from 'styled-components';
import { TransactionTypes } from 'src/components/TransactionHistory';

export const StyledTransactionHistory = styled.div`
    font-size: 1.50rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3.1px);
    -webkit-backdrop-filter: blur(3.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    #transaction-title {
        font-weight: 700;
    }
    #transactions {
        display: flex;
        flex-direction: column;
        filter: none;
    }
    #transaction-title {
        cursor: pointer;
    }
    .transaction-type {
        font-size: 1rem;
    }
    #balance-blur {
        filter: blur(.45em);
    }
    #paid-status {
        cursor: pointer;
    }
`;

export const StyledTransactionLine = styled.span`
    display: grid;
    grid-template-columns: 47.5% 47.5% 5%;
    background-color: ${(props: {bgColor: string}) => (props?.bgColor)};
    padding: .5rem;
    margin: .5rem;
    #due-date {
        position: absolute;
        right: 9px; 
    }
`

export const StyledTransactionType = styled.span`
    color: ${(props: {color: string}) => (props?.color)};
`

export const StyledTransactionAmount = styled.span`
    color: ${(props: {color: string}) => (props?.color)};
`
