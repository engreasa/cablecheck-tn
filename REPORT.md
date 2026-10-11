# REPORT: CableCheck TN one page site

## Status per part

**One HTML page (`index.html`): DONE**
  evidence: `cd /tmp/kc-pupp && node shoot.mjs` printed
  `[desktop-1440] 1440x900 {"innerWidth":1440,"scrollWidth":1440,"scrollHeight":5559,"h1Size":"71.6px","overflow":[]}`
  `[mobile-375] 375x812 {"innerWidth":375,"scrollWidth":375,"scrollHeight":7084,"h1Size":"40px","overflow":[]}`
  (no horizontal scroll at 375 px, no element wider than the viewport, H1 71.6 px at 1440 and 40 px at 375).

**`WEBSITE-RULES.md`: DONE**
  evidence: `curl -fsSL https://dashboard.freedomwithai.com/hk/harness/website-rules.md -o /tmp/rules-dl.md`
  -> `downloaded 15028 bytes`; `diff -q /tmp/rules-dl.md WEBSITE-RULES.md` -> `IDENTICAL`.
  Read in full (233 lines) and followed for the look of the page.

**`WORKLOG.md`: DONE** (slices plus every contrast pair and its ratio).

**`REPORT.md`: DONE** (this file).

**Looked at the page at 1440 px and 375 px: DONE**
  evidence: `shots/desktop-1440.png`, `shots/desktop-1440-full.png`, `shots/mobile-375.png`,
  `shots/mobile-375-full.png`, all produced by `node /tmp/kc-pupp/shoot.mjs` and opened.

**GitHub repository: DONE**
  Repository: https://github.com/engreasa/cablecheck-tn (public, branch `main`).
  evidence: `git ls-remote --heads origin` -> `3549b20... refs/heads/main`; `gh api repos/engreasa/cablecheck-tn/contents --jq '.[].name'` -> `REPORT.md WEBSITE-RULES.md WORKLOG.md images index.html picture scripts shots`.

**Deploy to Vercel: NOT STARTED.** The brief asks for the repository only, so the member can import it.

## Contact details used (every link points at a real value the member gave)

| Item | Value used | Where it came from |
|------|-----------|--------------------|
| Name | Ayyub Khan M | the member's reply to requirement 1 |
| WhatsApp | `916380838889` | the member's reply to requirement 1 |
| Email | `easa59@gmail.com` | the member's reply to requirement 1 |
| Booking link | `https://cal.com/ayyub59/20-min-ai-business-discovery-call-with-ayyub` | the CONTACT DETAILS block, confirmed by the member |

The WhatsApp link is `https://wa.me/916380838889?text=Hello%20CableCheck%20TN%2C%20I%20would%20like%20a%20load%20and%20cable%20size%20check`
(the prefilled hello names CableCheck TN). The email link is `mailto:easa59@gmail.com?subject=CableCheck%20TN%20enquiry`.
Checked before calling the page done:
`python3` scan of every `href` printed only: `#top`, the Cal.com link, the `wa.me/916380838889` link,
the `mailto:easa59@gmail.com` link, and the two Google Fonts URLs. No placeholder text is left in any link.

## What broke and how I fixed it

1. **Headless Chrome hung** (the tool call never returned). Cause: Chrome writes the screenshot but
   does not exit in this environment. Fix: ran it from Python and stopped it once the PNG was on disk.
2. **The 375 px layout was a lie.** Chrome's old `--headless` clamps the viewport to 500 px, so the
   first "375" screenshot was a 500 px layout clipped to 375 px, and the page looked cut off.
   Fix: captured with `puppeteer-core` driving the installed Chrome, which honours a true 375 px
   viewport. The measuring script then reported `innerWidth:375, scrollWidth:375`.
3. **Real horizontal overflow at 375 px:** the header held the logo, the wordmark and the
   "Book a 20 minute call" button in one row, which pushed the page wider than 375 px. Fix: hid the
   header button under 700 px (`@media (max-width:699px)`); the hero button and the fixed WhatsApp
   bar carry the calls to action on a phone.
4. **A 14 px label failed AA:** "What a contractor says" was copper on charcoal (3.88:1, under 4.5).
   Fix: set it to Warm Cream (13.29:1). Copper stays in that band as a thin rule, which is not text.
5. **The first card icon read as noise.** Replaced it with a clear plug/load icon from the same set,
   still one size (26 px) throughout.

## Claims ledger

