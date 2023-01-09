import { Dropdown, Form } from "react-bootstrap";
import { TbLayoutGrid } from "react-icons/tb";
import { TileElement } from "../utils/tile";

export type TileTogglerType = {
    tiles: TileElement[],
    onToggle: (id: string, checked: boolean) => void,
    disabled?: boolean
}

const TileToggler = ({ tiles, onToggle, disabled = false }: TileTogglerType) => {

    return <>
        <Dropdown>
            <Dropdown.Toggle disabled={disabled} variant="outline-secondary" size="sm" id="dropdown-basic" className="d-flex align-items-center rounded-0">
                <TbLayoutGrid />  Kacheln
            </Dropdown.Toggle>

            <Dropdown.Menu className="px-1" style={{ userSelect: "none" }}>
                <Form>
                    {tiles.map(e =>
                        <Form.Check
                            disabled={false}
                            type="switch"
                            id={`tt-${e.id}`}
                            key={`tt-${e.id}`}
                            label={e.name}
                            checked={e.enabled}
                            onChange={(_e) => onToggle(e.id, !_e.target.checked)}
                        />
                    )}
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    </>
}
export default TileToggler;