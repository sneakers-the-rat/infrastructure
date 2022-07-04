
let deck = new Reveal({
  controls: true,
  progress: true,
  history: true,
  center: false,
  slideNumber: true,
  hashOneBasedIndex: true,
  hash:true,
  plugins: [RevealMarkdown],
  markdown: {
    gfm: true,
    baseUrl: "/infrastructure/assets/images/chmjc/"
  }
})
deck.initialize();