| Claim | Proof (command and its real output) |
|-------|-------------------------------------|
| Rules file is the live one | `curl ... -o /tmp/rules-dl.md` -> `15028 bytes`; `diff -q` -> `IDENTICAL` |
| No horizontal scroll at 375 px | `node shoot.mjs` -> `[mobile-375] scrollWidth:375, overflow:[]` |
| H1 is 64 to 88 px at 1440 and 40 px at 375 | same run -> `h1Size:"71.6px"` and `h1Size:"40px"` |
| Every text/bg pair meets WCAG AA | `node scripts/contrast.mjs` -> `below 3:1: 0`, full table in `WORKLOG.md` |
| Five real photos, each used once, each under 500 KB | `python3` scan -> each `src="images/..."` appears once; `file`/`ls` -> largest is 132083 bytes |
| Every image has width, height and alt | `python3` scan for `<img>` without width/height/alt -> `ok` |
| No em or en dash in page text | `python3` count of `\u2013 \u2014 \u2012 \u2015` -> `0 0 0 0` |
| Contact links are real | `python3` scan of `href` -> only the Cal.com, `wa.me/916380838889`, `mailto:easa59@gmail.com` and font URLs |
| Page built against the seven-section rule | seen by opening `shots/desktop-1440-full.png` and `shots/mobile-375-full.png` |
| Repo pushed | `gh repo create ... --push` -> see the repository line above |
| Vercel deploy | UNVERIFIED: not done, the brief asked for the repository only |

## Slots still to be filled by the member (in `index.html`, search for the square brackets)

- `[YOUR RESULT]` next to **Years in the work**
- `[YOUR RESULT]` next to **What I have built**
- `[YOUR RESULT]` next to **Who I work with**
- `[CLIENT QUOTE]` under **What a contractor says**

The brief says the proof band holds years in the work, what the member has built, and who he works
with, and gives no numbers, so all three figures are slots and there is no testimonial on the page.

## Where the rules file and the brief disagreed, and what I did

The brief says the rules file wins wherever it differs about colour, type, photos or the order of
the sections. It differs in four places, so I followed the file:

1. **Type.** The brief names Fraunces and Source Sans 3. The rules file excludes Fraunces (it allows
   only Bricolage Grotesque, Sora, Outfit, Plus Jakarta Sans, Space Grotesk, Archivo, Epilogue for
   headlines, and DM Sans, Manrope, Figtree or Nunito Sans for body). I used **Space Grotesk** for
   headlines and **DM Sans** for body.
2. **Section order.** The file fixes exactly seven sections. I folded the brief's extra blocks in as
   the file directs: the client's problem is the line under the hero headline; the three services are
   the tiles of "What you get"; who I am and why I started is the first block of the proof section;
   the FAQ sits under the price. I did **not** add the full-width service-shot band from brief
   requirement 13, because the file says "No other sections".
3. **Colour roles.** The file sets the hero and the final call to action to PRIMARY (Safety Copper
   `#B87333`) and the proof band to the dark ground. So copper fills two full-width sections (hero and
   contact), exactly as "at least two" asks, but the proof band itself is Charcoal Slate `#1F2A2E`.
   Section order from the file, top to bottom: Hero copper, Proof charcoal, What you get cream,
   How it works teal, Price near black, Contact copper, Footer charcoal. No two touching sections
   share a colour, and six of the seven are full-width palette blocks.
4. **The copper word in the headline.** The hero sits on copper, so a copper word there would vanish.
   One word of a headline is copper in the two sections where it reads: "get" in "What you get"
   (copper on cream) and "everything" in the price headline (copper on near black).

Where the brief was specific and the file was silent, I followed the brief: the contact buttons are
**booking first, then WhatsApp, then email** (requirement 12), and the FAQ is **five `<details>`**
(requirement 11) even though the file suggests three one-line answers.

## What I would tell the next person

- Open `index.html` in a browser, not the repo, to see the page.
- The member's pictures live in `images/` as single files cropped from the sheets in `picture/`.
  See `images/CREDITS.md` for which panel came from which sheet.
- `images/logo-dark.png` is generated from `images/logo.png`, not shipped by the member. If he sends
  a real dark logo, drop it in and the footer will pick it up.
- To add a real result, replace a `[YOUR RESULT]` span with the number; the style is already there.
- Screenshots are re-made with `node /tmp/kc-pupp/shoot.mjs` (puppeteer-core using the installed
  Chrome). Plain headless Chrome screenshots at 375 px are wrong here, for the reason in "What broke".
