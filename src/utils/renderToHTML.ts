import { type JSX } from "react";
import { createRoot } from "react-dom/client";

export const renderToHTML = async (
  component: JSX.Element,
  options?: { cleanup?: boolean }
) => {
  const element = document.createElement("div");
  const root = createRoot(element);
  root.render(component);

  await new Promise((resolve) => requestAnimationFrame(resolve));

  if (options?.cleanup) {
    root.unmount();
  }

  return element;
};
