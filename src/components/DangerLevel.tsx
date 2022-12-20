import Badge from 'react-bootstrap/Badge';

type DangerLevelProps = {
    level: number
}

const DangerLevel = (props: DangerLevelProps) => {
    let backgroundColor;
    let text;

    switch (props.level) {
        case 0:
            backgroundColor = '#00897B';
            text = "SEHR NIEDRIG";
            break;
        case 1:
            backgroundColor = "#4CAF50";
            text = 'NIEDRIG';
            break;
        case 2:
            backgroundColor = '#FFC107';
            text = 'MITTEL';
            break;
        case 3:
            backgroundColor = '#F44336';
            text = 'HOCH';
            break;
        case 4:
            backgroundColor = '#C62828';
            text = 'SEHR HOCH';
            break;
        default:
            backgroundColor = 'gray';
            text = 'no data';
    }

    return <Badge pill text="dark">{text}</Badge>
}
export default DangerLevel;