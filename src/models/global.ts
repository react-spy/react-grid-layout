import { proxy } from "valtio";

const globalState = proxy({
  name: "React + Vite",
});
export default globalState;
