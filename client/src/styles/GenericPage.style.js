import styled from 'styled-components';

export const GenericPageStyle = styled.main`
    background-color: ${(props) => (props.bgColor ? props.bgColor : '#22223b')};;
    min-height: 80vh;
    padding: 10rem 20rem 10rem 20rem;

    @media screen and (max-width: 960px) {
        padding: 2rem;
    }
`; 
