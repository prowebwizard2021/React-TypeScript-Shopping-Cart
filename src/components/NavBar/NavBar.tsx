import {AppBar, Tabs, Tab} from '@material-ui/core'
import { Wrapper } from './NavBar.styles';

const NavBar: React.FC = (props: any) => (
  <Wrapper>
    <AppBar title="My App">
      <Tabs>
        <Tab label="Shopping Cart" />
      </Tabs>
      {props.children}
    </AppBar>
  </Wrapper>
);

export default NavBar;