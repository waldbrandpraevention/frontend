import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap"
import { TbArrowBack, TbClipboard, TbColorSwatch, TbCopy } from "react-icons/tb"
import { defaultColors, themes, useColorStore } from "../../../stores/ColorStore"
import Tile from "../../Tile"

const ColorCustomizer = () => {
  const colors = useColorStore()

  return (
    <Tile>
      <Card.Title>UI anpassen</Card.Title>
      <p className="text-muted">Einstellungen werden sofort gespeichert.</p>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={4}>
            Header Hintergrund
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <Form.Control className="col-lg-*" type="color" value={colors.headerBackground} onChange={e => colors.setColor({ headerBackground: e.target.value })} />
              <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(colors.headerBackground)}><TbCopy /> Kopieren</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ headerBackground: await navigator.clipboard.readText() })}><TbClipboard /> Einfügen</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ headerBackground: defaultColors.headerBackground })}><TbArrowBack /> Standard</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={4}>
            Hintergrund
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <Form.Control className="col-lg-*" type="color" value={colors.background} onChange={e => colors.setColor({ background: e.target.value })} />
              <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(colors.background)}><TbCopy /> Kopieren</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ background: await navigator.clipboard.readText() })}><TbClipboard /> Einfügen</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ background: defaultColors.background })}><TbArrowBack /> Standard</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={4}>
            Seitenleiste Hintergrund
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <Form.Control className="col-lg-*" type="color" value={colors.sidebarBackground} onChange={e => colors.setColor({ sidebarBackground: e.target.value })} />
              <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(colors.sidebarBackground)}><TbCopy /> Kopieren</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarBackground: await navigator.clipboard.readText() })}><TbClipboard /> Einfügen</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarBackground: defaultColors.sidebarBackground })}><TbArrowBack /> Standard</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={4}>
            Seitenleiste Aktive Seite
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <Form.Control className="col-lg-*" type="color" value={colors.sidebarActive} onChange={e => colors.setColor({ sidebarActive: e.target.value })} />
              <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(colors.sidebarActive)}><TbCopy /> Kopieren</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarActive: await navigator.clipboard.readText() })}><TbClipboard /> Einfügen</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarActive: defaultColors.sidebarActive })}><TbArrowBack /> Standard</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={4}>
            Seitenleiste Hover Seite
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <Form.Control className="col-lg-*" type="color" value={colors.sidebarHover} onChange={e => colors.setColor({ sidebarHover: e.target.value })} />
              <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(colors.sidebarHover)}><TbCopy /> Kopieren</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarHover: await navigator.clipboard.readText() })}><TbClipboard /> Einfügen</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarHover: defaultColors.sidebarHover })}><TbArrowBack /> Standard</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={4}>
            Seitenleiste Text
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <Form.Control className="col-lg-*" type="color" value={colors.sidebarText} onChange={e => colors.setColor({ sidebarText: e.target.value })} />
              <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(colors.sidebarText)}><TbCopy /> Kopieren</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarText: await navigator.clipboard.readText() })}><TbClipboard /> Einfügen</Button>
              <Button variant="outline-primary" onClick={async () => colors.setColor({ sidebarText: defaultColors.sidebarText })}><TbArrowBack /> Standard</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <h5>Themes</h5>
        <InputGroup>
          <Button variant="secondary" onClick={() => colors.resetDefault()}><TbColorSwatch /> Standard</Button>
          <Button variant="success" onClick={() => colors.setColor({ ...themes.green })}><TbColorSwatch /> Grün</Button>
          <Button style={{ border: "none", color: "white", background: "#009688" }} onClick={() => colors.setColor({ ...themes.bluegreen })}><TbColorSwatch /> Blaugrün</Button>
          <Button variant="danger" onClick={() => colors.setColor({ ...themes.red })}><TbColorSwatch /> Rot</Button>
          <Button style={{ border: "none", color: "white", background: "#303F9F" }} onClick={() => colors.setColor({ ...themes.blue })}><TbColorSwatch /> Blau</Button>
          <Button style={{ border: "none", color: "white", background: "#FF8F00" }} onClick={() => colors.setColor({ ...themes.orange })}><TbColorSwatch /> Orange</Button>
          <Button style={{ border: "none", color: "white", background: "#000000" }} onClick={() => colors.setColor({ ...themes.black })}><TbColorSwatch /> Schwarz</Button>
        </InputGroup>
      </Form>
    </Tile>
  )
}

export default ColorCustomizer