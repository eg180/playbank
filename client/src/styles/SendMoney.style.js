import styled from 'styled-components';

export const StyledSendMoney = styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
    background-image: url('/images/dumbndumber.png');
    background-size: 120%;
    background-repeat: no-repeat;
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 10px;
        min-height: 50vh;
        max-width: 50vw;
        min-width: 45vw;
        
    }
    @media screen and (max-width: 750px) {
        main {
            min-width: 80vw;
        }
    }
    form {
        margin: 2rem;
        padding: 5rem;
        border-radius: 5px;
        max-width: 40%;
        background-color: #edede9;
        box-shadow:
      1px 2px 2px hsl(220deg 60% 50% / 0.333),
      2px 4px 4px hsl(220deg 60% 50% / 0.333),
      3px 6px 6px hsl(220deg 60% 50% / 0.333);
        display: flex;
        flex-direction: column;
    }
    input {
        padding-top: 1rem;
        margin-top: 2rem;
        font-size: 1.5rem;

    }
    input:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
    textarea:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;
