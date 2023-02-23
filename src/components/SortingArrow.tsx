
import { BiDownArrow, BiRightArrow, BiUpArrow } from "react-icons/bi";

interface SortingArrowProps {
    value: number
}
/**
 * this component is used to display the sorting arrow in the table header
 * @param value the value of the sorting direction (0 = up, 1 = down, 2 = none)
 * @returns the sorting arrow Image
 */
const SortingArrow = ({ value }: SortingArrowProps) => {

    return (
        <div>
            <div>{value === 0 && <BiUpArrow style={{ float: "right" }}></BiUpArrow>}</div>
            <div>{value === 1 && <BiDownArrow style={{ float: "right" }}></BiDownArrow>}</div>
            <div>{value === 2 && <BiRightArrow style={{ float: "right" }}></BiRightArrow>}</div>
        </div>
    );
};

export default SortingArrow;