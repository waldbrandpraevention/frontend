import ReactGridLayout, { Responsive } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import styled from "styled-components";
import { Button, ButtonGroup, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import TileToggler from "../components/TileToggler";
import { useState } from "react";
import { loadLayout, getLayoutForTile, saveLayout, sortTiles, TileElement, enabledTiles, clearSavedlayout, TileLayouts } from "../utils/tile";
import { TbArrowBackUp, TbDragDrop, TbDragDrop2, TbLock, TbLockOpen, TbViewportNarrow, TbViewportWide } from "react-icons/tb";
import ReactResizeDetector from 'react-resize-detector';
import { toast } from 'react-toastify';

const MyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const ResponsiveGridLayout = (Responsive);

type TilesLayoutProps = Readonly<{
  defaultTiles: TileElement[],
  defaultLayout: TileLayouts
}>

const TilesLayout = ({ defaultLayout, defaultTiles }: TilesLayoutProps) => {

  /* Tiles dropdown handler: set changed item enabled tile status */
  const onTilesToggle = (id: string, checked: boolean) => {
    const changedObj = tiles.find(e => e.id === id)
    if (changedObj)
      setTiles(sortTiles([...tiles.filter(e => e.id !== id), { el: changedObj?.el, enabled: !checked, id, name: changedObj.name }]))
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
        saveLayout({ tileIds, layout, collision, wide }, "dashboard")
        toast.success("Layout gespeichert")
      }
      return !wasEdit
    })
  }

  const resetLayout = () => {
    setLayout(defaultLayout)
    setPreventcollision(false)
    setWidemode(true)
    clearSavedlayout("dashboard")
    toast.success("Layout wurde zurückgesetzt")
  }

  const [tiles, setTiles] = useState(enabledTiles(defaultTiles, loadLayout("dashboard")?.tileIds));
  const [breakpoint, setBreakpoint] = useState("main")
  const [layout, setLayout] = useState(loadLayout("dashboard")?.layout ?? defaultLayout)
  const [editmode, setEditmode] = useState(false);
  const [wide, setWidemode] = useState(loadLayout("dashboard")?.wide ?? true);
  const [collision, setPreventcollision] = useState(loadLayout("dashboard")?.collision ?? false);

  return (
    <Container fluid={wide}>
      <ReactResizeDetector handleWidth>
        {({ width, targetRef }) =>
          // @ts-ignore
          <div ref={targetRef}>
            <ResponsiveGridLayout
              width={width ?? 0}
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
                return e.enabled && <MyDiv key={e.id} data-grid={getLayoutForTile(layout, e.id, breakpoint, defaultLayout)}>{e.el}</MyDiv>;
              }
              )}
            </ResponsiveGridLayout>
          </div>
        }</ReactResizeDetector>

      <ButtonGroup vertical={breakpoint === "mobile"}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 30, hide: 300 }}
          overlay={
            <Tooltip>
              Aktiviere den Bearbeiten-Modus um Kacheln zu (de)aktivieren, skalieren, verschieben und weitere Optionen anzupassen. Einstellungen werden lokal gespeichert.
            </Tooltip>
          }
        >
          <Button variant={editmode ? "primary" : "outline-primary"} size="sm" onClick={onEditToggle} className={`d-flex align-items-center ${editmode ? "rounded-start-2" : ""}`}>
            {editmode ? <TbLockOpen /> : <TbLock />} {editmode ? "Layout speichern" : "Layout anpassen"}
          </Button>
        </OverlayTrigger>
        {editmode && <>
          <TileToggler disabled={!editmode} onToggle={onTilesToggle} tiles={tiles} />
          <Button variant={!wide ? "outline-primary" : "outline-secondary"} size="sm" onClick={() => setWidemode(mode => !mode)} className="d-flex align-items-center">
            {wide ? <TbViewportNarrow /> : <TbViewportWide />} {wide ? "Breites Layout deaktiveren" : "Breites Layout aktivieren"}
          </Button>
          <OverlayTrigger
            placement="top"
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
          <OverlayTrigger
            placement="top"
            delay={{ show: 30, hide: 300 }}
            overlay={
              <Tooltip>
                Setzt das Layout (außer deaktivierte Kacheln) und Optionen auf Standard zurück. Das im Browser gespeicherte Layout wird auch gelöscht.
              </Tooltip>
            }
          >
            <Button variant="outline-danger" size="sm" onClick={resetLayout} className="d-flex align-items-center">
              <TbArrowBackUp />  Zurücksetzen
            </Button>
          </OverlayTrigger>
        </>}
      </ButtonGroup>
    </Container>
  );
}
export default TilesLayout;