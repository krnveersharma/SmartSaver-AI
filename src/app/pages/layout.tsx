import type { ReactNode } from 'react';
import Simple from '../components/Navbar';
import '../globals.css'

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