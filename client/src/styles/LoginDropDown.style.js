import styled from 'styled-components';


export const StyledLoginDropDown = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    margin-right: 0.5rem;
    padding: 0 0.25rem 0 0;
    form {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    form button {
        max-width: 50%;
        align-self: flex-end;
        margin: 0.25rem;
    }
    form input {
        padding: .2rem;
        margin: 0.25rem;
        width: 200px;
        height: 30px;
        font-size: 1rem;
    }
    background: rgb(238,174,202);
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    
`