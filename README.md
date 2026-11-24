# Cosmopolitan Dental Care

Live website: https://dental.zedqhub.com

Static, responsive clinic website hosted on GitHub Pages from the root of the `gh-pages` branch. The `main` branch contains editable source, assets and generated pages in `dist/`.

## Build and preview

```sh
python3 scripts/build_site.py
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. No runtime packages or build dependencies are needed. JavaScript syntax check: `node --check dist/app.js`.

## Content

All 33 brochure services, plus microscopic and biomimetic dentistry from the clinic’s Instagram, appear in `content/services.json`. There are 35 service pages, a grouped treatment directory, Home, About, Contact and Privacy (40 HTML pages total). Brochure details include the C.V. Arcade, Moozhikal, Kozhikode address; phone +91 9496 801 445; email excalibur.unni@gmail.com; and the doctor panel. The client brochure is the source of clinic-specific facts. No testimonials, prices, treatment guarantees or patient counts are invented.

## Brand and assets

Supplied clinic logo, optimised with transparency preserved. The compact navigation logo uses the original symbol and wordmark. Palette sampled from the logo: navy #12498e, cyan #1897d4 and green #77bd43. Poppins matches its geometric lettering and is also used in the client brochure. All active website photographs were supplied by the client. Images are illustrative; stock models are not identified as actual clinic staff or patients.

## Enquiries

The contact form prepares an enquiry locally. Visitors can open their email app with the draft or copy the text into Instagram. Nothing is sent, saved or uploaded by the website. Appointment availability must be confirmed by the clinic.

## Publishing

Publish the exact contents of `dist/` to the root of `gh-pages`, preserving a root `CNAME` containing `dental.zedqhub.com` and an empty `.nojekyll`. Source changes in `main` alone do not change the live site.

## Page structure

Each page has a focused narrative. About uses a single photograph followed by an editorial practice introduction, a motto/mission panel and the doctor directory. The service directory groups all 35 services without repeated photo bands. Treatment pages use distinct discussion prompts from `content/treatment-questions.json`, contextual enquiry links and related care; they do not repeat the generic FAQ, journey or promotional banner. Contact and Privacy use functional text introductions. No photograph or heading is repeated within a page.
