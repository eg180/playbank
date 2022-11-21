import styled from 'styled-components';

export const StyledBalance = styled.div`
    font-size: 1.50rem;
    // background-color: #06d6a0;
    // border: 10px solid black;
    padding: 2rem;
    /* From https://css.glass */
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
    }
    #balance-blur {
        filter: blur(.45em);
    }
`;
