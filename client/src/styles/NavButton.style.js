import styled from 'styled-components';


export const StyledNavButton = styled.button`
display: inline-block;
border: none;
padding: .75rem 1.75rem;
margin: 0;
text-decoration: none;
background: #6930c3;
color: #ffffff;
font-family: sans-serif;
font-size: 1rem;
cursor: pointer;
text-align: center;
transition: background 250ms ease-in-out, 
            transform 150ms ease;
-webkit-appearance: none;
-moz-appearance: none;
}

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
    
`