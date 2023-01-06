import { TbAntennaBars1 as TbAntennaBars2, TbAntennaBars3, TbAntennaBars4, TbAntennaBars5 } from "react-icons/tb";
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
    let icon;

    switch (props.level) {
        case 0:
            background = '#66BB6A';
            color = '#1B5E20';
            text = "SEHR NIEDRIG";
            icon = <TbAntennaBars2 />;
            break;
        case 1:
            background = "#9CCC65";
            color = '#33691E';
            text = 'NIEDRIG';
            icon = <TbAntennaBars2 />;
            break;
        case 2:
            background = '#FFE082';
            color = '#F57F17';
            text = 'MITTEL';
            icon = <TbAntennaBars3 />;
            break;
        case 3:
            background = '#FFAB91';
            color = '#E65100';
            text = 'HOCH';
            icon = <TbAntennaBars4 />;
            break;
        case 4:
            background = '#EF9A9A';
            color = '#D32F2F';
            text = 'SEHR HOCH';
            icon = <TbAntennaBars5 />;
            break;
        default:
            background = 'gray';
            color = 'white';
            text = 'no data';
    }

    return <Mydiv style={{ backgroundColor: background, color, filter: `drop-shadow(1px 1px 3px ${background})` }}> <span style={{ }}>{ icon }</span>{text}</Mydiv>
}
        export default DangerLevel;