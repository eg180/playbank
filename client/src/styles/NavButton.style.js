import styled from 'styled-components';

export const StyledNavButton = styled.button`
    padding: 0.75rem 1.75rem;
    display: inline-block;
    border: none;
    margin: 0 2rem 0 2rem;
    text-decoration: none;
    /* background: #6930c3; */
    background-color: ${(props) => (props.bgColor ? props.bgColor : '#6930c3')};
    color: ${(props) => (props.color ? props.color : '#ffffff')};
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;

    :hover,
    :focus {
        background: #5e60ce;
    }

    :focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }

    :active {
        transform: scale(0.99);
    }
`;
