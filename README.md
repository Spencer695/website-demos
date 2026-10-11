# Website demos

Portfolio projects by Spencer, hosted together with GitHub Pages.

- [Project start page](https://Spencer695.github.io/website-demos/)
- [CC’s House Social Kit](https://Spencer695.github.io/website-demos/projects/ccs-social/)
- [Reels & Community Replies](https://Spencer695.github.io/website-demos/projects/ccs-community/)
- [CC’s House](https://Spencer695.github.io/website-demos/projects/ccs-house/)
- [Pet Supplies](https://Spencer695.github.io/website-demos/projects/pet-supplies/)

## Projects

**CC’s House Social Kit:** A week of Instagram and Facebook content for CC’s House built from Spencer’s own product photos: three feed posts with captions, three Stories, a Reel storyboard with a motion preview, a weekly content calendar, a weekly email with an A/B subject line test, and a plan for measuring results. Captions, layouts and the plan are concept work; no engagement numbers are shown or invented.

**Reels & Community Replies:** Two 9:16 Reels (12 and 15 seconds, MP4 in `projects/ccs-community/media/`) cut from the CC’s House product photos, sample comment and DM replies with status tags, and a reply guide covering check-in times, what to answer, what to pass to the owner, and when to escalate. The conversations are samples; replies use the sizing, color and return policies from the CC’s House shop pages. The Reels are exported without music.

**CC’s House:** A handmade crochet storefront with product pages, image galleries, shop information and brand storytelling. The hosted copy is presented as a portfolio demonstration. The original project files on W: are unchanged.

**Pet Supplies:** A fictional pet-care business with grooming and self-service wash appointment demos, shampoos, conditioner and a brush, product filtering and a sample shopping bag. Appointments, products, prices and store information are illustrative; no real bookings, orders or payments are created.

## Structure

The root `index.html` is a simple project directory. Each project is in `projects/`. The social kit and the Reels page reuse the CC’s House photos and logo from `projects/ccs-house/assets/img/` instead of copying them. Relative links work on GitHub Pages and from a local folder. There is no build step or dependency installation. `.nojekyll` tells Pages to serve these static files directly.

Pages publishing source: `main` branch, `/ (root)` folder.

## Credits

CC’s House brand and product imagery are from the supplied project; the hat product photos are Spencer’s. Pet Supplies dog photographs were generated with ImageGen. Full generation prompts are in `projects/pet-supplies/ASSET-NOTES.md`. The product illustrations are original SVG assets.

This is an evolving portfolio showcase. No user-research findings, conversion increases, client testimonials or experience claims are invented.
