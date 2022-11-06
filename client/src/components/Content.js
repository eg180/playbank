import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledContentMain = styled.main`
  background-color: red;
`

const Content = () => {
  return (
    <StyledContentMain><Link to='/test'>link to test from home</Link></StyledContentMain>
  )
}

export default Content