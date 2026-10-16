import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const BG = '#E8E8EA', W = 1600, H = 900, PW = 6.4, PH = 3.6;
const lerp = (a, b, t) => a + (b - a) * t;
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

function poly(c, pts, fill) { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.closePath(); c.fillStyle = fill; c.fill(); }
function ell(c, x, y, rx, ry, fill) { c.beginPath(); c.ellipse(x, y, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI * 2); c.fillStyle = fill; c.fill(); }
function line(c, x1, y1, x2, y2, w, col) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineWidth = w; c.strokeStyle = col; c.lineCap = 'round'; c.stroke(); }
function rect(c, x, y, w, h, fill) { c.fillStyle = fill; c.fillRect(x, y, w, h); }

// The recurring character: dark brown wavy hair to mid-back, glasses, green eyes, earth tones.
function person(c, x, fy, s, k, o) {
  const P = (lx, ly) => [x + s * lx * k, fy + ly * k];
  const L = (a, b, w, col) => { const p = P(a[0], a[1]), q = P(b[0], b[1]); line(c, p[0], p[1], q[0], q[1], w * k, col); };
  const bz = (a, b, d) => { const A = P(a[0], a[1]), B = P(b[0], b[1]), D = P(d[0], d[1]); c.bezierCurveTo(A[0], A[1], B[0], B[1], D[0], D[1]); };
  const skin = '#f3dfd2', hair = '#3a271d', pants = '#26262b', shoe = '#1d1d21';
  const sleeve = o.coat || o.top, up = o.lookUp ? 6 : 0;
  if (o.pose === 'walk') {
    L([-6, -262], [-38, -6], 28, pants); L([6, -262], [42, -6], 28, pants);
    let a = P(-36, 0), b = P(52, 0); ell(c, a[0], a[1], 20 * k, 9 * k, shoe); ell(c, b[0], b[1], 20 * k, 9 * k, shoe);
    L([-16, -420], [-40, -340], 22, sleeve); L([-40, -340], [-54, -272], 20, sleeve);
    a = P(-55, -266); ell(c, a[0], a[1], 9 * k, 9 * k, skin);
  } else {
    L([-12, -262], [-14, -6], 28, pants); L([12, -262], [16, -6], 28, pants);
    let a = P(-6, 0), b = P(26, 0); ell(c, a[0], a[1], 20 * k, 9 * k, shoe); ell(c, b[0], b[1], 20 * k, 9 * k, shoe);
    L([-18, -420], [16, -345], 22, sleeve); L([16, -345], [96, -312], 20, sleeve);
    a = P(100, -312); ell(c, a[0], a[1], 9 * k, 9 * k, skin);
  }
  if (o.backpack) {
    poly(c, [P(-30, -440), P(-84, -430), P(-92, -260), P(-34, -250)], '#2f8088');
    poly(c, [P(-84, -430), P(-64, -452), P(-40, -446), P(-30, -440)], '#43a0a6');
    poly(c, [P(-90, -340), P(-102, -336), P(-100, -276), P(-88, -272)], '#22646b');
    rect(c, Math.min(P(-80, 0)[0], P(-44, 0)[0]), P(0, -320)[1], 36 * k, 4 * k, '#a49f98');
    ell(c, P(-62, -246)[0], P(-62, -246)[1], 30 * k, 12 * k, '#a8905f');
  }
  if (o.coat) {
    poly(c, [P(-40, -432), P(36, -432), P(50, -190), P(-48, -190)], o.coat);
    poly(c, [P(6, -430), P(20, -430), P(28, -200), P(12, -200)], o.top);
  } else poly(c, [P(-36, -432), P(34, -432), P(30, -256), P(-32, -256)], o.top);
  poly(c, [P(-7, -458), P(9, -458), P(9, -428), P(-7, -428)], skin);
  c.beginPath(); let p = P(-30, -505); c.moveTo(p[0], p[1]);
  bz([-50, -470], [-48, -430], [-56, -395]); bz([-64, -365], [-50, -340], [-54, -318]);
  bz([-36, -310], [-28, -330], [-26, -360]); bz([-22, -400], [-14, -440], [-6, -470]);
  c.closePath(); c.fillStyle = hair; c.fill();
  const hc = P(4, -492); ell(c, hc[0], hc[1], 30 * k, 36 * k, skin);
  c.beginPath(); p = P(34, -506 - up); c.moveTo(p[0], p[1]);
  bz([28, -538], [-12, -542], [-32, -512]); bz([-40, -490], [-36, -470], [-28, -456]);
  bz([-14, -470], [-8, -492], [2, -506]); bz([12, -512], [24, -510], [34, -506 - up]);
  c.fillStyle = hair; c.fill();
  const gy = -494 - up; const g1 = P(14, gy), g2 = P(34, gy);
  c.strokeStyle = '#22232a'; c.lineWidth = 3 * k; c.strokeRect(Math.min(g1[0], g2[0]), g1[1] - 8 * k, 20 * k, 14 * k);
  L([-4, gy], [14, gy], 3, '#22232a');
  const e = P(25, gy + 1); ell(c, e[0], e[1], 3 * k, 3 * k, '#4e7d50');
  if (o.pose === 'walk') {
    if (o.backpack) { L([-26, -430], [-6, -330], 6, '#22646b'); L([16, -430], [14, -330], 6, '#22646b'); }
    else { L([-14, -428], [-46, -300], 4, '#4f5840'); poly(c, [P(-72, -312), P(-26, -312), P(-22, -232), P(-76, -232)], '#6b7550'); }
    L([18, -420], [34, -338], 22, sleeve); L([34, -338], [64, -280], 20, sleeve);
    const a = P(66, -274); ell(c, a[0], a[1], 9 * k, 9 * k, skin);
  } else {
    if (!o.noRArm) { poly(c, [P(70, -332), P(152, -332), P(158, -292), P(64, -292)], o.held);
    poly(c, [P(70, -332), P(152, -332), P(153, -322), P(69, -322)], 'rgba(255,255,255,0.22)'); }
    L([24, -420], [50, -345], 22, sleeve);
    if (!o.noRArm) { L([50, -345], [120, -306], 20, sleeve); const a = P(124, -306); ell(c, a[0], a[1], 9 * k, 9 * k, skin); }
  }
}

function drawSmoothie(c) {
  rect(c, 0, 0, W, H, BG);
  ell(c, 800, 846, 640, 56, '#dcd6cd');
  rect(c, 330, 170, 940, 440, '#efe6d2');
  for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) rect(c, 336 + i * 93, 176 + j * 72, 88, 66, (i + j) % 2 ? '#eadcc0' : '#f3ead8');
  [[380, 196], [650, 186], [920, 196]].forEach(([x, y], b) => {
    rect(c, x, y, 230, 150, '#4f5a3c'); rect(c, x + 8, y + 8, 214, 134, '#5f6b48');
    for (let k = 0; k < 4; k++) { rect(c, x + 24, y + 34 + k * 26, 100 + (k * 37 + b * 19) % 60, 6, '#e3d8c3'); rect(c, x + 178, y + 34 + k * 26, 26, 6, '#e8b54a'); }
    ell(c, x + 30, y + 20, 7, 7, ['#d9384a', '#f0973a', '#8fb04a'][b]); ell(c, x + 46, y + 20, 7, 7, ['#f2c14e', '#d4487a', '#f2c14e'][b]);
  });
  rect(c, 360, 420, 880, 10, '#a3754d');
  [[420, '#f0973a'], [520, '#d9384a'], [1120, '#f2c14e'], [1200, '#8fb04a']].forEach(([x, col]) => { ell(c, x, 408, 30, 14, col); ell(c, x - 10, 400, 12, 12, col); ell(c, x + 12, 398, 12, 12, col); poly(c, [[x - 40, 410], [x + 40, 410], [x + 30, 420], [x - 30, 420]], '#c9b48e'); });
  person(c, 640, 830, 1, 0.85, { pose: 'fold', top: '#e3d8c3', coat: '#6b7550', held: '#e89aae' });
  poly(c, [[696, 516], [780, 516], [770, 604], [706, 604]], '#f4efe6'); rect(c, 700, 548, 76, 22, '#e89aae');
  rect(c, 692, 506, 92, 12, '#e3d8c3'); line(c, 750, 506, 772, 446, 5, '#9184d9');
  ell(c, 748, 574, 9, 9, '#f3dfd2');
  poly(c, [[340, 604], [1260, 604], [1278, 636], [322, 636]], '#e3d3b4');
  rect(c, 330, 636, 940, 204, '#a3754d'); rect(c, 330, 636, 940, 14, '#8a5d3c');
  for (let k = 0; k < 12; k++) rect(c, 330 + k * 80, 650, 3, 190, '#8f6443');
  rect(c, 330, 720, 940, 26, '#6b7550');
  rect(c, 872, 548, 84, 58, '#3f424d'); ell(c, 914, 578, 10, 10, '#9184d9');
  poly(c, [[860, 372], [968, 372], [952, 548], [876, 548]], 'rgba(214,226,236,0.6)');
  poly(c, [[868, 440], [961, 440], [952, 548], [876, 548]], '#e46f8f');
  poly(c, [[868, 440], [961, 440], [958, 470], [871, 470]], '#ef93ab');
  poly(c, [[878, 380], [892, 380], [886, 540], [880, 540]], 'rgba(255,255,255,0.4)');
  rect(c, 854, 356, 120, 18, '#3f424d'); rect(c, 900, 340, 28, 18, '#3f424d');
  for (let i = 0; i < 4; i++) { const x = 1080 + i * 3, y = 604 - i * 16; poly(c, [[x, y - 18], [x + 54, y - 18], [x + 48, y], [x + 6, y]], i % 2 ? '#f4efe6' : '#ebe4d6'); }
  [[1000, '#f2c14e'], [1030, '#f0973a'], [1170, '#d9384a'], [1196, '#8fb04a']].forEach(([x, col]) => ell(c, x, 592, 16, 13, col));
  c.beginPath(); c.arc(1240, 596, 26, Math.PI * 1.1, Math.PI * 1.9); c.lineWidth = 12; c.strokeStyle = '#f2d98a'; c.stroke();
}

function drawAppraiser(c) {
  rect(c, 0, 0, W, H, BG);
  const rnd = mulberry(91);
  ell(c, 800, 846, 660, 56, '#ddd5c6');
  rect(c, 300, 150, 1000, 470, '#efe4cf');
  const wx = 370, wy = 196, ww = 450, wh = 300;
  rect(c, wx - 14, wy - 14, ww + 28, wh + 28, '#f8f3e8');
  const sky = c.createLinearGradient(0, wy, 0, wy + wh); sky.addColorStop(0, '#a5c8de'); sky.addColorStop(1, '#f2dfb6'); rect(c, wx, wy, ww, wh, sky);
  ell(c, wx + 350, wy + 70, 36, 36, '#f6d98a');
  poly(c, [[wx, wy + 200], [wx + 120, wy + 150], [wx + 260, wy + 190], [wx + 380, wy + 140], [wx + ww, wy + 170], [wx + ww, wy + wh], [wx, wy + wh]], '#e0bf78');
  poly(c, [[wx, wy + 240], [wx + 160, wy + 200], [wx + 300, wy + 236], [wx + ww, wy + 210], [wx + ww, wy + wh], [wx, wy + wh]], '#cfa55a');
  poly(c, [[wx, wy + 272], [wx + 200, wy + 252], [wx + ww, wy + 266], [wx + ww, wy + wh], [wx, wy + wh]], '#b88f44');
  ell(c, wx + 300, wy + 200, 40, 26, '#5f7a4a'); ell(c, wx + 330, wy + 194, 30, 22, '#6f8a56'); rect(c, wx + 306, wy + 214, 8, 26, '#5a4033');
  line(c, wx + 100, wy + wh, wx + 112, wy + 70, 7, '#7a6248');
  for (let i = 0; i < 8; i++) { const a = -Math.PI + i * (Math.PI / 7), tx = wx + 112, ty = wy + 70; poly(c, [[tx, ty], [tx + Math.cos(a) * 70, ty + Math.sin(a) * 30 + 26], [tx + Math.cos(a + 0.18) * 60, ty + Math.sin(a + 0.18) * 26 + 16]], i % 2 ? '#3f7a3a' : '#4f8f44'); }
  rect(c, wx + ww / 2 - 5, wy, 10, wh, '#f8f3e8'); rect(c, wx, wy + wh / 2 - 5, ww, 10, '#f8f3e8');
  rect(c, wx - 26, wy + wh + 14, ww + 52, 14, '#d9c8a8');
  rect(c, 1060, 210, 170, 120, '#a3754d'); rect(c, 1070, 220, 150, 100, '#f4f2ec');
  poly(c, [[1090, 300], [1120, 260], [1145, 284], [1170, 248], [1200, 300]], '#c9b48e'); ell(c, 1186, 244, 9, 9, '#e8b54a');
  rect(c, 560, 600, 540, 20, '#a3754d'); rect(c, 560, 620, 540, 10, '#7a5238');
  rect(c, 576, 630, 16, 210, '#7a5238'); rect(c, 1068, 630, 16, 210, '#7a5238');
  rect(c, 820, 430, 210, 144, '#3f424d'); rect(c, 830, 440, 190, 124, '#eef2ea');
  rect(c, 830, 440, 190, 16, '#6b8f5a');
  for (let i = 0; i <= 6; i++) rect(c, 830, 464 + i * 14, 190, 1.5, '#c3cbc0');
  for (let j = 1; j < 4; j++) rect(c, 830 + j * 48, 456, 1.5, 108, '#c3cbc0');
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) if (i < 5 || j < 2) rect(c, 836 + j * 48, 468 + i * 14, 18 + ((i * 7 + j * 13) % 20), 5, '#7d867a');
  rect(c, 906, 562, 14, 32, '#6b6d73'); rect(c, 884, 592, 60, 8, '#6b6d73');
  poly(c, [[840, 596], [960, 596], [966, 602], [834, 602]], '#d6d6da');
  rect(c, 940, 640, 74, 160, '#d8d4c8'); rect(c, 948, 652, 58, 120, '#5f8a52');
  for (let i = 0; i < 5; i++) rect(c, 956, 664 + i * 20, 30 + (i % 2) * 10, 6, '#c9b06a');
  rect(c, 944, 780, 66, 10, '#bdb8ab');
  c.beginPath(); c.moveTo(1000, 660); c.bezierCurveTo(1060, 640, 1040, 600, 1000, 594); c.lineWidth = 4; c.strokeStyle = '#3f424d'; c.stroke();
  c.beginPath(); c.moveTo(960, 650); c.bezierCurveTo(930, 620, 920, 610, 912, 598); c.lineWidth = 4; c.strokeStyle = '#9184d9'; c.stroke();
  const hx = 640, hy = 600;
  poly(c, [[hx - 50, hy], [hx + 50, hy], [hx + 50, hy - 56], [hx - 50, hy - 56]], '#f2ede4');
  poly(c, [[hx - 62, hy - 54], [hx, hy - 104], [hx + 62, hy - 54]], '#b8695a');
  rect(c, hx - 14, hy - 34, 24, 34, '#8d6a4b'); rect(c, hx + 20, hy - 44, 20, 16, '#a5c8de');
  line(c, hx - 50, hy + 12, hx + 50, hy + 12, 2, '#9184d9'); line(c, hx - 50, hy + 6, hx - 50, hy + 18, 2, '#9184d9'); line(c, hx + 50, hy + 6, hx + 50, hy + 18, 2, '#9184d9');
  line(c, hx + 66, hy, hx + 66, hy - 56, 2, '#9184d9'); line(c, hx + 60, hy, hx + 72, hy, 2, '#9184d9'); line(c, hx + 60, hy - 56, hx + 72, hy - 56, 2, '#9184d9');
  [[hx - 110, hy - 150, -0.2], [hx + 100, hy - 170, 0.25], [hx - 20, hy - 196, 0.05]].forEach(([x, y, a]) => { c.save(); c.translate(x, y); c.rotate(a); poly(c, [[-26, -14], [18, -14], [32, 0], [18, 14], [-26, 14]], '#e3c98a'); ell(c, 16, 0, 4, 4, '#efe4cf'); rect(c, -18, -4, 26, 3, '#a8905f'); c.restore(); });
  for (let i = 0; i < 3; i++) poly(c, [[720 + i * 6, 596 - i * 8], [800 + i * 6, 596 - i * 8], [796 + i * 6, 588 - i * 8], [716 + i * 6, 588 - i * 8]], i % 2 ? '#d9bf7f' : '#e3c98a');
  person(c, 1170, 830, -1, 0.85, { pose: 'fold', top: '#e3d8c3', coat: '#8a7a64', held: '#f4f2ec' });
  ell(c, 520, 840, 240, 22, '#c98f86'); ell(c, 520, 840, 200, 16, '#d6a79e');
  const dg = '#d9a250', dd = '#b98238', dl = '#ecc27a';
  rect(c, 404, 736, 28, 100, dd); rect(c, 590, 736, 28, 100, dd);
  ell(c, 418, 836, 18, 8, dd); ell(c, 604, 836, 18, 8, dd);
  ell(c, 500, 716, 128, 54, dg);
  ell(c, 490, 752, 96, 20, dl);
  rect(c, 444, 740, 30, 98, dg); rect(c, 622, 740, 30, 98, dg);
  ell(c, 459, 838, 19, 8, dl); ell(c, 637, 838, 19, 8, dl);
  ell(c, 616, 712, 52, 60, dl);
  poly(c, [[600, 676], [652, 610], [700, 640], [660, 720]], dg);
  ell(c, 676, 630, 50, 44, dg);
  ell(c, 722, 650, 36, 22, dl);
  ell(c, 752, 644, 11, 9, '#2a2220');
  line(c, 712, 670, 744, 662, 3, '#8a5d3c');
  ell(c, 730, 682, 9, 13, '#d9677a');
  ell(c, 688, 616, 6, 6, '#2a2220'); ell(c, 690, 614, 2, 2, '#f4f2ec');
  poly(c, [[640, 600], [668, 596], [664, 676], [632, 666]], dd);
  poly(c, [[618, 660], [662, 636], [672, 648], [626, 676]], '#2f8088');
  ell(c, 640, 676, 6, 7, '#e8b54a');
  for (let i = 0; i < 8; i++) poly(c, [[400 + i * 24, 760], [412 + i * 24, 772], [424 + i * 24, 760]], dl);
}

function drawElearning(c) {
  rect(c, 0, 0, W, H, BG);
  ell(c, 800, 846, 660, 56, '#d8d6de');
  rect(c, 330, 170, 620, 390, '#2b2d33'); rect(c, 340, 180, 600, 370, '#f4f3f7');
  rect(c, 340, 180, 600, 30, '#5d5294'); rect(c, 352, 188, 40, 14, '#e7e5fe'); rect(c, 820, 190, 100, 10, '#9184d9');
  rect(c, 340, 210, 130, 340, '#e7e5fe');
  for (let i = 0; i < 6; i++) { ell(c, 362, 236 + i * 40, 7, 7, i < 3 ? '#9184d9' : '#c3c4cc'); rect(c, 378, 232 + i * 40, 70 - (i * 13) % 30, 8, i === 3 ? '#5d5294' : '#a49fbf'); }
  rect(c, 340, 352, 130, 34, 'rgba(145,132,217,0.25)');
  rect(c, 490, 226, 430, 200, '#3a4150');
  poly(c, [[690, 290], [690, 362], [750, 326]], '#e7e5fe');
  rect(c, 490, 410, 430, 16, 'rgba(0,0,0,0.3)'); rect(c, 498, 416, 414, 4, '#6b6d73'); rect(c, 498, 416, 250, 4, '#9184d9'); ell(c, 748, 418, 6, 6, '#e7e5fe');
  [['#c9a24f', 1], ['#7d8b6a', 1], ['#c98f86', 0]].forEach(([col, done], i) => { const x = 490 + i * 146; rect(c, x, 440, 136, 96, '#ffffff'); rect(c, x, 440, 136, 52, col); rect(c, x + 10, 502, 90, 6, '#a49fbf'); rect(c, x + 10, 516, 60, 6, '#d5d6dc'); if (done) { ell(c, x + 118, 516, 10, 10, '#9184d9'); line(c, x + 113, 516, x + 117, 520, 3, '#f4f3f7'); line(c, x + 117, 520, x + 124, 511, 3, '#f4f3f7'); } });
  rect(c, 630, 560, 20, 60, '#4a4c52'); rect(c, 580, 616, 120, 10, '#4a4c52');
  rect(c, 990, 170, 340, 330, '#a3754d'); rect(c, 1002, 182, 316, 306, '#e9dcc0');
  const notes = ['#f6d98a', '#b9b1ec', '#9fd3c7', '#f2b8c6'];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const x = 1020 + i * 74, y = 200 + j * 92; poly(c, [[x, y], [x + 58, y + 2], [x + 56, y + 60], [x - 2, y + 58]], notes[(i + j * 3) % 4]); for (let k = 0; k < 3; k++) rect(c, x + 8, y + 14 + k * 12, 36 - k * 8, 3, 'rgba(60,62,76,0.4)'); ell(c, x + 29, y + 3, 4, 4, '#c8392f'); }
  line(c, 1078, 230, 1094, 230, 2, '#5d5294'); line(c, 1152, 322, 1168, 322, 2, '#5d5294'); line(c, 1226, 230, 1242, 322, 2, '#5d5294');
  rect(c, 420, 650, 640, 18, '#4a4c52'); rect(c, 440, 668, 14, 172, '#3f424d'); rect(c, 1026, 668, 14, 172, '#3f424d');
  poly(c, [[560, 648], [720, 648], [712, 642], [568, 642]], '#9a9ca3'); poly(c, [[574, 642], [706, 642], [716, 560], [584, 560]], '#2b2d33'); poly(c, [[582, 636], [700, 636], [708, 568], [590, 568]], '#e7e5fe');
  for (let i = 0; i < 4; i++) rect(c, 600, 580 + i * 12, 40 + (i * 23) % 50, 5, '#9184d9');
  c.beginPath(); c.arc(820, 610, 34, Math.PI, 0); c.lineWidth = 7; c.strokeStyle = '#3f424d'; c.stroke();
  ell(c, 786, 624, 12, 18, '#3f424d'); ell(c, 854, 624, 12, 18, '#3f424d'); line(c, 786, 632, 812, 646, 3, '#3f424d'); ell(c, 814, 646, 5, 5, '#9184d9');
  rect(c, 900, 610, 28, 38, '#e8e2d8'); rect(c, 900, 610, 28, 6, '#5a4033');
  rect(c, 470, 606, 36, 42, '#8d6a4b'); for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.4; poly(c, [[488, 606], [488 + Math.cos(a - 0.15) * 40, 606 + Math.sin(a - 0.15) * 50], [488 + Math.cos(a) * 54, 606 + Math.sin(a) * 64], [488 + Math.cos(a + 0.15) * 40, 606 + Math.sin(a + 0.15) * 50]], i % 2 ? '#6b7550' : '#7d8b6a'); }
  person(c, 1170, 830, -1, 0.85, { pose: 'fold', top: '#26262b', coat: '#a49f98', held: '#3d4a6b' });
  ell(c, 450, 840, 220, 14, 'rgba(60,62,76,0.12)');
  const pg = '#d9823a', pd = '#b8692c', pl = '#eaa25e';
  rect(c, 312, 800, 14, 38, pd); rect(c, 346, 802, 14, 36, pg);
  ell(c, 336, 792, 50, 26, pg);
  for (let i = 0; i < 9; i++) ell(c, 296 + i * 10, 772 + (i % 2) * 4, 9, 9, i % 2 ? pl : pg);
  rect(c, 372, 812, 14, 26, pd); rect(c, 398, 814, 14, 24, pg);
  ell(c, 378, 838, 16, 6, pd); ell(c, 408, 838, 16, 6, pg);
  ell(c, 400, 794, 30, 24, pl);
  ell(c, 420, 772, 28, 25, pg);
  for (let i = 0; i < 6; i++) ell(c, 404 + i * 7, 752 + (i % 2) * 3, 8, 8, pl);
  ell(c, 446, 784, 16, 11, pl); ell(c, 460, 780, 6, 5, '#2a2220');
  ell(c, 450, 796, 6, 8, '#d9677a');
  ell(c, 428, 766, 4, 4, '#2a2220');
  poly(c, [[402, 760], [418, 758], [414, 806], [396, 800]], pd);
  const bs = '#f3dfd2';
  ell(c, 612, 806, 22, 18, '#f4f2ec');
  line(c, 616, 816, 650, 834, 13, bs); ell(c, 654, 836, 9, 6, bs);
  line(c, 600, 818, 618, 836, 13, bs);
  ell(c, 570, 798, 42, 22, '#9fd3c7');
  line(c, 546, 806, 526, 834, 11, '#9fd3c7'); ell(c, 524, 836, 8, 6, bs);
  line(c, 544, 796, 500, 818, 11, '#9fd3c7'); ell(c, 496, 820, 8, 7, bs);
  ell(c, 520, 778, 26, 26, bs);
  ell(c, 526, 762, 26, 15, '#ecd38a'); ell(c, 540, 772, 12, 16, '#ecd38a');
  for (let i = 0; i < 5; i++) ell(c, 508 + i * 9, 754 + (i % 2) * 3, 6, 6, '#f2df9e');
  ell(c, 508, 780, 3, 3, '#3a271d'); c.beginPath(); c.arc(508, 790, 7, 0.2, Math.PI - 0.6); c.lineWidth = 2; c.strokeStyle = '#b8695a'; c.stroke();
  ell(c, 514, 788, 5, 3, 'rgba(217,103,122,0.35)');
}

