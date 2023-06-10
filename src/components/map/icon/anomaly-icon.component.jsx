import CustomIcon from "./custom-icon.component";
import { renderToStaticMarkup } from "react-dom/server";

function AnomalyIcon() {
  // return <CustomIcon iconUrl="./ship.png" iconSize={[25, 25]} />;
  return CustomIcon("./anomaly3.svg", [25, 25], "ship-color-green");
}

export default AnomalyIcon;
