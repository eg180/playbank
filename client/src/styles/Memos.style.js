import styled from "styled-components";

export const StyledMemo = styled.div`
    position: absolute;
    padding: 0.7rem;
    border-radius: 5px;
    right: 0;
    background-color: #fcbf49;
    margin: 1rem;
    li, #memo-count {
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }
    li {
        padding: 0.25rem;
        margin: 0.25rem;
        background-color: #f2cc8f;
    }
    #memo-amount {
        color: #bb3e03;
    }
`