import styled from 'styled-components';

export const StyledBalance = styled.div`
    font-size: 1.50rem;
    margin-bottom: 2rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3.1px);
    -webkit-backdrop-filter: blur(3.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    #balance-title {
        font-weight: 700;
    }
    #balance {
        filter: none;
        cursor: pointer;
    }
    #balance-blur {
        filter: blur(.45em);
    }
`;
