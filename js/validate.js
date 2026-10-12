// 問題データの形式検査。エラーメッセージの配列を返す（空なら OK）

const CHECK_VALUES = ['定説', '要確認'];
const IMPORTANCE_VALUES = ['A', 'B', 'C']; // 出題頻度の重要度（8回目。docs/IMPORTANCE.md）

function nonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

export function validateQuestion(q) {
  const errs = [];
  const id = q && q.id ? q.id : '(id なし)';
  const e = (msg) => errs.push(`${id}: ${msg}`);
  if (!q || typeof q !== 'object') return ['問題がオブジェクトではない'];
  if (!nonEmptyString(q.id)) e('id がない');
  if (!nonEmptyString(q.prompt)) e('prompt がない');
  if (!nonEmptyString(q.explanation)) e('explanation がない');
  // 12回目：まちがえたときに読まれやすいよう、解説は60字まで（「超簡単な説明」）
  else if (q.explanation.length > 60) e('explanation が長すぎる（60字まで）');
  if (!CHECK_VALUES.includes(q.check)) e(`check は ${CHECK_VALUES.join(' / ')} のどちらか`);
  if (!IMPORTANCE_VALUES.includes(q.importance)) e(`importance は ${IMPORTANCE_VALUES.join(' / ')} のどれか`);

  if (q.type === 'choice') {
    if (!Array.isArray(q.choices) || q.choices.length !== 4) e('choices は4つ');
    else {
      if (!q.choices.every(nonEmptyString)) e('choices に空の要素がある');
      if (new Set(q.choices).size !== 4) e('choices が重複している');
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) e('answer は 0〜3 の整数');
  } else if (q.type === 'order') {
    if (!Array.isArray(q.items) || q.items.length < 3 || q.items.length > 4) e('items は3〜4個');
    else {
      q.items.forEach((it, i) => {
        if (!it || !nonEmptyString(it.text)) e(`items[${i}].text がない`);
        if (!it || !Number.isInteger(it.year)) e(`items[${i}].year が整数でない`);
        if (i > 0 && it && q.items[i - 1] && !(it.year > q.items[i - 1].year)) {
          e(`items[${i}] の年が前より新しくない（古い順・同じ年は不可）`);
        }
      });
      if (new Set(q.items.map((it) => it && it.text)).size !== q.items.length) e('items の text が重複');
    }
  } else if (q.type === 'match') {
    if (!Array.isArray(q.pairs) || q.pairs.length < 3 || q.pairs.length > 4) e('pairs は3〜4組');
    else {
      q.pairs.forEach((p, i) => {
        if (!p || !nonEmptyString(p.left) || !nonEmptyString(p.right)) e(`pairs[${i}] に空の欄`);
      });
      if (new Set(q.pairs.map((p) => p && p.left)).size !== q.pairs.length) e('pairs の left が重複');
      if (new Set(q.pairs.map((p) => p && p.right)).size !== q.pairs.length) e('pairs の right が重複');
    }
  } else if (q.type === 'reason') {
    // 理由・目的を考える問い（10回目）。自動採点はせず、模範解答と要点を見て本人が自己採点する
    if (!nonEmptyString(q.answerText)) e('answerText（模範解答）がない');
    else if (q.answerText.length > 80) e('answerText が長すぎる（80字まで）');
    if (!Array.isArray(q.points) || q.points.length < 1 || q.points.length > 3) e('points（要点）は1〜3個');
    else {
      if (!q.points.every(nonEmptyString)) e('points に空の要素がある');
      if (new Set(q.points).size !== q.points.length) e('points が重複している');
    }
  } else {
    e(`type が不明: ${q.type}`);
  }
  return errs;
}

export function validateUnit(data) {
  const errs = [];
  if (!data || typeof data !== 'object') return ['データがオブジェクトではない'];
  if (!nonEmptyString(data.unit)) errs.push('unit がない');
  if (!nonEmptyString(data.title)) errs.push('title がない');
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    errs.push('questions がない');
    return errs;
  }
  const seen = new Set();
  for (const q of data.questions) {
    errs.push(...validateQuestion(q));
    if (q && q.id) {
      if (seen.has(q.id)) errs.push(`${q.id}: id が重複`);
      seen.add(q.id);
    }
  }
  return errs;
}
