import styled from 'styled-components';

export const StyledBanner = styled.header`
background-color: #DFDBE5;
    border-bottom: solid 1px #f8edeb;
    display: flex;
    flex-direction: column;
    #logo {
        margin: 1rem;
        display: flex;
        flex-direction: column;
        font-family: 'Abril Fatface', cursive;
        // font-family: 'Azeret Mono', monospace;
        // font-family: 'Josefin Slab', serif;
        // font-family: 'Red Hat Display', sans-serif;
        font-size: 3rem;
        color: black;
    }
    #sub-logo {
        font-size: 1rem;
    }
    #hero {
        margin: 5rem;
        display: flex;
    }
    #greeting {
        font-family: 'Abril Fatface', cursive;
        color: charcoal;
        font-size: 1rem;
        padding: 0.25rem 0rem 0rem 1rem;
    }
    nav {
        display: flex;
        justify-content: flex-end;
        background-color: #DFDBE5;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");
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
