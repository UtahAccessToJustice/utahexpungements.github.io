import React from "react";
import { isEqual } from "lodash";

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(callback, dependencies) {
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;
