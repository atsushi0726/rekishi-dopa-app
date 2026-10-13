// 記録と設定を端末内（localStorage）に保存する。外部には送信しない。
import { SESSION_LENGTH } from './game.js';

export const STORAGE_KEY = 'rekishi-dopa:v1';

export function defaultSettings(prefersReducedMotion = false) {
  return { motion: prefersReducedMotion ? 'low' : 'normal', muted: false, bgm: true, difficulty: 'normal' };
}

export function emptyRecord() {
  return { plays: 0, bestScore: 0, bestCorrect: 0, bestCombo: 0, bestStage: 0 };
}

function getStore(store) {
  if (store) return store;
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

export function load(store, prefersReducedMotion = false) {
  const base = { settings: defaultSettings(prefersReducedMotion), records: {}, lastUnit: null, weak: {}, stats: null, outfit: 'none' };
  const s = getStore(store);
  if (!s) return base;
  try {
    const raw = s.getItem(STORAGE_KEY);
    if (!raw) return base;
    const data = JSON.parse(raw);
    return {
      settings: { ...base.settings, ...(data.settings || {}) },
      records: data.records && typeof data.records === 'object' ? data.records : {},
      lastUnit: typeof data.lastUnit === 'string' ? data.lastUnit : null,
      weak: cleanWeak(data.weak),
      stats: cleanStats(data.stats),
      outfit: typeof data.outfit === 'string' ? data.outfit : 'none',
    };
  } catch {
    return base;
  }
}

// 累計の記録（遊んだ回数など）。オブジェクトでなければ null、数が壊れていれば 0 にする（12回目：進化の段階に使うため）
function cleanStats(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
  const n = (x) => (Number.isInteger(x) && x >= 0 ? x : 0);
  return { plays: n(v.plays), correct: n(v.correct), bestCombo: n(v.bestCombo), perfects: n(v.perfects),
    festivals: n(v.festivals), perfect5: n(v.perfect5) };
}

// にがて問題の記録 { 単元id: [問題id, ...] } を、壊れた値を捨てて読み直す
function cleanWeak(w) {
  const out = {};
  if (!w || typeof w !== 'object' || Array.isArray(w)) return out;
  for (const [unitId, ids] of Object.entries(w)) {
    if (!Array.isArray(ids)) continue;
    const list = [...new Set(ids.filter((x) => typeof x === 'string'))];
    if (list.length) out[unitId] = list;
  }
  return out;
}

// 1問の結果をにがて問題の記録に反映した新しい記録を返す（まちがえたら追加、正解したら外す）
export function updateWeak(weak, unitId, questionId, isCorrect) {
  const list = (weak && weak[unitId]) || [];
  const next = isCorrect ? list.filter((x) => x !== questionId)
    : list.includes(questionId) ? list : [...list, questionId];
  const out = { ...(weak || {}) };
  if (next.length) out[unitId] = next;
  else delete out[unitId];
  return out;
}

export function save(data, store) {
  const s = getStore(store);
  if (!s) return false;
  try {
    s.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

// 20回目（1周を20問から5問に）：記録に1周の問題数 len を持たせる。len のない記録は19回目までの20問の記録。
// 点数・正解数・コンボは問題数で大きさが変わるので、問題数のちがう記録とは比べない（5問のベストは0から）。
// 20問の記録は消さずに old に移して残す。遊んだ回数（plays）と到達段階（bestStage・まつりの単元数に使う）は引きつぐ
export function recordLen(record) {
  return record && Number.isInteger(record.len) ? record.len : 20;
}

// 今の問題数でのベスト（問題数のちがう記録なら null）
export function currentBest(record, len = SESSION_LENGTH) {
  if (!record || !record.plays || recordLen(record) !== len) return null;
  return { bestScore: record.bestScore || 0, bestCorrect: record.bestCorrect || 0, bestCombo: record.bestCombo || 0 };
}

// 問題数のちがう古い記録のベスト（なければ null）。一度移したもの（old）もここから読む
export function oldBest(record, len = SESSION_LENGTH) {
  if (!record || !record.plays) return null;
  if (recordLen(record) !== len) {
    return { len: recordLen(record), bestScore: record.bestScore || 0, bestCorrect: record.bestCorrect || 0, bestCombo: record.bestCombo || 0 };
  }
  return record.old && typeof record.old === 'object' ? record.old : null;
}

// プレイ結果を記録にまとめる（新しい記録オブジェクトを返す）
export function mergeRecord(record, run, len = SESSION_LENGTH) {
  const r = { ...emptyRecord(), ...(record || {}) };
  const cur = currentBest(record, len) || { bestScore: 0, bestCorrect: 0, bestCombo: 0 };
  const old = oldBest(record, len);
  return {
    len,
    plays: r.plays + 1,
    bestScore: Math.max(cur.bestScore, run.score),
    bestCorrect: Math.max(cur.bestCorrect, run.correct),
    bestCombo: Math.max(cur.bestCombo, run.maxCombo),
    bestStage: Math.max(r.bestStage, run.stage),
    ...(old ? { old } : {}),
  };
}

// ベスト記録の更新状況（結果画面の特別演出用）。更新でなければ null
// kind: 'first'＝今の問題数ではじめての記録（20問の記録しかない場合も）、'update'＝前のベストをこえた
export function bestStatus(record, run, len = SESSION_LENGTH) {
  const cur = currentBest(record, len);
  const before = cur ? cur.bestScore : 0;
  if (!run || run.score <= before) return null;
  return { kind: before > 0 ? 'update' : 'first', before, after: run.score };
}
