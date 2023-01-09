import styled from 'styled-components';

const Mydiv = styled.div`
    /* min-width: 4rem; */
    /* max-width: 9rem; */
    border-radius: 25px;
    text-align: center;
    font-weight: 700;
    /* filter: drop-shadow(1px 1px 1px white); */
`

type DangerLevelProps = {
    level: number
}

const DangerLevel = (props: DangerLevelProps) => {
    let background;
    let text;
    let color;

    switch (props.level) {
        case 0:
            background = '#81C784';
            color = '#1B5E20';
            text = "SEHR NIEDRIG";
            break;
        case 1:
            background = "#AED581";
            color = '#33691E';
            text = 'NIEDRIG';
            break;
        case 2:
            background = '#FFE082';
            color = '#F57F17';
            text = 'MITTEL';
            break;
        case 3:
            background = '#FFAB91';
            color = '#E65100';
            text = 'HOCH';
            break;
        case 4:
            background = '#EF9A9A';
            color = '#D32F2F';
            text = 'SEHR HOCH';
            break;
        default:
            background = 'gray';
            color = 'white';
            text = 'N/A';
    }

    return <Mydiv style={{ backgroundColor: background, color, /* filter: `drop-shadow(0px 0px 1px ${background})` */ }}>{text}</Mydiv>
}
export default DangerLevel;