function drawSpeaker(c) {
  rect(c, 0, 0, W, H, BG);
  const rnd = mulberry(111);
  ell(c, 800, 846, 680, 52, '#d6d4dc');
  rect(c, 300, 140, 1000, 520, '#2a7c82');
  rect(c, 300, 140, 1000, 26, '#3a929a');
  rect(c, 720, 190, 520, 300, '#4a4c52'); rect(c, 728, 198, 504, 284, '#f4f3f7');
  rect(c, 728, 198, 504, 8, '#9184d9');
  const rr = (x, y, w, h, r, f) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = f; c.fill(); };
  c.beginPath(); c.ellipse(845, 300, 82, 46, 0, Math.PI, 0); c.lineWidth = 9; c.strokeStyle = '#2b2d33'; c.stroke();
  rr(772, 282, 146, 70, 20, '#3f424d'); rr(780, 288, 130, 54, 15, '#5a5d6b');
  rr(788, 296, 114, 30, 10, '#2b2d33'); rect(c, 796, 302, 44, 4, '#b9b1ec'); rect(c, 852, 302, 30, 4, '#9184d9');
  poly(c, [[828, 352], [862, 352], [852, 340], [838, 340]], '#2b2d33');
  rect(c, 960, 256, 230, 14, '#3f424d'); rect(c, 960, 286, 180, 8, '#a49fbf'); rect(c, 960, 304, 200, 8, '#a49fbf'); rect(c, 960, 322, 140, 8, '#a49fbf');
  rect(c, 960, 360, 52, 70, '#c9a24f'); rect(c, 1024, 380, 52, 50, '#7d8b6a'); rect(c, 1088, 340, 52, 90, '#9184d9');
  poly(c, [[540, 166], [600, 166], [800, 640], [340, 640]], 'rgba(246,226,184,0.22)');
  poly(c, [[556, 166], [584, 166], [700, 640], [440, 640]], 'rgba(246,226,184,0.18)');
  rect(c, 548, 150, 44, 20, '#6b6d73');
  rect(c, 300, 640, 1000, 26, '#5a4a3e'); rect(c, 300, 666, 1000, 30, '#3f3630');
  ell(c, 570, 646, 150, 14, 'rgba(246,226,184,0.45)');
  person(c, 560, 646, 1, 0.82, { pose: 'fold', top: '#26262b', coat: '#6b7550', held: '#2b2d33' });
  line(c, 690, 646, 690, 530, 4, '#2b2d33'); line(c, 690, 530, 672, 500, 4, '#2b2d33'); ell(c, 668, 494, 9, 12, '#2b2d33');
  line(c, 672, 646, 708, 646, 4, '#2b2d33');
  const cols = ['#3f424d', '#4a4c52', '#555866', '#3a3d48'];
  for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) {
    const x = 330 + i * 118 + row * 58 + (rnd() - 0.5) * 16, y = 760 + row * 60, col = cols[(i + row) % 4];
    poly(c, [[x - 46, y + 60], [x - 38, y + 18], [x, y + 8], [x + 38, y + 18], [x + 46, y + 60]], col);
    ell(c, x, y - 12, 22, 25, col);
  }
}


function drawRetail(c) {
  rect(c, 0, 0, W, H, BG);
  ell(c, 820, 846, 660, 64, '#dcd6cd');
  const wx = 520, wy = 120, ww = 820, wh = 480;
  rect(c, wx - 14, wy - 14, ww + 28, wh + 28, '#a7a9b0');
  const sky = c.createLinearGradient(0, wy, 0, wy + wh); sky.addColorStop(0, '#c9d6e1'); sky.addColorStop(1, '#dfe6ec');
  rect(c, wx, wy, ww, wh, sky);
  [[40, 260, 120], [180, 180, 90], [290, 300, 150], [460, 220, 110], [590, 280, 130], [740, 200, 80]].forEach(([x, h, w], i) => {
    rect(c, wx + x, wy + wh - h, w, h, i % 2 ? '#b9c3cc' : '#aeb8c2');
    for (let r = 0; r < Math.floor(h / 46); r++) for (let k = 0; k < Math.floor(w / 34); k++) rect(c, wx + x + 12 + k * 34, wy + wh - h + 16 + r * 46, 14, 20, '#d3dbe2');
  });
  poly(c, [[wx + 60, wy], [wx + 200, wy], [wx + 40, wy + wh], [wx - 100 > wx ? wx : wx, wy + wh]], 'rgba(255,255,255,0.28)');
  poly(c, [[wx + 470, wy], [wx + 540, wy], [wx + 380, wy + wh], [wx + 310, wy + wh]], 'rgba(255,255,255,0.22)');
  rect(c, wx + ww / 3 - 7, wy, 14, wh, '#a7a9b0'); rect(c, wx + ww * 2 / 3 - 7, wy, 14, wh, '#a7a9b0');
  rect(c, wx - 30, wy + wh + 10, ww + 60, 18, '#9a9ca3');
  poly(c, [[wx - 40, wy - 20], [wx + ww + 40, wy - 20], [wx + ww + 70, wy - 70], [wx - 70, wy - 70]], '#6b7550');
  for (let i = 0; i < 12; i++) poly(c, [[wx - 40 + i * 77.5, wy - 20], [wx - 1.25 + i * 77.5, wy - 20], [wx + 18 + i * 77.5, wy - 2], [wx - 21 + i * 77.5, wy - 2]], i % 2 ? '#6b7550' : '#e0d6c4');
  line(c, 690, 420, 1110, 420, 8, '#8f9096'); line(c, 700, 420, 700, 830, 7, '#8f9096'); line(c, 1100, 420, 1100, 830, 7, '#8f9096');
  const gc = ['#c9b79c', '#7d8b6a', '#b8695a', '#5f6f80', '#e0d6c4', '#3b3b40', '#a9876a', '#9aa58a', '#c98f86'];
  for (let i = 0; i < 9; i++) { const x = 716 + i * 42, len = 190 + (i % 3) * 24; line(c, x + 18, 420, x + 18, 434, 3, '#7a7b80'); poly(c, [[x + 2, 436], [x + 36, 436], [x + 42, 436 + len], [x - 4, 436 + len]], gc[i]); }
  rect(c, 560, 630, 460, 22, '#b08a64'); rect(c, 560, 652, 460, 16, '#8d6a4b'); rect(c, 578, 668, 16, 170, '#7a5b40'); rect(c, 986, 668, 16, 170, '#7a5b40');
  const stack = (x, w, cols) => cols.forEach((col, i) => { const y = 630 - (i + 1) * 20; rect(c, x, y, w, 20, col); rect(c, x, y, w, 4, 'rgba(255,255,255,0.2)'); });
  stack(640, 130, ['#7d8b6a', '#c9b79c', '#b8695a', '#e0d6c4']); stack(830, 140, ['#5f6f80', '#d9c7a8', '#6f5a4a']);
  const mx = 1250;
  ell(c, mx, 850, 60, 12, '#4a4a50'); line(c, mx, 720, mx, 846, 7, '#5a5a60');
  poly(c, [[mx - 36, 720], [mx + 36, 720], [mx + 30, 640], [mx - 30, 640]], '#d6d0c6');
  poly(c, [[mx - 50, 470], [mx + 50, 470], [mx + 30, 640], [mx - 30, 640]], '#e3ded5');
  line(c, mx + 50, 480, mx + 62, 600, 14, '#c98f86');
  poly(c, [[mx - 50, 470], [mx + 50, 470], [mx + 36, 600], [mx - 36, 600]], '#c98f86'); poly(c, [[mx - 2, 470], [mx + 4, 470], [mx + 4, 600], [mx - 2, 600]], '#b07a72');
  line(c, mx - 52, 480, mx - 66, 600, 16, '#c98f86');
  rect(c, mx - 8, 440, 16, 32, '#d6d0c6'); ell(c, mx, 410, 30, 36, '#e3ded5');
  ell(c, mx + 4, 384, 66, 13, '#222329');
  poly(c, [[mx - 30, 386], [mx + 36, 386], [mx + 28, 346], [mx - 4, 338], [mx - 24, 348]], '#2c2d33');
  poly(c, [[mx - 29, 380], [mx + 35, 380], [mx + 34, 370], [mx - 28, 370]], '#4a4b52');
  poly(c, [[mx - 4, 338], [mx + 28, 346], [mx + 30, 360], [mx + 2, 352]], 'rgba(255,255,255,0.14)');
  c.beginPath(); c.moveTo(mx - 26, 474); c.quadraticCurveTo(mx, 560, mx + 26, 474); c.lineWidth = 9; c.strokeStyle = '#d4ae4f'; c.stroke();
  poly(c, [[mx, 506], [mx + 14, 524], [mx, 544], [mx - 14, 524]], '#e8c766'); poly(c, [[mx, 506], [mx + 14, 524], [mx, 524]], '#f6e3a4');
  for (let i = 0; i <= 12; i++) { const t = i / 12, px = lerp(mx - 34, mx + 34, t), py = 476 + Math.sin(Math.PI * t) * 110; ell(c, px, py, 7, 7, '#f6f2ea'); }
  person(c, 450, 830, 1, 0.85, { pose: 'fold', top: '#6b7550', held: '#c9a24f' });
  const jx = 1070, jy = 712, jw = 430, jh = 132;
  rect(c, jx, jy + 66, jw, jh - 66, '#3f4a5a');
  rect(c, jx, jy, jw, 66, 'rgba(190,206,218,0.85)');
  poly(c, [[jx, jy], [jx + jw, jy], [jx + jw - 22, jy - 26], [jx + 22, jy - 26]], 'rgba(214,224,232,0.95)');
  for (let i = 0; i < 14; i++) { const gx = jx + 26 + i * 28, gy = jy + 30 + ((i * 37) % 26); ell(c, gx, gy, 6, 6, i % 2 ? '#d6b45e' : '#f4f6f8'); }
  c.strokeStyle = '#9aa4ab'; c.lineWidth = 3; c.strokeRect(jx, jy, jw, jh);
}

function drawTokyo(c) {
  rect(c, 0, 0, W, H, BG);
  const rnd = mulberry(7);
  poly(c, [[748, 524], [852, 524], [810, 270], [790, 270]], '#d9532f');
  rect(c, 764, 430, 72, 16, '#f1ece6'); rect(c, 776, 350, 48, 14, '#f1ece6');
  poly(c, [[770, 312], [830, 312], [826, 292], [774, 292]], '#f1ece6'); rect(c, 778, 296, 44, 10, '#6f7a86');
  for (let i = 0; i < 6; i++) rect(c, 794, 270 - (i + 1) * 26, 12, 26, i % 2 ? '#f1ece6' : '#d9532f');
  rect(c, 786, 228, 28, 12, '#f1ece6');
  poly(c, [[180, 862], [1420, 862], [905, 520], [695, 520]], '#cdc6bc');
  poly(c, [[620, 862], [980, 862], [828, 520], [772, 520]], '#d8d2c9');
  const LF = (u, v) => [lerp(180, 695, u), lerp(lerp(70, 150, u), lerp(862, 520, u), v)];
  const RF = (u, v) => [lerp(1420, 905, u), lerp(lerp(70, 150, u), lerp(862, 520, u), v)];
  const q = (F, u0, u1, v0, v1, col) => poly(c, [F(u0, v0), F(u1, v0), F(u1, v1), F(u0, v1)], col);
  q(LF, 0, 1, 0, 1, '#7a5f4c'); q(RF, 0, 1, 0, 1, '#a49f98');
  q(LF, 0, 1, 0.38, 0.43, '#5b4636');
  q(LF, 0.06, 0.34, 0.55, 0.9, '#f0d49b'); q(LF, 0.06, 0.34, 0.55, 0.63, '#3d4a6b');
  q(LF, 0.42, 0.6, 0.5, 0.75, '#3d4a6b'); q(LF, 0.42, 0.6, 0.75, 0.9, '#f3dcae');
  q(LF, 0.7, 0.88, 0.55, 0.88, '#e9c98a');
  q(LF, 0.1, 0.3, 0.08, 0.3, '#8d715c'); q(LF, 0.5, 0.66, 0.1, 0.3, '#8d715c');
  q(RF, 0, 1, 0.4, 0.44, '#5b4636'); q(RF, 0.08, 0.3, 0.52, 0.9, '#f2d9a6'); q(RF, 0.36, 0.5, 0.1, 0.36, '#b8493c');
  q(RF, 0.55, 0.75, 0.55, 0.86, '#3d4a6b'); q(RF, 0.8, 0.92, 0.6, 0.88, '#f0d49b'); q(RF, 0.12, 0.28, 0.1, 0.3, '#8e8a84');
  const chochin = (x, y, s) => { ell(c, x, y, 44 * s, 52 * s, 'rgba(243,217,160,0.55)'); ell(c, x, y, 26 * s, 34 * s, '#c8392f'); rect(c, x - 6 * s, y - 30 * s, 12 * s, 60 * s, '#dd5a45'); rect(c, x - 16 * s, y - 38 * s, 32 * s, 9 * s, '#1f1b1a'); rect(c, x - 16 * s, y + 30 * s, 32 * s, 9 * s, '#1f1b1a'); line(c, x, y - 52 * s, x, y - 38 * s, 3, '#1f1b1a'); };
  let p = LF(0.2, 0.47); chochin(p[0], p[1], 1.25); p = LF(0.65, 0.45); chochin(p[0], p[1], 0.85);
  p = RF(0.18, 0.46); chochin(p[0], p[1], 1.2); p = RF(0.66, 0.47); chochin(p[0], p[1], 0.8);
  line(c, 236, 360, 236, 600, 4, '#4a3a30'); rect(c, 240, 372, 40, 190, '#2f5d8a'); rect(c, 240, 372, 40, 16, '#f1ece6');
  line(c, 330, 410, 330, 600, 4, '#4a3a30'); rect(c, 334, 420, 34, 160, '#c8392f'); rect(c, 334, 420, 34, 14, '#f1ece6');
  const tx = 1250; rect(c, tx - 34, 800, 68, 42, '#9b9790'); rect(c, tx - 13, 724, 26, 78, '#a6a29b');
  rect(c, tx - 38, 672, 76, 54, '#b3aea6'); rect(c, tx - 20, 684, 40, 30, '#f3d9a0');
  poly(c, [[tx - 56, 674], [tx + 56, 674], [tx + 26, 640], [tx - 26, 640]], '#8d8982'); ell(c, tx, 632, 11, 11, '#8d8982');
  c.beginPath(); c.moveTo(230, 190); c.quadraticCurveTo(800, 330, 1370, 190); c.strokeStyle = '#4a3a30'; c.lineWidth = 2; c.stroke();
  for (let i = 1; i < 10; i++) {
    const t = i / 10, x = (1 - t) ** 2 * 230 + 2 * (1 - t) * t * 800 + t * t * 1370, y = (1 - t) ** 2 * 190 + 2 * (1 - t) * t * 330 + t * t * 190;
    const s = 1 - 0.45 * Math.sin(Math.PI * t);
    ell(c, x, y + 32 * s, 21 * s, 29 * s, i % 2 ? '#c4473a' : '#f1e3c8');
    rect(c, x - 10 * s, y + 2 * s, 20 * s, 6 * s, '#2c2622'); rect(c, x - 10 * s, y + 58 * s, 20 * s, 6 * s, '#2c2622');
  }
  line(c, 150, 90, 520, 172, 14, '#5a4033'); line(c, 380, 140, 470, 88, 8, '#5a4033'); line(c, 1450, 110, 1150, 182, 12, '#5a4033');
  const pinks = ['#f2b8c6', '#e89aae', '#f7d3dc', '#f4c4cf'];
  const blossom = (x1, y1, x2, y2, n) => { for (let i = 0; i < n; i++) { const t = rnd(); ell(c, lerp(x1, x2, t) + (rnd() - 0.5) * 90, lerp(y1, y2, t) + (rnd() - 0.5) * 80, 14 + rnd() * 20, 12 + rnd() * 16, pinks[i % 4]); } };
  blossom(150, 90, 520, 172, 80); blossom(380, 140, 470, 88, 26); blossom(1450, 110, 1150, 182, 70);
  const kx = 1090, ky = 836;
  ell(c, kx, ky + 4, 54, 8, 'rgba(60,62,76,0.25)');
  c.beginPath(); c.moveTo(kx + 30, ky - 6); c.quadraticCurveTo(kx + 78, ky - 10, kx + 66, ky - 70); c.lineWidth = 9; c.strokeStyle = '#1c1c20'; c.lineCap = 'round'; c.stroke();
  poly(c, [[kx - 34, ky], [kx + 36, ky], [kx + 26, ky - 52], [kx - 10, ky - 70], [kx - 30, ky - 40]], '#1c1c20');
  poly(c, [[kx - 10, ky - 70], [kx + 26, ky - 52], [kx + 8, ky - 40]], '#2a2a30');
  ell(c, kx - 26, ky - 84, 22, 20, '#1c1c20');
  poly(c, [[kx - 44, ky - 94], [kx - 40, ky - 118], [kx - 28, ky - 100]], '#1c1c20'); poly(c, [[kx - 22, ky - 102], [kx - 10, ky - 120], [kx - 8, ky - 94]], '#1c1c20');
  poly(c, [[kx - 40, ky - 112], [kx - 38, ky - 104], [kx - 32, ky - 101]], '#c98f86');
  ell(c, kx - 34, ky - 86, 3.5, 4, '#d8c24a'); ell(c, kx - 20, ky - 86, 3.5, 4, '#d8c24a');
  rect(c, kx - 30, ky - 12, 8, 12, '#1c1c20'); rect(c, kx - 14, ky - 12, 8, 12, '#1c1c20');
  person(c, 820, 830, -1, 0.85, { pose: 'walk', top: '#2a2a2e', coat: '#cdb99a', lookUp: true });
  for (let i = 0; i < 64; i++) { const x = 260 + rnd() * 1080, y = 200 + rnd() * 560, r = 6 + rnd() * 6, a = rnd() * 6.28; poly(c, [[x + Math.cos(a) * r, y + Math.sin(a) * r], [x + Math.cos(a + 2.2) * r, y + Math.sin(a + 2.2) * r], [x + Math.cos(a + 4.1) * r, y + Math.sin(a + 4.1) * r]], pinks[i % 4]); }
}

function drawNewYork(c) {
  rect(c, 0, 0, W, H, BG);
  ell(c, 820, 846, 680, 62, '#d8d8dc');
  const wx = 360, wy = 110, ww = 960, wh = 600;
  const sky = c.createLinearGradient(0, wy, 0, wy + wh); sky.addColorStop(0, '#b9c7d8'); sky.addColorStop(0.7, '#dfe3ea'); sky.addColorStop(1, '#efe3d6');
  rect(c, wx, wy, ww, wh, sky);
  const rnd = mulberry(41);
  const bld = (x, w, h, col, win) => { rect(c, wx + x, wy + wh - h, w, h, col); if (win) for (let r = 0; r < h / 22 - 1; r++) for (let k = 0; k < w / 16 - 1; k++) if (rnd() < 0.7) rect(c, wx + x + 6 + k * 16, wy + wh - h + 10 + r * 22, 6, 9, 'rgba(240,236,224,0.55)'); };
  for (let x = 0; x < ww; x += 50) bld(x, 46, 120 + rnd() * 120, '#a9b4c2', false);
  const fx = wx + 210, fb = wy + wh;
  poly(c, [[fx - 40, fb], [fx + 40, fb], [fx + 26, fb - 340], [fx - 26, fb - 340]], '#8e9aab');
  poly(c, [[fx - 26, fb - 340], [fx + 26, fb - 340], [fx + 16, fb - 400], [fx - 16, fb - 400]], '#8e9aab');
  poly(c, [[fx - 16, fb - 400], [fx + 16, fb - 400], [fx + 9, fb - 440], [fx - 9, fb - 440]], '#8e9aab');
  rect(c, fx - 3, fb - 500, 6, 60, '#8e9aab');
  const tx = wx + 720;
  poly(c, [[tx - 60, fb], [tx + 60, fb], [tx + 8, fb - 470], [tx - 8, fb - 470]], '#97a5b6');
  poly(c, [[tx - 60, fb], [tx, fb], [tx, fb - 470], [tx - 8, fb - 470]], '#a6b3c3');
  rect(c, tx - 2, fb - 540, 4, 70, '#97a5b6');
  [[40, 70, 260], [330, 90, 300], [450, 60, 220], [560, 80, 330], [820, 90, 280]].forEach(([x, w, h], i) => bld(x, w, h, i % 2 ? '#9aa6b5' : '#a3aebc', true));
  poly(c, [[wx + 120, wy], [wx + 260, wy], [wx + 60, wy + wh], [wx - 80 + 80, wy + wh]], 'rgba(255,255,255,0.18)');
  poly(c, [[wx + 600, wy], [wx + 680, wy], [wx + 520, wy + wh], [wx + 440, wy + wh]], 'rgba(255,255,255,0.14)');
  for (let i = 0; i <= 4; i++) rect(c, wx + i * ww / 4 - 6, wy, 12, wh, '#6f737c');
  rect(c, wx - 6, wy - 12, ww + 12, 14, '#6f737c'); rect(c, wx - 6, wy + wh - 2, ww + 12, 14, '#6f737c');
  rect(c, 560, 640, 560, 18, '#f1f0ee'); rect(c, 560, 658, 560, 8, '#c9c8c6');
  poly(c, [[580, 666], [600, 666], [620, 840], [600, 840]], '#4a4c52'); poly(c, [[1080, 666], [1100, 666], [1080, 840], [1060, 840]], '#4a4c52');
  rect(c, 1000, 666, 90, 120, '#dcdbd8'); rect(c, 1006, 700, 78, 3, '#bdbcb9'); rect(c, 1006, 740, 78, 3, '#bdbcb9');
  rect(c, 690, 470, 190, 120, '#25272d'); rect(c, 698, 478, 174, 104, '#3a4150'); rect(c, 778, 590, 14, 40, '#6b6d73'); rect(c, 750, 628, 70, 8, '#6b6d73');
  for (let i = 0; i < 6; i++) rect(c, 712, 494 + i * 14, 60 + (i * 37) % 80, 6, 'rgba(220,226,236,0.5)');
  rect(c, 900, 460, 210, 132, '#25272d'); rect(c, 908, 468, 194, 116, '#f4f3f7');
  rect(c, 908, 468, 194, 16, '#5d5294'); rect(c, 914, 472, 30, 8, '#e7e5fe');
  const tiles = ['#c9a24f', '#7d8b6a', '#c98f86', '#5f6f80', '#b08a64', '#9aa58a'];
  for (let i = 0; i < 6; i++) { const x = 916 + (i % 3) * 34, y = 492 + Math.floor(i / 3) * 42; rect(c, x, y, 28, 26, tiles[i]); rect(c, x, y + 29, 28, 4, '#c3c4cc'); rect(c, x, y + 35, 18, 3, '#d5d6dc'); }
  [30, 46, 38, 62, 74].forEach((h, i) => rect(c, 1024 + i * 14, 574 - h, 9, h, i === 4 ? '#9184d9' : '#b9b1ec'));
  rect(c, 1006, 492, 88, 2, '#d5d6dc');
  rect(c, 1002, 590, 14, 40, '#6b6d73'); rect(c, 976, 628, 66, 8, '#6b6d73');
  poly(c, [[740, 632], [880, 632], [888, 640], [732, 640]], '#d6d6da');
  rect(c, 1060, 610, 20, 30, '#e8e2d8'); rect(c, 1062, 610, 16, 5, '#5a4033');
  rect(c, 600, 600, 34, 40, '#8d6a4b'); for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35; poly(c, [[617, 600], [617 + Math.cos(a - 0.12) * 50, 600 + Math.sin(a - 0.12) * 60], [617 + Math.cos(a) * 64, 600 + Math.sin(a) * 74], [617 + Math.cos(a + 0.12) * 50, 600 + Math.sin(a + 0.12) * 60]], i % 2 ? '#6b7550' : '#7d8b6a'); }
  person(c, 450, 830, 1, 0.85, { pose: 'fold', top: '#26262b', coat: '#a49f98', held: '#2b2d33' });
  const vx = 1300, vy = 820;
  ell(c, vx + 40, vy + 14, 190, 26, '#d0d0d6');
  rect(c, vx - 110, vy - 96, 260, 10, '#f1f0ee'); rect(c, vx - 100, vy - 86, 6, 96, '#4a4c52'); rect(c, vx + 134, vy - 86, 6, 96, '#4a4c52');
  const mini = (x, top, hair, face) => { const hy = vy - 186; rect(c, x - 20, vy - 160, 40, 58, top); ell(c, x, hy, 17, 20, '#e9cdb8'); ell(c, x + (face ? 4 : -4), hy - 9, 18, 13, hair); };
  mini(vx - 50, '#5f6f80', '#2c2622', 1); mini(vx + 70, '#b8695a', '#6b4a33', -1);
  const lap = (x, flip) => { poly(c, [[x - 30, vy - 96], [x + 30, vy - 96], [x + 30, vy - 100], [x - 30, vy - 100]], '#9a9ca3'); poly(c, [[x + flip * 26, vy - 100], [x + flip * 30, vy - 140], [x - flip * 18, vy - 140], [x - flip * 22, vy - 100]], '#3a4150'); };
  lap(vx - 20, -1); lap(vx + 40, 1);
  rect(c, vx + 170, vy - 300, 6, 300, '#4a4c52'); rect(c, vx + 118, vy - 300, 110, 74, '#f4f3f7'); line(c, vx + 130, vy - 280, vx + 200, vy - 280, 3, '#9184d9'); line(c, vx + 130, vy - 262, vx + 186, vy - 262, 3, '#c3c4cc'); line(c, vx + 130, vy - 246, vx + 210, vy - 246, 3, '#c3c4cc');
}

