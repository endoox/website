# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: case-connect-workers-reference.spec.js >> inspect testimonial wall
- Location: ../../../../private/tmp/case-connect-workers-reference.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('What firms are saying.', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - link "Case Connect home" [ref=e4] [cursor=pointer]:
      - /url: "#top"
      - img "Case Connect" [ref=e5]
    - link "Book a demo" [ref=e6] [cursor=pointer]:
      - /url: /book-a-demo.html
  - main [ref=e10]:
    - generic [ref=e12]:
      - heading "More signed cases. Less intake roulette." [level=1] [ref=e13]:
        - text: More signed cases.
        - generic [ref=e14]: Less intake roulette.
      - paragraph [ref=e15]: Qualified MVA leads or fully signed cases—on your retainer, in your market, ready for your team.
      - link "Book a 20-minute demo" [ref=e17] [cursor=pointer]:
        - /url: /book-a-demo.html
      - generic "Case Connect results" [ref=e20]:
        - generic [ref=e21]:
          - strong [ref=e22]: 30K+
          - generic [ref=e23]: signed last year
        - generic [ref=e24]:
          - strong [ref=e25]: "150"
          - generic [ref=e26]: signed per day
        - generic [ref=e27]:
          - strong [ref=e28]: National
          - generic [ref=e29]: market coverage
  - generic [ref=e30]:
    - generic:
      - heading "One moment. Six decisive moves." [level=2]: One moment.Six decisive moves.
      - paragraph: From the red light to your retainer, every move happens inside one connected acquisition engine.
    - generic [ref=e31]:
      - generic [ref=e32]:
        - article:
          - generic:
            - heading "The accident" [level=3]
            - paragraph: Rear-ended at a red light. Hurt, scared, and about to search for a lawyer.
      - generic [ref=e33]:
        - article:
          - generic:
            - img:
              - generic:
                - generic:
                  - generic: CASE CONNECT
                  - generic: INJURED?
                  - generic: TALK TO US
          - generic:
            - heading "Our ad gets there first" [level=3]
            - paragraph: $5M+ a month across every major platform, plus a source we own outright that nobody else can buy from.
      - generic [ref=e34]:
        - article:
          - generic:
            - img:
              - generic:
                - generic: QUESTION 03 / 07
                - generic: QUESTION 04 / 07
                - generic: QUESTION 05 / 07
          - generic:
            - heading "Seven questions decide if it counts" [level=3]
            - paragraph: Clear liability. Real coverage. Our call center screens it on our dime, not yours.
      - generic [ref=e35]:
        - article:
          - generic:
            - img:
              - generic: 👀
          - generic:
            - heading "An attorney reads the file" [level=3]
            - paragraph: A Case Connect staff attorney reviews the full intake record before you ever see it.
      - generic [ref=e36]:
        - article:
          - generic:
            - heading "They sign your firm's retainer" [level=3]
            - paragraph: Not ours. E-signed by the client, on the paper you approved.
      - generic [ref=e37]:
        - article:
          - generic:
            - img:
              - generic: YOUR FIRM
          - generic:
            - heading "The case lands with your firm" [level=3]
            - paragraph: About 150 times a day, a case lands on somebody's retainer. It should be yours.
  - generic [ref=e38]:
    - heading "Case Connect, by the numbers." [level=2] [ref=e40]: Case Connect,by the numbers.
    - generic [ref=e41]:
      - generic [ref=e42]:
        - strong [ref=e43]: $200M+
        - paragraph [ref=e44]: spent on legal ads since 2020, all of it ours
      - generic [ref=e45]:
        - strong [ref=e46]: $5M+/mo
        - paragraph [ref=e47]: going out the door every month right now
      - generic [ref=e48]:
        - strong [ref=e49]: 30,000+
        - paragraph [ref=e50]: cases signed last year alone
      - generic [ref=e51]:
        - strong [ref=e52]: 150/day
        - paragraph [ref=e53]: current signing pace, across the country
      - generic [ref=e54]:
        - strong [ref=e55]: 120+
        - paragraph [ref=e56]: personal injury firms scaled on our cases
  - generic [ref=e57]:
    - generic [ref=e58]:
      - heading "What firms are saying." [level=2] [ref=e59]: What firmsare saying.
      - paragraph [ref=e60]: Real outcomes from firms working real cases—not polished hypotheticals.
    - generic [ref=e61]:
      - generic [ref=e63]:
        - generic [ref=e64]:
          - article [ref=e65]:
            - generic [ref=e66]: “
            - blockquote [ref=e67]: “The program is working fantastically. The transition is flawless.”
            - generic [ref=e68]:
              - strong [ref=e69]: Roland P.
              - generic [ref=e70]: Karns & Karns
              - generic [ref=e71]: Partner update, July 2026
          - article [ref=e72]:
            - strong [ref=e73]: "63"
            - generic [ref=e74]: cases signed and kept by one firm in a single month
          - article [ref=e75]:
            - generic [ref=e76]: “
            - blockquote [ref=e77]: “My team is like, hey, can we get more cases? We're a little bored over here.”
            - generic [ref=e78]:
              - strong [ref=e79]: Karishma A.
              - generic [ref=e80]: Collision Law
              - generic [ref=e81]: Raised her order 50 → 70 on that same call
          - article [ref=e82]:
            - generic [ref=e83]: “
            - blockquote [ref=e84]: “This is phenomenal! Thank you so much.”
            - generic [ref=e85]:
              - strong [ref=e86]: Ralph M.
              - generic [ref=e87]: Founding Partner, Ramrock Law
              - generic [ref=e88]: Then asked to expand into 3 more states
          - article [ref=e89]:
            - strong [ref=e90]: "7"
            - generic [ref=e91]: cases signed on a single Saturday, per the client's own report
          - article [ref=e92]:
            - generic [ref=e93]: “
            - blockquote [ref=e94]: “I appreciate you guys. Keep up the great work.”
            - generic [ref=e95]:
              - strong [ref=e96]: Jared C.
              - generic [ref=e97]: CEO, AutoInjuryFirm.com
          - article [ref=e98]:
            - strong [ref=e99]: "27"
            - generic [ref=e100]: cases signed across 5 states in one month, from the client's own tally
        - generic [ref=e101]:
          - article [ref=e102]:
            - generic [ref=e103]: “
            - blockquote [ref=e104]: “The program is working fantastically. The transition is flawless.”
            - generic [ref=e105]:
              - strong [ref=e106]: Roland P.
              - generic [ref=e107]: Karns & Karns
              - generic [ref=e108]: Partner update, July 2026
          - article [ref=e109]:
            - strong [ref=e110]: "63"
            - generic [ref=e111]: cases signed and kept by one firm in a single month
          - article [ref=e112]:
            - generic [ref=e113]: “
            - blockquote [ref=e114]: “My team is like, hey, can we get more cases? We're a little bored over here.”
            - generic [ref=e115]:
              - strong [ref=e116]: Karishma A.
              - generic [ref=e117]: Collision Law
              - generic [ref=e118]: Raised her order 50 → 70 on that same call
          - article [ref=e119]:
            - generic [ref=e120]: “
            - blockquote [ref=e121]: “This is phenomenal! Thank you so much.”
            - generic [ref=e122]:
              - strong [ref=e123]: Ralph M.
              - generic [ref=e124]: Founding Partner, Ramrock Law
              - generic [ref=e125]: Then asked to expand into 3 more states
          - article [ref=e126]:
            - strong [ref=e127]: "7"
            - generic [ref=e128]: cases signed on a single Saturday, per the client's own report
          - article [ref=e129]:
            - generic [ref=e130]: “
            - blockquote [ref=e131]: “I appreciate you guys. Keep up the great work.”
            - generic [ref=e132]:
              - strong [ref=e133]: Jared C.
              - generic [ref=e134]: CEO, AutoInjuryFirm.com
          - article [ref=e135]:
            - strong [ref=e136]: "27"
            - generic [ref=e137]: cases signed across 5 states in one month, from the client's own tally
      - generic [ref=e139]:
        - generic [ref=e140]:
          - article [ref=e141]:
            - strong [ref=e142]: "63"
            - generic [ref=e143]: cases signed and kept by one firm in a single month
          - article [ref=e144]:
            - generic [ref=e145]: “
            - blockquote [ref=e146]: “I appreciate you guys. Keep up the great work.”
            - generic [ref=e147]:
              - strong [ref=e148]: Jared C.
              - generic [ref=e149]: CEO, AutoInjuryFirm.com
          - article [ref=e150]:
            - strong [ref=e151]: "7"
            - generic [ref=e152]: cases signed on a single Saturday, per the client's own report
          - article [ref=e153]:
            - generic [ref=e154]: “
            - blockquote [ref=e155]: “My team is like, hey, can we get more cases? We're a little bored over here.”
            - generic [ref=e156]:
              - strong [ref=e157]: Karishma A.
              - generic [ref=e158]: Collision Law
              - generic [ref=e159]: Raised her order 50 → 70 on that same call
          - article [ref=e160]:
            - strong [ref=e161]: "27"
            - generic [ref=e162]: cases signed across 5 states in one month, from the client's own tally
        - generic [ref=e163]:
          - article [ref=e164]:
            - strong [ref=e165]: "63"
            - generic [ref=e166]: cases signed and kept by one firm in a single month
          - article [ref=e167]:
            - generic [ref=e168]: “
            - blockquote [ref=e169]: “I appreciate you guys. Keep up the great work.”
            - generic [ref=e170]:
              - strong [ref=e171]: Jared C.
              - generic [ref=e172]: CEO, AutoInjuryFirm.com
          - article [ref=e173]:
            - strong [ref=e174]: "7"
            - generic [ref=e175]: cases signed on a single Saturday, per the client's own report
          - article [ref=e176]:
            - generic [ref=e177]: “
            - blockquote [ref=e178]: “My team is like, hey, can we get more cases? We're a little bored over here.”
            - generic [ref=e179]:
              - strong [ref=e180]: Karishma A.
              - generic [ref=e181]: Collision Law
              - generic [ref=e182]: Raised her order 50 → 70 on that same call
          - article [ref=e183]:
            - strong [ref=e184]: "27"
            - generic [ref=e185]: cases signed across 5 states in one month, from the client's own tally
  - generic [ref=e187]:
    - heading "Your firm. Your numbers." [level=2] [ref=e190]: Your firm.Your numbers.
    - generic [ref=e191]:
      - generic [ref=e192]:
        - generic [ref=e193]:
          - generic [ref=e194]:
            - generic [ref=e195]: Signed cases per month
            - status "Signed cases per month 25" [ref=e196]: "25"
          - generic [ref=e197]:
            - slider [ref=e198]: "25"
            - generic [ref=e199]:
              - generic [ref=e200]: "5"
              - generic [ref=e201]: "100"
        - generic [ref=e202]:
          - generic [ref=e203]:
            - generic [ref=e204]: Average attorney fee
            - status "Average attorney fee 14000" [ref=e205]: $14,000
          - generic [ref=e206]:
            - slider [ref=e207]: "14000"
            - generic [ref=e208]:
              - generic [ref=e209]: $3,000
              - generic [ref=e210]: $60,000
        - generic [ref=e211]:
          - generic [ref=e212]:
            - generic [ref=e213]: Cost per signed case
            - status "Cost per signed case 3500" [ref=e214]: $3,500
          - generic [ref=e215]:
            - slider [ref=e216]: "3500"
            - generic [ref=e217]:
              - generic [ref=e218]: $500
              - generic [ref=e219]: $10,000
      - generic [ref=e220]:
        - generic [ref=e221]:
          - generic [ref=e222]: Return on every dollar in
          - strong [ref=e223]:
            - text: "4"
            - superscript [ref=e224]: ×
          - paragraph [ref=e225]: $262,500 net to the firm each month.
        - generic [ref=e226]:
          - generic [ref=e227]:
            - term [ref=e228]: Monthly revenue
            - definition [ref=e229]: $350,000
          - generic [ref=e230]:
            - term [ref=e231]: Monthly acquisition
            - definition [ref=e232]: $87,500
          - generic [ref=e233]:
            - term [ref=e234]: Annual fee revenue
            - definition [ref=e235]: $4,200,000
        - link "Review my numbers" [ref=e237] [cursor=pointer]:
          - /url: /book-a-demo.html
  - generic [ref=e240]:
    - generic [ref=e241]:
      - heading "One favor became a $50M case engine." [level=2] [ref=e242]
      - heading "Angelo Perone started Case Connect for one law firm in 2020. Six months later, that firm had more than 200 new cases." [level=3] [ref=e243]
      - paragraph [ref=e244]: Today, Case Connect spends $5M+ monthly, operates its own call center, employs staff attorneys, and signed 30,000+ cases last year.
      - generic [ref=e245]:
        - link "Read The Best Attorney Never Wins" [ref=e246] [cursor=pointer]:
          - /url: https://thebestattorneyneverwins.com
          - generic [ref=e247]: The Best Attorney Never Wins
        - generic [ref=e255]:
          - text: Angelo’s field guide
          - heading "The Best Attorney Never Wins" [level=4] [ref=e256]: The Best AttorneyNever Wins
          - paragraph [ref=e257]: Why great lawyers go broke—and average ones build empires.
          - link "Read the first chapter free" [ref=e258] [cursor=pointer]:
            - /url: https://thebestattorneyneverwins.com
    - img "Angelo Perone, Co-Founder and CEO of Case Connect"
  - generic [ref=e261]:
    - heading "What attorneys actually ask us." [level=2] [ref=e263]: What attorneysactually ask us.
    - generic [ref=e264]:
      - generic [ref=e266]:
        - button "How is this different from every lead vendor that burned me?" [expanded] [ref=e267] [cursor=pointer]
        - paragraph [ref=e274]: "Everything we sell comes off our own machine: our ads, our call center, our 7-point qualification, our staff attorneys. First crack, never recycled, never resold, and the credit policy is in the agreement."
      - generic [ref=e276]:
        - button "Are the cases exclusive?" [ref=e277] [cursor=pointer]
        - paragraph [ref=e282]: Yes. A lead or case delivered to your firm is yours. We do not resell or re-route them, ever. In the agreement, in writing.
      - generic [ref=e284]:
        - button "What happens if a case doesn't meet criteria?" [ref=e285] [cursor=pointer]
        - paragraph [ref=e290]: It gets credited, on either program. The credit policy is spelled out in your agreement.
      - generic [ref=e292]:
        - button "What does it cost?" [ref=e293] [cursor=pointer]
        - paragraph [ref=e298]: Per lead or per signed case, depending on your program, state, and volume. Every fee is on one sheet before you sign. On the demo we put the exact numbers for your state on the screen next to your current cost.
      - generic [ref=e300]:
        - button "How fast do cases start?" [ref=e301] [cursor=pointer]
        - paragraph [ref=e306]: Fast. Once your criteria are set and the agreement is signed, your first case can be delivered within 48 hours.
      - generic [ref=e308]:
        - button "Are you in my state?" [ref=e309] [cursor=pointer]
        - paragraph [ref=e314]: We run campaigns across most of the country and we'll show you delivery volume for your state on the demo. If we can't deliver real volume where you practice, we'll tell you in the first five minutes and save us both the meeting.
      - generic [ref=e316]:
        - button "How does someone sign MY firm's retainer before I've talked to them?" [ref=e317] [cursor=pointer]
        - paragraph [ref=e322]: You approve the case criteria and the retainer up front. A qualified client e-signs your firm's own retainer and a Case Connect staff attorney reviews the case before delivery. Flat marketing cost, not fee sharing. Put your ethics counsel on the demo if you want.
      - generic [ref=e324]:
        - button "Who is this actually for?" [ref=e325] [cursor=pointer]
        - paragraph [ref=e330]: Growth firms ready for 10+ cases a month and staffed to work them. If you want two cases a quarter, we're the wrong partner and we'll tell you so on the call.
  - generic [ref=e336]:
    - heading "Put better cases in motion." [level=2] [ref=e337]: Put better casesin motion.
    - generic [ref=e338]:
      - paragraph [ref=e339]: Twenty minutes. Your markets, your intake, your growth target.
      - link "Book a demo" [ref=e340] [cursor=pointer]:
        - /url: /book-a-demo.html
  - contentinfo [ref=e343]:
    - link "Case Connect home" [ref=e344] [cursor=pointer]:
      - /url: "#top"
      - img "Case Connect" [ref=e345]
    - generic [ref=e346]:
      - paragraph [ref=e347]: © 2026 Case Connect LLC · Philadelphia, PA
      - navigation "Legal links" [ref=e348]:
        - link "Terms" [ref=e349] [cursor=pointer]:
          - /url: https://caseconnect.legal/terms-and-conditions
        - link "Privacy" [ref=e350] [cursor=pointer]:
          - /url: https://caseconnect.legal/privacy-policy
```

# Test source

```ts
  1  | const { test } = require("/Users/willkusch/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/test");
  2  | 
  3  | test("inspect testimonial wall", async ({ page }) => {
  4  |   await page.goto("https://case-connect-lander.will-f62.workers.dev", {
  5  |     waitUntil: "domcontentloaded",
  6  |   });
  7  |   const heading = page.getByText("What firms are saying.", { exact: true });
> 8  |   await heading.scrollIntoViewIfNeeded();
     |                 ^ Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
  9  |   await page.waitForTimeout(600);
  10 |   const section = page.locator("section").filter({ has: heading }).first();
  11 |   const details = await section.evaluate((element) => {
  12 |     const style = getComputedStyle(element);
  13 |     const descendants = [...element.querySelectorAll("*")];
  14 |     const animated = descendants
  15 |       .map((child) => {
  16 |         const childStyle = getComputedStyle(child);
  17 |         return {
  18 |           tag: child.tagName,
  19 |           className: child.className,
  20 |           animationName: childStyle.animationName,
  21 |           animationDuration: childStyle.animationDuration,
  22 |           transform: childStyle.transform,
  23 |         };
  24 |       })
  25 |       .filter((item) => item.animationName !== "none");
  26 |     return {
  27 |       rect: element.getBoundingClientRect().toJSON(),
  28 |       background: style.backgroundColor,
  29 |       padding: style.padding,
  30 |       animated: animated.slice(0, 20),
  31 |     };
  32 |   });
  33 |   console.log("DETAILS", JSON.stringify(details));
  34 |   await section.screenshot({ path: "/private/tmp/case-connect-workers-testimonials.png" });
  35 | });
  36 | 
```