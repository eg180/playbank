import styled from "styled-components";

export const StyledIOUNotifcation = styled.div`
    position: absolute;
    padding: 0.7rem;
    border-radius: 5px;
    right: 5rem;
    background-color: #90e0ef;
    border: solid 1px #00b4d8;
    margin: 1rem;
    li, #iou-count {
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }
    li {
        padding: 0.25rem;
        margin: 0.25rem;
        background-color: #f2cc8f;
    }
    #iou-amount {
        color: #bb3e03;
    }
    z-index: 2;
`