import { ReactElement } from "react"
import ReactGridLayout from "react-grid-layout"

export type TileElement = {
    el: ReactElement,
    id: string /* internal id */,
    name: string /* display name */,
    enabled: boolean
}

export type TileLayouts = {
    main: ReactGridLayout.Layout[],
    mobile: ReactGridLayout.Layout[],
}

export const makeTile = (tile: ReactElement, id: string, name: string, enabled: boolean = true): TileElement => {
    return { el: tile, id, name, enabled }
}

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
    collision: boolean
}

export const saveLayout = (config: LayoutConfig, page: string) => {
    localStorage.setItem("layout_" + page, JSON.stringify(config))
}

export const loadLayout = (page: string): LayoutConfig | null => {
    const l = localStorage.getItem("layout_" + page)
    if (l === null) return null;
    return JSON.parse(l)
}

export const clearSavedlayout = (page: string) => {
    localStorage.removeItem("layout_" + page)
}