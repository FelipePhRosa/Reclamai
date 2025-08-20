import L from 'leaflet';

const ICON_SIZE = [60, 60];
const ICON_ANCHOR = [30, 50];
const POPUP_ANCHOR = [0, -40];

export const categoryIcons = {
  1: L.icon({ iconUrl: '/icons/Deslizamentos.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  2: L.icon({ iconUrl: '/icons/Alagamentos.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  3: L.icon({ iconUrl: '/icons/Assalto.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  4: L.icon({ iconUrl: '/icons/Incêndio.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  5: L.icon({ iconUrl: '/icons/Luminosidade.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  6: L.icon({ iconUrl: '/icons/Buraco.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  7: L.icon({ iconUrl: '/icons/Desabamentos.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
  default: L.icon({ iconUrl: '/icons/Outros.png', iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR, popupAnchor: POPUP_ANCHOR }),
};
