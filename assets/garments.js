/* Illustrations SVG des vêtements (utilisées tant qu'il n'y a pas de vraie photo) */
(function () {
  function hexToRgb(h) {
    h = (h || "#16171a").replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function shade(h, amt) {
    var c = hexToRgb(h).map(function (v) {
      return Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    });
    return "rgb(" + c.join(",") + ")";
  }
  function lum(h) {
    var c = hexToRgb(h);
    return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
  }

  var uid = 0;

  function garmentSVG(type, hex, opts) {
    opts = opts || {};
    hex = hex || "#16171a";
    var id = "g" + (++uid);
    var light = lum(hex) > 0.55;
    var line = shade(hex, light ? -0.22 : 0.18);
    var deep = shade(hex, light ? -0.12 : -0.35);
    var ink = light ? "#16171a" : "#c8f31d";
    var accent = "#c8f31d";

    function body(d, extra) {
      return '<path d="' + d + '" fill="' + hex + '" stroke="' + line + '" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="' + d + '" fill="url(#' + id + ')"' + (extra || "") + "/>";
    }
    function stroke(d, w, col) {
      return '<path d="' + d + '" fill="none" stroke="' + (col || line) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    function fillp(d, col) {
      return '<path d="' + d + '" fill="' + col + '" stroke="' + line + '" stroke-width="2" stroke-linejoin="round"/>';
    }
    function word(x, y, size, col, ls) {
      return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="' + size +
        '" letter-spacing="' + (ls == null ? 2 : ls) + '" fill="' + (col || ink) + '">KONG</text>';
    }

    var s = "";
    switch (type) {
      case "tank":
        s = body("M148 62 L172 62 Q176 128 200 138 Q224 128 228 62 L252 62 Q262 150 302 178 L306 432 Q200 448 94 432 L98 178 Q138 150 148 62 Z") +
          stroke("M172 64 Q176 128 200 138 Q224 128 228 64", 5, deep) +
          stroke("M100 418 Q200 432 304 418", 2) + word(200, 250, 40);
        break;

      case "hoodie":
        s = body("M132 88 L268 88 L332 112 Q352 142 362 222 L382 398 L340 410 L320 252 L310 262 L310 440 Q200 456 90 440 L90 262 L80 252 L60 410 L18 398 L38 222 Q48 142 68 112 Z") +
          fillp("M132 88 Q126 28 200 20 Q274 28 268 88 Q242 124 200 128 Q158 124 132 88 Z", shade(hex, light ? -0.05 : 0.06)) +
          fillp("M160 88 Q164 50 200 46 Q236 50 240 88 Q220 110 200 112 Q180 110 160 88 Z", deep) +
          stroke("M186 114 L182 182", 3, light ? "#9a9a96" : "#e8e8e4") + stroke("M214 114 L218 182", 3, light ? "#9a9a96" : "#e8e8e4") +
          fillp("M128 332 L272 332 L296 412 L104 412 Z", shade(hex, light ? -0.04 : -0.12)) +
          fillp("M90 422 Q200 436 310 422 L310 440 Q200 456 90 440 Z", deep) +
          fillp("M340 410 L382 398 L386 422 L343 433 Z", deep) + fillp("M60 410 L18 398 L14 422 L57 433 Z", deep) +
          stroke("M90 262 L90 300", 2) + stroke("M310 262 L310 300", 2) +
          word(200, 262, 44);
        break;

      case "jacket":
        s = body("M134 88 L266 88 L332 112 Q352 142 362 222 L382 398 L340 410 L320 252 L310 262 L310 440 Q200 456 90 440 L90 262 L80 252 L60 410 L18 398 L38 222 Q48 142 68 112 Z") +
          fillp("M148 90 L150 56 Q200 46 250 56 L252 90 Q200 102 148 90 Z", deep) +
          stroke("M66 118 L26 396", 9, accent) + stroke("M334 118 L374 396", 9, accent) +
          stroke("M200 58 L200 446", 3, light ? "#777" : "#d6d6d2") +
          fillp("M90 422 Q200 436 310 422 L310 440 Q200 456 90 440 Z", deep) +
          fillp("M340 410 L382 398 L386 422 L343 433 Z", deep) + fillp("M60 410 L18 398 L14 422 L57 433 Z", deep) +
          stroke("M118 330 L150 300", 3, deep) + stroke("M282 330 L250 300", 3, deep) +
          word(258, 160, 20, ink, 1.5);
        break;

      case "jogger":
        s = body("M112 76 L288 76 Q306 222 286 440 L222 440 L205 182 Q200 172 195 182 L178 440 L114 440 Q94 222 112 76 Z") +
          fillp("M110 40 L290 40 L290 78 L110 78 Z", deep) +
          stroke("M190 78 L186 118", 3, light ? "#888" : "#e8e8e4") + stroke("M210 78 L214 118", 3, light ? "#888" : "#e8e8e4") +
          stroke("M126 92 Q144 140 120 176", 2) + stroke("M274 92 Q256 140 280 176", 2) +
          fillp("M114 440 L178 440 L177 466 L116 466 Z", deep) + fillp("M222 440 L286 440 L284 466 L223 466 Z", deep) +
          word(146, 232, 18, ink, 1.5);
        break;

      case "short":
        s = body("M104 122 L296 122 L322 332 L216 346 L200 232 L184 346 L78 332 Z") +
          fillp("M102 88 L298 88 L298 124 L102 124 Z", deep) +
          stroke("M190 124 L186 160", 3, light ? "#888" : "#e8e8e4") + stroke("M210 124 L214 160", 3, light ? "#888" : "#e8e8e4") +
          stroke("M82 316 L184 330", 2) + stroke("M318 316 L216 330", 2) +
          stroke("M116 140 Q132 180 106 214", 2) +
          word(140, 296, 20, ink, 1.5);
        break;

      case "legging":
        s = body("M122 96 L278 96 Q292 252 262 462 L214 462 L203 212 Q200 202 197 212 L186 462 L138 462 Q108 252 122 96 Z") +
          fillp("M124 34 L276 34 L279 98 L121 98 Z", deep) +
          stroke("M128 120 Q132 290 150 456", 2) + stroke("M272 120 Q268 290 250 456", 2) +
          word(200, 76, 22, ink, 3);
        break;

      case "bra":
        s = '<g transform="translate(-60 6) scale(1.3)">' +
          body("M108 152 Q112 98 148 70 L170 70 Q176 150 200 162 Q224 150 230 70 L252 70 Q288 98 292 152 Q300 200 290 240 L110 240 Q100 200 108 152 Z") +
          stroke("M122 206 Q160 178 198 204", 2) + stroke("M278 206 Q240 178 202 204", 2) +
          stroke("M172 74 Q178 150 200 160 Q222 150 228 74", 3, deep) +
          fillp("M108 236 L292 236 L290 284 L110 284 Z", deep) +
          word(200, 270, 26, ink, 4) + "</g>";
        break;

      case "cap":
        s = body("M98 300 Q96 142 200 128 Q304 142 302 300 Z") +
          stroke("M200 130 L200 298", 2) + stroke("M150 140 Q130 220 136 298", 2) + stroke("M250 140 Q270 220 264 298", 2) +
          '<circle cx="200" cy="130" r="9" fill="' + deep + '" stroke="' + line + '" stroke-width="2"/>' +
          fillp("M86 296 Q200 274 314 296 Q338 336 306 362 Q200 334 94 362 Q62 336 86 296 Z", deep) +
          word(200, 252, 46);
        break;

      case "bag":
        s = stroke("M146 214 Q146 112 200 112 Q254 112 254 214", 16, deep) +
          body("M130 196 L270 196 Q350 196 350 288 Q350 384 270 384 L130 384 Q50 384 50 288 Q50 196 130 196 Z") +
          fillp("M86 214 Q50 240 50 288 Q50 338 86 364 Q104 288 86 214 Z", deep) +
          fillp("M314 214 Q350 240 350 288 Q350 338 314 364 Q296 288 314 214 Z", deep) +
          stroke("M110 222 Q200 206 290 222", 3, light ? "#888" : "#d6d6d2") +
          word(200, 312, 50);
        break;

      default: // tee
        s = body("M138 70 Q200 104 262 70 L332 96 L376 166 L326 196 L306 172 L306 432 Q200 448 94 432 L94 172 L74 196 L24 166 L68 96 Z") +
          fillp("M150 74 Q200 120 250 74 Q200 92 150 74 Z", deep) +
          stroke("M118 82 Q100 132 94 172", 2) + stroke("M282 82 Q300 132 306 172", 2) +
          stroke("M96 418 Q200 432 304 418", 2) +
          word(200, 228, 46);
    }

    return '<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (opts.label || "Illustration") + '">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient></defs>' +
      '<ellipse cx="200" cy="482" rx="150" ry="11" fill="#000" opacity=".10"/>' + s + "</svg>";
  }

  window.KongGarment = { svg: garmentSVG, lum: lum };
})();
