import CustomIcon from "./custom-icon.component";
import { renderToStaticMarkup } from "react-dom/server";

function AnomalyIcon() {
  // return <CustomIcon iconUrl="./ship.png" iconSize={[25, 25]} />;
  return CustomIcon("./anomaly.svg", [40, 40], "ship-color-green");
}

export default AnomalyIcon;
