// The Realm — ambient audio. Web Audio gain nodes so volume works on iOS too.
(function () {
  const BASE = 'assets/audio/';
  const T = {
    crystal:  { src: 'crystal-arrive.wav',  vol: 0.45, loop: false },
    entry:    { src: 'entry-dark.mp3',      vol: 0.06, loop: true },
    hallway:  { src: 'origin-lofi.mp3',     vol: 0.16, loop: true },
    trophy:   { src: 'awards-lofi.mp3',     vol: 0.16, loop: false },
    campfire: { src: 'campfire.mp3',        vol: 0.32, loop: true },
  };
  const FADE_IN = 2.5, FADE_OUT = 1.6;
  let ctx = null, master = null, started = false, area = 'entry', entryReady = false;
  let muted = false; try { muted = localStorage.getItem('realm-muted') === '1'; } catch (e) {}
  const listeners = new Set();

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(ctx.destination);
    for (const k in T) {
      const t = T[k], el = new Audio(BASE + t.src); el.loop = t.loop; el.preload = 'auto'; el.crossOrigin = 'anonymous';
      const g = ctx.createGain(); g.gain.value = 0; ctx.createMediaElementSource(el).connect(g); g.connect(master);
      t.el = el; t.g = g;
    }
    return true;
  }
  function ramp(k, to, dur) {
    const t = T[k], n = ctx.currentTime, g = t.g.gain;
    g.cancelScheduledValues(n); g.setValueAtTime(g.value, n); g.linearRampToValueAtTime(to, n + dur);
    clearTimeout(t.stopT);
    if (to === 0) t.stopT = setTimeout(() => { if (t.g.gain.value < 0.001) t.el.pause(); }, dur * 1000 + 80);
  }
  function play(k) {
    const t = T[k]; if (!t.loop && t.el.ended) t.el.currentTime = 0;
    clearTimeout(t.stopT); const p = t.el.play(); if (p && p.catch) p.catch(() => {});
    ramp(k, t.vol, FADE_IN);
  }
  function apply() {
    if (!started) return;
    for (const k of ['entry', 'hallway', 'trophy', 'campfire']) {
      const want = k === area && (k !== 'entry' || entryReady);
      if (want) play(k); else ramp(k, 0, FADE_OUT);
    }
  }
  function start() {
    if (started) return; if (!ctx && !build()) return;
    if (ctx.state === 'suspended') ctx.resume();
    started = true;
    const c = T.crystal; c.g.gain.value = c.vol; c.el.currentTime = 0; const p = c.el.play(); if (p && p.catch) p.catch(() => {});
    const go = () => { if (entryReady) return; entryReady = true; apply(); };
    c.el.addEventListener('ended', go, { once: true }); setTimeout(go, 4000);
    // non-looping awards track fades out near its end instead of cutting off
    T.trophy.el.addEventListener('timeupdate', () => { const e = T.trophy.el; if (e.duration && e.duration - e.currentTime < FADE_OUT + 0.2 && T.trophy.g.gain.value > 0.01 && !T.trophy.fading) { T.trophy.fading = true; ramp('trophy', 0, FADE_OUT); } });
    T.trophy.el.addEventListener('play', () => { T.trophy.fading = false; });
  }
  const unlock = () => { start(); if (ctx && ctx.state === 'suspended') ctx.resume(); };
  window.addEventListener('pointerdown', unlock, true);
  window.addEventListener('keydown', unlock, true);
  document.addEventListener('visibilitychange', () => { if (!ctx) return; document.hidden ? ctx.suspend() : ctx.resume(); });

  window.RealmAudio = {
    setArea(a) { if (a === area) return; area = a; apply(); },
    isMuted: () => muted,
    toggleMute() {
      muted = !muted; try { localStorage.setItem('realm-muted', muted ? '1' : '0'); } catch (e) {}
      if (!started) start();
      if (ctx) { const n = ctx.currentTime; master.gain.cancelScheduledValues(n); master.gain.setValueAtTime(master.gain.value, n); master.gain.linearRampToValueAtTime(muted ? 0 : 1, n + 0.4); }
      listeners.forEach((f) => f(muted)); return muted;
    },
    onMute(f) { listeners.add(f); return () => listeners.delete(f); },
  };
})();
