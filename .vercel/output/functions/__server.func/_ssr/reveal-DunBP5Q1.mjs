import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./chrome-BxWKOGK8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reveal-DunBP5Q1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, stagger = false }) {
	const ref = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setOn(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setOn(true);
				io.disconnect();
			}
		}, { threshold: .15 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn(stagger ? "reveal-stagger" : "reveal", on && "in", className),
		children
	});
}
//#endregion
export { Reveal as t };
