import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton'

export const Wrapper = styled.div`
  margin: 40px;
  
  #main-container {
    margin-top: 80px;
  }
`;

export const StyledButton = styled(IconButton)`
  position: fixed !important;
  z-index: 100;
  right: 20px;
  top: 0px;
  color: white;
`;