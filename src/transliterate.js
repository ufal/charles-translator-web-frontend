const cyrilToLatinTable = {
  А: "A",
  Б: "B",
  В: "V",
  Г: "H",
  Д: "D",
  Е: "E",
  Ё: "Ë",
  Ж: "Ž",
  З: "Z",
  И: "Y",
  Й: "J",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "CH",
  Ц: "C",
  Ч: "Č",
  Ш: "Š",
  Щ: "ŠČ",
  Ъ: "'",
  Ы: "Y",
  Ь: "'",
  Э: "È",
  Ю: "JU",
  Я: "JA",
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  д: "d",
  е: "e",
  ё: "ë",
  ж: "ž",
  з: "z",
  и: "y",
  й: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "ch",
  ц: "c",
  ч: "č",
  ш: "š",
  щ: "šč",
  ъ: "'",
  ы: "y",
  ь: "'",
  э: "è",
  ю: "ju",
  я: "ja",
  Є: "JE",
  І: "I",
  Ї: "JI",
  Ґ: "G",
  є: "je",
  і: "i",
  ї: "ji",
  ґ: "g",
  Ў: "W",
  ў: "w",
  Ђ: "Đ",
  Ј: "J",
  Љ: "LJ",
  Њ: "NJ",
  Ћ: "Ć",
  Џ: "DŽ",
  ђ: "đ",
  ј: "j",
  љ: "lj",
  њ: "nj",
  ћ: "ć",
  џ: "dž",
  Ѓ: "Ď",
  Ѕ: "DZ",
  Ќ: "Ť",
  ѓ: "ď",
  ѕ: "dz",
  ќ: "ť",
};

export function transliterateCyrilToLatin(text) {
  const output = [];
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) in cyrilToLatinTable) {
      var candidate = cyrilToLatinTable[text.charAt(i)];
      if (
        candidate.length > 1 &&
        i < text.length - 1 &&
        text.charAt(i + 1) == text.charAt(i + 1).toLowerCase()
      ) {
        candidate = candidate.charAt(0) + candidate.substring(1).toLowerCase();
      }
      output.push(candidate);
    } else {
      output.push(text.charAt(i));
    }
  }
  return output.join("");
}

const latinToCyrilDoubleTable = {
  CH: "Х",
  ŠČ: "Щ",
  JU: "Ю",
  JA: "Я",
  ch: "х",
  šč: "щ",
  ju: "ю",
  ja: "я",
  JE: "Є",
  JI: "Ї",
  je: "є",
  ji: "ї",
  LJ: "Љ",
  NJ: "Њ",
  DŽ: "Џ",
  lj: "љ",
  nj: "њ",
  dž: "џ",
  DZ: "Ѕ",
  dz: "ѕ",
};

const latinToCyrilSingleTable = {
  A: "А",
  B: "Б",
  V: "В",
  H: "Г",
  D: "Д",
  E: "Е",
  Ë: "Ё",
  Ž: "Ж",
  Z: "З",
  Y: "И",
  J: "Й",
  K: "К",
  L: "Л",
  M: "М",
  N: "Н",
  O: "О",
  P: "П",
  R: "Р",
  S: "С",
  T: "Т",
  U: "У",
  F: "Ф",
  C: "Ц",
  Č: "Ч",
  Š: "Ш",
  "'": "Ъ",
  Y: "Ы",
  "'": "Ь",
  È: "Э",
  a: "а",
  b: "б",
  v: "в",
  h: "г",
  d: "д",
  e: "е",
  ë: "ё",
  ž: "ж",
  z: "з",
  y: "и",
  j: "й",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
  c: "ц",
  č: "ч",
  š: "ш",
  "'": "ъ",
  y: "ы",
  "'": "ь",
  è: "э",
  I: "І",
  G: "Ґ",
  i: "і",
  g: "ґ",
  W: "Ў",
  w: "ў",
  Đ: "Ђ",
  J: "Ј",
  Ć: "Ћ",
  đ: "ђ",
  ć: "ћ",
  Ď: "Ѓ",
  Ť: "Ќ",
  ď: "ѓ",
  ќ: "ť",
  ě: "є",
  Ě: "Є",
  Q: "KB",
  q: "кв",
  Ř: "РЖ",
  ř: "рж",
};

export function transliterateLatinToCyril(text) {
  const output = [];
  for (var i = 0; i < text.length; i++) {
    var bigram = text.substring(i, i + 2);
    if (bigram.charAt(0) == bigram.charAt(0).toUpperCase()) {
      bigram = bigram.toUpperCase();
    }

    if (bigram in latinToCyrilDoubleTable) {
      output.push(latinToCyrilDoubleTable[bigram]);
      i++;
    } else if (text.charAt(i) in latinToCyrilSingleTable) {
      output.push(latinToCyrilSingleTable[text.charAt(i)]);
    } else {
      output.push(text.charAt(i));
    }
  }
  return output.join("");
}
