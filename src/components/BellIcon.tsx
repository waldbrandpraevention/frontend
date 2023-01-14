import '../assets/styles/icon.css'
import { TbBell, TbBellRinging } from 'react-icons/tb';
import styled from 'styled-components';

type BellIconProps = { hasNotifications: boolean, iconDark: boolean }

const AnimatedBell = styled(TbBellRinging)`
    animation: pulse 2s infinite;

    @keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
        rotate: 10deg;
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}
`;

const BellIcon = ({ hasNotifications, iconDark = true }: BellIconProps) => {
	return <>
		{hasNotifications ? <AnimatedBell size={"1.5em"} className={iconDark ? "text-dark" : "text-white"} /> :
			<TbBell size={"1.5em"} className={iconDark ? "text-dark" : "text-white"} />}
	</>


};
export default BellIcon