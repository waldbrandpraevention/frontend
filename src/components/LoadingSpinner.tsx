import { ImSpinner2 } from "react-icons/im";
import styled from "styled-components";

const AnimatedSpinner = styled(ImSpinner2)`
    rotate: 0deg;
    animation: spinnerspin 1s infinite linear;

    @keyframes spinnerspin {
        from {transform:rotate(0deg);}
        to {transform:rotate(359deg);}
    }
`;

type LoadingSpinnerPropType = {
    size?: number
}

const LoadingSpinner = ({ size = 16 }: LoadingSpinnerPropType) => <AnimatedSpinner size={size} />

export default LoadingSpinner;