function drawThailand(c) {
  rect(c, 0, 0, W, H, BG);
  const rnd = mulberry(61);
  ell(c, 800, 380, 620, 260, 'rgba(246,224,176,0.32)');
  const karst = (pts, col) => { c.beginPath(); c.moveTo(pts[0][0], 620); pts.forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(pts[pts.length - 1][0], 620); c.closePath(); c.fillStyle = col; c.fill(); };
  karst([[300, 620], [340, 300], [380, 250], [430, 270], [460, 360], [520, 330], [560, 210], [610, 190], [650, 260], [700, 380], [760, 300], [800, 240], [850, 250], [880, 330], [940, 360], [990, 230], [1040, 200], [1090, 240], [1120, 360], [1180, 320], [1230, 260], [1280, 290], [1320, 620]], '#b7c9a8');
  karst([[260, 620], [300, 420], [360, 370], [420, 400], [470, 470], [540, 440], [600, 350], [660, 340], [720, 430], [790, 460], [860, 400], [930, 330], [990, 340], [1050, 430], [1110, 470], [1170, 400], [1240, 360], [1300, 400], [1350, 620]], '#8fae7f');
  karst([[230, 640], [290, 520], [380, 480], [470, 520], [560, 500], [660, 470], [760, 520], [880, 490], [990, 460], [1100, 510], [1200, 480], [1300, 520], [1370, 640]], '#6f9461');
  for (let i = 0; i < 60; i++) { const x = 260 + rnd() * 1080, y = 500 + rnd() * 120, r = 14 + rnd() * 18; poly(c, [[x, y - r], [x + r, y + r * 0.6], [x - r, y + r * 0.6]], ['#5f8a52', '#6f9a5c', '#4f7a46'][i % 3]); }
  const wg = c.createLinearGradient(0, 600, 0, 790); wg.addColorStop(0, '#8fae9a'); wg.addColorStop(1, '#5f8578');
  poly(c, [[230, 600], [1370, 600], [1420, 790], [180, 790]], wg);
  for (let i = 0; i < 16; i++) ell(c, 300 + ((i * 197) % 1000), 620 + ((i * 53) % 160), 30 + (i % 4) * 14, 3, 'rgba(240,226,180,0.5)');
  const bx = 540, by = 690, bw = 360;
  poly(c, [[bx, by], [bx + bw, by], [bx + bw - 30, by + 26], [bx + 34, by + 26]], '#5a3d2b');
  poly(c, [[bx + bw, by], [bx + bw + 30, by - 34], [bx + bw + 12, by - 2]], '#5a3d2b');
  rect(c, bx + 4, by - 4, bw - 6, 6, '#7a5238');
  poly(c, [[bx + 90, by - 4], [bx + 250, by - 4], [bx + 230, by - 58], [bx + 110, by - 58]], '#c9b07a');
  poly(c, [[bx + 100, by - 58], [bx + 240, by - 58], [bx + 170, by - 80]], '#a8905f');
  const vx = bx + 50; rect(c, vx - 12, by - 56, 24, 52, '#5f6f80'); ell(c, vx, by - 68, 12, 14, '#c99a78'); poly(c, [[vx - 30, by - 74], [vx + 30, by - 74], [vx, by - 98]], '#d9c08a');
  line(c, vx + 10, by - 40, bx - 30, by + 40, 4, '#4a3426');
  const fruit = ['#e8b54a', '#d4487a', '#8fb04a', '#e07a3a'];
  for (let i = 0; i < 14; i++) ell(c, bx + 270 + rnd() * 70, by - 8 - rnd() * 16, 9, 8, fruit[i % 4]);
  const banana = (x, y, h, lean) => {
    line(c, x, y, x + lean * 0.3, y - h, 12, '#6b7a4a');
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.55 + lean * 0.004, L = 120 + (i % 3) * 30, tx = x + lean * 0.3, ty = y - h;
      const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * 0.8 + (Math.abs(i - 2.5) > 1.5 ? 50 : 0);
      const nx = -Math.sin(a) * 22, ny = Math.cos(a) * 22;
      poly(c, [[tx, ty], [lerp(tx, ex, 0.5) + nx, lerp(ty, ey, 0.5) + ny], [ex, ey]], i % 2 ? '#4f8a3e' : '#5f9e48');
      poly(c, [[tx, ty], [lerp(tx, ex, 0.5) - nx, lerp(ty, ey, 0.5) - ny], [ex, ey]], i % 2 ? '#3f7434' : '#4c8a3c'); }
  };
  const palm = (x, y, h, lean) => {
    for (let k = 0; k < 8; k++) { const t = k / 8; line(c, x + lean * t, y - h * t, x + lean * (t + 0.125), y - h * (t + 0.125), 12 - k * 0.6, k % 2 ? '#7a6248' : '#8a7052'); }
    const tx = x + lean, ty = y - h;
    for (let i = 0; i < 9; i++) { const a = -Math.PI + i * (Math.PI / 8), L = 150; const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * 0.45 + 40;
      for (let j = 0; j < 6; j++) { const t0 = j / 6, t1 = (j + 1) / 6; const px = lerp(tx, ex, t0), py = lerp(ty, ey, t0) - Math.sin(t0 * Math.PI) * 20, qx = lerp(tx, ex, t1), qy = lerp(ty, ey, t1) - Math.sin(t1 * Math.PI) * 20;
        poly(c, [[px, py], [qx, qy], [lerp(px, qx, 0.5) + 6, lerp(py, qy, 0.5) + 26]], j % 2 ? '#3f7a3a' : '#4f8f44'); } }
  };
  palm(300, 650, 420, 30); palm(1310, 640, 380, -40); palm(1200, 640, 300, 20);
  banana(420, 700, 150, -40); banana(1130, 720, 130, 40);
  for (let i = 0; i < 22; i++) { const x = 220 + rnd() * 340, y = 760 + rnd() * 70, a = -Math.PI / 2 + (rnd() - 0.5) * 1.6, L = 50 + rnd() * 60; poly(c, [[x, y], [x + Math.cos(a) * L - 8, y + Math.sin(a) * L], [x + Math.cos(a) * L + 8, y + Math.sin(a) * L]], ['#4f8a3e', '#6aa050', '#3f7434'][i % 3]); }
  for (let i = 0; i < 18; i++) { const x = 1080 + rnd() * 320, y = 770 + rnd() * 60, a = -Math.PI / 2 + (rnd() - 0.5) * 1.6, L = 40 + rnd() * 60; poly(c, [[x, y], [x + Math.cos(a) * L - 8, y + Math.sin(a) * L], [x + Math.cos(a) * L + 8, y + Math.sin(a) * L]], ['#4f8a3e', '#6aa050', '#3f7434'][i % 3]); }
  [[470, 760, '#d4487a'], [500, 780, '#e8b54a'], [1150, 780, '#e07a3a'], [1190, 800, '#d4487a']].forEach(([x, y, col]) => { for (let i = 0; i < 5; i++) { const a = i * 1.256; ell(c, x + Math.cos(a) * 9, y + Math.sin(a) * 9, 7, 7, col); } ell(c, x, y, 5, 5, '#f2d98a'); });
  poly(c, [[700, 790], [1080, 790], [1100, 850], [680, 850]], '#c9b48e');
  person(c, 900, 840, -1, 0.82, { pose: 'walk', top: '#e3d8c3', backpack: true });
}

function drawGrad(c) {
  rect(c, 0, 0, W, H, BG);
  const rnd = mulberry(71);
  rect(c, 470, 150, 420, 330, '#6f737c'); rect(c, 482, 162, 396, 306, '#262a3e');
  for (let i = 0; i < 40; i++) { const x = 490 + rnd() * 380, y = 170 + rnd() * 290, r = 1.5 + rnd() * 2.5; poly(c, [[x, y - r * 2], [x + r, y], [x, y + r * 2], [x - r, y]], i % 5 ? '#c9cbe0' : '#b9b1ec'); }
  ell(c, 800, 230, 34, 34, '#efe9d6'); ell(c, 816, 222, 30, 30, '#262a3e');
  rect(c, 674, 162, 12, 306, '#6f737c'); rect(c, 482, 310, 396, 10, '#6f737c');
  ell(c, 760, 846, 560, 50, '#d6d3cf');
  ell(c, 760, 560, 300, 200, 'rgba(246,214,150,0.28)');
  rect(c, 520, 640, 500, 22, '#8d6a4b'); rect(c, 520, 662, 500, 10, '#6f5238'); rect(c, 540, 672, 16, 168, '#6f5238'); rect(c, 984, 672, 16, 168, '#6f5238');
  rect(c, 880, 672, 110, 96, '#7a5b40'); rect(c, 890, 690, 90, 3, '#5a4030'); rect(c, 890, 728, 90, 3, '#5a4030');
  line(c, 610, 640, 640, 520, 6, '#3f424d'); line(c, 640, 520, 700, 500, 6, '#3f424d');
  poly(c, [[680, 470], [740, 480], [748, 520], [668, 506]], '#3f424d');
  poly(c, [[690, 506], [748, 520], [800, 640], [610, 640]], 'rgba(246,214,150,0.32)');
  ell(c, 616, 640, 30, 6, '#3f424d');
  poly(c, [[720, 638], [880, 638], [870, 632], [730, 632]], '#9a9ca3');
  poly(c, [[736, 632], [864, 632], [876, 548], [748, 548]], '#2b2d33'); poly(c, [[744, 626], [858, 626], [868, 556], [754, 556]], '#c9d3e6');
  for (let i = 0; i < 5; i++) rect(c, 768, 570 + i * 11, 40 + (i * 23) % 50, 4, '#7d86a3');
  [[640, 636, 10], [600, 638, -6], [900, 634, 8]].forEach(([x, y, a]) => { c.save(); c.translate(x, y); c.rotate(a * Math.PI / 180); rect(c, -40, -4, 80, 6, '#f4f2ec'); for (let k = 0; k < 3; k++) rect(c, -30, -3 + 0, 50 - k * 10, 1.5, '#b9b1ec'); c.restore(); });
  rect(c, 940, 600, 28, 38, '#e8e2d8'); rect(c, 940, 600, 28, 6, '#5a4033'); c.beginPath(); c.arc(972, 618, 9, -1.3, 1.3); c.lineWidth = 4; c.strokeStyle = '#e8e2d8'; c.stroke();
  const bcol = ['#5f6f80', '#b8695a', '#7d8b6a', '#c9a24f', '#3d4a6b', '#a9876a', '#6b7550', '#c98f86', '#5d5294'];
  let y = 840, bx = 1090;
  for (let i = 0; i < 9; i++) { const w = 150 - (i % 3) * 14, h = 26 + (i % 2) * 6; y -= h; const ox = (rnd() - 0.5) * 16; rect(c, bx - w / 2 + ox, y, w, h, bcol[i]); rect(c, bx - w / 2 + ox, y + 4, w, 3, 'rgba(255,255,255,0.25)'); rect(c, bx + w / 2 + ox - 10, y, 4, h, 'rgba(0,0,0,0.12)'); }
  const stepCols = ['#a99fd6', '#9d92cf', '#9286c8', '#877bc0'];
  let sx = bx + 60, sy = y;
  for (let i = 0; i < 9; i++) { const nx = sx + 40, ny = sy - 44; poly(c, [[sx, sy], [nx, sy], [nx, ny], [sx + 8, ny]], stepCols[i % 4]); poly(c, [[sx + 8, ny], [nx, ny], [nx + 10, ny - 8], [sx + 18, ny - 8]], '#c4bdf0'); poly(c, [[sx, sy], [sx + 8, ny], [sx + 8, sy + 30]], 'rgba(0,0,0,0.06)'); sx = nx; sy = ny; }
  for (let i = 0; i < 12; i++) { const x = sx - 40 + rnd() * 120, yy = sy - 60 - rnd() * 140, r = 3 + rnd() * 4; poly(c, [[x, yy - r * 2], [x + r, yy], [x, yy + r * 2], [x - r, yy]], '#b9b1ec'); }
  person(c, 430, 830, 1, 0.85, { pose: 'fold', top: '#26262b', coat: '#8e9a74', noRArm: true });
  poly(c, [[490, 546], [546, 538], [552, 590], [495, 598]], '#3d4a6b'); poly(c, [[495, 598], [552, 590], [553, 584], [496, 592]], '#f4f2ec'); rect(c, 500, 556, 40, 3, '#c9a24f');
  ell(c, 515, 565, 8, 8, '#f3dfd2');
}

const FW = 1600, FH = 1060;
function mini(c, x, fy, k, top, hair, flip) {
  const P = (lx, ly) => [x + lx * k * flip, fy + ly * k];
  line(c, ...P(-12, -250), ...P(-14, -6), 28 * k, '#2c2d33'); line(c, ...P(12, -250), ...P(16, -6), 28 * k, '#2c2d33');
  poly(c, [P(-38, -430), P(36, -430), P(32, -240), P(-34, -240)], top);
  const h = P(2, -488); ell(c, h[0], h[1], 30 * k, 36 * k, '#e9cdb8'); const hh = P(-4, -506); ell(c, hh[0], hh[1], 32 * k, 22 * k, hair);
  line(c, ...P(30, -410), ...P(70, -330), 20 * k, top); line(c, ...P(70, -330), ...P(-10, -320), 18 * k, top);
}
function trophyCup(c, x, y, s) { poly(c, [[x - 30 * s, y - 70 * s], [x + 30 * s, y - 70 * s], [x + 20 * s, y - 22 * s], [x - 20 * s, y - 22 * s]], '#e8c04e'); poly(c, [[x - 30 * s, y - 70 * s], [x - 8 * s, y - 70 * s], [x - 10 * s, y - 24 * s], [x - 20 * s, y - 22 * s]], '#f6dc84'); rect(c, x - 5 * s, y - 22 * s, 10 * s, 18 * s, '#c9a23a'); rect(c, x - 20 * s, y - 6 * s, 40 * s, 12 * s, '#a8822c'); }
function drawAwardStage(c) {
  rect(c, 0, 0, FW, FH, '#1c2a33');
  const bg = c.createLinearGradient(0, 0, 0, 720); bg.addColorStop(0, '#1f4f5a'); bg.addColorStop(1, '#2a7c82'); rect(c, 0, 0, FW, 720, bg);
  const r0 = mulberry(9), tc = ['#2f8a90', '#3a9ea4', '#5fb8b0', '#22646b', '#5d5294', '#7d70c8'];
  for (let j = 0; j < 7; j++) for (let i = 0; i < 26; i++) { const S = 120, x = i * S / 2 - 60, y = 60 + j * 90, up = (i + j) % 2; if (r0() < 0.5) poly(c, up ? [[x - S / 2, y + 90], [x + S / 2, y + 90], [x, y]] : [[x - S / 2, y], [x + S / 2, y], [x, y + 90]], tc[Math.floor(r0() * tc.length)]); }
  for (const x of [0, 1480]) { rect(c, x, 0, 120, 730, '#7a2f3a'); for (let k = 0; k < 4; k++) rect(c, x + 14 + k * 28, 0, 10, 730, '#8f3a46'); }
  rect(c, 0, 0, FW, 46, '#2b2d33'); for (let i = 0; i < 9; i++) { const x = 140 + i * 165; rect(c, x - 20, 40, 40, 30, '#3f424d'); ell(c, x, 74, 14, 8, ['#f6e2b8', '#9fe3dc', '#ff8fb0'][i % 3]); }
  [[305, 'rgba(159,227,220,0.16)'], [800, 'rgba(246,226,184,0.14)'], [1295, 'rgba(255,143,176,0.14)'], [635, 'rgba(255,169,77,0.1)'], [1130, 'rgba(159,227,220,0.12)']].forEach(([x, col], i) => poly(c, [[x - 18, 74], [x + 18, 74], [x + (i % 2 ? -1 : 1) * 260 + 200, 730], [x + (i % 2 ? -1 : 1) * 260 - 200, 730]], col));
  rect(c, 930, 110, 540, 320, '#2b2d33'); const sg = c.createLinearGradient(940, 120, 1460, 420); sg.addColorStop(0, '#f4f3f7'); sg.addColorStop(1, '#d3ebe8'); rect(c, 940, 120, 520, 300, sg); rect(c, 940, 120, 520, 10, '#2f8a90');
  const st = (x, y, r, col) => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; p.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } poly(c, p, col); };
  st(1060, 270, 70, '#e8b54a'); rect(c, 1160, 220, 240, 16, '#3f424d'); rect(c, 1160, 256, 200, 10, '#a49fbf'); rect(c, 1160, 280, 220, 10, '#a49fbf');
  poly(c, [[620, 74], [700, 74], [980, 730], [380, 730]], 'rgba(246,226,184,0.22)');
  rect(c, 0, 720, FW, 26, '#5a4a3e'); rect(c, 0, 746, FW, 320, '#3f3630');
  ell(c, 760, 728, 220, 18, 'rgba(246,226,184,0.4)');
  person(c, 720, 730, 1, 1.0, { pose: 'fold', top: '#26262b', coat: '#3a3b40', held: '#c9a23a' });
  trophyCup(c, 830, 432, 1.3);
  mini(c, 1060, 730, 1.0, '#3f424d', '#6b4a33', -1);
  const rnd = mulberry(5), cf = ['#f2c14e', '#ff8fb0', '#9fe3dc', '#ffa94d', '#f4f3f7'];
  for (let i = 0; i < 70; i++) { const x = rnd() * FW, y = rnd() * 640, r = 6 + rnd() * 8, a = rnd() * 6; poly(c, [[x + Math.cos(a) * r, y + Math.sin(a) * r], [x + Math.cos(a + 2.1) * r, y + Math.sin(a + 2.1) * r], [x + Math.cos(a + 4.2) * r, y + Math.sin(a + 4.2) * r]], cf[i % 5]); }
  for (let i = 0; i < 12; i++) { const x = 60 + i * 136, y = 960 + (i % 2) * 30; poly(c, [[x - 54, y + 110], [x - 44, y + 30], [x, y + 18], [x + 44, y + 30], [x + 54, y + 110]], '#2b2d33'); ell(c, x, y - 4, 26, 30, '#2b2d33'); }
}
function drawCoworker(c) {
  const bg = c.createLinearGradient(0, 0, 0, 760); bg.addColorStop(0, '#3a4256'); bg.addColorStop(1, '#5d6a80'); rect(c, 0, 0, FW, 760, bg);
  for (let i = 0; i < 7; i++) { const x = 60 + i * 240; rect(c, x, 0, 6, 200, '#2b2d33'); ell(c, x + 3, 205, 26, 10, '#f6e2b8'); poly(c, [[x - 20, 210], [x + 26, 210], [x + 110, 560], [x - 104, 560]], 'rgba(246,226,184,0.07)'); }
  for (let i = 0; i < 9; i++) { const x = 20 + i * 190, h = 120 + (i % 3) * 40; rect(c, x, 560 - h, 150, h, ['#4a5468', '#556078', '#47506a'][i % 3]); rect(c, x + 10, 560 - h + 10, 130, 18, ['#2f8a90', '#c8392f', '#e8b54a'][i % 3]); }
  rect(c, 0, 760, FW, 300, '#b9ab94'); for (let i = 0; i < 14; i++) rect(c, i * 120, 760, 2, 300, '#a99b84');
  rect(c, 180, 150, 620, 380, '#2b2d33'); rect(c, 194, 164, 592, 352, '#f4f3f7'); rect(c, 194, 164, 592, 40, '#2f8a90');
  rect(c, 214, 224, 260, 170, '#cfe3e0'); poly(c, [[300, 270], [300, 340], [356, 305]], '#2f8a90'); for (let i = 0; i < 4; i++) rect(c, 500, 236 + i * 34, 250 - i * 40, 14, '#a3a8ae'); rect(c, 214, 420, 140, 60, '#e8b54a'); rect(c, 370, 420, 140, 60, '#ff8fb0'); rect(c, 526, 420, 140, 60, '#9fe3dc');
  rect(c, 480, 530, 20, 120, '#3f424d'); rect(c, 420, 640, 140, 12, '#3f424d');
  rect(c, 1120, 120, 300, 560, '#2f8a90'); rect(c, 1140, 140, 260, 160, '#f4f3f7'); poly(c, [[1270, 170], [1310, 240], [1230, 240]], '#e8b54a'); for (let i = 0; i < 5; i++) rect(c, 1150, 330 + i * 40, 240 - (i % 2) * 60, 14, '#d3ebe8'); rect(c, 1260, 680, 20, 80, '#22646b');
  poly(c, [[130, 640], [870, 640], [900, 680], [100, 680]], '#e9eef0'); rect(c, 100, 680, 800, 180, '#2a7c82'); rect(c, 100, 680, 800, 14, '#22646b');
  rect(c, 520, 560, 160, 90, '#2b2d33'); rect(c, 528, 568, 144, 72, '#9fe3dc'); poly(c, [[500, 652], [700, 652], [690, 640], [510, 640]], '#9a9ca3');
  rect(c, 220, 600, 90, 50, '#f4f2ec'); rect(c, 230, 610, 70, 6, '#c4c8cc'); rect(c, 740, 610, 60, 40, '#e8e2d8');
  mini(c, 1000, 820, 0.78, '#7d8b6a', '#3a271d', -1); mini(c, 1460, 830, 0.82, '#b8695a', '#6b4a33', -1); mini(c, 1540, 820, 0.76, '#3d4a6b', '#2c2622', 1); mini(c, 60, 840, 0.8, '#c9a24f', '#a8905f', 1);
  ell(c, 820, 1000, 460, 34, '#a99b84');
  person(c, 660, 1000, 1, 1.0, { pose: 'fold', top: '#26262b', coat: '#6b7550', held: '#3f424d' });
  mini(c, 990, 1000, 1.0, '#5f6f80', '#2c2622', -1);
  rect(c, 745, 560, 210, 170, '#3f424d'); rect(c, 759, 574, 182, 142, '#c9a23a'); rect(c, 771, 586, 158, 118, '#f4ecd8');
  trophyCup(c, 850, 680, 1.1); rect(c, 791, 692, 118, 6, '#3f424d');
}
function drawVRTalk(c) {
  rect(c, 0, 0, FW, FH, '#262a3e');
  rect(c, 540, 90, 900, 500, '#4a4c52'); rect(c, 550, 100, 880, 480, '#f4f3f7'); rect(c, 550, 100, 880, 12, '#2f8a90');
  const rr = (x, y, w, h, r, f) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = f; c.fill(); };
  c.beginPath(); c.ellipse(820, 300, 150, 84, 0, Math.PI, 0); c.lineWidth = 16; c.strokeStyle = '#2b2d33'; c.stroke();
  rr(690, 270, 260, 126, 34, '#3f424d'); rr(704, 282, 232, 100, 26, '#5a5d6b'); rr(718, 296, 204, 54, 16, '#2b2d33'); rect(c, 734, 308, 80, 7, '#9fe3dc'); rect(c, 826, 308, 56, 7, '#2f8a90');
  rect(c, 1040, 220, 320, 22, '#3f424d'); for (let i = 0; i < 4; i++) rect(c, 1040, 270 + i * 34, 300 - i * 40, 12, '#a49fbf');
  poly(c, [[280, 40], [360, 40], [600, 760], [80, 760]], 'rgba(246,226,184,0.2)');
  rect(c, 0, 760, FW, 300, '#3f3630'); rect(c, 0, 760, FW, 22, '#5a4a3e'); ell(c, 330, 766, 200, 16, 'rgba(246,226,184,0.4)');
  person(c, 320, 770, 1, 1.0, { pose: 'fold', top: '#26262b', coat: '#6b7550', held: '#2b2d33' });
  line(c, 470, 770, 470, 620, 5, '#2b2d33'); line(c, 470, 620, 446, 584, 5, '#2b2d33'); ell(c, 442, 576, 11, 15, '#2b2d33');
  for (let r = 0; r < 2; r++) for (let i = 0; i < 11; i++) { const x = 120 + i * 140 + r * 70, y = 900 + r * 70; poly(c, [[x - 50, y + 90], [x - 42, y + 26], [x, y + 14], [x + 42, y + 26], [x + 50, y + 90]], ['#3f424d', '#4a4c52', '#555866'][(i + r) % 3]); ell(c, x, y - 8, 24, 28, ['#3f424d', '#4a4c52', '#555866'][(i + r) % 3]); }
}
function mosaicCanvas(draw, seed) {
  const src = document.createElement('canvas'); src.width = FW; src.height = FH; const sc = src.getContext('2d'); draw(sc);
  const d = sc.getImageData(0, 0, FW, FH).data, out = document.createElement('canvas'); out.width = FW; out.height = FH; const c = out.getContext('2d');
  const rnd = mulberry(seed), cols = 110, rows = 73, pts = [];
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) { let u = i / cols, v = j / rows; if (i > 0 && i < cols) u += (rnd() - 0.5) * 0.75 / cols; if (j > 0 && j < rows) v += (rnd() - 0.5) * 0.75 / rows; pts.push([u * FW, v * FH]); }
  const id = (i, j) => j * (cols + 1) + i;
  const tri = (a, b, e) => { const A = pts[a], B = pts[b], E = pts[e], x = Math.min(FW - 1, Math.max(0, Math.floor((A[0] + B[0] + E[0]) / 3))), y = Math.min(FH - 1, Math.max(0, Math.floor((A[1] + B[1] + E[1]) / 3))), o = (y * FW + x) * 4, j = 1 + (rnd() - 0.5) * 0.1;
    c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.lineTo(E[0], E[1]); c.closePath(); c.fillStyle = 'rgb(' + Math.min(255, d[o] * j) + ',' + Math.min(255, d[o + 1] * j) + ',' + Math.min(255, d[o + 2] * j) + ')'; c.fill(); c.lineWidth = 0.6; c.strokeStyle = c.fillStyle; c.stroke(); };
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const a = id(i, j), b = id(i + 1, j), cc = id(i, j + 1), e = id(i + 1, j + 1); if (rnd() < 0.5) { tri(a, b, e); tri(a, e, cc); } else { tri(a, b, cc); tri(b, e, cc); } }
  return out;
}

