// オリジナルマスコット「まきまる」（仮名）：巻物の妖精。SVG を自作（5回目に描き直し）
// 表情（mood）は #mascot の data-mood で切り替える：normal / happy / combo / oops / festival
// 着せ替え（outfit）は data-outfit で切り替える：none / chonmage / jingasa / eboshi / hakase / kabuto
export const MASCOT_NAME = 'まきまる';

export const MOODS = ['normal', 'happy', 'combo', 'oops', 'festival'];

const INK = '#3b2414';

export function mascotSVG() {
  return `
<svg viewBox="0 0 160 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${MASCOT_NAME}">
  <ellipse class="m-shadow" cx="80" cy="182" rx="40" ry="6" fill="#000" opacity=".22"/>
  <g class="m-body">
    <!-- マント（着せ替え：はかせぼうのとき後ろに） -->
    <!-- 足 -->
    <ellipse cx="60" cy="170" rx="13" ry="8" fill="#8a4b25" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="100" cy="170" rx="13" ry="8" fill="#8a4b25" stroke="${INK}" stroke-width="3"/>
    <!-- 腕 -->
    <g class="m-arm m-arm-l"><path d="M34 112 q-18 -2 -24 -18" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M34 112 q-18 -2 -24 -18" stroke="#fff3d2" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <g class="m-arm m-arm-r"><path d="M126 112 q18 -2 24 -18" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M126 112 q18 -2 24 -18" stroke="#fff3d2" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <!-- からだ（巻物の紙） -->
    <rect x="30" y="50" width="100" height="118" rx="44" fill="#fff6dc" stroke="${INK}" stroke-width="4"/>
    <path d="M44 150 q36 10 72 0" stroke="#ecd9a8" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M52 138 h56" stroke="#ecd9a8" stroke-width="3" stroke-linecap="round"/>
    <!-- 上の軸（頭） -->
    <rect x="22" y="36" width="116" height="22" rx="11" fill="#b5652f" stroke="${INK}" stroke-width="4"/>
    <path d="M30 42 h100" stroke="#d98a4e" stroke-width="3" stroke-linecap="round"/>
    <circle cx="22" cy="47" r="13" fill="#f6c14d" stroke="${INK}" stroke-width="4"/>
    <circle cx="138" cy="47" r="13" fill="#f6c14d" stroke="${INK}" stroke-width="4"/>
    <circle cx="18" cy="43" r="4" fill="#fff" opacity=".7"/><circle cx="134" cy="43" r="4" fill="#fff" opacity=".7"/>
    <!-- 赤いひも -->
    <path d="M138 60 q6 14 -2 26" stroke="#e63946" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="136" cy="88" r="5" fill="#e63946" stroke="${INK}" stroke-width="2"/>

    <!-- ほっぺ -->
    <ellipse cx="50" cy="112" rx="10" ry="6" fill="#ff8fa3" opacity=".75"/>
    <ellipse cx="110" cy="112" rx="10" ry="6" fill="#ff8fa3" opacity=".75"/>

    <!-- 目：ふつう -->
    <g class="m-eyes m-eyes-normal">
      <ellipse cx="60" cy="94" rx="9" ry="12" fill="${INK}"/><ellipse cx="100" cy="94" rx="9" ry="12" fill="${INK}"/>
      <circle cx="63" cy="89" r="3.6" fill="#fff"/><circle cx="103" cy="89" r="3.6" fill="#fff"/>
      <circle cx="57" cy="99" r="1.8" fill="#fff"/><circle cx="97" cy="99" r="1.8" fill="#fff"/>
    </g>
    <!-- 目：正解（にっこり） -->
    <g class="m-eyes m-eyes-happy">
      <path d="M50 98 q10 -14 20 0" stroke="${INK}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <path d="M90 98 q10 -14 20 0" stroke="${INK}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    </g>
    <!-- 目：コンボ（星） -->
    <g class="m-eyes m-eyes-combo">
      <path d="M60 81 l3.8 8 8.7 1 -6.4 6 1.8 8.6 -7.9 -4.4 -7.9 4.4 1.8 -8.6 -6.4 -6 8.7 -1z" fill="#ffc300" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M100 81 l3.8 8 8.7 1 -6.4 6 1.8 8.6 -7.9 -4.4 -7.9 4.4 1.8 -8.6 -6.4 -6 8.7 -1z" fill="#ffc300" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    </g>
    <!-- 目：不正解（ちょっと残念。まゆが下がる） -->
    <g class="m-eyes m-eyes-oops">
      <path d="M48 85 l16 -6" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M112 85 l-16 -6" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="60" cy="97" rx="7" ry="8" fill="${INK}"/><ellipse cx="100" cy="97" rx="7" ry="8" fill="${INK}"/>
      <circle cx="62" cy="94" r="2.4" fill="#fff"/><circle cx="102" cy="94" r="2.4" fill="#fff"/>
    </g>
    <!-- 目：まつり（><） -->
    <g class="m-eyes m-eyes-festival">
      <path d="M52 87 l14 8 -14 8" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M108 87 l-14 8 14 8" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- 口 -->
    <path class="m-mouth m-mouth-normal" d="M72 114 q8 8 16 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g class="m-mouth m-mouth-happy">
      <path d="M68 111 q12 18 24 0 z" fill="#c2272d" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M74 120 q6 -5 12 0" fill="#ff8fa3"/>
    </g>
    <g class="m-mouth m-mouth-combo">
      <path d="M64 109 q16 26 32 0 z" fill="#c2272d" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M72 121 q8 -6 16 0" fill="#ff8fa3"/>
    </g>
    <path class="m-mouth m-mouth-oops" d="M70 119 q5 -6 10 0 q5 6 10 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g class="m-mouth m-mouth-festival">
      <ellipse cx="80" cy="116" rx="11" ry="9" fill="#c2272d" stroke="${INK}" stroke-width="3.5"/>
      <path d="M73 120 q7 -5 14 0" fill="#ff8fa3"/>
    </g>

    <!-- 汗（不正解） -->
    <path class="m-sweat" d="M122 72 q8 12 0 16 q-8 -4 0 -16z" fill="#7cc6ff" stroke="${INK}" stroke-width="2.5"/>
    <!-- きらきら（コンボ） -->
    <g class="m-sparkle" fill="#fff6a8" stroke="${INK}" stroke-width="2">
      <path d="M8 74 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/>
      <path d="M150 120 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z"/>
    </g>
    <!-- はちまき（まつり・段階5〜） -->
    <g class="m-hachimaki">
      <path d="M31 70 q49 -10 98 0 v11 q-49 -10 -98 0z" fill="#e63946" stroke="${INK}" stroke-width="3"/>
      <path d="M128 74 l18 -10 M128 77 l20 4" stroke="#e63946" stroke-width="7" stroke-linecap="round"/>
      <circle cx="80" cy="70" r="5" fill="#fff"/>
    </g>

    <!-- 着せ替え -->
    <g class="m-outfit m-outfit-chonmage">
      <path d="M68 38 q12 -26 24 0" fill="${INK}" stroke="${INK}" stroke-width="3"/>
      <rect x="62" y="16" width="36" height="9" rx="4.5" fill="${INK}"/>
      <rect x="74" y="18" width="12" height="5" fill="#e63946"/>
    </g>
    <g class="m-outfit m-outfit-jingasa">
      <path d="M14 40 q66 -46 132 0 q-66 -10 -132 0z" fill="#2b2b2b" stroke="${INK}" stroke-width="3"/>
      <circle cx="80" cy="20" r="7" fill="#f6c14d" stroke="${INK}" stroke-width="2.5"/>
    </g>
    <g class="m-outfit m-outfit-eboshi">
      <path d="M58 40 q-2 -34 30 -36 q-10 14 6 36z" fill="#1f1f1f" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    </g>
    <g class="m-outfit m-outfit-hakase">
      <path d="M44 34 h72 v8 h-72z" fill="#1d2440" stroke="${INK}" stroke-width="3"/>
      <path d="M30 22 l50 -14 50 14 -50 14z" fill="#1d2440" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M118 22 v22" stroke="#ffc300" stroke-width="3"/><circle cx="118" cy="46" r="4" fill="#ffc300"/>
    </g>
    <g class="m-outfit m-outfit-kabuto">
      <path d="M28 42 q52 -40 104 0z" fill="#3a3f78" stroke="${INK}" stroke-width="3"/>
      <path d="M80 26 q-30 -6 -40 -24 q22 10 40 14 q18 -4 40 -14 q-10 18 -40 24z" fill="#ffc300" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="80" cy="30" r="6" fill="#e63946" stroke="${INK}" stroke-width="2.5"/>
    </g>
  </g>
</svg>`;
}
