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
          <Accordion.Header>Was ist eine Zone?</Accordion.Header>
          <Accordion.Body>
            Eine Zone entspricht in der Regel einem <b>Gemeindegebiet</b>, d. h.
            Gemeindegrenzen bzw. kommunale Grenzen entsprechen den jeweiligen
            Zonengrenzen.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Was zeigt mir die Kachel "Anzahl Drohnen" genau an?
          </Accordion.Header>
          <Accordion.Body>
            Diese Kachel stellt die Anzahl der Drohnen dar, die sich momentan in
            der Luft befinden.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Wozu dient die Kachel "Drohne alarmieren"?
          </Accordion.Header>
          <Accordion.Body>
            Durch Ausfüllen des Formulars alarmieren Sie die Drohne, die für die
            entsprechende Zone zuständig ist. Die Drohne wird dann noch einmal
            über die potentielle Brandstelle fliegen, um die KI-Einschätzung zu
            überprüfen.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Wie wird das Brandrisiko berechnet?
          </Accordion.Header>
          <Accordion.Body>
            Die entsprechende Kachel "Brandrisiko" zeigt die Waldbrandgefahr des
            betrachteten Gebietes in einer von <b>5 Gefahrenstufen</b> an:{" "}
            <br />
            <div className="text-center">
              <br />
              1 = sehr niedrig, <br />
              2 = niedrig, <br />
              3 = mittel, <br />
              4 = hoch, <br />
              5 = sehr hoch
              <br />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Wie funktioniert die KI-Einschätzung? Ist darauf Verlass?
          </Accordion.Header>
          <Accordion.Body>
            Die KI berechnet das Brandrisiko mittels...
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            Was sind Alerts und wann erhalte ich sie?
          </Accordion.Header>
          <Accordion.Body>
            Alerts sind Benachrichtigungen, die am unteren Bildschirmrand
            auftauchen, und Sie auf erkannte Gefahren hinweisen. Alerts
            enthalten grundsätzlich immer: <br />
            <div className="text-center">
              <br />
              den Einsatzort (Wo/In welcher Zone ist etwas geschehen?), <br />
              den Grund der Benachrichtigung (Was ist passiert?/Was wurde
              erkannt?) <br />
              und die Gefahrenstufe. <br />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <br />
        <Accordion.Item eventKey="6">
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
        <Accordion.Item eventKey="7">
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
        <br />
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            Was ist der Unterschied zwischen Administatoren und Nutzern?
          </Accordion.Header>
          <Accordion.Body>
            Als Administrator einer Organisation können Sie neue Nutzer
            einladen, zu Ihrer Organisation hinzufügen oder entfernen. Außerdem
            haben Administratoren Zugriff auf eine zusätzliche Analyse-Seite,
            die für normale Nutzer nicht sichtbar ist. Auf dieser können Sie z.
            B. Statistiken (Prozentsatz falscher Vorhersagen etc.) der KI
            anzeigen, die KI bewerten oder einen Vergleich zwischen dem
            Originalbild und der Einschätzung der KI einsehen.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>
            Wie kann ich als Administrator einer Organisation meine Mitarbeiter
            zu KIWA einladen?
          </Accordion.Header>
          <Accordion.Body>
            Klicken Sie auf <b>Einstellungen</b>, dann auf <b>Benutzer</b> und
            schließlich auf <b>Benutzer einladen</b>. Im Auswahlfenster können
            Sie Ihre Organisation auswählen, sowie die Rolle des zukünftigen
            Benutzers festlegen (Nutzer oder Administrator). Dann können Sie für
            Ihre Mitarbeiter entweder einen einmaligen Einladungslink generieren
            oder die Einladung per Email verschicken. Nach dem Klick auf den
            Link (direkt oder per Email) wird der eingeladene Nutzer zur
            Registierungsseite von KIWA weitergeleitet und kann sich dort
            registrieren. Die Organisation, die sie am Anfang ausgewählt haben,
            ist hierbei für den Nutzer schon gesetzt.
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
