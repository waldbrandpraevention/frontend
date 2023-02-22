import React, { useState, useEffect } from 'react';
import { BiDownArrow, BiRightArrow, BiUpArrow } from "react-icons/bi";

interface SortingArrowProps {
    onChange: (newDirection: number) => void;
}

const SortingArror = ({ onChange }: SortingArrowProps) => {
    const [value, setValue] = useState(2);

    const handleClick = () => {
        // Change the value and call the onChange function with the new value
        if (value === 0) {
            setValue(1);
            onChange(1);
        } else if (value === 1) {
            setValue(0);
            onChange(0);
        } else {
            setValue(1);
            onChange(1);
        }
    }

    return (
        <div>
            <div>{value === 0 && <BiUpArrow></BiUpArrow>}</div>
            <div>{value === 1 && <BiDownArrow></BiDownArrow>}</div>
            <div>{value === 2 && <BiRightArrow></BiRightArrow>}</div>
        </div>
    );
};

export default SortingArror;