import React, { PropsWithChildren } from 'react'
import styled from 'styled-components';

const Layout:React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  )
}

export default Layout;

const StyledDiv =  styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

