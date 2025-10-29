import { Outlet, Link } from "react-router-dom";
import {
  Layout,
  Header,
  Brand,
  BrandTitle,
  Logo,
  Nav,
  Main,
  Footer,
} from "./publicLayout.styles";
import logo from "@/assets/images/logo.svg";

export default function PublicLayout() {
  return (
    <Layout>
      <Header>
        <Brand to="/">
          <Logo src={logo} alt="CozyStay Logo" />
          <BrandTitle>CozyStay</BrandTitle>
        </Brand>
        <Nav>
          <Link to="/signup">가입하기</Link>
          <Link to="/login">로그인</Link>
        </Nav>
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        © {new Date().getFullYear()} CozyStay — Inspired by Airbnb
      </Footer>
    </Layout>
  );
}
