import { useEffect } from "react";

export default function useMouseFlow() {
  useEffect(() => {
    window._mfq = window._mfq || [];

    (function () {
      var mf = document.createElement("script");
      mf.type = "text/javascript";
      mf.defer = true;
      mf.src =
        "//cdn.mouseflow.com/projects/50bc3778-e3bd-4c3f-af43-e24657893d40";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
    console.log(window._mfq);
  }, []);
}
