import type { ReactNode } from 'react';
import Simple from '../components/Navbar';


type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
    <Simple/>
      <main>{children}</main>
    </>
  );
};

export default Layout;