// Display labels for data enums (Traditional Chinese UI).

export const KIND_LABELS = Object.freeze({
  literal: { zh: '中式直譯', en: 'Literal translation', tip: '先想英文母語者會怎麼說，而不是把中文逐字翻過去。' },
  grammar: { zh: '文法錯誤', en: 'Grammar', tip: '留意動詞形式、時態與介系詞，這些最容易讓人誤會意思。' },
  tone: { zh: '語氣不當', en: 'Tone', tip: '同一個意思有客氣與直接的說法，先看場合和對象再開口。' },
  offtopic: { zh: '答非所問', en: 'Off-topic', tip: '先聽清楚問句開頭的 What、Where、How，再回答具體內容。' },
  culture: { zh: '文化地雷', en: 'Culture', tip: '玩笑、隱私與禮節的界線各地不同，不確定時保守一點。' },
});

export const NOTE_LABELS = Object.freeze({
  phrase: '實用句',
  grammar: '文法',
  vocab: '單字',
  culture: '文化',
  trap: '陷阱',
});

export function levelLabel(meta) {
  return `第 ${meta.number} 關`;
}
