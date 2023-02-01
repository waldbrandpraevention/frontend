import { ReactElement } from "react"
import ReactGridLayout from "react-grid-layout"

export type TileElement = {
    /**
     * tile component in `components/tiles`. must return a `<Tile>...</Tile>`
     */
    el: ReactElement,
    /**
     * unique id per `<TilesLayout />`
     */
    id: string,
    /**
     * display name
     */
    name: string,
    /**
     * whether tile is enabled by default
     */
    enabled?: boolean,
    /**
     * don't show tile while in edit mode. show placeholder instead
     */
    noEditmode?: boolean, /* display placeholder instead of actual element in edit mode to improve perfromance/reduce visual glitches */
}

export type TileLayouts = {
    /**
     * layout for desktop and tablet breakpoint
     */
    main: ReactGridLayout.Layout[],
    /**
     * layout for mobile breakpoint
     */
    mobile: ReactGridLayout.Layout[],
}

/**
 * @inheritdoc
 */
export type TilesOptions = TileElement & {
    /**
     * layout for desktop and tablet breakpoint
     */
    main: Omit<ReactGridLayout.Layout, "i">,
    /**
     * layout for mobile breakpoint
     */
    mobile: Omit<ReactGridLayout.Layout, "i">,
}

/**
 * Creates tiles and layouts.
 */
export const tiles = (tiles: TilesOptions[]): { defaultTiles: TileElement[], defaultLayout: TileLayouts } => {
    const defaultTiles: TileElement[] = []
    const defaultLayout: TileLayouts = { main: [], mobile: [] }
    tiles.forEach(l => {
        defaultTiles.push({ el: l.el, id: l.id, name: l.name, enabled: l.enabled ?? true, noEditmode: l.noEditmode ?? false })
        defaultLayout.main.push({ i: l.id, ...l.main })
        defaultLayout.mobile.push({ i: l.id, ...l.mobile })
    })
    return { defaultTiles: sortTiles(defaultTiles), defaultLayout }
}

/**
 * Creates a tile.
 * @param tile tile component in `components/tiles`. must return a `<Tile>...</Tile>`
 * @param id unique id per layout
 * @param name display name
 * @param enabled whether tile is enabled by default
 * @param noEditmode don't show tile while in edit mode. show placeholder instead
 * @returns TileElement
 * @deprecated use `tiles` instead
 */
export const makeTile = (tile: ReactElement, id: string, name: string, enabled: boolean = true, noEditmode = false): TileElement => {
    return { el: tile, id, name, enabled, noEditmode }
}

/**
 * Sorts tiles by display name.
 */
export const sortTiles = (tiles: TileElement[]): TileElement[] => {
    return tiles.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
}

/**
 * Return all tiles and for each set enabled if user activated tile (in tileIds). 
 */
export const enabledTiles = (allTiles: TileElement[], tileIds: string[] | undefined): TileElement[] => {
    if (!tileIds) return allTiles;
    return allTiles.map(e => ({ ...e, enabled: tileIds.includes(e.id) }))
}

/**
 * Return entry for current breakpoint (or for 'main') from current active layout, else from default layout
 */
export const getLayoutForTile = (layouts: ReactGridLayout.Layouts, id: string, breakpoint: string = "main", defaultLayouts: ReactGridLayout.Layouts) => {
    if (!layouts[breakpoint]) breakpoint = "main";
    let entry = layouts[breakpoint].find(e => e.i === id)
    if (entry === undefined) entry = defaultLayouts[breakpoint].find(e => e.i === id)
    return entry
}

export type LayoutConfig = {
    tileIds: string[],
    layout: ReactGridLayout.Layouts,
    wide: boolean,
    collision: boolean,
    scale: number
}

/**
 * Saves layout to local storage.
 */
export const saveLayout = (config: LayoutConfig, page: string) => {
    localStorage.setItem("layout_" + page, JSON.stringify(config))
}

/**
 * Loads layout from local storage.
 */
export const loadLayout = (page: string): LayoutConfig | null => {
    const l = localStorage.getItem("layout_" + page)
    if (l === null) return null;
    return JSON.parse(l)
}

/**
 * Clears layout from local storage.
 */
export const clearSavedlayout = (page: string) => {
    localStorage.removeItem("layout_" + page)
}