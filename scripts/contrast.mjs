const lum = (hex) => { const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const C = {
  copper: '#B87333',
  teal: '#0F6B6B',
  charcoal: '#1F2A2E',
  cream: '#F7F3EC',
  nearblack: '#141414',
  white: '#FFFFFF',
  black: '#000000',
};

const pairs = [
  ['H1 headline', 'nearblack', 'copper'],
  ['hero lead + eyebrow', 'nearblack', 'copper'],
  ['hero button label', 'cream', 'nearblack'],
  ['proof H2', 'cream', 'charcoal'],
  ['proof body', 'cream', 'charcoal'],
  ['proof figure', 'white', 'charcoal'],
  ['proof figure label (accent)', 'copper', 'charcoal'],
  ['proof client quote', 'cream', 'charcoal'],
  ['what H2', 'nearblack', 'cream'],
  ['what H2 accent word', 'copper', 'cream'],
  ['what body', 'nearblack', 'cream'],
  ['what card title + body', 'nearblack', 'white'],
  ['what panel title + body', 'white', 'teal'],
  ['what small label', 'teal', 'cream'],
  ['how H2 + numeral', 'white', 'teal'],
  ['how body', 'cream', 'teal'],
  ['price H2', 'white', 'nearblack'],
  ['price figure', 'copper', 'nearblack'],
  ['price body + FAQ answer', 'cream', 'nearblack'],
  ['price FAQ question', 'white', 'nearblack'],
  ['price button label', 'nearblack', 'copper'],
  ['contact sentence', 'nearblack', 'copper'],
  ['contact copy', 'nearblack', 'copper'],
  ['contact button (booking) label', 'cream', 'nearblack'],
  ['contact button (whatsapp) label', 'nearblack', 'white'],
  ['contact button (email) label', 'white', 'teal'],
  ['footer link + credit', 'cream', 'charcoal'],
  ['footer wordmark', 'white', 'charcoal'],
];

let fail = 0;
for (const [name, fg, bg] of pairs) {
  const r = ratio(C[fg], C[bg]);
  const ok = r >= 4.5 ? 'AA body' : r >= 3 ? 'AA large only' : 'FAIL';
  if (r < 3) fail += 1;
  console.log(`${name.padEnd(34)} ${fg.padEnd(9)} on ${bg.padEnd(9)} ${r.toFixed(2)}:1  ${ok}`);
}
console.log('\nbelow 3:1:', fail);
