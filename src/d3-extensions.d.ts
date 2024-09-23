// src/d3-extensions.d.ts

import * as d3 from "d3-hierarchy";

declare module "d3-hierarchy" {
  interface HierarchyRectangularNode<Datum> {
    current: {
      x0: number;
      x1: number;
      y0: number;
      y1: number;
    };
    target: {
      x0: number;
      x1: number;
      y0: number;
      y1: number;
    };
  }
}
