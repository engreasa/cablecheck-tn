# WORKLOG: CableCheck TN one page site

One line per slice: what I did -> the command I ran -> what it actually printed.

- Listed the project and the picture folder -> `ls -la hello-agent hello-agent/picture hello-agent/images` -> found `picture/` (4 collage sheets plus a 0 byte `all pictures`) and `images/` with 6 cropped files: logo.png, logo-dark? no, portrait-formal.jpg, portrait-teal.jpg, speaking.jpg, work-desk.jpg, work-laptop.jpg.
- Fetched the rules into the project -> `curl -fsSL https://dashboard.freedomwithai.com/hk/harness/website-rules.md -o /tmp/rules-dl.md` -> `downloaded 15028 bytes`; `diff -q /tmp/rules-dl.md WEBSITE-RULES.md` -> `IDENTICAL`.
- Verified the image format and sizes -> `file hello-agent/images/*` -> `logo.png PNG 512x512 RGBA`, the five jpgs are 450x450, 482x516, 606x306, 1024x1024, 606x314; every file is under 500 KB.
- Built a dark logo for the dark ground -> `python3` (Pillow 12.3.0) recoloured dark pixels to `#F7F3EC`, dropped the white disc, kept teal and copper -> wrote `images/logo-dark.png` (83876 bytes) and previewed it on `#1F2A2E`.
- Wrote the page -> `hello-agent/index.html`.
- Worked out every text and background pair -> `node scripts/contrast.mjs` -> printed the table below. All pairs are 4.5:1 or better, except the two that are large-text-only and are used at large text sizes.
- Measured the real 375 px and 1440 px layouts -> `node /tmp/kc-pupp/shoot.mjs` (puppeteer-core, system Chrome) -> `[desktop-1440] innerWidth:1440, scrollWidth:1440, h1Size:"71.6px", overflow:[]` and `[mobile-375] innerWidth:375, scrollWidth:375, h1Size:"40px", overflow:[]`.
- Looked at the screenshots -> read `shots/desktop-1440-full.png` and `shots/mobile-375-full.png` -> fixed what I saw: hid the header button under 700 px (it pushed the 375 px page sideways), set the "What a contractor says" label from copper to cream (copper on charcoal is 3.88:1, under 4.5 for 14 px text), and replaced the first card icon.

## Contrast ratios (`node scripts/contrast.mjs`)

```
H1 headline                        nearblack on copper    4.86:1  AA body
hero lead + eyebrow                nearblack on copper    4.86:1  AA body
hero button label                  cream     on nearblack 16.66:1  AA body
proof H2                           cream     on charcoal  13.29:1  AA body
proof body                         cream     on charcoal  13.29:1  AA body
proof figure                       white     on charcoal  14.70:1  AA body
proof figure label                 cream     on charcoal  13.29:1  AA body
proof client quote                 cream     on charcoal  13.29:1  AA body
what H2                            nearblack on cream     16.66:1  AA body
what H2 accent word                copper    on cream      3.43:1  AA large only (H2 is 52px)
what body                          nearblack on cream     16.66:1  AA body
what card title + body             nearblack on white     18.42:1  AA body
what panel title + body            white     on teal       6.30:1  AA body
what small label                   teal      on cream      5.69:1  AA body
how H2 + numeral                   white     on teal       6.30:1  AA body
how body                           cream     on teal       5.69:1  AA body
price H2                           white     on nearblack 18.42:1  AA body
price figure                       copper    on nearblack  4.86:1  AA body
price body + FAQ answer            cream     on nearblack 16.66:1  AA body
price FAQ question                 white     on nearblack 18.42:1  AA body
price button label                 nearblack on copper    4.86:1  AA body
contact sentence                   nearblack on copper    4.86:1  AA body
contact copy                       nearblack on copper    4.86:1  AA body
contact button (booking) label     cream     on nearblack 16.66:1  AA body
contact button (whatsapp) label    nearblack on white     18.42:1  AA body
contact button (email) label       white     on teal       6.30:1  AA body
footer link + credit               cream     on charcoal  13.29:1  AA body
footer wordmark                    white     on charcoal  14.70:1  AA body

below 3:1: 0
```

The two "AA large only" rows are a 52 px headline word and the same copper accent used only at
headline size, so the 3:1 rule for text of 24 px or more applies and both pass.
