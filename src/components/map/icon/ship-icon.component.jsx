import CustomIcon from "./custom-icon.component";
import { renderToStaticMarkup } from "react-dom/server";

function ShipIcon() {
  // return <CustomIcon iconUrl="./ship.png" iconSize={[25, 25]} />;
  return CustomIcon("./ship2.svg", [25, 25], "ship-color-green");
}

export default ShipIcon;
