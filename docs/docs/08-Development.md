# Development

#### Projekt Setup

1. GitHub Repo clonen

```
git clone https://github.com/waldbrandpraevention/frontend.git
```

2. Dependencies installieren

```
npm install
```

3. `npm start` zum Starten.<br/> `npm run cypress` zum Testen.<br/>
   `npm run build` zum Erstellen.

### E2E Testing

1. `npm start` (Wichtig!)

2. `npm run cypress`

3. `E2E Testing` auswählen

4. Browser auswählen. Empfohlen: Chrome.

5. Ein Spec auswählen zum Testen.

Mehr Infos: https://cypress.io

#### Code Coverage

1. `npm run cypress:run`

2. Report in `coverage/lcov-report/index.html`

### Themes

Um ein Theme zu erstellen folgendermaßen vorgehen:

1. `src/service/stores.ts`

<div>

```ts
export const themes: { black: Theme, /* ... */, custom: Theme } = {
  black: {
    background: "#FAFAFA",
    headerBackground: "#FAFAFA",
    sidebarBackground: "#000000",
    sidebarActive: "#383838",
    sidebarHover: "#5c5c5c",
    sidebarText: "#FFFFFF",
  }
  /* ... */
  custom: {
    background: "#ecf8f0",
    headerBackground: "#ecf8f0",
    sidebarBackground: "#009688",
    sidebarActive: "#4DB6AC",
    sidebarHover: "#80CBC4",
    sidebarText: "#FFFFFF",
  }
}
```

</div>

2. `src/components/tiles/account/ColorCustomizer.tsx`

<div>

```tsx
// fast am Ende der Datei:
<InputGroup>
  <Button
    style={{ border: "none", color: "white", background: "#000000" }}
    onClick={() => colors.setColor({ ...themes.black })}
  >
    <TbColorSwatch /> Schwarz
  </Button>
  /* ... */
  <Button
    style={{ border: "none", color: "white", background: "#ecf8f0" }}
    onClick={() => colors.setColor({ ...themes.custom })}
  >
    <TbColorSwatch /> Mein Custom Theme
  </Button>
</InputGroup>;
```

</div>

### Kacheln

Das Kachellayout ist komplett modular aufgebaut.

So kann eine Kachel erstellt werden:

1. Im `src/components/tiles` eine Komponente erstellen, welche als direktem
   Child ein `<Tile>...</Tile>` returned.
2. Auf der gewünschten Seite `src/pages/MyPage.tsx`

<div>

```ts
import MyTile from "../components/tiles/MyTile";
const TilesLayout = lazy(() => import("../components/TilesLayout"));

const MyPage = () => {
  const { defaultTiles, defaultLayout } = tiles([
    {
      el: <MyTile />,
      id: "mytile",
      name: "My Tile",
      main: { x: 0, y: 0, w: 8, h: 3 },
      mobile: { x: 0, y: 0, w: 24, h: 3 },
    },
    // more tiles...
  ]);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <TilesLayout
          layoutId="dashboard"
          defaultLayout={defaultLayout}
          defaultTiles={defaultTiles}
        />
      </Suspense>
    </div>
  );
};

export default MyPage;
```

</div>

Referenz:

<div>

```ts
export type TileElement = {
  /**
   * tile component in `components/tiles`. must return a `<Tile>...</Tile>`
   */
  el: ReactElement;
  /**
   * unique id per `<TilesLayout />`
   */
  id: string;
  /**
   * display name
   */
  name: string;
  /**
   * whether tile is enabled by default
   */
  enabled?: boolean;
  /**
   * don't show tile while in edit mode. show placeholder instead
   */
  noEditmode?: boolean;
};
```

</div>
<div>

```ts
export type TileLayouts = {
  /**
   * layout for desktop and tablet breakpoint
   */
  main: ReactGridLayout.Layout[];
  /**
   * layout for mobile breakpoint
   */
  mobile: ReactGridLayout.Layout[];
};
```

</div>