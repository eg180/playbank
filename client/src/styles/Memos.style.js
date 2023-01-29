import styled from "styled-components";

export const StyledMemo = styled.div`
    position: absolute;
    padding: 0.7rem;
    border-radius: 5px;
    right: 0;
    background-color: #f72585;
    border: solid 1px red;
    margin: 1rem;
    input[type=checkbox] {
    accent-color: #b5e48c;
}
    li, #memo-count {
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }
    li {
        color: white;
        padding: 0.25rem;
        margin: 0.25rem;
        background-color: #7209b7;
        border-radius: 5px;
    }
    #memo-text {
        padding: 5px;
    }
    #memo-amount {
        padding: 5px;
        color: #f72585;
    }
    z-index: 3;
`