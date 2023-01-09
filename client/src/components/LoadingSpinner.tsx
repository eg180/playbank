import React from 'react';
import { StyledSpinner } from '../styles/LoadingSpinner.style';
const LoadingSpinner = () => {
    return (
        <StyledSpinner>
            <img src="/images/three-dots.svg" alt="loading spinner" />
        </StyledSpinner>
    );
};

export default LoadingSpinner;