function drawNext(c, text = "what's next?", size = 280, dark = false) {
  c.clearRect(0, 0, W, H);
  c.font = `${size}px ${HAND_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000'; const L = Array.isArray(text) ? text : [text], lh = size * 1.05; L.forEach((ln, k) => c.fillText(ln, W / 2, H / 2 + (k - (L.length - 1) / 2) * lh));
  const tw = Math.max(...L.map((ln) => c.measureText(ln).width));
  c.globalCompositeOperation = 'source-atop';
  const rnd = mulberry(131), cols = dark ? ['#2f8a90', '#1f6f74', '#5d5294', '#d9823a', '#c8392f', '#3a9ea4', '#7d70c8', '#b8692c'] : ['#0f7b6c', '#1a9e8a', '#1d4fa3', '#2f6fd1', '#6a2c91', '#8e44ad', '#b0174f', '#d4235f', '#c98a12', '#0e8aa8'], S = 44;
  const grid = (pal) => { for (let j = 0; j * S < H + S; j++) for (let i = -1; i * S / 2 < W + S; i++) { const x = i * S / 2, y = j * S, up = (i + j) % 2; poly(c, up ? [[x - S / 2, y + S], [x + S / 2, y + S], [x, y]] : [[x - S / 2, y], [x + S / 2, y], [x, y + S]], pal[Math.floor(rnd() * pal.length)]); } };
  grid(cols);
  c.globalCompositeOperation = 'destination-over';
  if (dark) { c.save(); c.beginPath(); c.roundRect(W / 2 - tw / 2 - 90, H / 2 - size * 0.62, tw + 180, size * 1.3, 40); c.clip(); grid(['#d6dfdd', '#ccd7d4', '#dde5e3', '#d1dbd8']); c.restore(); }
  c.globalCompositeOperation = 'source-over';
}

const VS = `
attribute vec3 aColor; attribute vec3 aCent; attribute vec3 aDir; attribute float aDelay; attribute float aSpin; attribute float aEdge;
uniform float uP; uniform float uTime;
varying vec3 vColor; varying float vA; varying float vDepth;
void main(){
  float t = smoothstep(aDelay, aDelay + 0.45, uP);
  float inv = 1.0 - t;
  vec3 local = position - aCent;
  float ang = aSpin * inv * 3.0; float cs = cos(ang), sn = sin(ang);
  local.xy = mat2(cs, -sn, sn, cs) * local.xy;
  local *= mix(0.15, 1.0, t);
  vec3 p = aCent + local + aDir * inv * 2.2;
  p.y += sin(uTime * 0.7 + aDelay * 23.0) * 0.04 * inv;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = -mv.z; vColor = aColor; vA = t * aEdge;
  gl_Position = projectionMatrix * mv;
}`;
const FS = `
uniform vec3 uFog; uniform float uFogNear; uniform float uFogFar;
varying vec3 vColor; varying float vA; varying float vDepth;
void main(){ if (vA < 0.01) discard; float f = smoothstep(uFogNear, uFogFar, vDepth); gl_FragColor = vec4(mix(vColor, uFog, f), vA); }`;

function buildMosaic(source, seed, fogU) {
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d'); c.drawImage(source, 0, 0, W, H);
  const data = c.getImageData(0, 0, W, H).data;
  const rnd = mulberry(seed), cols = 180, rows = 101, pts = [];
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
    let u = i / cols, v = j / rows;
    if (i > 0 && i < cols) u += (rnd() - 0.5) * 0.75 / cols;
    if (j > 0 && j < rows) v += (rnd() - 0.5) * 0.75 / rows;
    pts.push([u, v]);
  }
  const id = (i, j) => j * (cols + 1) + i;
  const pos = [], col = [], cen = [], dir = [], del = [], spin = [], edge = [];
  const tri = (a, b, d) => {
    const A = pts[a], B = pts[b], D = pts[d];
    const u = (A[0] + B[0] + D[0]) / 3, v = (A[1] + B[1] + D[1]) / 3;
    const px = Math.min(W - 1, Math.max(0, Math.floor(u * W))), py = Math.min(H - 1, Math.max(0, Math.floor(v * H)));
    const o = (py * W + px) * 4; let r = data[o], g = data[o + 1], bl = data[o + 2]; if (data[o + 3] < 200) return;
    if (Math.abs(r - 232) + Math.abs(g - 232) + Math.abs(bl - 234) < 14) return;
    const du = Math.abs(u - 0.5) / 0.5, dv = v > 0.5 ? (v - 0.5) / 0.5 * 0.7 : (0.5 - v) / 0.5;
    const rr = Math.pow(Math.pow(du, 4) + Math.pow(dv, 4), 0.25);
    const e = 1 - Math.min(1, Math.max(0, (rr - 0.74) / 0.26));
    if (e < 0.03) return;
    const j = 1 + (rnd() - 0.5) * 0.09;
    r = Math.min(255, r * j); g = Math.min(255, g * j); bl = Math.min(255, bl * j);
    const z = rnd() * 0.05, cx = (u - 0.5) * PW, cy = (0.5 - v) * PH;
    const dx = (rnd() - 0.5) * 3, dy = (rnd() - 0.3) * 2, dz = rnd() * 2.5 + 0.5;
    const dl = Math.min(0.55, rr * 0.3 + rnd() * 0.25), sp = (rnd() - 0.5) * 2;
    for (const P of [A, B, D]) {
      pos.push((P[0] - 0.5) * PW, (0.5 - P[1]) * PH, z);
      col.push(r / 255, g / 255, bl / 255); cen.push(cx, cy, z); dir.push(dx, dy, dz); del.push(dl); spin.push(sp); edge.push(e);
    }
  };
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = id(i, j), b = id(i + 1, j), cc = id(i, j + 1), d = id(i + 1, j + 1);
    if (rnd() < 0.5) { tri(a, b, d); tri(a, d, cc); } else { tri(a, b, cc); tri(b, d, cc); }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3));
  geo.setAttribute('aCent', new THREE.Float32BufferAttribute(cen, 3));
  geo.setAttribute('aDir', new THREE.Float32BufferAttribute(dir, 3));
  geo.setAttribute('aDelay', new THREE.Float32BufferAttribute(del, 1));
  geo.setAttribute('aSpin', new THREE.Float32BufferAttribute(spin, 1));
  geo.setAttribute('aEdge', new THREE.Float32BufferAttribute(edge, 1));
  const mat = new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { uP: { value: 0 }, uTime: { value: 0 }, ...fogU } });
  const m = new THREE.Mesh(geo, mat); m.frustumCulled = false; return m;
}

const HAND_FONT = '"Patrick Hand", "Klee One", "Comic Sans MS", "Comic Sans", cursive';
function textPlane(text, h, wrapN = 42, ink = '#25272d') {
  const wrap = (s, n) => { const out = []; let cur = ''; for (const w of s.split(' ')) { if (cur && (cur + ' ' + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; } if (cur) out.push(cur); return out; };
  const items = (Array.isArray(text) ? text : [text]).flatMap((l, i) => l.split('\n').flatMap((seg) => wrap(seg, wrapN)).map((t) => ({ t, big: i === 0 })));
  const lines = items.map((x) => x.t), LH = 96, FS = 64;
  const cv = document.createElement('canvas'); const c = cv.getContext('2d');
  c.font = `${FS}px ${HAND_FONT}`;
  const cw = Math.ceil(Math.max(...lines.map((l) => c.measureText(l).width)) + 40), ch = LH * lines.length + 40;
  cv.width = cw; cv.height = ch;
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const draw = () => { c.clearRect(0, 0, cw, ch); c.fillStyle = ink; c.font = `${FS}px ${HAND_FONT}`; c.textBaseline = 'middle'; lines.forEach((l, i) => { c.font = `${items[i].big ? FS : FS * 0.85}px ${HAND_FONT}`; c.fillText(l, 8, 20 + LH * i + LH / 2); }); tex.needsUpdate = true; };
  draw();
  if (document.fonts && document.fonts.load) Promise.all([document.fonts.load(`${FS}px "Patrick Hand"`), document.fonts.load(`${FS}px "Klee One"`, 'とても')]).then(draw).catch(() => {});
  const w = h * lines.length * cw / ch;
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h * lines.length), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 }));
}
function shadowPlane() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const c = cv.getContext('2d');
  const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(60,62,76,0.55)'); g.addColorStop(1, 'rgba(60,62,76,0)');
  c.fillStyle = g; c.fillRect(0, 0, 256, 256);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: 0 }));
  m.rotation.x = -Math.PI / 2; return m;
}

if (typeof window !== 'undefined') window.Realm = { start: (...a) => start(...a) };
export function start(canvas, cb = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(BG);
  const scene = new THREE.Scene();
  const fogNear = 12, fogFar = 62;
  scene.fog = new THREE.Fog(BG, fogNear, fogFar);
  const fogU = { uFog: { value: new THREE.Color(BG) }, uFogNear: { value: fogNear }, uFogFar: { value: fogFar } };
  const camera = new THREE.PerspectiveCamera(62, 1, 0.05, 200); camera.rotation.order = 'YXZ';
  const resize = () => { const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 78 : 62; camera.updateProjectionMatrix(); };
  resize(); window.addEventListener('resize', resize);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xc9c9d2, 1.1); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 0.9); sun.position.set(-6, 10, 4); scene.add(sun);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: BG }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);

  const lat = [], hw = 1.7, rowH = 0.866, LOOP = rowH * 152, START = 7;
  for (let i = 0, z = 12.6; z > -200; i++, z -= rowH) {
    lat.push(-hw, 0.002, z, hw, 0.002, z);
    const off = (i % 2) * 0.5;
    for (let x = -hw - 1 + off; x <= hw + 1; x += 1) {
      for (const dx of [-0.5, 0.5]) {
        let x1 = x, z1 = z, x2 = x + dx, z2 = z - rowH;
        if ((x1 < -hw && x2 < -hw) || (x1 > hw && x2 > hw)) continue;
        const clip = (xa, za, xb, zb) => { const lim = xa < -hw ? -hw : hw; const t = (lim - xa) / (xb - xa); return [lim, za + (zb - za) * t]; };
        if (x1 < -hw || x1 > hw) [x1, z1] = clip(x1, z1, x2, z2);
        if (x2 < -hw || x2 > hw) [x2, z2] = clip(x2, z2, x1, z1);
        lat.push(x1, 0.002, z1, x2, 0.002, z2);
      }
    }
  }
  const latGeo = new THREE.BufferGeometry(); latGeo.setAttribute('position', new THREE.Float32BufferAttribute(lat, 3));
  scene.add(new THREE.LineSegments(latGeo, new THREE.LineBasicMaterial({ color: 0xd4d4da })));
  const edgeGeo = new THREE.BufferGeometry(); edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute([-hw, 0.003, 12.19, -hw, 0.003, -200, hw, 0.003, 12.19, hw, 0.003, -200], 3));
  scene.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: 0xb9b9c1 })));
  const chev = new THREE.Shape(); chev.moveTo(-0.22, 0); chev.lineTo(0, -0.26); chev.lineTo(0.22, 0); chev.lineTo(0.22, 0.07); chev.lineTo(0, -0.17); chev.lineTo(-0.22, 0.07); chev.closePath();
  const chevMat = new THREE.MeshBasicMaterial({ color: 0x3a9ea4, transparent: true, opacity: 0.8 });
  const chevStep = LOOP / 6;
  const chevGeo = new THREE.ShapeGeometry(chev);
  const chevAt = () => {}, chevAt0 = (x, z, phi) => { const g = new THREE.Group(), m = new THREE.Mesh(chevGeo, chevMat); m.rotation.set(-Math.PI / 2, 0, Math.PI); g.add(m); g.position.set(x, 0.004, z); g.rotation.y = phi; scene.add(g); };
  for (let z = 3; z > -200; z -= chevStep) chevAt(0, z, 0);

  const shades = [0xe6e6ea, 0xe0e0e6, 0xececf0, 0xdbdbe2].map((c) => new THREE.MeshLambertMaterial({ color: c, flatShading: true }));
  const escher = new THREE.Group(); scene.add(escher);
  const CEIL = 3.7;
  const fallInit = (m, top) => { const sp = new THREE.Box3().setFromObject(m).getBoundingSphere(new THREE.Sphere()), u = m.userData; u.r = sp.center.distanceTo(m.position) + sp.radius; u.s0 = m.scale.x; u.v = 0.12 + rnd() * 0.25; u.top = Math.max(top, CEIL + u.r + 6); u.y = CEIL + u.r + rnd() * (u.top - CEIL - u.r); m.position.y = u.y; };
  const fall = (m, dt) => { const u = m.userData; u.y -= u.v * dt; let f = Math.min(1, (u.y - u.r - CEIL) / 1.5, (u.top - u.y) / 4); if (f <= 0 && u.y < u.top - 1) { u.y = u.top; f = 0; } m.position.y = u.y; m.scale.setScalar(u.s0 * Math.max(0.001, f)); };
  const rnd = mulberry(3);
  const stairs = (n, mat) => { const g = new THREE.Group(); for (let i = 0; i < n; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.3, 0.5), mat); b.position.set(0, i * 0.3, -i * 0.5); g.add(b); } return g; };
  const frame = (mat) => { const g = new THREE.Group(); [[-0.9, 1.4, 0.3, 2.8], [0.9, 1.4, 0.3, 2.8], [0, 2.9, 2.1, 0.3]].forEach(([x, y, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.3), mat); b.position.set(x, y, 0); g.add(b); }); return g; };
  const slab = (mat) => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(3, 0.25, 3), mat); g.add(b); const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.4, 0.25), mat); c2.position.set(1.2, 1.2, 1.2); g.add(c2); return g; };
  for (let i = 0; i < 62; i++) {
    const mat = shades[i % 4], kind = i % 5;
    const g = kind === 2 ? frame(mat) : kind === 4 ? slab(mat) : stairs(6 + Math.floor(rnd() * 10), mat);
    const side = rnd() < 0.5 ? -1 : 1, big = rnd() < 0.3;
    const pz = 4 - rnd() * 214; g.position.set(side * ((big ? 18 : 9) + rnd() * 28), -6 + rnd() * 26, pz);
    g.rotation.set(Math.floor(rnd() * 4) * Math.PI / 2, rnd() * Math.PI * 2, Math.floor(rnd() * 4) * Math.PI / 2);
    g.scale.setScalar(big ? 2.6 + rnd() * 2.6 : 1 + rnd() * 1.4);
    g.userData.spin = (rnd() - 0.5) * 0.04;
    fallInit(g, 45); escher.add(g);
  }

  const archMat = new THREE.MeshLambertMaterial({ color: 0xcdcdd5, flatShading: true });
  const entryArch = (z) => { const g = new THREE.Group(); [[-1.95, 1.7, 0.36, 3.4], [1.95, 1.7, 0.36, 3.4], [0, 3.55, 4.26, 0.36]].forEach(([x, y, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.36), archMat); b.position.set(x, y, 0); g.add(b); }); g.position.z = z; scene.add(g); };
  entryArch(START + 1.2); entryArch(START + 1.2 - LOOP);

  const EC = { x: 0, z: 20, r: 8 }, DL = 14, A55 = 0.96, DX = 44;
  const dirs = { hallway: [0, -1], trophy: [Math.sin(2 * A55), -Math.cos(2 * A55)], campfire: [Math.sin(A55), -Math.cos(A55)] };
  const SPAWN = [EC.x - Math.sin(A55) * 6.5, EC.z + Math.cos(A55) * 6.5], SPAWN_YAW = -A55;
  const strip = (d, x, z) => { const dx = x - EC.x, dz = z - EC.z; return [dx * d[0] + dz * d[1], Math.abs(-dx * d[1] + dz * d[0])]; };
  const floorIn = (x, z) => {
    if (z < 12.6 && Math.abs(x) <= hw) return false;
    if (Math.hypot(x - EC.x, z - EC.z) <= EC.r) return true;
    for (const k of ['trophy', 'campfire']) { const [t, p] = strip(dirs[k], x, z); if (t > 0 && t <= DL + DX && p <= hw) return true; }
    return false;
  };
  {
    const L = [], seg = (x1, z1, x2, z2) => { if (floorIn(x1, z1) && floorIn(x2, z2)) L.push(x1, 0.002, z1, x2, 0.002, z2); };
    for (let i = 0, z = 46.2; z > -18; i++, z -= rowH) { const off = (i % 2) * 0.5; for (let x = -30 + off; x <= 64; x += 1) { seg(x, z, x + 1, z); seg(x, z, x - 0.5, z - rowH); seg(x, z, x + 0.5, z - rowH); } }
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(L, 3)); scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xd4d4da })));
    const E = [], gap = (x, z) => (Math.abs(x) < hw && z < EC.z) || ['trophy', 'campfire'].some((k) => { const [t, p] = strip(dirs[k], x, z); return t > 0 && p < hw; });
    for (let i = 0; i < 120; i++) { const a = i / 120 * Math.PI * 2, b = (i + 1) / 120 * Math.PI * 2, x1 = EC.x + Math.cos(a) * EC.r, z1 = EC.z + Math.sin(a) * EC.r, x2 = EC.x + Math.cos(b) * EC.r, z2 = EC.z + Math.sin(b) * EC.r; if (!gap((x1 + x2) / 2, (z1 + z2) / 2)) E.push(x1, 0.003, z1, x2, 0.003, z2); }
    const t0 = Math.sqrt(EC.r * EC.r - hw * hw);
    for (const k of ['trophy', 'campfire']) { const d = dirs[k], pp = [-d[1], d[0]]; for (const sg of [-1, 1]) E.push(EC.x + d[0] * t0 + pp[0] * sg * hw, 0.003, EC.z + d[1] * t0 + pp[1] * sg * hw, EC.x + d[0] * (DL + DX) + pp[0] * sg * hw, 0.003, EC.z + d[1] * (DL + DX) + pp[1] * sg * hw); }
    const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.Float32BufferAttribute(E, 3)); scene.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0xb9b9c1 })));
    const seal = new THREE.MeshBasicMaterial({ color: 0xcfe9e6, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    const sign = (text, x, z, phi) => { const m = textPlane([text], 1.2); m.material.opacity = 1; m.position.set(x, 4.75, z); m.rotation.y = phi; scene.add(m); };
    for (const [k, label] of [['hallway', 'origin story'], ['trophy', 'happy endings'], ['campfire', 'plot twists']]) {
      const d = dirs[k], phi = Math.atan2(-d[0], -d[1]);
      chevAt(EC.x + d[0] * 3.4, EC.z + d[1] * 3.4, phi);
      if (k === 'hallway') { sign(label, 0, START + 1.2, 0); continue; }
      const x = EC.x + d[0] * DL, z = EC.z + d[1] * DL, g = new THREE.Group();
      [[-1.95, 1.7, 0.36, 3.4], [1.95, 1.7, 0.36, 3.4], [0, 3.55, 4.26, 0.36]].forEach(([bx, by, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.36), archMat); b.position.set(bx, by, 0); g.add(b); });
      g.position.set(x, 0, z); g.rotation.y = phi; scene.add(g);
      sign(label, x, z, phi);
      for (let t = 10.2; t < DL + DX; t += 2) chevAt(EC.x + d[0] * t, EC.z + d[1] * t, phi);
    }
  }
  const doorArm = { trophy: true, campfire: true };

  const scenes = [];
  const addScene = (draw, seed, side, z, caption, capO = {}) => {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; draw(cv.getContext('2d'));
    const mesh = buildMosaic(cv, seed, fogU);
    const x = side * 4.8, ry = -side * 0.5;
    mesh.position.set(x, PH / 2 - 0.26, z); mesh.rotation.y = ry; scene.add(mesh);
    const sh = shadowPlane(); sh.scale.set(5.6, 1.5, 1); sh.position.set(x, 0.006, z + 0.2); sh.rotation.z = ry; scene.add(sh);
    const cap = textPlane(caption, 0.34, capO.wrap), cw0 = cap.geometry.parameters.width, fit = Math.min(1, (capO.maxW || 3.2) / cw0), cw = cw0 * fit, chh = cap.geometry.parameters.height * fit; cap.scale.setScalar(fit); cap.renderOrder = 5; cap.material.depthTest = false;
    const capG = new THREE.Group(); capG.rotation.order = 'YXZ'; capG.rotation.y = -side * 0.75; capG.rotation.x = -1.2;
    capG.position.set(side * (hw + (capO.inset ?? 0.15)), 0.02, z + (capO.dz ?? 3.6));
    cap.position.set(side * cw / 2, chh / 2, 0); capG.add(cap); scene.add(capG);
    const g = new THREE.Group(); g.position.copy(mesh.position); g.rotation.y = ry; scene.add(g);
    const s = { mesh, sh, cap, z, g, p: 0, pts: null }; scenes.push(s); return s;
  };
  const smoothie = addScene(drawSmoothie, 5, -1, -6, ['my very first job at a\nsmoothie shop at age 16'], { inset: -0.15, dz: 2.6 });
  const appraiser = addScene(drawAppraiser, 9, 1, -18, ["appraiser's assistant in California", '• IT troubleshooting and data entry']);
  addScene(drawRetail, 11, -1, -30, ['working retail and jewelry', 'visual merchandising through college'], { inset: -0.15, dz: 2.6 });
  const tokyo = addScene(drawTokyo, 23, 1, -42, ['studying abroad at Waseda University\nin Tokyo', 'とても楽しかった']);
  const ny = addScene(drawNewYork, 37, -1, -54, ['executive assistant in New York', '• launching an online storefront for a\nboutique fashion brand', '• developing courses and branding for a\nrisk management consulting firm'], { wrap: 99, maxW: 3.4, inset: -0.5, dz: 3.2 });
  const thai = addScene(drawThailand, 53, 1, -66, ['taking time off to travel and explore Southeast Asia, including Thailand, Laos and Vietnam']);
  const grad = addScene(drawGrad, 67, -1, -78, ['studying nights to earn a graduate certificate in educational leadership\nand policy']);
  const elearn = addScene(drawElearning, 79, 1, -90, ['instructional design consultant', '• designing and building\ne-learning courses']);
  const speaker = addScene(drawSpeaker, 97, -1, -102, ['L&D leader and speaker\nXR and AI emerging tech enthusiast']);

  const dummy = new THREE.Object3D(), drifts = [];
  const addDrift = (s, side, n, verts, colors, o) => {
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0, depthWrite: false });
    const mesh = new THREE.InstancedMesh(geo, mat, n); mesh.frustumCulled = false; scene.add(mesh);
    const cols = colors.map((h) => new THREE.Color(h)), pd = [];
    for (let i = 0; i < n; i++) { pd.push({ x: side * lerp(-1.2, 7.5, rnd()), y: rnd() * 4.2, z: s.z + lerp(-4.5, 4.5, rnd()), v: lerp(o.v[0], o.v[1], rnd()), r: [rnd() * 6, rnd() * 6, rnd() * 6], w: [lerp(-1.5, 1.5, rnd()) * o.spin, lerp(-1.5, 1.5, rnd()) * o.spin], ph: rnd() * 6.28, sc: lerp(o.sc[0], o.sc[1], rnd()) }); mesh.setColorAt(i, cols[i % cols.length]); }
    drifts.push({ s, mesh, mat, pd, n, o });
  };
  addDrift(tokyo, 1, 220, [0, 0.05, 0, -0.04, -0.03, 0, 0.045, -0.025, 0], [0xf2b8c6, 0xe89aae, 0xf7d3dc, 0xf4c4cf], { v: [0.12, 0.32], spin: 1, sc: [1.3, 1.3], sway: 0.25, max: 1 });
  const hex = []; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, b = a + Math.PI / 3; hex.push(0, 0, 0, Math.cos(a) * 0.028, Math.sin(a) * 0.028, 0, Math.cos(b) * 0.028, Math.sin(b) * 0.028, 0); }
  addDrift(ny, -1, 320, hex, [0xffffff, 0xf7f9fc, 0xc9d3df, 0xb3bfcd], { v: [0.18, 0.4], spin: 0.4, sc: [0.7, 1.5], sway: 0.35, max: 1 });
  addDrift(grad, -1, 90, [0, 0.03, 0, 0.018, 0, 0, 0, -0.03, 0, -0.018, 0, 0, 0, 0.03, 0, 0, -0.03, 0], [0xb9b1ec, 0xe7e5fe, 0xf6d98a, 0xd6d0e8], { v: [-0.05, -0.14], spin: 0.3, sc: [0.6, 1.3], sway: 0.2, max: 0.9 });
  addDrift(thai, 1, 70, [-0.04, -0.05, 0, 0.04, -0.05, 0, 0.04, 0.05, 0, -0.04, -0.05, 0, 0.04, 0.05, 0, -0.04, 0.05, 0], [0xf2c14e, 0xe8a23a, 0xf6d98a, 0xe07a3a], { v: [-0.1, -0.22], spin: 0.08, sc: [0.8, 1.4], sway: 0.15, max: 0.9 });
  addDrift(elearn, 1, 60, [-0.03, -0.03, 0, 0.03, -0.03, 0, 0.03, 0.03, 0, -0.03, -0.03, 0, 0.03, 0.03, 0, -0.03, 0.03, 0], [0xb9b1ec, 0x9184d9, 0xe7e5fe, 0x9fd3c7], { v: [-0.06, -0.16], spin: 0.15, sc: [0.6, 1.3], sway: 0.15, max: 0.85 });

  addDrift(speaker, -1, 70, [0, 0.025, 0, 0.015, 0, 0, 0, -0.025, 0, -0.015, 0, 0, 0, 0.025, 0, 0, -0.025, 0], [0xf6e2b8, 0xf6d98a, 0xe7e5fe], { v: [-0.03, -0.08], spin: 0.2, sc: [0.6, 1.2], sway: 0.15, max: 0.8 });
  const anims = [], px2l = (px, py) => [(px / W - 0.5) * PW, (0.5 - py / H) * PH];
  {
    const [cx, cy] = px2l(780, 235), fr = [];
    const mk = (geo, col) => new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: col, emissive: new THREE.Color(col).multiplyScalar(0.45), flatShading: true, transparent: true, opacity: 0 }));
    const kinds = [
      () => mk(new THREE.ConeGeometry(0.07, 0.13, 6), 0xff5468),
      () => { const m = mk(new THREE.CylinderGeometry(0.09, 0.09, 0.025, 9), 0xffa94d); return m; },
      () => mk(new THREE.IcosahedronGeometry(0.042, 0), 0x7b8cf2),
      () => mk(new THREE.CylinderGeometry(0.075, 0.075, 0.025, 8), 0x9fe05a),
      () => mk(new THREE.BoxGeometry(0.075, 0.075, 0.075), 0xffdf5e),
      () => mk(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 7), 0xfff0a8),
      () => mk(new THREE.IcosahedronGeometry(0.07, 0), 0xff8fb0),
    ];
    const N = 28;
    for (let i = 0; i < N; i++) { const m = kinds[i % kinds.length](); smoothie.g.add(m); fr.push({ m, a0: (i / N) * Math.PI * 2, sp: 0.15 + rnd() * 0.35, r: rnd() * 6 }); }
    const fl = [];
    [[330, 150], [1250, 170], [420, 520], [1190, 470], [560, 90], [1080, 80], [300, 380], [1290, 330], [690, 470], [1010, 520], [860, 130]].forEach(([px, py], i) => { const m = kinds[(i * 3 + 1) % kinds.length](); smoothie.g.add(m); const [x, y] = px2l(px, py); fl.push({ m, x, y, z: 0.25 + rnd() * 0.6, ph: rnd() * 6.28, sp: 0.1 + rnd() * 0.25, r: rnd() * 6 }); });
    anims.push((t) => {
      const o = sstep(0.55, 0.95, smoothie.p);
      for (const f of fl) { f.m.material.opacity = o; f.m.visible = o > 0.01; if (!f.m.visible) continue; f.m.position.set(f.x, f.y + Math.sin(t * 0.55 + f.ph) * 0.09, f.z); f.m.rotation.set(f.r + t * f.sp, f.r + t * f.sp * 0.7, 0); }
      for (const f of fr) {
        f.m.material.opacity = o; f.m.visible = o > 0.01; if (!f.m.visible) continue;
        const a = f.a0 + t * 0.13;
        f.m.position.set(cx + Math.cos(a) * 0.9, cy + Math.sin(a) * 0.2 + Math.sin(a * 3 + t * 0.6) * 0.1, 0.55 + Math.sin(a) * 0.45);
        f.m.rotation.set(f.r + t * f.sp, f.r * 0.7 + t * f.sp * 0.6, a);
      }
    });
  }
  {
    const [lx, ly] = px2l(382, 700);
    const shp = (pts) => { const sh = new THREE.Shape(); sh.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]); sh.closePath(); return new THREE.ShapeGeometry(sh); };
    const tm = new THREE.MeshBasicMaterial({ color: 0xd9a250, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const fm = new THREE.MeshBasicMaterial({ color: 0xecc27a, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const tail = new THREE.Mesh(shp([[0.02, 0.07], [-0.1, 0.18], [-0.22, 0.31], [-0.34, 0.43], [-0.46, 0.52], [-0.4, 0.39], [-0.31, 0.24], [-0.18, 0.08], [-0.03, -0.06]]), tm);
    const fe = new THREE.Mesh(shp([[-0.06, -0.02], [-0.2, 0.06], [-0.32, 0.2], [-0.42, 0.34], [-0.47, 0.26], [-0.36, 0.1], [-0.22, -0.04], [-0.08, -0.08]]), fm);
    fe.position.z = -0.004;
    const piv = new THREE.Group(); piv.position.set(lx, ly, 0.06); piv.add(tail); appraiser.g.add(piv);
    anims.push((t) => { const o = sstep(0.55, 0.95, appraiser.p); tm.opacity = o; piv.rotation.z = -0.05 + Math.sin(t * 8.5) * 0.42; });
  }
  {
    const [lx, ly] = px2l(290, 784);
    const sh = new THREE.Shape(); [[0.02, 0.07], [-0.1, 0.18], [-0.22, 0.31], [-0.34, 0.43], [-0.46, 0.52], [-0.4, 0.39], [-0.31, 0.24], [-0.18, 0.08], [-0.03, -0.06]].forEach(([x, y], i) => i ? sh.lineTo(x, y) : sh.moveTo(x, y));
    const m = new THREE.MeshBasicMaterial({ color: 0xd9823a, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const piv = new THREE.Group(); piv.position.set(lx, ly, 0.06); piv.scale.setScalar(0.5); piv.add(new THREE.Mesh(new THREE.ShapeGeometry(sh), m)); elearn.g.add(piv);
    anims.push((t) => { m.opacity = sstep(0.55, 0.95, elearn.p); piv.rotation.z = -0.1 + Math.sin(t * 11) * 0.45; });
  }
  {
    const rp = [], mat = new THREE.MeshBasicMaterial({ color: 0xf2e6c0, transparent: true, opacity: 0, depthWrite: false });
    const geo = new THREE.PlaneGeometry(1, 0.014);
    for (let i = 0; i < 34; i++) { const py = 612 + rnd() * 170, m = new THREE.Mesh(geo, mat.clone()); m.scale.x = 0.12 + (py - 600) / 900 + rnd() * 0.12; thai.g.add(m); rp.push({ m, px: 270 + rnd() * 1060, py, v: 6 + rnd() * 14, ph: rnd() * 6.28 }); }
    anims.push((t) => {
      const o = sstep(0.55, 0.95, thai.p);
      for (const q of rp) { const px = 270 + ((q.px + t * q.v - 270) % 1060 + 1060) % 1060; const [x, y] = px2l(px, q.py + Math.sin(t * 0.8 + q.ph) * 3); q.m.position.set(x, y, 0.03); q.m.material.opacity = o * (0.35 + 0.35 * Math.sin(t * 1.1 + q.ph)); }
    });
  }

  {
    const pxl = (lx, ly) => px2l(430 + lx * 0.85, 830 + ly * 0.85), [ex, ey] = pxl(50, -345), U = PW / W * 0.85;
    const mats = [], M = (col) => { const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, side: THREE.DoubleSide }); mats.push(m); return m; };
    const piv = new THREE.Group(); piv.position.set(ex, ey, 0.06); grad.g.add(piv);
    const len = 90 * U, arm = new THREE.Mesh(new THREE.PlaneGeometry(len, 20 * U), M(0x8e9a74)); arm.position.x = len / 2; piv.add(arm);
    const hand = new THREE.Mesh(new THREE.CircleGeometry(10 * U, 10), M(0xf3dfd2)); hand.position.set(len, 0, 0.004); piv.add(hand);
    const mug = new THREE.Group(); mug.position.set(len + 4 * U, 8 * U, 0.008); piv.add(mug);
    const body = new THREE.Mesh(new THREE.PlaneGeometry(30 * U, 38 * U), M(0xf4f2ec)); mug.add(body);
    const band = new THREE.Mesh(new THREE.PlaneGeometry(30 * U, 7 * U), M(0x9184d9)); band.position.set(0, 4 * U, 0.002); mug.add(band);
    const hdl = new THREE.Mesh(new THREE.RingGeometry(6 * U, 10 * U, 12, 1, -1.4, 2.8), M(0xf4f2ec)); hdl.position.set(15 * U, 0, 0); mug.add(hdl);
    const rest = -0.15, sip = 1.72, P = 7;
    anims.push((t) => {
      const o = sstep(0.55, 0.95, grad.p); mats.forEach((m) => { m.opacity = o; });
      const c = t % P, k = c < 4 ? 0 : c < 5 ? sstep(4, 5, c) : c < 6.2 ? 1 : 1 - sstep(6.2, 7, c);
      piv.rotation.z = lerp(rest, sip, k); mug.rotation.z = -piv.rotation.z + k * 0.45;
    });
  }
  {
    const tri = new THREE.BufferGeometry(); tri.setAttribute('position', new THREE.Float32BufferAttribute([0, 0.035, 0, -0.03, -0.02, 0, 0.03, -0.02, 0], 3));
    const cols = [0xf6d98a, 0xb9b1ec, 0x9fe3dc, 0xf2b8c6, 0xf4f3f7, 0xffa94d];
    const bursts = [[390, 260, 0.2], [1210, 260, 0.5], [460, 190, 0.95], [1140, 200, 1.2], [370, 330, 1.6], [1230, 320, 1.8], [420, 230, 2.3], [1180, 240, 2.45]].map(([px, py, d], bi) => {
      const [x, y] = px2l(px, py), ps = [];
      for (let i = 0; i < 30; i++) { const m = new THREE.Mesh(tri, new THREE.MeshBasicMaterial({ color: cols[(i + bi) % cols.length], transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })); m.visible = false; speaker.g.add(m); const a = i / 30 * 6.283 + rnd() * 0.3, sp = (i % 2 ? 0.5 : 0.28) + rnd() * 0.22; ps.push({ m, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: rnd() * 6 }); }
      return { x, y, d, ps };
    });
    let t0 = null, armed = true;
    anims.push((t) => {
      if (armed && speaker.p > 0.92) { armed = false; t0 = t; }
      if (speaker.p < 0.2) { armed = true; t0 = null; }
      for (const b of bursts) {
        const lt = t0 == null ? -1 : t - t0 - b.d, on = lt >= 0 && lt < 1.6;
        for (const q of b.ps) { q.m.visible = on; if (!on) continue; const e = 1 - Math.exp(-lt * 5); q.m.position.set(b.x + q.vx * e, b.y + q.vy * e - lt * lt * 0.12, 0.08); q.m.rotation.z = q.r + lt * 6; q.m.scale.setScalar(Math.min(1, lt / 0.06) * (1.5 - lt * 0.6) * (lt > 0.8 ? 0.75 + 0.25 * Math.sin(lt * 40 + q.r) : 1)); q.m.material.opacity = 1 - sstep(0.8, 1.6, lt); }
      }
    });
  }
  const CJ = { x: 4.4, z: -119.5 }, cj = new THREE.Group(); cj.position.set(CJ.x, 0.5, CJ.z); cj.scale.setScalar(0.72); cj.rotation.y = -0.55; scene.add(cj);
  {
    const glow = (() => { const cv = document.createElement('canvas'); cv.width = cv.height = 256; const c = cv.getContext('2d'); const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(145,132,217,0.5)'); g.addColorStop(0.5, 'rgba(185,177,236,0.22)'); g.addColorStop(1, 'rgba(185,177,236,0)'); c.fillStyle = g; c.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(cv); })();
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.6), new THREE.MeshBasicMaterial({ map: glow, transparent: true, opacity: 0, depthWrite: false })); halo.position.set(0, 1.8, -0.08); cj.add(halo);
    const tex = new THREE.TextureLoader().load('assets/conjure-icon.png'); tex.colorSpace = THREE.SRGBColorSpace;
    const pinGeo = new THREE.PlaneGeometry(2.7, 2.7);
    const pin = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })); pin.position.set(0, 1.8, 0); cj.add(pin);
    const ghost = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ map: tex, color: 0xb9b1ec, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })); ghost.position.set(0, 1.8, -0.02); cj.add(ghost);
    const N = 240, geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0.05, 0, -0.04, -0.03, 0, 0.04, -0.03, 0], 3));
    const tm = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const cloud = new THREE.InstancedMesh(geo, tm, N); cloud.frustumCulled = false; cj.add(cloud);
    const tcols = [0x9184d9, 0xb9b1ec, 0x7d70c8, 0x5d5294, 0xc4bdf0, 0xe7e5fe].map((h) => new THREE.Color(h)), pd = [];
    for (let i = 0; i < N; i++) { const edge = Math.pow(rnd(), 0.6); pd.push({ a: rnd() * 6.283, r: lerp(0.75, 1.55, edge), z: (rnd() - 0.5) * 0.9, w: (rnd() - 0.5) * 0.5, f: 4 + rnd() * 9, j: 0.02 + rnd() * 0.05, ph: rnd() * 6.28, sc: 0.5 + rnd() * 1.4, sp: (rnd() - 0.5) * 8, far: 2.5 + rnd() * 3 }); cloud.setColorAt(i, tcols[i % tcols.length]); }
    const dm = new THREE.Object3D();
    CJ.hit = [pin]; CJ.armed = true; CJ.t = -1; CJ.o = 0;
    anims.push((t) => {
      const cz = camera.position.z, d = Math.hypot(camera.position.x - CJ.x, cz - CJ.z);
      CJ.o += (sstep(NEXT_Z + 4.5, NEXT_Z - 1.5, cz) - CJ.o) * 0.06; const o = CJ.o;
      const ft = CJ.t >= 0 ? t - CJ.t : -1, fl = ft >= 0 ? Math.max(0, 1 - ft / 1.4) : 0;
      const zap = Math.sin(t * 2.3) > 0.96 || Math.sin(t * 5.1 + 1) > 0.98, flick = 0.86 + 0.14 * Math.sin(t * 17) * Math.sin(t * 7.3);
      const po = sstep(0.45, 1, o); pin.material.opacity = po * (zap ? 0.55 : flick * 0.78);
      ghost.material.opacity = po * (zap ? 0.45 : 0.06 + fl * 0.5); ghost.position.x = zap ? (Math.random() - 0.5) * 0.14 : Math.sin(t * 3) * 0.02; ghost.scale.setScalar(1.03 + fl * 0.4);
      pin.position.x = zap ? (Math.random() - 0.5) * 0.05 : 0; pin.scale.setScalar(1 + 0.015 * Math.sin(t * 2.2) + fl * 0.7 * Math.sin(Math.min(1, ft / 0.5) * Math.PI / 2)); pin.position.z = fl * 0.3;
      halo.material.opacity = o * (0.28 + 0.1 * Math.sin(t * 1.7) + (zap ? 0.15 : 0) + fl * 0.6); halo.scale.setScalar(1 + fl * 0.8);
      tm.opacity = sstep(0, 0.6, o) * 0.6;
      if (tm.opacity > 0) {
        const gather = lerp(3.2, 1, sstep(0, 1, o)) * (1 + fl * 1.4);
        for (let i = 0; i < N; i++) {
          const q = pd[i], a = q.a + t * q.w, rr = q.r * gather + Math.sin(t * q.f * 0.3 + q.ph) * 0.08;
          dm.position.set(Math.cos(a) * rr * 1.0 + Math.sin(t * q.f + q.ph) * q.j, 1.8 + Math.sin(a) * rr * 1.2 + Math.cos(t * q.f * 1.1 + q.ph) * q.j, q.z + Math.sin(t * 1.3 + q.ph) * 0.1);
          dm.rotation.set(t * q.sp * 0.3, t * q.sp * 0.2, q.ph + t * q.sp); dm.scale.setScalar(q.sc * (0.7 + 0.3 * Math.sin(t * q.f * 0.5 + q.ph)));
          dm.updateMatrix(); cloud.setMatrixAt(i, dm.matrix);
        }
        cloud.instanceMatrix.needsUpdate = true;
      }
      if (CJ.armed && o > 0.6 && d < 0.75) { CJ.armed = false; CJ.t = t; cb.onConjure && cb.onConjure(); }
      if (!CJ.armed && ft > 1.6 && d > 1.2) CJ.armed = true;
    });
  }
  let OBS = [];
  const GAZE_OK = new Set(['builders', 'hazards', 'genai', 'woodpile', 'bell']);
  const TR = { x: -300, z: 0, r: 10 }, trophies = [], trophyHits = [], mndc = new THREE.Vector2(9, 9), gaze = new THREE.Vector2(0, 0);
  const TP = [
    { id: 'builders', x: -4.4, z: -2.6, y: 2.15, label: 'taco + burger builder', badges: ['01_best-of-show-2021', '06_hermes-honorable-mention-2023', '02_davey-silver-2022', '03_horizon-silver-2022-sonic'] },
    { id: 'hazards', x: 0, z: -4.6, y: 2.48, label: 'the hazard wheel', badges: ['04_horizon-silver-2022-high-energy', '05_hermes-gold-2023'] },
    { id: 'genai', x: 4.4, z: -2.6, y: 2.4, label: 'genai storytelling', badges: ['07_demo-fest-best-blended-2025', '08_horizon-gold-2025'] },
  ], DESK = { x: 6.6, z: 3.4 };
  const envHall = new THREE.Color(BG), envEntry = new THREE.Color('#EEEDE8'), envTrophy = new THREE.Color('#D9E3E1'), envCol = new THREE.Color('#EEEDE8'), envTmp = new THREE.Color();
  let envSnap = true, ttime = 0, hoverId = null, locked = false, grabbed = null, grabT = 0;
  const lam = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, flatShading: true, ...o });
  const box = (w, h, d, m, x = 0, y = 0, z = 0, p) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); (p || scene).add(b); return b; };
  const lines = (arr, col) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3)); scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: col }))); };
  const hitM = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
  const entryArt = new THREE.Group(); scene.add(entryArt);
  {
    const ms = [0xe2eae8, 0xd3e0dd, 0xeef2f0, 0xc6d8d4].map((c) => lam(c)), tealM = lam(0x6cc0b8);
    const gs = [new THREE.OctahedronGeometry(1, 0), new THREE.TetrahedronGeometry(1.25, 0), new THREE.IcosahedronGeometry(1, 0), new THREE.TorusGeometry(1.5, 0.2, 3, 3), new THREE.TorusGeometry(1.1, 0.14, 3, 3)];
    const add = (m, x, y, z, sc) => { m.scale.setScalar(sc); m.position.set(x, y, z); m.rotation.set(rnd() * 6, rnd() * 6, rnd() * 6); m.userData = { y, ph: rnd() * 6.28, w: [(rnd() - 0.5) * 0.12, (rnd() - 0.5) * 0.12, (rnd() - 0.5) * 0.08] }; entryArt.add(m); };
    for (let i = 0; i < 60; i++) {
      const a = rnd() * Math.PI * 2, r = 17 + rnd() * 32, x = EC.x + Math.cos(a) * r, z = EC.z + Math.sin(a) * r;
      if (z < -6 || (Math.abs(x) < 9 && z < 12)) continue;
      const big = rnd() < 0.25; add(new THREE.Mesh(gs[i % gs.length], i % 7 === 0 ? tealM : ms[i % 4]), x, -2 + rnd() * 20, z, big ? 3 + rnd() * 3 : 0.6 + rnd() * 1.6);
      fallInit(entryArt.children[entryArt.children.length - 1], 40);
    }
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + rnd(), r = 3 + rnd() * 5; add(new THREE.Mesh(gs[3 + (i % 2)], i % 3 ? ms[i % 4] : tealM), TR.x + Math.cos(a) * r, 7.5 + rnd() * 3, TR.z + Math.sin(a) * r - 1, 0.8 + rnd() * 1.2); fallInit(entryArt.children[entryArt.children.length - 1], 16); }
  }
  {
    const R0 = TR.r, L = [], inR = (x, z) => Math.hypot(x, z) <= R0;
    for (let i = 0, z = R0 + 1; z > -R0 - 1; i++, z -= rowH) { const off = (i % 2) * 0.5; for (let x = -R0 - 1 + off; x <= R0 + 1; x += 1) { const sg = (x1, z1, x2, z2) => { if (inR(x1, z1) && inR(x2, z2)) L.push(TR.x + x1, 0.002, TR.z + z1, TR.x + x2, 0.002, TR.z + z2); }; sg(x, z, x + 1, z); sg(x, z, x - 0.5, z - rowH); sg(x, z, x + 0.5, z - rowH); } }
    lines(L, 0xc0d2cf);
    const E = []; for (let i = 0; i < 120; i++) { const a = i / 120 * Math.PI * 2, b = (i + 1) / 120 * Math.PI * 2, x1 = Math.cos(a) * R0, z1 = Math.sin(a) * R0, x2 = Math.cos(b) * R0, z2 = Math.sin(b) * R0; if (z1 > 0 && Math.abs((x1 + x2) / 2) < hw) continue; E.push(TR.x + x1, 0.003, TR.z + z1, TR.x + x2, 0.003, TR.z + z2); }
    lines(E, 0x9fbab6);
    const wm = [0xe9efee, 0xdde7e5, 0xf1f4f3].map((c) => lam(c));
    const wallFx = [0, 1, 2].map((type) => { const cv = document.createElement('canvas'); cv.width = 256; cv.height = 400; const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; const r2 = mulberry(200 + type), it = []; for (let k = 0; k < (type === 2 ? 46 : type === 1 ? 16 : 11); k++) it.push({ x: r2() * 256, y: r2() * 400, w: type === 0 ? 2 + Math.floor(r2() * 5) * 3 : 0, v: 6 + r2() * 14, s: 8 + r2() * 12, a: r2() * 6.28, sp: (r2() - 0.5) * 0.6, o: 0.1 + r2() * 0.14 }); return { type, cv, c: cv.getContext('2d'), t, it }; });
    const drawWallFx = (tm) => { for (const f of wallFx) { const { c, cv, it } = f, W2 = cv.width, H2 = cv.height; c.fillStyle = '#e6edeb'; c.fillRect(0, 0, W2, H2);
      for (const q of it) { c.fillStyle = 'rgba(47,138,144,' + q.o + ')';
        if (f.type === 0) { const x = ((q.x + tm * q.v) % (W2 + 40)) - 20; c.fillRect(x, 0, q.w, H2); }
        else if (f.type === 1) { const x = ((q.x + tm * q.v * 0.8) % (W2 + 60)) - 30, y = q.y + Math.sin(tm * 0.3 + q.a) * 10, a = q.a + tm * q.sp, r = q.s; poly(c, [[x + Math.cos(a) * r, y + Math.sin(a) * r], [x + Math.cos(a + 2.09) * r, y + Math.sin(a + 2.09) * r], [x + Math.cos(a + 4.19) * r, y + Math.sin(a + 4.19) * r]], c.fillStyle); }
        else { const y = ((q.y + tm * q.v * 2.2) % (H2 + 20)) - 10; ell(c, q.x, y, 2.6, 2.6, c.fillStyle); ell(c, q.x, y - 9, 1.6, 1.6, 'rgba(47,138,144,' + q.o * 0.5 + ')'); } }
      f.t.needsUpdate = true; } };
    drawWallFx(0);
    let wk = 0;
    for (let i = 0; i < 18; i++) { const a = (i + 0.5) / 18 * Math.PI * 2, x = Math.cos(a) * (R0 + 0.6), z = Math.sin(a) * (R0 + 0.6); if (z > 0 && Math.abs(x) < 2.6) continue; const h = 4.2 + ((i * 7) % 5) * 0.6; const b = box(3.2, h, 0.35, wm[i % 3], TR.x + x, h / 2, TR.z + z); b.rotation.y = -a - Math.PI / 2;
      if (wk % 2 === 0) { const f = wallFx[(wk / 2) % 3], pl = new THREE.Mesh(new THREE.PlaneGeometry(3.2, h), new THREE.MeshLambertMaterial({ map: f.t })); pl.position.z = 0.178; b.add(pl); }
      wk++; }
    TR.drawFx = drawWallFx;
    const ex = new THREE.Group(); [[-1.95, 1.7, 0.36, 3.4], [1.95, 1.7, 0.36, 3.4], [0, 3.55, 4.26, 0.36]].forEach(([bx, by, w, h]) => box(w, h, 0.36, archMat, bx, by, 0, ex));
    const sm = new THREE.Mesh(new THREE.PlaneGeometry(3.54, 3.37), new THREE.MeshBasicMaterial({ color: 0xcfe9e6, transparent: true, opacity: 0.6, side: THREE.DoubleSide })); sm.position.y = 1.69; ex.add(sm);
    ex.position.set(TR.x, 0, TR.z + R0 + 0.6); scene.add(ex);
    const es = textPlane(['the entry'], 0.9); es.material.opacity = 1; es.position.set(TR.x, 4.6, TR.z + R0 + 0.5); es.rotation.y = Math.PI; scene.add(es);
    

    const glowTex = (() => { const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c = cv.getContext('2d'), gr = c.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,0.95)'); gr.addColorStop(0.35, 'rgba(214,240,237,0.55)'); gr.addColorStop(1, 'rgba(159,227,220,0)'); c.fillStyle = gr; c.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(cv); })();
    const tl = new THREE.TextureLoader(), plM = [lam(0xf1f4f3), lam(0xdfe8e6)], dk = lam(0x3f424d);
    const mk = {
      builders() {
        const o = new THREE.Group(), parts = {};
        box(1.7, 0.06, 1.05, lam(0xd04436), 0, 0, 0, o);
        [[0, 0.5, 1.7, 0.05], [0, -0.5, 1.7, 0.05], [0.83, 0, 0.05, 1.05], [-0.83, 0, 0.05, 1.05]].forEach(([x, z, w, d]) => box(w, 0.08, d, lam(0xb8382c), x, 0.06, z, o));
        box(1.3, 0.01, 0.8, lam(0xf4ecd8), 0.05, 0.035, 0, o).rotation.y = 0.12;
        const bg = new THREE.Group(); bg.position.set(-0.4, 0.04, 0.02); o.add(bg);
        const cyl = (rt, rb, h, c, y) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 12), lam(c)); m.position.y = y; bg.add(m); return m; };
        cyl(0.3, 0.27, 0.1, 0xd99a4e, 0.05); cyl(0.32, 0.32, 0.09, 0x5a3422, 0.145);
        const ch = box(0.5, 0.02, 0.5, lam(0xf2c14e), 0, 0.2, 0, bg); ch.rotation.y = Math.PI / 4;
        cyl(0.34, 0.34, 0.03, 0x7fbf4f, 0.225); cyl(0.28, 0.28, 0.04, 0xe0473c, 0.255);
        const top = new THREE.Mesh(new THREE.SphereGeometry(0.31, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), lam(0xe3a95c)); top.scale.y = 0.85; top.position.y = 0.275; bg.add(top);
        for (let i = 0; i < 9; i++) { const a = i * 2.4, rr = 0.07 + (i % 3) * 0.07, sd = new THREE.Mesh(new THREE.TetrahedronGeometry(0.02), lam(0xf6ecd0)); sd.position.set(Math.cos(a) * rr, 0.275 + Math.sqrt(Math.max(0, 0.0961 - rr * rr)) * 0.85, Math.sin(a) * rr); bg.add(sd); }
        const tg = new THREE.Group(); tg.position.set(0.42, 0.34, 0); tg.rotation.y = -0.5; o.add(tg);
        const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.56, 14, 1, true, 0, Math.PI), lam(0xf2c14e, { side: THREE.DoubleSide })); shell.rotation.z = -Math.PI / 2; tg.add(shell);
        const fc = [0x7fbf4f, 0x6a3a24, 0xe0473c, 0xf0a63a, 0x9fd65e];
        for (let i = 0; i < 26; i++) { const z = (rnd() - 0.5) * 0.36, floorY = -Math.sqrt(0.09 - z * z) + 0.08, m = new THREE.Mesh(i % 2 ? new THREE.IcosahedronGeometry(0.05, 0) : new THREE.BoxGeometry(0.07, 0.04, 0.07), lam(fc[i % fc.length])); m.position.set((rnd() - 0.5) * 0.46, Math.min(0.05, floorY + rnd() * 0.2), z); m.rotation.set(rnd() * 3, rnd() * 3, 0); tg.add(m); }
        return { o, update(tt) { o.rotation.y = tt * 0.3; } };
      },
      hazards() {
        const o = new THREE.Group(), wheel = new THREE.Group(), RW = 0.72, HY = 0.2; wheel.position.y = HY; o.add(wheel);
        for (const z of [-0.1, 0.1]) { const t = new THREE.Mesh(new THREE.TorusGeometry(RW, 0.03, 4, 28), dk); t.position.z = z; wheel.add(t); }
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; for (const z of [-0.1, 0.1]) box(0.025, RW, 0.025, dk, Math.cos(a) * RW / 2, Math.sin(a) * RW / 2, z, wheel).rotation.z = a - Math.PI / 2; }
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.32, 8), dk); hub.rotation.x = Math.PI / 2; hub.position.y = HY; o.add(hub);
        const warn = new THREE.Mesh(new THREE.CircleGeometry(0.15, 3), new THREE.MeshBasicMaterial({ color: 0xf2c14e, side: THREE.DoubleSide })); warn.rotation.z = Math.PI / 2; warn.position.set(0, HY, 0.17); o.add(warn);
        const cc = [0xf2c14e, 0xe0473c, 0xf0973a, 0x3a9ea4], cabins = [];
        for (let i = 0; i < 8; i++) { const c = new THREE.Group(); box(0.17, 0.14, 0.17, lam(cc[i % 4]), 0, 0, 0, c); box(0.2, 0.03, 0.2, dk, 0, 0.085, 0, c); o.add(c); cabins.push(c); }
        for (const sx of [-1, 1]) for (const z of [-0.18, 0.18]) { const dx = sx * 0.5, dy = -1.1, len = Math.hypot(dx, dy), l = box(0.04, len, 0.04, dk, dx / 2, HY + dy / 2, z, o); l.rotation.z = Math.atan2(-dx, dy); }
        box(1.3, 0.08, 0.5, lam(0x26262b), 0, HY - 1.12, 0, o);
        for (let i = 0; i < 5; i++) box(0.12, 0.085, 0.505, lam(0xf2c14e), -0.5 + i * 0.25, HY - 1.12, 0, o);
        return { o, update(tt) { const w = tt * 0.5; wheel.rotation.z = w; cabins.forEach((c, i) => { const a = i / 8 * Math.PI * 2 + w; c.position.set(Math.cos(a) * RW, HY + Math.sin(a) * RW - 0.1, 0); }); o.rotation.y = Math.sin(tt * 0.3) * 0.5; } };
      },
      genai() {
        const o = new THREE.Group(), r = new THREE.Group(); r.rotation.z = -0.35; o.add(r);
        const add = (g, m, y) => { const x = new THREE.Mesh(g, m); x.position.y = y; r.add(x); return x; };
        add(new THREE.CylinderGeometry(0.24, 0.3, 0.95, 8), lam(0xf4f3f7), 0);
        add(new THREE.ConeGeometry(0.24, 0.5, 8), lam(0x2f8a90), 0.725);
        add(new THREE.CylinderGeometry(0.256, 0.262, 0.07, 8), lam(0x2f8a90), -0.12);
        const win = add(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 12), lam(0x9fe3dc), 0.2); win.rotation.x = Math.PI / 2; win.position.z = 0.25;
        const rim = add(new THREE.TorusGeometry(0.1, 0.022, 4, 14), dk, 0.2); rim.position.z = 0.26;
        for (let k = 0; k < 3; k++) { const a = k * Math.PI * 2 / 3, f = box(0.03, 0.36, 0.24, lam(0xf0973a), Math.sin(a) * 0.32, -0.36, Math.cos(a) * 0.32, r); f.rotation.y = a; }
        add(new THREE.CylinderGeometry(0.16, 0.22, 0.12, 8), dk, -0.535);
        const fl = add(new THREE.ConeGeometry(0.16, 0.5, 8), new THREE.MeshBasicMaterial({ color: 0xffa94d, transparent: true, opacity: 0.9 }), -0.85); fl.rotation.x = Math.PI;
        const fi = add(new THREE.ConeGeometry(0.08, 0.3, 8), new THREE.MeshBasicMaterial({ color: 0xfff0a8 }), -0.75); fi.rotation.x = Math.PI;
        const sp = []; for (let i = 0; i < 10; i++) { const m = new THREE.Mesh(new THREE.TetrahedronGeometry(0.035), lam(i % 2 ? 0x9fe3dc : 0xf6d98a, { emissive: 0x334444 })); o.add(m); sp.push({ m, a: rnd() * 6.28, r: 0.7 + rnd() * 0.4, y: (rnd() - 0.5) * 1.2, w: 0.3 + rnd() * 0.5 }); }
        return { o, update(tt) { o.rotation.y = tt * 0.3; fl.scale.set(1, 0.8 + 0.3 * Math.sin(tt * 30), 1); fi.scale.set(1, 0.8 + 0.3 * Math.sin(tt * 37 + 1), 1); for (const q of sp) { const a = q.a + tt * q.w; q.m.position.set(Math.cos(a) * q.r, q.y + Math.sin(tt + q.a) * 0.08, Math.sin(a) * q.r); q.m.rotation.set(tt * 2, tt * 1.5, 0); } } };
      },
    };
    for (const p of TP) {
      const g = new THREE.Group(); g.position.set(TR.x + p.x, 0, TR.z + p.z); g.rotation.y = Math.atan2(-p.x, 8.2 - p.z); scene.add(g);
      const cy = (rt, rb, h, m, y) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 6), m); c.position.y = y; g.add(c); };
      cy(1.15, 1.25, 0.22, plM[1], 0.11); cy(0.72, 0.82, 1.05, plM[0], 0.75); cy(1.0, 0.9, 0.16, plM[1], 1.36);
      const ringM = new THREE.MeshBasicMaterial({ color: 0x3a9ea4, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.76, 0.92, 6), ringM); ring.rotation.set(-Math.PI / 2, 0, Math.PI / 6); ring.position.y = 1.445; g.add(ring);
      const beamM = new THREE.MeshBasicMaterial({ color: 0x5fb8b0, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 3, 6, 1, true), beamM); beam.position.y = 2.95; g.add(beam);
      const n = p.badges.length, bw = n * 0.4 + 0.16, board = new THREE.Group(); board.position.set(0, 0.72, 0.95); board.rotation.x = -0.22; g.add(board);
      box(bw, 0.5, 0.05, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0, 0, 0, board); box(bw, 0.04, 0.06, lam(0x2f8a90), 0, -0.25, 0, board);
      p.badges.forEach((b, i) => { const t = tl.load('assets/awards/' + b + '.png'); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.36), new THREE.MeshBasicMaterial({ map: t, transparent: true })); m.position.set((i - (n - 1) / 2) * 0.4, 0.01, 0.03); board.add(m); });
      const made = mk[p.id](); made.o.position.y = p.y; g.add(made.o);
      const glowM = new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: 0.4, depthWrite: false }), glow = new THREE.Sprite(glowM); glow.scale.set(2.6, 2.6, 1); glow.position.y = p.y; g.add(glow);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 2.6), hitM); hb.position.y = p.y; hb.userData.id = p.id; g.add(hb); trophyHits.push(hb);
      const ph = rnd() * 6.28;
      trophies.push({ id: p.id, hv: 0, ringM, beamM, update(tt, hv, gk) { made.update(tt); made.o.position.y = p.y + Math.sin(tt * 0.9 + ph) * 0.09 + hv * 0.08 + gk * 0.35; made.o.scale.setScalar(1 + gk * 0.12); glow.position.y = made.o.position.y; glowM.opacity = 0.4 + hv * 0.35 + gk * 0.2; } });
    }
    const D = new THREE.Group(); D.position.set(TR.x + DESK.x, 0, TR.z + DESK.z); D.rotation.y = Math.atan2(-DESK.x, -DESK.z); D.scale.setScalar(1.3); D.position.y = -0.32 * 1.3; scene.add(D);
    const wood = lam(0x8d6a4b), woodD = lam(0x6f5238);
    box(2.4, 0.08, 1.1, wood, 0, 0.92, 0, D); for (const [x, z] of [[-1.12, -0.48], [1.12, -0.48], [-1.12, 0.48], [1.12, 0.48]]) box(0.07, 0.6, 0.07, woodD, x, 0.62, z, D);
    const whiteGlow = (() => { const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c = cv.getContext('2d'), gr = c.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = gr; c.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(cv); })();
    const addMarker = (g, y, off, sc = 1) => {
      const mk2 = new THREE.Mesh(new THREE.ConeGeometry(0.05 * sc, 0.11 * sc, 3), new THREE.MeshBasicMaterial({ color: 0x2f8a90 })); mk2.rotation.x = Math.PI; g.add(mk2);
      const gm = new THREE.SpriteMaterial({ map: whiteGlow, transparent: true, depthWrite: false, opacity: 0.8 }), sp = new THREE.Sprite(gm); sp.scale.set(0.36 * sc, 0.36 * sc, 1); sp.renderOrder = -1; g.add(sp);
      return (rt, hv) => { const yy = y + Math.sin(rt * 2.2 + off) * 0.035 * sc + hv * 0.05; mk2.position.y = yy; mk2.rotation.y = rt * 1.5; sp.position.y = yy + 0.01; gm.opacity = 0.65 + 0.25 * Math.sin(rt * 3 + off) + hv * 0.3; sp.scale.setScalar(0.36 * sc * (1 + hv * 0.3)); };
    };
    OBS = [{ x: DESK.x, z: DESK.z, r: 1.9 }];

    const cvTex = (w, h, draw) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; draw(cv.getContext('2d'), w, h); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
    const news = cvTex(360, 480, (c, w, h) => { rect(c, 0, 0, w, h, '#fbfaf7'); rect(c, 0, 0, w, 74, '#2f8a90'); c.fillStyle = '#f4fbfa'; c.font = '500 34px sans-serif'; c.fillText('INSIGHTS', 22, 50); rect(c, 22, 96, 316, 120, '#cfe3e0'); for (let i = 0; i < 9; i++) rect(c, 22, 236 + i * 24, i % 4 === 3 ? 180 : 316, 9, '#c4c8cc'); rect(c, 22, 456, 120, 8, '#2f8a90'); });
    const card = cvTex(240, 340, (c, w, h) => { rect(c, 0, 0, w, h, '#ffffff'); rect(c, 0, 0, w, 64, '#2f8a90'); ell(c, w / 2, 26, 14, 6, '#ffffff'); c.fillStyle = '#ffffff'; c.font = '500 26px sans-serif'; c.textAlign = 'center'; c.fillText('SPEAKER', w / 2, 56); rect(c, 70, 90, 100, 110, '#d6dedd'); rect(c, 40, 226, 160, 14, '#3f424d'); rect(c, 60, 252, 120, 9, '#a3a8ae'); rect(c, 0, 300, w, 40, '#e7f2f1'); });
    const deskItem = (id, tex, w, h, x, z, rz, per, off, gcol) => {
      const g = new THREE.Group(); g.position.set(x, 0.966, z); D.add(g);
      const piv = new THREE.Group(); piv.position.z = h / 2; g.add(piv);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide })); m.rotation.set(-Math.PI / 2, 0, rz); m.position.z = -h / 2; piv.add(m);
      const poolM = new THREE.MeshBasicMaterial({ color: gcol, transparent: true, opacity: 0.25, depthWrite: false }), pool = new THREE.Mesh(new THREE.CircleGeometry(Math.max(w, h) * 0.85, 24), poolM); pool.rotation.x = -Math.PI / 2; pool.position.y = -0.002; g.add(pool);
      const mark = addMarker(g, 0.42, off);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.14, h + 0.06), hitM); hb.userData.id = id; g.add(hb); trophyHits.push(hb);
      trophies.push({ id, hv: 0, update(tt, hv, gk, rt) {
        g.position.y = 0.966 + hv * 0.04 + gk * 0.14;
        const c = (rt + off) % per, k = c < 0.9 ? c / 0.9 : 1, env = Math.sin(k * Math.PI);
        piv.rotation.x = c < 0.9 ? -env * 0.22 * (0.6 + 0.4 * Math.sin(k * Math.PI * 4)) : 0; piv.position.y = env * 0.02;
        poolM.opacity = 0.18 + 0.12 * Math.sin(rt * 2 + off) + hv * 0.25 + env * 0.15;
        mark(rt, hv);
      } }); return g; };
    deskItem('newsletter', news, 0.5, 0.66, 0.02, 0.14, 0.12, 5, 0, 0x4fc4a0);
    const ly = deskItem('lanyard', card, 0.26, 0.37, 0.55, 0.25, -0.3, 6.5, 2.4, 0xf2b84e);
    {
      const lg = new THREE.Group(); lg.position.set(-0.62, 0.96, -0.02); lg.rotation.y = 0.3; D.add(lg);
      box(0.62, 0.03, 0.42, lam(0x9a9ca3), 0, 0.015, 0, lg);
      const kb = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.22), lam(0x4a4c52)); kb.rotation.x = -Math.PI / 2; kb.position.set(0, 0.031, 0.03); lg.add(kb);
      const tp = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.1), lam(0x7d8088)); tp.rotation.x = -Math.PI / 2; tp.position.set(0, 0.031, 0.16); lg.add(tp);
      const hinge = new THREE.Group(); hinge.position.set(0, 0.03, -0.2); hinge.rotation.x = -0.22; lg.add(hinge);
      box(0.62, 0.41, 0.02, lam(0x9a9ca3), 0, 0.205, 0, hinge);
      const scr = new THREE.TextureLoader().load('assets/blog-screen.png'); scr.colorSpace = THREE.SRGBColorSpace; scr.anisotropy = 8;
      const lpM = new THREE.MeshBasicMaterial({ color: 0x6aaee8, transparent: true, opacity: 0.25, depthWrite: false }), lp = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), lpM); lp.rotation.x = -Math.PI / 2; lp.position.y = 0.004; lg.add(lp);
      const disp = new THREE.Mesh(new THREE.PlaneGeometry(0.57, 0.367), new THREE.MeshBasicMaterial({ map: scr })); disp.position.set(0, 0.205, 0.011); hinge.add(disp);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.44, 0.44), hitM); hb.position.y = 0.2; hb.userData.id = 'laptop'; lg.add(hb); trophyHits.push(hb);
      const mark = addMarker(lg, 0.62, 1.1);
      trophies.push({ id: 'laptop', hv: 0, update(tt, hv, gk, rt) { lg.position.y = 0.96 + hv * 0.03 + gk * 0.1; mark(rt, hv); lpM.opacity = 0.18 + 0.12 * Math.sin(rt * 2 + 1.1) + hv * 0.25; } });
    }
    {
      const pg = new THREE.Group(); pg.position.set(0.96, 0.96, -0.34); D.add(pg);
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.26, 10), lam(0xf1f4f3)); pot.position.y = 0.13; pg.add(pot);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.163, 0.155, 0.04, 10), lam(0x2f8a90)); band.position.y = 0.21; pg.add(band);
      const soil = new THREE.Mesh(new THREE.CircleGeometry(0.15, 10), lam(0x4a3426)); soil.rotation.x = -Math.PI / 2; soil.position.y = 0.255; pg.add(soil);
      const ls = new THREE.Shape(); ls.moveTo(0, 0); ls.bezierCurveTo(-0.065, 0.02, -0.075, 0.1, 0, 0.15); ls.bezierCurveTo(0.075, 0.1, 0.065, 0.02, 0, 0);
      const leafGeo = new THREE.ShapeGeometry(ls, 6), leafM = [0x3f8a3a, 0x4f9e44, 0x5fae4c, 0x6fbe56, 0x8ccf5e, 0xb9d86a].map((c) => lam(c, { side: THREE.DoubleSide })), stemM = lam(0x5c8f3a);
      const plant = new THREE.Group(); pg.add(plant);
      const leaf = (p, sc, droop) => { const m = new THREE.Mesh(leafGeo, leafM[Math.floor(rnd() * leafM.length)]); m.position.copy(p); m.rotation.set(droop ? 1.6 + (rnd() - 0.5) * 1.2 : (rnd() - 0.6) * 1.8, rnd() * 6.28, (rnd() - 0.5) * 1.4); m.scale.setScalar(sc); plant.add(m); };
      const vines = [
        [[0, 0.3, 0], [0.12, 0.3, 0.04], [0.24, 0.16, 0.1], [0.3, -0.12, 0.14], [0.32, -0.42, 0.18], [0.31, -0.68, 0.2]],
        [[0, 0.3, 0], [-0.04, 0.28, -0.14], [-0.08, 0.14, -0.24], [-0.12, -0.14, -0.28], [-0.16, -0.44, -0.3]],
        [[0, 0.28, 0.05], [-0.04, 0.1, 0.28], [-0.08, 0.03, 0.55], [-0.06, 0.02, 0.8], [-0.02, -0.2, 0.9], [0, -0.48, 0.92]],
        [[0, 0.3, 0], [-0.2, 0.24, 0.02], [-0.38, 0.05, 0], [-0.58, 0.025, -0.08], [-0.74, 0.025, -0.06]],
        [[0.05, 0.3, -0.05], [0.2, 0.26, -0.12], [0.26, 0.06, -0.2], [0.27, -0.3, -0.22]],
      ];
      for (const v of vines) { const cv3 = new THREE.CatmullRomCurve3(v.map(([x, y, z]) => new THREE.Vector3(x, y, z))); plant.add(new THREE.Mesh(new THREE.TubeGeometry(cv3, 40, 0.007, 4), stemM)); const n = Math.floor(cv3.getLength() / 0.055); for (let i = 1; i <= n; i++) { const p = cv3.getPointAt(i / n); p.x += (rnd() - 0.5) * 0.05; p.z += (rnd() - 0.5) * 0.05; leaf(p, 0.8 + rnd() * 0.45 - (i / n) * 0.25, p.y < 0.1); } }
      for (let i = 0; i < 80; i++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 0.32; leaf(new THREE.Vector3(Math.cos(a) * r, 0.27 + rnd() * 0.26 * (1 - r / 0.36), Math.sin(a) * r), 0.95 + rnd() * 0.5, false); }
      anims.push((t) => { plant.rotation.z = Math.sin(t * 0.5) * 0.008; plant.rotation.x = Math.sin(t * 0.37 + 1) * 0.006; });
    }
    {
      const ph = Math.atan2(-DESK.x, -DESK.z), cx = DESK.x - Math.cos(ph) * 2.5, cz = DESK.z + Math.sin(ph) * 2.5;
      const cg = new THREE.Group(); cg.position.set(TR.x + cx, 0, TR.z + cz); cg.rotation.y = Math.atan2(-cx, 2.5 - cz); scene.add(cg);
      const ct = new THREE.TextureLoader().load('assets/cutout.png'); ct.colorSpace = THREE.SRGBColorSpace; ct.anisotropy = 8;
      const cm = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 2.62), new THREE.MeshBasicMaterial({ map: ct, transparent: true, alphaTest: 0.08, side: THREE.DoubleSide })); cm.position.y = 1.3; const cp = new THREE.Group(); cp.add(cm); cg.add(cp);
      const sh = shadowPlane(); sh.material.opacity = 0.45; sh.scale.set(1.1, 0.5, 1); sh.position.y = 0.006; cg.add(sh);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.25, 0.3), hitM); hb.position.y = 1.25; hb.userData.id = 'cutout'; cg.add(hb); trophyHits.push(hb);
      const mark = addMarker(cg, 2.95, 2.2, 1.6);
      OBS.push({ x: cx, z: cz, r: 0.7 });
      trophies.push({ id: 'cutout', hv: 0, update(tt, hv, gk, rt) { cm.scale.setScalar(1 + hv * 0.015 + gk * 0.03); cp.rotation.z = hv * Math.sin(rt * 7) * 0.014; mark(rt, hv); } });
    }
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.014, 3, 30), lam(0x2f8a90)); strap.rotation.x = Math.PI / 2; strap.scale.set(0.7, 1, 1); strap.position.set(0.05, 0.004, -0.34); ly.add(strap);
    {
      const a = 0.5236, rr = TR.r + 0.6 - 0.2, x = Math.cos(a) * rr, z = Math.sin(a) * rr, wall = new THREE.Group(); wall.position.set(TR.x + x, 0, TR.z + z); wall.rotation.y = Math.atan2(-x, -z); scene.add(wall);
      [[-0.78, 3.62, 1.3, 0.94, 'accepting an award on stage', ['#2f8a90', '#3a9ea4', '#5fb8b0', '#f2c14e', '#d9a250', '#26282e']], [0.8, 3.02, 1.3, 0.94, 'holding the award with a coworker', ['#c98f86', '#e3c98a', '#7d8b6a', '#5fb8b0', '#3f424d', '#f4ecd8']], [-0.6, 2.12, 1.24, 0.9, 'speaking about VR', ['#5d5294', '#9184d9', '#2f8a90', '#9fe3dc', '#26282e', '#f6d98a']]].forEach(([fx, fy, fw, fh, label, pal], fi) => {
        const fg = new THREE.Group(); fg.position.set(fx, fy, 0); wall.add(fg);
        box(fw, fh, 0.06, lam(0x3f424d), 0, 0, 0, fg); box(fw - 0.12, fh - 0.12, 0.065, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0, 0, 0.004, fg);
        const tex = new THREE.CanvasTexture(mosaicCanvas([drawAwardStage, drawCoworker, drawVRTalk][fi], 300 + fi)); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
        const pic = new THREE.Mesh(new THREE.PlaneGeometry(fw - 0.24, fh - 0.24), new THREE.MeshBasicMaterial({ map: tex })); pic.position.z = 0.04; fg.add(pic);
      });
    }
  }
  const logoPlaque = (id, name, maxW = 1.9, maxH = 1.25) => {
    const g = new THREE.Group(), cv = document.createElement('canvas'); cv.width = 640; cv.height = 240; const c = cv.getContext('2d');
    c.fillStyle = '#f4ecd8'; c.fillRect(0, 0, 640, 240); c.fillStyle = '#2a2433'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '600 64px Inter, sans-serif'; c.fillText(name, 320, 122, 580);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, fog: false, side: THREE.DoubleSide }), W0 = maxW, m = new THREE.Mesh(new THREE.PlaneGeometry(W0, W0 * 240 / 640), mat); g.add(m);
    const img = new Image(); img.onload = () => { const a = img.width / img.height, w = Math.min(maxW, maxH * a), h = w / a; cv.width = 512; cv.height = Math.round(512 / a); c.clearRect(0, 0, cv.width, cv.height); c.drawImage(img, 0, 0, cv.width, cv.height); tex.dispose(); const t2 = new THREE.CanvasTexture(cv); t2.colorSpace = THREE.SRGBColorSpace; mat.map = t2; mat.needsUpdate = true; m.geometry.dispose(); m.geometry = new THREE.PlaneGeometry(w, h); };
    img.src = 'assets/logos/' + id + '.png';
    return g;
  };
  const CF = { x: 300, z: 0, r: 12 }, envCamp = new THREE.Color('#3b4170');
  let cfSky = null, fallT = 1, storyI = -1, storyT = 0, logsLeft = 4, flyLog = null, flare = 0, fireHint = false, cfLastCol = new THREE.Color(0xff9a3c);
  const cfObs = [], pileLogs = [], storyMeshes = [], flames = [];
  const storyCols = [0x3fd0c6, 0xffb43a, 0xff6fa0, 0x9a8cff].map((c) => new THREE.Color(c));
  const cfHemi = new THREE.HemisphereLight(0x9aa2e6, 0x343a48, 0); scene.add(cfHemi);
  const fireLight = new THREE.PointLight(0xff9a3c, 0, 32, 1); fireLight.position.set(CF.x, 1.5, CF.z); scene.add(fireLight);
  const radTex = (stops) => { const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c = cv.getContext('2d'), gr = c.createRadialGradient(64, 64, 0, 64, 64, 64); stops.forEach(([o, col]) => gr.addColorStop(o, col)); c.fillStyle = gr; c.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(cv); };
  const fireTex = radTex([[0, 'rgba(255,214,140,0.9)'], [0.35, 'rgba(255,140,50,0.35)'], [1, 'rgba(255,120,40,0)']]), wTex = radTex([[0, 'rgba(255,255,255,1)'], [0.3, 'rgba(255,255,255,0.55)'], [1, 'rgba(255,255,255,0)']]);
  const G = new THREE.Group(); G.position.set(CF.x, 0, CF.z); scene.add(G);
  let embers, smoke; const emD = [], smD = [];
  {
    const ground = new THREE.Mesh(new THREE.CircleGeometry(CF.r + 22, 48), lam(0x34433b)); ground.rotation.x = -Math.PI / 2; ground.position.y = 0.003; G.add(ground);
    const dirt = new THREE.Mesh(new THREE.CircleGeometry(4.8, 9), lam(0x3a2f26)); dirt.rotation.x = -Math.PI / 2; dirt.position.y = 0.006; G.add(dirt);
    for (let i = 0; i < 11; i++) { const a = i / 11 * 6.283, m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), lam(0x6a6d76)); m.position.set(Math.cos(a) * 1.15, 0.1, Math.sin(a) * 1.15); m.rotation.set(rnd() * 3, rnd() * 3, 0); m.scale.set(1 + rnd() * 0.4, 0.7, 1); G.add(m); }
    const logM = lam(0x6b4a30), endM = lam(0xc9a06a);
    for (let i = 0; i < 5; i++) { const gp = new THREE.Group(); gp.rotation.y = i / 5 * 6.283; G.add(gp); const l = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 1.3, 6), logM); l.position.set(0.34, 0.45, 0); l.rotation.z = 0.6; gp.add(l); }
    const fcols = [0xff5a1a, 0xff8a2a, 0xffb03a, 0xffd36b, 0xfff0b0];
    for (let i = 0; i < 10; i++) { const inner = i >= 6, m = new THREE.Mesh(new THREE.ConeGeometry(inner ? 0.15 : 0.26, inner ? 0.95 : 1.35, 5), new THREE.MeshBasicMaterial({ color: fcols[inner ? 3 + (i % 2) : i % 3], transparent: true, opacity: 0.92, depthWrite: false })); const a = i * 2.4, r = inner ? 0.05 : 0.2; m.position.set(Math.cos(a) * r, inner ? 0.75 : 0.85, Math.sin(a) * r); m.rotation.y = rnd() * 6; G.add(m); flames.push({ m, base: m.material.color.clone(), ph: rnd() * 6.28, s: 0.8 + rnd() * 0.4 }); }
    const fg = new THREE.Sprite(new THREE.SpriteMaterial({ map: fireTex, transparent: true, depthWrite: false, opacity: 0.9 })); fg.scale.set(5, 5, 1); fg.position.y = 1.1; G.add(fg); CF.glow = fg;
    embers = new THREE.InstancedMesh(new THREE.TetrahedronGeometry(0.035), new THREE.MeshBasicMaterial({ color: 0xffb04a }), 80); embers.frustumCulled = false; G.add(embers);
    for (let i = 0; i < 80; i++) emD.push({ a: rnd() * 6.28, r: rnd() * 0.4, y: rnd() * 5, v: 0.6 + rnd() * 1.2, w: (rnd() - 0.5) * 2, ph: rnd() * 6.28 });
    smoke = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.3, 0), new THREE.MeshBasicMaterial({ color: 0x8a8fa6, transparent: true, opacity: 0.1, depthWrite: false }), 40); smoke.frustumCulled = false; G.add(smoke);
    for (let i = 0; i < 40; i++) smD.push({ a: rnd() * 6.28, y: 1.4 + rnd() * 6, v: 0.35 + rnd() * 0.3, ph: rnd() * 6.28 });
    const seat = lam(0x5a3e28);
    [Math.PI * 0.86, Math.PI * 0.14, -Math.PI / 2].forEach((a) => { const g2 = new THREE.Group(), x = Math.cos(a) * 3.8, z = Math.sin(a) * 3.8; g2.position.set(x, 0.24, z); g2.rotation.y = -a - Math.PI / 2; G.add(g2); const l = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 2.2, 7), seat); l.rotation.z = Math.PI / 2; g2.add(l); for (const sx of [-1.1, 1.1]) { const e = new THREE.Mesh(new THREE.CircleGeometry(0.24, 7), endM); e.position.x = sx * 1.001; e.rotation.y = sx * Math.PI / 2; g2.add(e); } cfObs.push({ x, z, r: 1.25 }); });
    const pile = new THREE.Group(); pile.position.set(1.8, 0, 4.6); pile.rotation.y = -0.4; pile.scale.setScalar(1.5); G.add(pile);
    [[-0.13, 0.1], [0.13, 0.1], [0, 0.29], [0, 0.29]].forEach(([z, y], i) => { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.95, 6), logM); l.rotation.z = Math.PI / 2; l.position.set(i === 3 ? 0 : 0, i === 3 ? 0.47 : y, i === 2 ? 0.13 : i === 3 ? 0 : z); if (i === 2) l.position.z = -0.0; pileLogs.push(l); pile.add(l); });
    pileLogs[2].position.set(0, 0.28, 0); pileLogs[3].position.set(0, 0.46, 0.02); pileLogs[3].rotation.y = 0.25;
    const pm = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.13, 3), new THREE.MeshBasicMaterial({ color: 0xffd36b })); pm.rotation.x = Math.PI; pile.add(pm);
    const pgM = new THREE.SpriteMaterial({ map: wTex, transparent: true, depthWrite: false, opacity: 0.8 }), pgs = new THREE.Sprite(pgM); pgs.scale.set(0.45, 0.45, 1); pile.add(pgs);
    const ph2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.8, 0.8), hitM); ph2.position.y = 0.3; ph2.userData.id = 'woodpile'; pile.add(ph2); trophyHits.push(ph2);
    cfObs.push({ x: 1.8, z: 4.6, r: 1.15 });
    const ws = textPlane(['the woodpile'], 0.34, 42, '#f4ecd8'); ws.material.opacity = 1; ws.position.set(1.8, 1.95, 4.6); G.add(ws);
    trophies.push({ id: 'woodpile', hv: 0, update(tt, hv, gk, rt) { const y = 0.95 + Math.sin(rt * 2.2) * 0.04 + hv * 0.05; pm.position.y = y; pm.rotation.y = rt * 1.5; pgs.position.y = y; pgM.opacity = !flyLog ? 0.6 + 0.3 * Math.sin(rt * 3) + hv * 0.3 : 0.15; } });
    const treeM = [lam(0x2a3b46), lam(0x2f4446), lam(0x26383f)], trunkM = lam(0x4a3828);
    for (let i = 0; i < 110; i++) { const a = rnd() * 6.283, r = 15 + rnd() * 16; if (Math.abs(a - Math.PI / 2) < 0.28 && r < 24) continue; const t = new THREE.Group(), sc = 1 + rnd() * 1.6; t.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); t.scale.setScalar(sc); t.rotation.y = rnd() * 6; G.add(t); const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 1.4, 5), trunkM); tr.position.y = 0.7; t.add(tr); [[1.7, 2.2, 1.6], [1.3, 1.9, 2.7], [0.9, 1.6, 3.7]].forEach(([rr, hh, yy], k) => { const cn = new THREE.Mesh(new THREE.ConeGeometry(rr, hh, 7), treeM[(i + k) % 3]); cn.position.y = yy; t.add(cn); }); }
    const tx = -8.2, tz = -2.6, trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 7, 7), trunkM); trunk.position.set(tx, 3.5, tz); G.add(trunk); cfObs.push({ x: tx, z: tz, r: 0.8 });
    for (let k = 0; k < 3; k++) { const cn = new THREE.Mesh(new THREE.ConeGeometry(2.6 - k * 0.6, 2.6, 7), treeM[k]); cn.position.set(tx, 5.6 + k * 1.3, tz); G.add(cn); }
    const br = box(4.2, 0.2, 0.2, trunkM, tx + 2.1, 4.25, tz, G); br.rotation.z = 0.08;
    [['xrinlxd', 'XR in LXD', -6.9], ['dbh', 'Design by Humanity', -5.0]].forEach(([id, name, lx], li) => {
      const piv = new THREE.Group(); piv.position.set(lx, 4.2 + (lx - tx) * 0.08, tz); G.add(piv);
      const ropeLen = 1.0 + li * 0.25; box(0.015, ropeLen, 0.015, lam(0x9a8a70), 0, -ropeLen / 2, 0, piv);
      const lan = new THREE.Group(); lan.position.y = -ropeLen - 0.24; piv.add(lan);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.62, 6), new THREE.MeshBasicMaterial({ color: li ? 0xffd2a0 : 0xb4ece6 })); body.rotation.y = Math.PI / 6; lan.add(body);
      for (const y of [0.34, -0.34]) { const cap = new THREE.Mesh(new THREE.CylinderGeometry(y > 0 ? 0.13 : 0.32, y > 0 ? 0.32 : 0.16, 0.08, 6), lam(0x2b2d33)); cap.position.y = y; cap.rotation.y = Math.PI / 6; lan.add(cap); }
      for (const sd of [1, -1]) { const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.46), new THREE.MeshBasicMaterial({ color: 0x1e2236 })); plate.position.z = sd * 0.302; plate.rotation.y = sd > 0 ? 0 : Math.PI; lan.add(plate); const lg = logoPlaque(id, name, 0.34, 0.4); lg.position.z = sd * 0.306; lg.rotation.y = sd > 0 ? 0 : Math.PI; lan.add(lg); }
      const lgM = new THREE.SpriteMaterial({ map: wTex, color: li ? 0xffd9a0 : 0xbff3ec, transparent: true, depthWrite: false, opacity: 0.8 }), lgS = new THREE.Sprite(lgM); lgS.scale.set(2.6, 2.6, 1); lgS.position.z = -0.1; lan.add(lgS);
      const ll = new THREE.PointLight(li ? 0xffc98a : 0x9fe3dc, 2.4, 8, 1.4); lan.add(ll);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.8), hitM); hb.userData.id = id; lan.add(hb); trophyHits.push(hb);
      trophies.push({ id, hv: 0, update(tt, hv, gk, rt) { piv.rotation.z = Math.sin(rt * 0.9 + li * 2) * 0.05; piv.rotation.x = Math.sin(rt * 0.7 + li) * 0.03; lgM.opacity = 0.72 + 0.12 * Math.sin(rt * 3 + li) + hv * 0.2; lgS.scale.setScalar(2.6 * (1 + hv * 0.25)); ll.intensity = 2.2 + 0.4 * Math.sin(rt * 3 + li) + hv * 1.5; } });
    });
    {
      const bx = -3.2, bz = 6.4, postM = lam(0x4a3828), brass = lam(0xd4a94e, { side: THREE.DoubleSide, emissive: 0x3a2a08 });
      box(0.16, 2.9, 0.16, postM, bx - 0.75, 1.45, bz, G); box(0.95, 0.12, 0.12, postM, bx - 0.3, 2.85, bz, G);
      const piv = new THREE.Group(); piv.position.set(bx, 2.79, bz); G.add(piv);
      const prof = [[0.02, 0], [0.09, -0.02], [0.12, -0.12], [0.14, -0.28], [0.2, -0.4], [0.24, -0.46]].map(([x, y]) => new THREE.Vector2(x, y));
      const bell = new THREE.Mesh(new THREE.LatheGeometry(prof, 10), brass); bell.position.y = -0.06; piv.add(bell);
      const clap = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), lam(0x5a4a30)); clap.position.y = -0.48; piv.add(clap);
      const bgM = new THREE.SpriteMaterial({ map: wTex, color: 0xffe2a0, transparent: true, depthWrite: false, opacity: 0.4 }), bgS = new THREE.Sprite(bgM); bgS.scale.set(1.1, 1.1, 1); bgS.position.y = -0.3; piv.add(bgS);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.8), hitM); hb.position.y = -0.3; hb.userData.id = 'bell'; piv.add(hb); trophyHits.push(hb);
      const bl = textPlane(['ring to leave'], 0.3, 42, '#f4ecd8'); bl.material.opacity = 1; bl.position.set(bx, 1.95, bz + 0.05); bl.rotation.y = 0.45; G.add(bl);
      cfObs.push({ x: bx - 0.75, z: bz, r: 0.4 }, { x: bx, z: bz, r: 0.45 });
      trophies.push({ id: 'bell', hv: 0, update(tt, hv, gk, rt) { const k = bellT < 0 ? 0 : rt - bellT; piv.rotation.z = bellT < 0 ? Math.sin(rt * 1.1) * 0.03 : Math.sin(k * 14) * 0.45 * Math.exp(-k * 1.6); clap.position.x = -piv.rotation.z * 0.25; bgM.opacity = 0.32 + 0.1 * Math.sin(rt * 2.4) + hv * 0.4; } });
    }
    const ex = new THREE.Group(); [[-1.95, 1.7, 0.36, 3.4], [1.95, 1.7, 0.36, 3.4], [0, 3.55, 4.26, 0.36]].forEach(([bx, by, w, h]) => box(w, h, 0.36, lam(0x5a5e6e), bx, by, 0, ex));
    const sm = new THREE.Mesh(new THREE.PlaneGeometry(3.54, 3.37), new THREE.MeshBasicMaterial({ color: 0x9fe3dc, transparent: true, opacity: 0.35, side: THREE.DoubleSide })); sm.position.y = 1.69; ex.add(sm);
    ex.position.set(0, 0, CF.r + 0.6); G.add(ex);
    const es = textPlane(['the entry'], 0.9, 42, '#f4ecd8'); es.material.opacity = 1; es.position.set(0, 4.6, CF.r + 0.5); es.rotation.y = Math.PI; G.add(es);
  }
  const pr = renderer.getPixelRatio ? renderer.getPixelRatio() : 1;
  const ptVS = 'attribute float ph; attribute float sz; uniform float uT; uniform float uPR; varying float vA; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); float tw = 0.55 + 0.45 * sin(uT * (0.8 + fract(ph * 7.31) * 2.4) + ph * 6.283); vA = tw; gl_PointSize = sz * uPR * (0.75 + 0.45 * tw); gl_Position = projectionMatrix * mv; }';
  const ptFS = 'uniform vec3 uC; uniform float uO; varying float vA; void main(){ float r = length(gl_PointCoord - 0.5); if (r > 0.5) discard; gl_FragColor = vec4(uC, smoothstep(0.5, 0.0, r) * vA * uO); }';
  const starU = { uT: { value: 0 }, uPR: { value: pr }, uC: { value: new THREE.Color(0xfff6e4) }, uO: { value: 1 } };
  const stars = (() => { const N = 700, P = [], PH = [], SZ = []; for (let i = 0; i < N; i++) { const a = rnd() * 6.283, el = 0.12 + Math.pow(rnd(), 0.7) * 1.4, R0 = 160; P.push(Math.cos(a) * Math.cos(el) * R0, Math.sin(el) * R0, Math.sin(a) * Math.cos(el) * R0); PH.push(rnd()); SZ.push(rnd() < 0.08 ? 4.2 : 1.4 + rnd() * 1.8); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('ph', new THREE.Float32BufferAttribute(PH, 1)); g.setAttribute('sz', new THREE.Float32BufferAttribute(SZ, 1)); const m = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms: starU, vertexShader: ptVS, fragmentShader: ptFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); m.frustumCulled = false; m.position.set(CF.x, 0, CF.z); m.renderOrder = -1; scene.add(m); return m; })();
  const TN = 48, trU = { uC: { value: new THREE.Color(0xfff2d8) }, uO: { value: 0 }, uPR: { value: pr } };
  const trail = (() => { const g = new THREE.BufferGeometry(), al = []; for (let i = 0; i < TN; i++) al.push(1 - i / TN); g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(TN * 3), 3)); g.setAttribute('al', new THREE.Float32BufferAttribute(al, 1)); const m = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms: trU, vertexShader: 'attribute float al; uniform float uPR; varying float vA; void main(){ vA = al; gl_PointSize = (1.0 + 3.6 * al) * uPR; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: 'uniform vec3 uC; uniform float uO; varying float vA; void main(){ float r = length(gl_PointCoord - 0.5); if (r > 0.5) discard; gl_FragColor = vec4(uC, smoothstep(0.5, 0.0, r) * vA * vA * uO); }', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); m.frustumCulled = false; scene.add(m); return m; })();
  let shoot = null, nextShoot = 3 + rnd() * 4;
  const skyUpdate = (dt, t, inC) => {
    stars.visible = trail.visible = inC; if (!inC) return; starU.uT.value = t;
    nextShoot -= dt;
    if (!shoot && nextShoot <= 0) { const comet = rnd() < 0.25, a = camera.rotation.y + Math.PI + (rnd() - 0.5) * 1.6, R0 = 140, el = 0.55 + rnd() * 0.45, p0 = new THREE.Vector3(CF.x + Math.sin(a) * Math.cos(el) * R0, Math.sin(el) * R0 * 0.8, CF.z + Math.cos(a) * Math.cos(el) * R0), side = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a)).multiplyScalar(rnd() < 0.5 ? -1 : 1); const v = side.multiplyScalar(comet ? 9 : 70).add(new THREE.Vector3(0, comet ? -2.5 : -26, 0)); shoot = { p0, v, t: 0, life: comet ? 5.5 : 0.9, sp: comet ? 0.09 : 0.006, comet }; trU.uC.value.setHex(comet ? 0xbfe8ff : 0xfff2d8); }
    if (shoot) { shoot.t += dt; const k = shoot.t / shoot.life, pa = trail.geometry.attributes.position; for (let i = 0; i < TN; i++) { const tt = Math.max(0, shoot.t - i * shoot.sp); pa.setXYZ(i, shoot.p0.x + shoot.v.x * tt, shoot.p0.y + shoot.v.y * tt, shoot.p0.z + shoot.v.z * tt); } pa.needsUpdate = true; trU.uO.value = Math.min(1, k * 6) * Math.min(1, (1 - k) * 4); if (k >= 1) { shoot = null; trU.uO.value = 0; nextShoot = 6 + rnd() * 9; } }
  };
  const nearFire = () => Math.hypot(camera.position.x - CF.x, camera.position.z - CF.z) < 10.2 || Math.hypot(camera.position.x - CF.x - 1.7, camera.position.z - CF.z - 4.6) < 4.5;
  let bellT = -1, actx = null;
  const ringBell = () => {
    if (bellT >= 0) return; bellT = time;
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const n = actx.currentTime; [[880, 0.5], [1320, 0.22], [2210, 0.12]].forEach(([f, g]) => { const o = actx.createOscillator(), v = actx.createGain(); o.frequency.value = f; v.gain.setValueAtTime(g * 0.4, n); v.gain.exponentialRampToValueAtTime(0.0001, n + 2.4); o.connect(v).connect(actx.destination); o.start(n); o.stop(n + 2.5); }); } catch (e) {}
    setTimeout(() => { bellT = -1; if (alive && camera.position.x > 150) exitCampfire(); }, 1300);
  };
  const endStory = () => { if (storyI >= 0) { storyI = -1; cb.onStoryEnd && cb.onStoryEnd(); } };
  const addLog = () => {
    if (flyLog) return;
    throwDone = true;
    if (logsLeft <= 0) { logsLeft = 4; pileLogs.forEach((l) => { l.visible = true; }); }
    logsLeft--; const src = pileLogs[logsLeft]; src.visible = false;
    const m = new THREE.Mesh(src.geometry, src.material); src.getWorldPosition(m.position); scene.add(m);
    flyLog = { m, from: m.position.clone(), t: 0, i: 3 - logsLeft };
  };
  const storyMesh = (i) => { if (!storyMeshes[i]) { const cv = document.createElement('canvas'); cv.width = W; cv.height = H; drawNext(cv.getContext('2d'), ['earning belief', 'moving target', 'false signal', 'hidden hours'][i], 280); const m = buildMosaic(cv, 400 + i, fogU); m.position.set(CF.x, 3.45, CF.z - 1.6); m.scale.setScalar(0.62); m.userData.p = 0; scene.add(m); storyMeshes[i] = m; } return storyMeshes[i]; };
  const enterCampfire = () => {
    if (!cfSky) { cfSky = new THREE.CubeTextureLoader().setPath('assets/sky/').load(['RIGHT.png', 'LEFT.png', 'UP.png', 'DOWN.png', 'FRONT.png', 'BACK.png']); cfSky.colorSpace = THREE.SRGBColorSpace; }
    camera.position.set(CF.x, 1.6, CF.z + 11); yaw = 0; vel = 0; fallT = 1; throwDone = false; throwT = 0; throwStage = 0; envSnap = true; cb.onRoom && cb.onRoom('campfire');
  };
  const exitCampfire = () => { camera.position.set(SPAWN[0], 1.6, SPAWN[1]); yaw = SPAWN_YAW; vel = 0; envSnap = true; cb.onRoom && cb.onRoom('entry'); };
  const cfUpdate = (dt, t, inC) => {
    hemi.intensity = inC ? 0 : 1.1; sun.intensity = inC ? 0 : 0.9; cfHemi.intensity = inC ? 1.35 : 0;
    scene.background = inC && cfSky ? cfSky : null;
    scene.backgroundIntensity = inC ? 2.2 : 1; skyUpdate(dt, t, inC);
    if (!inC) { endStory(); fireLight.intensity = 0; if (fireHint) { fireHint = false; cb.onFireHint && cb.onFireHint(false); } return; }
    if (flyLog) {
      flyLog.t += dt / 0.8; const k = Math.min(1, flyLog.t), to = new THREE.Vector3(CF.x, 0.7, CF.z);
      flyLog.m.position.lerpVectors(flyLog.from, to, k); flyLog.m.position.y += Math.sin(k * Math.PI) * 1.3; flyLog.m.rotation.set(k * 5, k * 3, Math.PI / 2);
      if (k >= 1) { scene.remove(flyLog.m); storyI = flyLog.i; storyT = 0; flare = 1; cfLastCol.copy(storyCols[storyI]); storyMesh(storyI); cb.onStory && cb.onStory(storyI); flyLog = null; }
    }
    if (storyI >= 0) storyT += dt;
    flare = Math.max(0, flare - dt * 0.35);
    const tint = storyI >= 0 ? 0.45 + 0.55 * flare : 0;
    for (const f of flames) { f.m.material.color.copy(f.base).lerp(cfLastCol, tint); const fl = 0.8 + 0.35 * Math.sin(t * 9 + f.ph) * Math.sin(t * 5.3 + f.ph * 2); f.m.scale.set(f.s * (0.9 + 0.1 * Math.sin(t * 7 + f.ph)), f.s * fl * (1 + flare * 0.9), f.s * (0.9 + 0.1 * Math.cos(t * 6 + f.ph))); f.m.rotation.y += dt * 0.6; }
    fireLight.color.setHex(0xff9a3c).lerp(cfLastCol, tint * 0.6); fireLight.intensity = 9 * (0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7)) * (1 + flare * 0.7);
    CF.glow.material.opacity = 0.75 + 0.15 * Math.sin(t * 11) + flare * 0.25; CF.glow.scale.setScalar(5 * (1 + flare * 0.5)); CF.glow.material.color.setRGB(1, 1, 1).lerp(cfLastCol, tint * 0.5);
    for (let i = 0; i < emD.length; i++) { const q = emD[i]; q.y += q.v * dt * (1 + flare * 1.5); if (q.y > 5.5) { q.y = 0.6; q.r = rnd() * 0.4; } const a = q.a + q.y * q.w; dummy.position.set(Math.cos(a) * (q.r + q.y * 0.12), q.y, Math.sin(a) * (q.r + q.y * 0.12)); dummy.rotation.set(t * 3 + q.ph, t * 2, 0); dummy.scale.setScalar(Math.max(0.01, 1 - q.y / 5.5)); dummy.updateMatrix(); embers.setMatrixAt(i, dummy.matrix); }
    embers.instanceMatrix.needsUpdate = true; embers.material.color.setHex(0xffb04a).lerp(cfLastCol, tint * 0.7);
    for (let i = 0; i < smD.length; i++) { const q = smD[i]; q.y += q.v * dt; if (q.y > 8) q.y = 1.6; const sp = (q.y - 1.4) * 0.22; dummy.position.set(Math.cos(q.a + t * 0.2) * sp + Math.sin(t * 0.3 + q.ph) * 0.2, q.y, Math.sin(q.a + t * 0.2) * sp); dummy.rotation.set(q.ph + t * 0.2, q.ph, 0); dummy.scale.setScalar(0.6 + (q.y - 1.4) * 0.35); dummy.updateMatrix(); smoke.setMatrixAt(i, dummy.matrix); }
    smoke.instanceMatrix.needsUpdate = true;
    storyMeshes.forEach((m, k) => { if (!m) return; const tg = k === storyI ? 1 : 0; m.userData.p += (tg - m.userData.p) * Math.min(1, dt * (tg ? 0.9 : 1.4)); m.material.uniforms.uP.value = m.userData.p; m.material.uniforms.uTime.value = t; m.rotation.y = Math.atan2(camera.position.x - m.position.x, camera.position.z - m.position.z); m.visible = m.userData.p > 0.002; });
    const fh = nearFire() && storyI < 0 && !flyLog && !locked; if (fh !== fireHint) { fireHint = fh; cb.onFireHint && cb.onFireHint(fh); }
  };
  const enterTrophy = () => { camera.position.set(TR.x, 1.6, TR.z + 8.2); yaw = 0; vel = 0; envSnap = true; cb.onRoom && cb.onRoom('trophy'); };
  const exitTrophy = () => { camera.position.set(SPAWN[0], 1.6, SPAWN[1]); yaw = SPAWN_YAW; vel = 0; envSnap = true; cb.onRoom && cb.onRoom('entry'); };

  let nextMesh = null; const NEXT_Z = -109;
  let takeMesh = null, takeT = 0, takeDone = false; const TAKE_Z = TR.z + 2.6;
  const buildTake = () => { if (takeMesh || !alive) return; const cv = document.createElement('canvas'); cv.width = W; cv.height = H; drawNext(cv.getContext('2d'), 'take an award', 230); takeMesh = buildMosaic(cv, 177, fogU); takeMesh.position.set(TR.x, 2.1, TAKE_Z); takeMesh.scale.setScalar(0.55); takeMesh.userData.p = 0; scene.add(takeMesh); };
  let throwMesh = null, throwDone = false, throwT = 0;
  let throwMesh2 = null, throwStage = 0;
  const mkMosaic = (lines, seed) => { const cv = document.createElement('canvas'); cv.width = W; cv.height = H; drawNext(cv.getContext('2d'), lines, lines[0].length > 12 ? 190 : 230); const m = buildMosaic(cv, seed, fogU); m.position.set(CF.x, 2.5, CF.z + 2.4); m.scale.setScalar(0.5); m.userData.p = 0; m.visible = false; scene.add(m); return m; };
  const buildThrow = () => { if (throwMesh || !alive) return; throwMesh = mkMosaic(['throw a log', 'on the fire'], 211); throwMesh.position.y = 3.25; throwMesh2 = mkMosaic(['for stories of', 'leadership moments'], 223); throwMesh2.position.y = 2.05; };
  const buildNext = () => { buildTake(); buildThrow(); if (nextMesh || !alive) return; const cv = document.createElement('canvas'); cv.width = W; cv.height = H; drawNext(cv.getContext('2d')); nextMesh = buildMosaic(cv, 131, fogU); nextMesh.position.set(0, 1.7, NEXT_Z); nextMesh.scale.setScalar(0.6); nextMesh.userData.p = 0; scene.add(nextMesh); buildBack(); };
  let backMesh = null; const BACK_Z = START + 1.2 - LOOP;
  const buildBack = () => { if (backMesh || !alive) return; backMesh = textPlane(['return to entry'], 0.36); backMesh.position.set(0, 4.1, BACK_Z + 0.2); scene.add(backMesh); };
  (document.fonts && document.fonts.load ? Promise.race([document.fonts.load(`280px "Patrick Hand"`), new Promise((r) => setTimeout(r, 2500))]) : Promise.resolve()).then(buildNext, buildNext);

  const keys = {}; let yaw = 0, vel = 0, turnVel = 0, look = { x: 0, y: 0 }, lookT = { x: 0, y: 0 }, moved = false, dist = 0, touchWalk = false, lastTX = null;
  const resetPos = () => { envSnap = true; camera.position.set(SPAWN[0], 1.6, SPAWN[1]); yaw = SPAWN_YAW; vel = 0; turnVel = 0; look.x = look.y = lookT.x = lookT.y = 0; scenes.forEach((s) => { s.p = 0; }); if (nextMesh) nextMesh.userData.p = 0; };
  resetPos();
  const keyName = (e) => { const m = { ArrowUp: 'arrowup', ArrowDown: 'arrowdown', ArrowLeft: 'arrowleft', ArrowRight: 'arrowright', KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd' }; return m[e.code] || (e.key || '').toLowerCase(); };
  const kd = (e) => { if (locked) return; if (e.key === ' ' && camera.position.x > 150) { e.preventDefault(); addLog(); return; } if (e.key === 'Enter' && hoverId === 'bell') { e.preventDefault(); ringBell(); return; } if (e.key === 'Enter' && hoverId === 'woodpile') { e.preventDefault(); addLog(); return; } if (e.key === 'Enter' && hoverId && (camera.position.x < -150 || camera.position.x > 150)) { e.preventDefault(); grabbed = hoverId; cb.onTrophy && cb.onTrophy(hoverId); return; } const k = keyName(e); if (k.startsWith('arrow') || e.key === ' ') e.preventDefault(); keys[k] = true; };
  const ku = (e) => { keys[keyName(e)] = false; };
  const blur = () => { for (const k in keys) keys[k] = false; };
  window.addEventListener('blur', blur);
  const pm = (e) => { if (e.pointerType === 'touch') { if (lastTX != null) { yaw -= (e.clientX - lastTX) * 0.006; } lastTX = e.clientX; return; } lookT.x = (e.clientX / window.innerWidth) * 2 - 1; lookT.y = (e.clientY / window.innerHeight) * 2 - 1; mndc.set(lookT.x, -lookT.y); };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const pdn = (e) => {
    const r = canvas.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera);
    if (CJ.armed && CJ.o > 0.6 && Math.hypot(camera.position.x - CJ.x, camera.position.z - CJ.z) < 12 && ray.intersectObjects(CJ.hit, false).length) { CJ.armed = false; CJ.t = time; cb.onConjure && cb.onConjure(); return; }
    if ((camera.position.x < -150 || camera.position.x > 150) && !locked) { const hit = ray.intersectObjects(trophyHits, false)[0], id = hit && hit.distance < 20 ? hit.object.userData.id : hoverId; if (id === 'woodpile') { addLog(); return; } if (id === 'bell') { ringBell(); return; } if (id) { grabbed = id; cb.onTrophy && cb.onTrophy(id); return; } }
    if (e.pointerType === 'touch' && !locked) { touchWalk = true; lastTX = e.clientX; }
  };
  const pup = (e) => { if (e.pointerType === 'touch') { touchWalk = false; lastTX = null; } };
  window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
  window.addEventListener('pointermove', pm); canvas.addEventListener('pointerdown', pdn); window.addEventListener('pointerup', pup); window.addEventListener('pointercancel', pup);

  let raf = 0, tmo = 0, time = 0, last = performance.now(), alive = true;
  const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const schedule = () => { cancelAnimationFrame(raf); clearTimeout(tmo); if (!alive) return; raf = requestAnimationFrame(loop); tmo = setTimeout(loop, 40); };
  let area = 'entry';
  const walk = (x, z) => {
    if (x > 150) {
      const lx = x - CF.x, lz = z - CF.z;
      if (!(Math.abs(lx) <= 1.45 && lz > 0 && lz <= CF.r + 1) && Math.hypot(lx, lz) > CF.r - 0.7) return false;
      if (Math.hypot(lx, lz) < 1.8) return false;
      for (const o of cfObs) if (Math.hypot(lx - o.x, lz - o.z) < o.r) return false;
      return true;
    }
    if (x < -150) {
      const lx = x - TR.x, lz = z - TR.z;
      if (!(Math.abs(lx) <= 1.45 && lz > 0 && lz <= TR.r + 1) && Math.hypot(lx, lz) > TR.r - 0.7) return false;
      for (const p of TP) if (Math.hypot(lx - p.x, lz - p.z) < 1.6) return false;
      for (const o of OBS) if (Math.hypot(lx - o.x, lz - o.z) < o.r) return false; return true;
    }
    if (Math.abs(x) <= 1.45 && z <= EC.z && z >= START - LOOP - 2) return true;
    if (z < CJ.z + 2.4 && z > CJ.z - 1.6 && x >= -1.45 && x <= CJ.x + 0.15) return true;
    if (Math.hypot(x - EC.x, z - EC.z) <= EC.r - 0.4) return true;
    for (const k of ['trophy', 'campfire']) { const [t, p] = strip(dirs[k], x, z); if (t > 0 && t <= DL - 0.7 && p <= 1.45) return true; }
    return false;
  };
  const loop = () => {
    schedule();
    const now = performance.now(), dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now; time += dt;
    const fwd = (keys['arrowup'] || keys['w'] || touchWalk ? 1 : 0) - (keys['arrowdown'] || keys['s'] ? 1 : 0);
    const turn = (keys['arrowleft'] || keys['a'] ? 1 : 0) - (keys['arrowright'] || keys['d'] ? 1 : 0);
    vel += (fwd * 3.0 - vel) * Math.min(1, dt * 5); turnVel += (turn * 1.5 - turnVel) * Math.min(1, dt * 6);
    yaw += turnVel * dt;
    if (!moved && (fwd || turn)) { moved = true; cb.onFirstMove && cb.onFirstMove(); }
    const px = camera.position.x, pz = camera.position.z, nx = px - Math.sin(yaw) * vel * dt, nz = pz - Math.cos(yaw) * vel * dt;
    if (walk(nx, nz)) { camera.position.x = nx; camera.position.z = nz; } else if (walk(nx, pz)) camera.position.x = nx; else if (walk(px, nz)) camera.position.z = nz;
    if (camera.position.z < START - LOOP) { resetPos(); cb.onLoop && cb.onLoop(); }
    const inT = camera.position.x < -150;
    const inC = camera.position.x > 150;
    if (inT && camera.position.z - TR.z > TR.r + 0.5) exitTrophy();
    if (inC && camera.position.z - CF.z > CF.r + 0.5) exitCampfire();
    const ar = camera.position.x < -150 ? 'trophy' : camera.position.x > 150 ? 'campfire' : camera.position.z < 12 ? 'hallway' : 'entry'; if (ar !== area) { area = ar; cb.onArea && cb.onArea(ar); }
    if (!inT && !inC) for (const k of ['trophy', 'campfire']) { const [t, p] = strip(dirs[k], camera.position.x, camera.position.z); if (doorArm[k] && t > DL - 1.6 && p < hw) { doorArm[k] = false; if (k === 'trophy') enterTrophy(); else enterCampfire(); } else if (t < DL - 3.5) doorArm[k] = true; }
    const envT = camera.position.x < -150 ? envTrophy : camera.position.x > 150 ? envCamp : envTmp.copy(envEntry).lerp(envHall, sstep(12.5, 8, camera.position.z));
    if (envSnap) { envCol.copy(envT); envSnap = false; } else envCol.lerp(envT, Math.min(1, dt * 4));
    renderer.setClearColor(envCol); scene.fog.color.copy(envCol); fogU.uFog.value.copy(envCol); floor.material.color.copy(envCol);
    fallT = Math.min(1, fallT + dt / 1.7);
    dist += Math.abs(vel) * dt; camera.position.y = 1.6 + Math.sin(dist * 5.5) * 0.018 * Math.min(1, Math.abs(vel) / 2) + (1 - sstep(0, 1, fallT)) * 5;
    look.x += (lookT.x - look.x) * Math.min(1, dt * 4); look.y += (lookT.y - look.y) * Math.min(1, dt * 4);
    camera.rotation.y = yaw - look.x * 0.42; camera.rotation.x = -look.y * 0.14;
    const cz = camera.position.z;
    for (const s of scenes) {
      const d = cz - s.z;
      const target = d > -3 ? sstep(18, 7, d) : 1 - sstep(-3, -11, d);
      s.p += (target - s.p) * Math.min(1, dt * 1.6);
      s.mesh.material.uniforms.uP.value = s.p; s.mesh.material.uniforms.uTime.value = time;
      s.sh.material.opacity = s.p * 0.5; s.cap.material.opacity = sstep(0.55, 0.95, s.p);
    }
    for (const dr of drifts) {
      dr.mat.opacity = sstep(0.4, 0.9, dr.s.p) * dr.o.max;
      if (dr.mat.opacity <= 0) continue;
      for (let i = 0; i < dr.n; i++) {
        const q = dr.pd[i]; q.y -= q.v * dt; if (q.y < 0) q.y += 4.2; else if (q.y > 4.2) q.y -= 4.2;
        dummy.position.set(q.x + Math.sin(time * 0.5 + q.ph) * dr.o.sway, q.y, q.z + Math.cos(time * 0.4 + q.ph) * 0.2);
        dummy.rotation.set(q.r[0] + time * q.w[0], q.r[1] + time * q.w[1], q.r[2]); dummy.scale.setScalar(q.sc);
        dummy.updateMatrix(); dr.mesh.setMatrixAt(i, dummy.matrix);
      }
      dr.mesh.instanceMatrix.needsUpdate = true;
    }
    if (backMesh) { const bd = cz - BACK_Z, bt = camera.position.x > -150 && camera.position.x < 150 ? sstep(26, 12, bd) : 0; backMesh.material.opacity += (bt - backMesh.material.opacity) * Math.min(1, dt * 2); }
    if (nextMesh) { const d = cz - NEXT_Z, tg = d > 4.5 ? sstep(17, 9, d) : sstep(1.5, 4.5, d); nextMesh.userData.p += (tg - nextMesh.userData.p) * Math.min(1, dt * (d > 4.5 ? 1.6 : 2.6)); nextMesh.material.uniforms.uP.value = nextMesh.userData.p; nextMesh.material.uniforms.uTime.value = time; }
    ttime += dt * (0.18 + 0.82 * Math.min(1, Math.abs(vel) / 2.5 + Math.abs(turnVel) / 1.5));
    cfUpdate(dt, time, camera.position.x > 150);
    if (camera.position.x < -150 || camera.position.x > 150) {
      if (camera.position.x < -150 && (TR.fxF = (TR.fxF || 0) + 1) % 2 === 0) TR.drawFx(time);
      let h = null;
      if (!locked) { ray.setFromCamera(mndc, camera); let hit = ray.intersectObjects(trophyHits, false)[0]; if (!hit || hit.distance > 20) { ray.setFromCamera(gaze, camera); hit = ray.intersectObjects(trophyHits, false)[0]; if (hit && !GAZE_OK.has(hit.object.userData.id)) hit = null; } if (hit && hit.distance < (hit.object.userData.id === 'cutout' ? 7 : 20)) h = hit.object.userData.id; }
      if (h !== hoverId) { hoverId = h; cb.onHover && cb.onHover(h); }
      grabT += ((grabbed ? 1 : 0) - grabT) * Math.min(1, dt * 5);
      for (const t of trophies) {
        const gk = t.id === grabbed ? grabT : 0;
        t.hv += ((t.id === hoverId || t.id === grabbed ? 1 : 0) - t.hv) * Math.min(1, dt * 6);
        if (t.ringM) { t.ringM.opacity = 0.35 + 0.6 * t.hv; t.beamM.opacity = 0.14 * t.hv + 0.1 * gk; }
        t.update(ttime, t.hv, gk, time);
      }
    } else if (hoverId) { hoverId = null; cb.onHover && cb.onHover(null); }
    if (throwMesh) { const inC = camera.position.x > 150, d = camera.position.z - CF.z, ok = inC && !throwDone && !flyLog && storyI < 0;
      if (!inC) { throwT = 0; throwStage = 0; }
      if (ok && (throwT > 0 || throwMesh.userData.p > 0.6)) { throwT += dt; if (throwT > 8.5) throwDone = true; }
      [throwMesh, throwMesh2].forEach((m, k) => { const tg = !ok ? 0 : k === 0 ? (throwT > 3 ? 0 : throwT > 0 ? 1 : sstep(10.7, 8.6, d)) : (throwT > 2.3 ? 1 : 0); if (!inC) m.userData.p = 0; m.userData.p += (tg - m.userData.p) * Math.min(1, dt * (tg ? 1.6 : 2.4)); m.material.uniforms.uP.value = m.userData.p; m.material.uniforms.uTime.value = time; m.rotation.y = Math.atan2(camera.position.x - m.position.x, camera.position.z - m.position.z); m.visible = m.userData.p > 0.002; });
    }

    if (takeMesh) { const d = cz - TAKE_Z, inRoom = camera.position.x < -150, tg = !inRoom || takeDone ? 0 : d > 2 ? 1 : sstep(0.6, 2, d); if (!inRoom) { takeMesh.userData.p = 0; takeT = 0; takeDone = false; } if (tg && takeMesh.userData.p > 0.6) { takeT += dt; if (takeT > 5.5) takeDone = true; } takeMesh.userData.p += (tg - takeMesh.userData.p) * Math.min(1, dt * (tg ? 1.4 : 2.4)); takeMesh.material.uniforms.uP.value = takeMesh.userData.p; takeMesh.material.uniforms.uTime.value = time; }
    for (const m of entryArt.children) { const u = m.userData; m.rotation.x += u.w[0] * dt; m.rotation.y += u.w[1] * dt; m.rotation.z += u.w[2] * dt; fall(m, dt); }
    for (const a of anims) a(time);
    for (const g of escher.children) { g.rotation.y += g.userData.spin * dt; fall(g, dt); }
    renderer.render(scene, camera);
  };
  loop();

  return {
    reset: resetPos,
    lock: (v) => { locked = v; vel = 0; touchWalk = false; for (const k in keys) keys[k] = false; if (!v) grabbed = null; },
    goto: (k) => (k === 'trophy' ? enterTrophy() : k === 'campfire' ? enterCampfire() : resetPos()),
    stepBack: () => { camera.position.set(0.6, camera.position.y, CJ.z + 3); yaw = 0.25; vel = 0; },
    hasFocus: () => document.hasFocus(),
    endStory: () => endStory(),
    debug: () => ({ z: camera.position.z, keys: { ...keys }, vel, time }),
    teleport: (z, y) => { camera.position.z = z; if (y != null) yaw = y; scenes.forEach((s) => { s.p = 1; }); },
    dispose() {
      alive = false; cancelAnimationFrame(raf); clearTimeout(tmo);
      window.removeEventListener('resize', resize); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); window.removeEventListener('blur', blur);
      window.removeEventListener('pointermove', pm); canvas.removeEventListener('pointerdown', pdn); window.removeEventListener('pointerup', pup); window.removeEventListener('pointercancel', pup);
      renderer.dispose();
    }
  };
}
