import { Icon } from "leaflet";
import "./custom-icon-style.css";

function CustomIcon(iconUrl, iconSize, className) {
  const icon = new Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    className: className,
  });
  return icon;
}

export default CustomIcon;
