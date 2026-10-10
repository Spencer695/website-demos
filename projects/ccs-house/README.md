# CC's House website

A plain HTML site with no build step. Upload this whole folder to Cloudflare as-is.

## Pages
- `index.html`: Home
- `shop.html`: Shop, plus how sizing works
- `pancake-hat.html`, `egg-hat.html`, `mushroom-hat.html`: one page per hat
- `about.html`, `contact.html`, `returns.html` (returns & care)
- `404.html`: shown for addresses that don't exist

## Still to fill in
- **Order buttons**: each hat's button opens that hat's page on the current Square site (ccs-house.square.site), which already asks for head size and color. Once a Square buy link has been tested, swap it into the `Order this hat` link on each hat page.
- **Google Form**: the Contact page uses email for now. There's a note in `contact.html` showing where the form button goes.
- **Domain**: once you have one, update the `og:image` line at the top of each page to the full address (this is the picture that shows when the link is shared).
- **Social media**: there's a note in the footer where the links go.

## Photos
The hat photos are resized to 1200px (plus 600px copies for cards and thumbnails) so pages load quickly.
