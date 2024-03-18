import { Container, Navbar, Nav } from "react-bootstrap";
import classNames from "classnames";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        sticky="top"
        variant="dark"
      >
        <Container style={{ minHeight: "60px" }}>
          <Navbar.Brand
            className={classNames(
              "text-light",
              "text-center",
              styles.brandText
            )}
            href="/"
          >
            {process.env.NEXT_PUBLIC_HUSBAND_NAME?.[0]}{" "}
            <span className={styles.and}>&</span>{" "}
            {process.env.NEXT_PUBLIC_WIFE_NAME?.[0]}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link className="text-center" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-center" href="/details">
                Details
              </Nav.Link>
              <Nav.Link className="text-center" href="/faq">
                FAQ
              </Nav.Link>
              <Nav.Link className="text-center" href="/rsvp">
                RSVP
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
