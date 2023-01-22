import ReactGridLayout, { Responsive } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import styled from "styled-components";
import { Button, ButtonGroup, Container, Dropdown, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import TileToggler from "../components/TileToggler";
import { useState } from "react";
import { loadLayout, getLayoutForTile, saveLayout, sortTiles, TileElement, enabledTiles, clearSavedlayout, TileLayouts } from "../utils/tile";
import { TbArrowBackUp, TbCheckbox, TbDragDrop, TbDragDrop2, TbEdit, TbResize, TbViewportNarrow, TbViewportWide } from "react-icons/tb";
import ReactResizeDetector from 'react-resize-detector';
import { toast } from 'react-toastify';
import PlaceholderEditMode from "./tiles/PlaceholderEditMode";
import { useColorStore } from "../service/stores";

const MyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const ResponsiveGridLayout = (Responsive);

type TilesLayoutProps = Readonly<{
  layoutId: string,
  defaultTiles: TileElement[],
  defaultLayout: TileLayouts,
  defaultEnabledTiles?: string[],
  onEditModeChange?: (wasEdit: boolean) => void,
}>

const TilesLayout = ({ layoutId, defaultLayout, defaultTiles, defaultEnabledTiles, onEditModeChange = undefined }: TilesLayoutProps) => {

  /* Tiles dropdown handler: set changed item enabled tile status */
  const onTilesToggle = (id: string, checked: boolean) => {
    const changedObj = tiles.find(e => e.id === id)
    if (changedObj)
      setTiles(sortTiles([...tiles.filter(e => e.id !== id), { el: changedObj?.el, enabled: !checked, id, name: changedObj.name, noEditmode: changedObj.noEditmode }]))
  }

  const onBreakpointChange = (current: any) => {
    setBreakpoint(current)
  }

  const onLayoutChange = (current: any, all: ReactGridLayout.Layouts) => {
    setLayout(all)
  }

  const onEditToggle = () => {
    setEditmode(wasEdit => {
      const tileIds = tiles.filter(e => e.enabled).map(e => e.id) /* activated tiles */
      if (wasEdit) {
        saveLayout({ tileIds, layout, collision, wide, scale }, layoutId)
        toast.success("Layout gespeichert")
      }
      if (onEditModeChange) onEditModeChange(wasEdit)
      return !wasEdit
    })
  }

  const resetLayout = () => {
    setTiles(enabledTiles(defaultTiles, defaultEnabledTiles))
    setLayout(defaultLayout)
    setPreventcollision(false)
    setWidemode(true)
    setScale(1)
    clearSavedlayout(layoutId)
    toast.info("Layout zurückgesetzt")
  }

  const [tiles, setTiles] = useState(enabledTiles(defaultTiles, loadLayout(layoutId)?.tileIds ?? defaultEnabledTiles));
  const [breakpoint, setBreakpoint] = useState("main")
  const [layout, setLayout] = useState(loadLayout(layoutId)?.layout ?? defaultLayout)
  const [editmode, setEditmode] = useState(false);
  const [wide, setWidemode] = useState(loadLayout(layoutId)?.wide ?? true);
  const [collision, setPreventcollision] = useState(loadLayout(layoutId)?.collision ?? false);
  const [scale, setScale] = useState(loadLayout(layoutId)?.scale ?? 1)

  const headerBackground = useColorStore(state => state.headerBackground);

  return (<>
    <ReactResizeDetector handleWidth>
      {({ width, targetRef }) =>
        <Container fluid={wide} style={{ userSelect: !editmode ? "auto" : "none", transformOrigin: "top left", transform: `scale(${scale}) /* translate(-${scale}%, -${scale}%) */` }}>
          {/* @ts-ignore */}
          <div ref={targetRef}>
            <ResponsiveGridLayout
              transformScale={scale}
              width={(width ?? 0) * (1 / scale)}
              className="layout"
              rowHeight={30}
              layouts={layout}
              breakpoints={{ main: 700 /* 768 */, mobile: 0 }}
              cols={{ main: 24, mobile: 24 }}
              onLayoutChange={onLayoutChange}
              onBreakpointChange={onBreakpointChange}
              isResizable={editmode}
              isDraggable={editmode}
              preventCollision={collision}
              isBounded={true}
            >
              {tiles.map(e => {
                return e.enabled && <MyDiv key={e.id} data-grid={getLayoutForTile(layout, e.id, breakpoint, defaultLayout)}>
                  {e.noEditmode && editmode ? <PlaceholderEditMode name={e.name} /> : e.el}
                </MyDiv>;
              }
              )}
            </ResponsiveGridLayout>
          </div>
        </Container>
      }</ReactResizeDetector>
    <div className="mb-0 d-static" style={{ position: "fixed", top: 0, zIndex: 15, background: headerBackground }}>
      <ButtonGroup vertical={breakpoint === "mobile"}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 30, hide: 300 }}
          overlay={
            editmode ? <Tooltip>
              Vergessen Sie nicht Ihre Änderungen hier zu speichern.
            </Tooltip> :
              <Tooltip>
                Aktiviere den Bearbeiten-Modus um Kacheln zu (de)aktivieren, skalieren, verschieben und weitere Optionen anzupassen. Einstellungen werden lokal gespeichert.
              </Tooltip>
          }
        >
          <Button variant={editmode ? "success" : "text-secondary"} size="sm" onClick={onEditToggle} className={`d-flex align-items-center rounded-0`}> {/* ${editmode ? "rounded-start-2" : ""} */}
            {editmode ? <TbCheckbox /> : <TbEdit />} {editmode ? "Layout speichern" : "Layout anpassen"}
          </Button>
        </OverlayTrigger>
        {editmode && <>
          <TileToggler disabled={!editmode} onToggle={onTilesToggle} tiles={tiles} />
          <Button variant={!wide ? "outline-primary" : "outline-secondary"} size="sm" onClick={() => setWidemode(mode => !mode)} className="d-flex align-items-center">
            {wide ? <TbViewportNarrow /> : <TbViewportWide />} {wide ? "Breites Layout deaktiveren" : "Breites Layout aktivieren"}
          </Button>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 30, hide: 300 }}
            overlay={
              <Tooltip>
                Verhindert das andere Kacheln beim Verschieben einer Kachel auch verschoben werden.
              </Tooltip>
            }
          >
            <Button variant={collision ? "outline-primary" : "outline-secondary"} size="sm" onClick={() => setPreventcollision(mode => !mode)} className="d-flex align-items-center">
              {collision ? <TbDragDrop2 /> : <TbDragDrop />} {collision ? "Kollision deaktiveren" : "Kollision aktivieren"}
            </Button>
          </OverlayTrigger>
          <Dropdown>
            <OverlayTrigger
              placement="right"
              delay={{ show: 30, hide: 0 }}
              overlay={
                <Tooltip>
                  Ermöglicht das Skalieren des Layouts um z.B. mehr Kacheln zu nutzen.
                </Tooltip>
              }
            >
              <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-badawddsic" className="d-flex align-items-center rounded-0">
                <TbResize /> Skalieren
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="p-1">
              <Form.Label>Skalierung: {Math.round(scale * 100)}%</Form.Label>
              <Form.Range step={0.05} min={0.05} max={2} value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
            </Dropdown.Menu>
          </Dropdown>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 30, hide: 300 }}
            overlay={
              <Tooltip>
                Setzt das Layout und alle Optionen auf Standard zurück. Das im Browser gespeicherte Layout wird auch gelöscht.
              </Tooltip>
            }
          >
            <Button variant="outline-danger" size="sm" onClick={resetLayout} className="d-flex align-items-center">
              <TbArrowBackUp />  Standard
            </Button>
          </OverlayTrigger>

        </>}
      </ButtonGroup>
    </div>
  </>
  );
}
export default TilesLayout;