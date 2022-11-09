import styled from 'styled-components';

export const StyledBanner = styled.header`

    background-color: #f8f7ff;
    min-height: 10vh;
    border-bottom: solid 1px #f8edeb;
    #hero {
        display: flex;
    }
    nav {
        background-color: #3c096c;
    }
    #form-group {
        display: flex;
        align-items: center;
        #no-acct {
            color: white;
            padding: 1rem;
        }
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
            padding 13% 0;
            
        }
        ul img {
            max-width: 10%;
        }
    }
    .mimic-link {
        cursor: pointer;
        border-bottom: 1px solid red;
    }
    
`


