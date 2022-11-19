import styled from 'styled-components';

export const GenericPageStyle = styled.main`
    background-color: ${(props) => (props.bgColor ? props.bgColor : '#22223b')};;
    min-height: 80vh;
`; 
