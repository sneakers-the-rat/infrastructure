# infrastructure

in-progress manuscript.

Rendered at https://jon-e.net/infrastructure

# Contribution

## Pull Requests

**TODO**

## Chat

We're using gitter (which recently became a [Matrix](https://matrix.org/) client) to chat, organize the paper, as well as have continuing dialogue after release.

### Rooms

* [![Gitter](https://badges.gitter.im/scientific-infrastructure/prerelease.svg)](https://gitter.im/scientific-infrastructure/prerelease?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) - **Prerelease** - drafting and organizing conversations before release
* [![Join the chat at https://gitter.im/scientific-infrastructure/community](https://badges.gitter.im/scientific-infrastructure/community.svg)](https://gitter.im/scientific-infrastructure/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) - **Community** - general chat

# Writing Syntax

**TODO**

- normal markdown,
- `{% cite bibtex-key %}` for citations
- what else !??!?

# Code Structure

- The document is built using **jekyll** and also includes some page elements built using **react.** 
- The `package.json` file contains the scripts used to build and serve the document (described below)
- Dependency management and building uses
	- **yarn** to manage node/javascript dependencies (for react). Yarn reads the dependencies in `package.json` and makes the `yarn.lock` file which is a full snapshot of exact dependencies used in the last installation.
	- **bundler** to manage the ruby dependencies. Bundler uses the `Gemfile` to generate the `Gemfile.lock` analogously to yarn.
	- **webpack** to compile React and other javascript into an included bundle

(all `.md` or `.markdown` files are rendered to html, so `index.markdown` becomes `index.html` on the final site.)

## Main Text

- `index.markdown` is the parent file that structures the document and imports its different sections. 
- `_sections/` contains each of the sections included into the main document. The sections are numbered, but refer to the index for the definitive ordering.
- `assets/infrastructure.bib` - a BibTeX file containing all references in the piece, add new references here and cite them with the `@key`.

## Meta Text

- `todo.md` - keeping track of things to do
- `trims.markdown` - large sections of text removed from the main text to try and make it shorter that might find their way into future writing (see `_trims/`)

## Jekyll-specific

- `_includes/` - short liquid templates to use in page
- `_layouts/` - whole-page layout templates to structure html, see the header of each .md/.markdown file
- `_plugins/` - jekyll plugins
- `_sass/` - compiled to css, control the look and feel of the site.

## javascript & other web stuff

- `assets/` has vanilla css and javascript, as well as all any images
- `assets/notebooks` will eventually be included in the document, but the rendering is turned off at the moment while it's being debugged.

## etc.

- `tex/` see [pdf-rendering](#pdf-rendering)
- `code` contains supplementary code for calculating numbers for the paper/other meta-needs.
- `data` contains any data referenced in the text.


# Usage

## Requirements

You will first need to have installed

- [**node**](https://nodejs.org/en/download/) (working version: 17.2.0)
- [**yarn**](https://yarnpkg.com/getting-started/migration#why-should-you-migrate) (working version: 1.22.17)
- [**ruby**](https://www.ruby-lang.org/en/documentation/installation/) (working version: 3.0.2p107)
- [**bundler**](https://bundler.io/) (working version: 2.2.29)

On **macOS**:

```bash
# install homebrew if needed
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install node yarn ruby
gem install bundler
```

Let me know of any other OS needs by raising an issue!

## Installation

Clone the repository and enter the directory

```bash
git clone https://github.com/sneakers-the-rat/infrastructure
cd infrastructure
```

Install the ruby and node dependencies

```bash
bundle install
yarn install
```

## Building

The build is in two stages, first webpack runs to compile the React and other javascript into a bundle, and then jekyll compiles the markdown, scss, and javascript into the final website. The website is built into the `_site` directory

```bash
npm run build
```

which just calls 

```bash
npm run build_wp
npm run build_jk
```

## Serving

To write locally, you can run a development server which continuously rebuilds the page whenever the files are updated. 

The local version is identical to the published version, except that hypothes.is is currently disabled locally by default because the bug that's slowing down the page on load is really excruciating with constant rebuilds and refreshes. [I've opened an issue](https://github.com/hypothesis/client/issues/3919)

Start the development server with

```bash
npm run start
```

and then open `http://127.0.0.1:4000/infrastructure/` in your browser.

## Deploying

When a new commit is pushed to `main`, the website is built with github actions (see `.github/workflows/github-pages.yml`) and deployed on the `gh_pages` branch, which is what [https://jon-e.net/infrastructure](https://jon-e.net/infrastructure) points to.

## PDF rendering

The script `code/jekyll_to_tex.py` converts the markdown to TeX. This part is currently under construction and not part of the automated build pipeline! 

It uses pandoc and a pile of manual syntax conversion to make `tex/decentralized_infrastructure_render.tex`, which uses styles from `tex/jls_base.sty`. 

The .pdf version may lag behind the site by several commits, and doesn't have the same versioning and metadata at the moment, but it is provided for choice of medium, and will be what is submitted to bioRxiv.

## Versioning

Every time a new version is committed to `main`, the github action also stores a versioned build identified by the short 7-digit hash. They can be found at the url pattern `https://jon-e.net/infrastructure/versions/<HASH>/`, for example [https://jon-e.net/infrastructure/versions/b7a7676/](https://jon-e.net/infrastructure/versions/b7a7676/).

These versions, to the degree that they differ from the current version, might have their hypothesis annotations all over the place, or have other problems patched in later versions. I also warn that I might yank a version before official publication, but will strongly avoid doing so afterwards.

## Slideshows

Derivative slideshows can also be made by using the `slides` layout, which uses [reveal.js](https://revealjs.com/) for animation. 

The syntax is straightforward:

```markdown
---
layout: slides
title: CMHJC
---

<section>
contents rendered as HTML
</section>

<section data-markdown>
# use markdown syntax!

- make lists
- or whatever **you want**
</section>
```

and see the reveal.js docs for more.
