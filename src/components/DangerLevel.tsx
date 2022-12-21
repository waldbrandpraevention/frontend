import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';



const Mydiv = styled.div`
    min-width: 4rem;
    max-width: 8rem;
    border-radius: 25px;
    text-align: center;
    font-weight: 700;
    filter: drop-shadow(1px 1px 1px black);
`

type DangerLevelProps = {
    level: number
}

const DangerLevel = (props: DangerLevelProps) => {
    let background;
    let text;

    switch (props.level) {
        case 0:
            background = '#00897B';
            text = "SEHR NIEDRIG";
            break;
        case 1:
            background = "#4CAF50";
            text = 'NIEDRIG';
            break;
        case 2:
            background = '#FFC107';
            text = 'MITTEL';
            break;
        case 3:
            background = '#F44336';
            text = 'HOCH';
            break;
        case 4:
            background = '#C62828';
            text = 'SEHR HOCH';
            break;
        default:
            background = 'gray';
            text = 'no data';
    }

    return <Mydiv style={{ backgroundColor: background }} > {text}</Mydiv >
}
export default DangerLevel;