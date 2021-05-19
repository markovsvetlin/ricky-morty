import { useRouter, Link } from 'next/router';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const NavButton = styled.button`
  margin: 20px;
  font-size: 26px;
  padding: 10px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
`;

const Navbar = () => {
  const router = useRouter();
  return (
    <NavbarContainer>
      <NavButton type="button" onClick={() => router.push('/')}>
        Home
      </NavButton>
      <NavButton type="button" onClick={() => router.push('/Characters')}>
        Characters
      </NavButton>
      <NavButton type="button" onClick={() => router.push('/Episodes')}>
        Episodes
      </NavButton>
    </NavbarContainer>
  );
};

export default Navbar;
