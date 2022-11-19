import styled from 'styled-components';

export const StyledBanner = styled.header`
    background-color: #31293d;
    border-bottom: solid 1px #f8edeb;
    display: flex;
    flex-direction: column;
    #logo {
        font-family: 'Red Hat Display', sans-serif;
        font-size: 3rem;
        
        color: white;
    }
    #hero {
        margin: 5rem;
        display: flex;
    }
    nav {
        display: flex;
        justify-content: space-between;
        background-color: #3c096c;
        align-items: center;
    }
    #form-group {
        display: flex;
        align-items: center;
        #no-acct {
            color: white;
            padding: 1rem;
        }
    }
    #inputs {
        margin-top: 0rem;
    }
    section {
        background-color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        #tech-title {
            font-size: 1rem;
            font-family: 'Josefin Slab', serif;
            color: #dad7cd;
        }
        #logo-right {
            font-family: 'Red Hat Display', sans-serif;
            font-size: 0.75rem;
            color: black;
            min-height: 30%;
            width: 20%;
            padding: 13% 0;
        }
        ul img {
            max-width: 10%;
        }
    }
    .mimic-link {
        cursor: pointer;
        border-bottom: 1px solid red;
    }
`;
