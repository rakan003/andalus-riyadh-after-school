# Al Andalus Riyadh — After-school activities

Arabic-first school activity and Stream checkout demonstration, with an English toggle.

[Open the live demo](https://andalus-riyadh-after-school.streampay-0702.chatgpt.site)

## Run locally

No build step or dependencies are required. From the repository root:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080.

## Files

- `dist/index.html`: school homepage, activities and student/parent form.
- `dist/app.js` and `dist/styles.css`: interactions and responsive layout.
- `dist/checkout-config.js`: public Stream staging payment links.
- `dist/success.html`: Arabic payment confirmation and failure states.
- `tests/redirect.test.cjs`: payment redirect validation checks.

Run checks with Node.js:

```sh
node --check dist/app.js
node tests/redirect.test.cjs
```

## Demo configuration

Swimming, taekwondo and robotics offer full payment or 2, 3 or 4 installments. The school trip example uses a single payment. Amounts, discounts and dates are illustrative and are not published school fees. These are Stream staging links; do not use a real card.

The payment links are configured in Stream to return to the live site's success or failure page. A separate deployment requires its own return URL configuration. No API credentials are included in this repository.

Student details remain in the page. The parent name and Saudi mobile number are passed to Stream when continuing to checkout. This demo does not integrate with school enrollment records. The success page's receipt message is demonstration copy; the page itself does not verify notification delivery or payment status and must not be used to grant enrollment or other access.

## Assets

School identity and imagery are sourced from the [official Al Andalus Riyadh campus website](https://as.edu.sa/riyadh-international/). Third-party school branding, photographs and fonts retain their respective ownership and licensing. This repository does not grant rights to those assets.
