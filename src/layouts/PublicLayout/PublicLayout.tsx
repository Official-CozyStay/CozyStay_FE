import { Outlet } from "react-router-dom";
import {
  Layout,
  Header,
  Brand,
  Logo,
  Nav,
  Main,
  Footer,
} from "./publicLayout.styles";
import logo from "@/assets/images/Logo.png";

export default function PublicLayout() {
  return (
    <Layout>
      <Header>
        <Brand>
          <Logo src={logo} alt="logo" />
        </Brand>
        <Nav>
          <a href="#">가입하기</a>
          <a href="#">로그인</a>
        </Nav>
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        © {new Date().getFullYear()} TeamName — Inspired by Airbnb
      </Footer>
    </Layout>
  );
}
