import "../assets/styles/App.css";
import AlertEmergencyUnits from '../components/tiles/AlertEmergencyUnits';
import Area from '../components/tiles/Area';
import DroneCount from '../components/tiles/DroneCount';
import Firerisk from '../components/tiles/Firerisk';
import WeatherForecast from '../components/tiles/WeatherForecast';
import ZoneOverview from '../components/tiles/ZoneOverview';
import Map from '../components/tiles/Map';
import { Responsive } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import styled from "styled-components";
import { Button, ButtonGroup, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import TileToggler from "../components/TileToggler";
import { useEffect, useState } from "react";
import { loadLayout, getLayoutForTile, makeTile, saveLayout, sortTiles, TileElement, enabledTiles, clearSavedlayout } from "../utils/tile";
import { TbArrowBackUp, TbDragDrop, TbDragDrop2, TbLock, TbLockOpen, TbViewportNarrow, TbViewportWide } from "react-icons/tb";
import ReactResizeDetector from 'react-resize-detector';
import { toast } from 'react-toastify';
import { useAuth } from "../service/auth";
import { once } from "../utils/util";

const MyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const ResponsiveGridLayout = (Responsive);

const Dashboard = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user.mail_verified) toast.warn("Ihre E-Mail Adresse wurde noch nicht verifiziert", { toastId: "mail_unverified" })
  }, [user.mail_verified])

  useEffect(() => once("show_editmode_info",
    () => toast.info("TIPP: Sie können das Layout frei anpassen, indem Sie unten auf der Seite auf 'Layout anpassen' klicken", { autoClose: 15000 }), true), [])

  const defaultTiles = sortTiles([
    makeTile(<DroneCount />, "a", "Drohnenanzahl"),
    makeTile(<Area />, "b", "Überwachungsgebiet"),
    makeTile(<Firerisk />, "c", "Feuerrisiko"),
    makeTile(<Map />, "g", "Karte"),
    makeTile(<WeatherForecast />, "d", "Wettervorhersage"),
    makeTile(<ZoneOverview />, "e", "Zonenübersicht"),
    makeTile(<AlertEmergencyUnits />, "f", "Einsatzkräfte alarmieren"),
  ]) as TileElement[]

  const defaultLayout = {
    lg: [ /* tablet + desktop */
      { i: "a", x: 0, y: 0, w: 8, h: 3 }, /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
      { i: "b", x: 8, y: 0, w: 8, h: 3 },
      { i: "c", x: 16, y: 0, w: 8, h: 3 },
      { i: "g", x: 0, y: 4, w: 18, h: 10 },
      { i: "d", x: 18, y: 4, w: 6, h: 10 },
      { i: "e", x: 0, y: 15, w: 16, h: 12 },
      { i: "f", x: 16, y: 15, w: 8, h: 12 },
    ],
    md: [ /* mobile */
      { i: "a", x: 0, y: 0, w: 24, h: 3 }, /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
      { i: "b", x: 0, y: 3, w: 24, h: 3 },
      { i: "c", x: 0, y: 6, w: 24, h: 3 },
      { i: "g", x: 0, y: 9, w: 24, h: 10 },
      { i: "d", x: 0, y: 19, w: 24, h: 10 },
      { i: "e", x: 0, y: 29, w: 24, h: 12 },
      { i: "f", x: 0, y: 33, w: 24, h: 12 },
    ]
  }

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
    // console.log("DEFAULT " + defaultLayout.lg.length);

    // setLayout({lg: {...defaultLayout.lg, ...all.lg}}) // merge deep needed
    // setLayout({...defaultLayout, ...all})
    setLayout(all)
    // setLayout(defaultLayout)
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
  const [breakpoint, setBreakpoint] = useState("lg")
  const [layout, setLayout] = useState(loadLayout("dashboard")?.layout ?? defaultLayout)
  const [editmode, setEditmode] = useState(false);
  const [wide, setWidemode] = useState(loadLayout("dashboard")?.wide ?? true);
  const [collision, setPreventcollision] = useState(loadLayout("dashboard")?.collision ?? false);

  return (
    <div className="App">
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
                breakpoints={{ lg: 768, md: 0 }}
                cols={{ lg: 24, md: 24, sm: 24, xs: 16, xxs: 8 }}
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

        <ButtonGroup vertical={breakpoint === "md"}>
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
    </div >
  );
}

export default Dashboard;
