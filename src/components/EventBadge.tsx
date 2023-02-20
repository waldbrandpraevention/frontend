import { EventType } from "../utils/events";
import styled from 'styled-components';

type EventBadgeProps = {
  type: EventType
}

const Mydiv = styled.div`
    /* min-width: 4rem; */
    /* max-width: 9rem; */
    border-radius: 25px;
    text-align: center;
    font-weight: 700;
    /* filter: drop-shadow(1px 1px 1px white); */
`

const EventBadge = ({ type }: EventBadgeProps) => {
  let background;
  let text;
  let color;

  switch (type) {
    case 1:
      background = '#FFE0B2';
      color = '#EF6C00';
      text = "Rauch";
      break;
    case 2:
      background = '#FFCDD2';
      color = '#D32F2F';
      text = 'Feuer';
      break;
    default:
      background = 'gray';
      color = 'white';
      text = 'N/A';
  }

  return <Mydiv style={{ backgroundColor: background, color, /* filter: `drop-shadow(0px 0px 1px ${background})` */ }}>{text}</Mydiv>
}

export default EventBadge