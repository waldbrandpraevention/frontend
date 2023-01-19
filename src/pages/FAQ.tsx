import React from "react";
import { Accordion, Container } from "react-bootstrap";
import { TbSun } from "react-icons/tb";
import styled from "styled-components";

const Content = () => {
  return (
    <>
      <br />
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Kann ich die Farben der Anwendung anpassen?
          </Accordion.Header>
          <Accordion.Body>
            Ja, sie können die Farben der Anwendung in ihren
            Accounteinstellungen nach Belieben ändern! Hierzu klicken Sie in der
            Seitenleiste auf <b>"Einstellungen"</b>, dann auf <b>"Account"</b>.{" "}
            <br />
            In der Kachel <b>"UI anpassen"</b> können Sie entweder eines der
            vorgefertigen Themes auswählen und so das komplette Erscheinungsbild
            anpassen oder nur einzelne Komponenten wie bspw. den Hintergrund der
            Anwendung oder die Farbe der Seitenleiste verändern.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Gibt es bei KIWA auch einen Dark Mode (Dunkelmodus)?
          </Accordion.Header>
          <Accordion.Body>
            Ja, sie können den Dark Mode ganz einfach mit einem Klick auf
            <TbSun></TbSun> am oberen Bildschirmrand aktivieren. Ein erneuter
            Klick auf das Icon stellt den Light Mode wieder her. Ihre gewählte
            Einstellung bleibt so lange gespeichert, bis Sie erneut geändert
            wird - also auch über mehrere Sessions hinweg!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

const StyledContainer = styled(Container)`
  @media (min-width: 768px) {
    margin: auto;
    width: 70%;
  }
  @media (min-width: 1200px) {
    margin: auto;
    width: 55%;
  }
`;

const FAQ = () => {
  return (
    <StyledContainer className="pt-4">
      <h2>FAQ - Häufig gestellte Fragen</h2>
      <Content />
    </StyledContainer>
  );
};

export default FAQ;
