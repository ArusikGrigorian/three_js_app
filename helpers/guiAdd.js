import { handleOnChange } from "./handleOnChange.js";

export function guiAdd({ gui, metricsObject, metricsArray, start, end, onChangeParams }) {
  metricsArray.forEach((metric) => {
    gui.add(metricsObject, metric, start, end).onChange((e) => handleOnChange(e, ...onChangeParams));
  });
}
