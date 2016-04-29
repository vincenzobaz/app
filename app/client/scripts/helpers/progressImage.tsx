
'use strict';

import {Routes} from "../../../common/Routes";

export function image(s, c) {
  s = Math.max(0, Math.min(s, 3));
  if (s == 0) { return 'check-none.png'; }
  if (s == 3) { return `check-${c}.png`; }
  return `check-${c}-${s * 33}.png`;
}

export function progressImage(score, color) {
  return Routes.Assets.at('images/' + image(score, color));
}

