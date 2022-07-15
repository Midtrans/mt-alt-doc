# Instructions

<details>
<summary><b>Tech Stack Summary </b>(click to expand)</summary>
<article>

### Tech Stack
- [Docsify](https://docsify.js.org/) as **JS based frontend-framework**, can also be considered as the CMS.
- Content is written as `Markdown`, stored on Github repo.
- Continuous Delivery configured to **auto deploy** to `Netlify` (frontend hosting service), served as static files.
- Netlify also act as an **optional router**.
- Somekind of `frontend-only` **Single Page Application**.
- Requires `no backend, no DB`, any web server (like Nginx) will just work (as it is not full stack CMS).
- Consist of regular `HTML, JS, CSS,` files, which will auto render the `Markdown` content on runtime.

</article>
</details>

## Running The Project

- Download/clone and extract this folder to your local machine.
- Then run the project via [Docker Compose explained in this section](#advanced-usage-using-docker-and-compose).
- Or, install [Netlify CLI](https://docs.netlify.com/cli/get-started/)
	- Then run the project via `netlify dev`.
	- But you will be required to login with Netlify CLI. You can login with our team credentials.

<details>
<summary>Old/Previous Method - (Click to Expand)</summary>
<article>

Less preferred method (as it may have quirks/limitations):
- Run any local webserver and make sure you can open the `index.html` from the webserver. (See example below this paragraph for some reference).
- Open web browser and point it to where the folder where `index.html` file is located. i.e: `localhost/technical-documentation-site/`
	- If that didn't load / didn't work properly: 
		- Open web browser and point the destination url to the folder and add `/#/` at the end of it, e.g: `localhost/technical-documentation-site/#/`
		- or try including the index.html file e.g: `localhost/technical-documentation-site/index.html`
		- or try serving this folder in root folder of your `localhost`
		- Note: Currently this site likely to have broken asset path if placed within sub-folder, please place it on parent/main folder of your localhost. e.g: place it on `localhost` instead of `localhost/mydocs/`
- Live preview from Github repo can also be possible:
	- Preview using Githack: https://raw.githack.com/Midtrans/technical-documentation-site/master/#/
		- You can also change `master` with any branch you want to preview
		- Note: Githack is free service so it might not be always available

### Example Web Server
For example (choose one of it, not all):
- You can run MAMP/XAMPP and copy this project folder to your `htdocs` folder. Access it from localhost url.
- You can run Python `python -m SimpleHTTPServer`, and open `localhost:8000/index.html`.
- You can use [Serve NPM package](https://www.npmjs.com/package/serve) on NodeJS
- Or even from browser itself, via [Chrome Web Server Extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)
- Or preview online with codesandbox: https://codesandbox.io/s/github/Midtrans/technical-documentation-site
- etc.
</article>
</details>

## Structure & Standard

- Documentation content is located at `en` (english) & `id` (indonesia) folder. i.e: `/en/snap/overview.md`.
- Subfolders are grouped in accordance with how it listed in Sidebar Menu. i.e: `snap`,` midtrans_account`, etc.
- Docs content is in markdown format.
- Docs content can contain html tags, but try to use markdown as much as possible, to minimize custom html tags.
- Url/links within content:
	- For best compatibility, please use absolute path like `[link to snap](/en/snap/overview.md)`, instead of `[link to snap](en/snap/overview.md)`
	- If the link refer to some html id, use this `/en/snap/overview.md#integration`, instead of `?id=integration`
- Sidebar menu is rendered from `_sidebar.md` file
	- Link title will be used as the page title, to define title, e.g: `- [menu name](/en/menu/path.md "Page Title Here")`
- Nav content is no longer using `_navbar.md` file, but is hardcoded inside `index.html`, edit the html if you need to edit Nav element.
- This project is using [Docsify](https://docsify.js.org/).
- `index.html` contains all the Docsify script, plugins, and config.
	- External `css`,`js` file dependencies (`<script>` tag) should have ["intigrity" SRI attribute](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). e.g: use [jsdelivr.com](https://www.jsdelivr.com/package/npm/prismjs?version=1.17.1&path=components), click `copy HTML + SRI`.
	- SRI is additional security protection against external file being modified by unauthorized party.
- custom css & js can be embedded in `index.html` and also located at `asset` folder.
- image asset are in `asset/image` folder.
	- image assets should be optimized for web, so file size could be small & fast to load from browser. Use tools to optimize image for web e.g. https://kraken.io/web-interface

## Editing Content

- Edit the markdown docs content within `en` & `id` folder.
- To add/edit/remove sidebar menu, edit `_sidebar.md` file.
- After editing, just refresh from browser.
	- Sometimes browser refresh might fail to load new editted content like sidebar or current page content because browser didn't load the modified file but load from cache, workaround: 
		- On the page `Right Click > Inspect` (open Chrome dev tools)
		- Go to tab `Network`
		- Click checkbox `Disable cache`
		- Refresh browser while dev tools still open (alternatively `cmd + shift + R` to hard refresh)
- Generate `sitemap.xml` file for SEO purpose, by: 
	- Modify `config` within `tooling/sitemapper.js` if needed
		- If you add new sidebar files, add the path to `sidebarFiles`
	- Run `node tooling/sitemapper.js` from project folder
		- or, go to "tooling" folder: `cd tooling`, run `node sitemapper.js`
- Edit and input your public content related changelog to `/en/technical-references/docs-changelog.md` file. Changes that are too technical or non relevant to public visitor don't need to be listed.

### Customizing CSS
To customize CSS in order to stylize the overall looks and feel of the docs, we can override the default Docsify's theme CSS. For example we have our own custom CSS file located in: `/asset/custom.css`.

Edit the above file to add your own custom CSS style and rule.

Since revamped, additional custom CSS also can be found in `/asset/revamp/styles/scss`. It uses SASS, [install sass](https://sass-lang.com/install) if you want to edit and compile the custom `.scss` files. There is also helper `build-scss.sh` file that you can use:
	- navigate to the folder: `cd asset/revamp/styles/scss/`
	- run the file: `./build-scss/sh`
	- it will auto recompile final `main.css` file whenever you edit any of the included `.scss` files.

### Using Custom CSS elements
There are some custom elements to make UX better:

<details>
<summary>Custom Element Usage - (Click to expand)</summary>
<article>

#### Tabs
Using [docsify tabs plugin](https://jhildenbiddle.github.io/docsify-tabs), sample usage

```markdown
<!-- tabs:start -->
#### **Tabs title 1**
Tabs content 1

#### **Tabs title 2**
Tabs content 2
<!-- tabs:end -->
```

#### Collapsible
Custom html implementation. 
Sample usage via native html `details` & `summary` tag (recommended, also markdown compatible): 

```html
<details>
<summary><b>Collapsible Title</b></summary>
<article>

The overall Snap end-to-end payment proccess can be illustrated in following sequence diagram:
</article>
</details>
```

Or via custom div elements (not recommended, not markdown compatible and need to manage unique id)

```html
<input id="unique-id" class="collaps-toggle" type="checkbox">
<label for="unique-id" class="collaps-label"><b>Collapsible Title</b></label>
<div class="collaps-content">

input's "id" attribute must be unique from other collapsible instances, and must match with "for" attribute of the label.
</div>
```

#### Card
Custom implementation in html, sample usage:

```html
<div class="my-card">

### [Card Title With Link (optional)](https://example.com)
Optional card body content, or actually you can use any html/markdown content within card.
</div>
```

#### Tags

```html
<div class="tags">
  <div class="tag">Topic1</div>
  <div class="tag">Topic2</div>
  <div class="tag">Topic3</div>
</div>
```

#### Badges

```html
#### API Reference Docs <span class="badge badge-yellow">New</span>
```
Variants:

```html
<span class="badge badge-red">New</span>
<span class="badge badge-yellow">New</span>
<span class="badge badge-green">New</span>
<span class="badge badge-gray">New</span>

```

</article>
</details>

## Deploying to Production

- Just open pull request or commit to `deploy-production` branch.
- Commit pushed to `deploy-production` branch will be auto-deployed (via Netlify CD set-up) to https://midtrans-docs.netlify.app . Which is CNAME to https://docs.midtrans.com.
	- Each pull request to this branch will also trigger Netlify to deploy as preview branch. So you can preview how it will looks like before merging to deployment branch.
- Commit pushed to `master` branch will trigger [branch deployment](https://docs.netlify.com/site-deploys/overview/#definitions) to `https://master--midtrans-docs.netlify.app/`.

## Advanced Usage: Using Docker (and Compose)

<details>
<summary>Advanced Usage - (Click to expand)</summary>
<article>

This section is **not required**, but if you prefer using Docker, or want to deploy as container.

For development easier to use **docker-compose**:
	- Because it will use `volume`, so changes is realtime.
	- Usage:
		- Run with docker compose `docker-compose up -d`.
		- if doesn't work try building the container 1st `docker-compose up --build -d`.
		- It will be accessible under `localhost:20080` on host machine.
	- Stopping
		- To stop run `docker-compose stop`
		- To stop and remove container `docker-compose down`
	- Advanced:
		- ssh to container: `docker exec -it nginx_static /bin/sh` on runtime
		- restart nginx to apply new config on ssh: `/usr/sbin/nginx -s reload`

For deployment (maybe? Untested, as Netlify is used in production):
- Docker image used: `nginx:alpine`
- By default, docker file will `COPY` the necessary files from project dir at build time.
	- Changes on runtime will not be reflected.
	- Probably ideal for deployment, but not for development.
	- Usage:
		- Build image: `docker build -t <username-or-anything>/staticsite:1.0 .`.
		- Run as container: `docker run -itd --name <container-name> --publish 20080:80 <username-or-anything>/staticsite:1.0`.
		- It will be accessible under `localhost:20080` on host machine.
</article>
</details>

## Config/Tool Files
Additionally some config files are presents in this repo, mostly their purpose are for infra/deployment related config.

<details>
<summary>Config/Tool Files - (Click to expand)</summary>
<article>

### Netlify Config Files
These are specific to Netlify, might not be usable outside Netlify scope. These will be read & applied by Netlify during deployment on their infra.
- `_redirects`: Specify HTTP/server [redirect](https://docs.netlify.com/routing/redirects/) for the specified url patterns
- `_headers`: Specify HTTP/server [response headers](https://docs.netlify.com/routing/headers/) for the specified url patterns
- `netlify/functions/`: Directory for [Netlify serverless functions](https://docs.netlify.com/functions/overview/) files. May only works/run while being hosted on Netlify.
	- Currently node_modules dependencies (used by the functions) are git commited within that folder, to make build simpler because of current small dependencise. But later if that dependencies grow, it is better to gitignore that folder, and setup proper build step for the Netlify function.

### Tooling
These are for helper tools during development.
- `tooling/`: Folder contains some helper tools.
	- `sitemapper.js`: Helper tool to generate static sitemap, run manually.
	- `changelogger.js`: Helper tool to generate changelog based on Github commit message. Note: it read from Github, not local git commit, so it can be outdated and not pretty.
	- `docker-files/`: Folder containing the files that will be mounted inside docker container. e.g: Nginx config file.
- `Dockerfile`, `docker-compose.yml`: Docker related resource, to allow using docker during dev or deployment. Run manually.

### Other
- `firebase.json`: Firebase specific config, will be read when deployed on their infra.
- `.github/workflows/` folder is not used, it was just for development purpose
</article>
</details>

## Additional Notes
<details>
<summary>Additional Notes - (Click to expand)</summary>
<article>

### CodeAnotation
Within the source code, there were some code annotated with:
- `TODO:` - not implemented, reminder to implement on the future
- `HACK:` - code that works at that time and specific. Probably used to fix/override some issue, may not be tested for extended usage and may break unexpectedly, should be fixed/optimized on the future.
- `OPTIMIZE:`- code that works, but may not be the best in terms of performance, etc. should be optimized on the future.
- `FIXME:` - note to fix the code in the future, current implementation may be broken.
- etc

Pay attention to these when you encounter unexpected issue. Some hack implementation or un-optimized code may be the cause of that issue. Read the note that come after that annotation on the code, it usually explains what is happening.

### Docsify Router Mode
Docsify as SPA (Single Page App) [support 2 different router mode](https://docsify.js.org/#/configuration?id=routermode), with different behaviour:

#### `hash`
- Handle page navigation within using single entry point of `index.html`, using `/#/page-url` hash route to differentiate route between pages. Using JS to read the hash route.
- Hash mode is easier to handle on local dev env, especially if you put the project under sub-directory. e.g: `/localhost/project/subdir/project-folder`. No need to setup SPA route handling on webserver.
- But not SEO friendly.

#### `history`
- Handle page navigation using proper `/page-url` route, like backend based web app. 
- But, the **web server must route all the traffic to same `index.html` file**
	- Check: `/tooling/docker-files/default.conf` for sample implementation of NGINX SPA routing
	- On Netlify deployment, routing is taken care by `_redirects` file. Which is a Netlify config file.
	- To avoid unexpected non-content file (like `_sidebar.md`,`index.hmtl`) from being loaded by netlify markdown fetcher, custom Docsify plugin is implemented to show custom 404 page if those file (with keyword below) is loaded.
		- Add this keyword to any non-content file `<!-- @@@NOCONTENT -->`
- History route is more SEO friendly, so more favorable in production.

#### Note on Router Mode
This project implementation auto detect which mode to use, if url: 
- contains `/#/`, or
- contains `hash=1`/`hash=true`
It will use `hash` routing. Else, by default will use `history` route mode.

- Each route mode can break some asset path, for example when browser open `localhost/en/page-abc/` relative asset path might become `localhost/en/page-abc/asset/...` instead of proper `/asset/...`
	- To handle this, some workaround/hacks are used, like:
		- `/asset/absolute-to-relative.js` script, custom docsify plugins, etc.
		- For now most of it works, but **there might be unexpected asset path invalid issues**.

#### Note on domain migration which replace docs.midtrans.com contents
Historically this docs was deployed as `beta-docs.midtrans.com` before previous docs deprecated, and then fully migrated to `docs.midtrans.com` as of mid August '20.
- To preserve SEO, url paths previously used on old docs are 301 redirected to new structure url paths
	- @WARN: the 301 redirect currently just implemented on Netlify `_redirects` file, which doesn't cover if the site is hosted on non-netlify hosting. 
	- Might need to replicate the 301 redirect on Nginx config files as well.
- Old `beta-docs.midtrans.com` domain is now served via separated repo https://github.com/Midtrans/beta-technical-documentation-site

#### Note on hosted file caching
Due to some of the hosted assets (e.g: images) are big in terms of file size. It eat up lots of hosting bandwidth quickly.

To reduce hosting bandwidth usage, this requires CDN caching strategy. Since the domain is managed via CF by Network Team, CF theoritically should also be available for CDN caching. What need to be done is make sure the hosting (Netlify) respond with correct cache http headers, upon http request of asset files. So CF will cache the assets, reducing direct hits to hosting, hence reducing bandwidth usage. This is implemented on `_headers` file.

#### Note on homepage.md content
Due to homepage UI/UX needs to stand out, as a trade-off a lot of custom html tags is used instead of markdown:
- `h4` html tags is used instead of markdown to avoid link converted into clickable link-header, which is confusing (does not lead anywhere) when clicked.
	- Also to avoid header within collapsed collapsible element to be search-indexed, which is also confusing (cannot scroll to correct header because it is not visible) when clicked.
- Main headers are marked with [docsify-ignore](https://docsify.js.org/#/more-pages?id=ignoring-subheaders) to avoid shown up on sub-sidebar.

#### Misc
- If ID lang content will be used again, please remove the `@TODO` marked redirect rule on `_redirects` file. To allow the content to be accessed.

</article>
</details>
