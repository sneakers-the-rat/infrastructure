
#### Documents & Notebooks

Say we have reached the stage where we are writing a brief summary of our experiment and analysis, but not yet at the stage of writing a "formal" scientific paper. We might do so in a notebook-like {% cite kluyverJupyterNotebooksPublishing2016 %} environment with different kinds of "cells," specifically cells that execute *code* and cells that render *markdown.* We want to plot some of the results of our analysis, so to do that we might load the data and use [matplotlib](https://matplotlib.org/) {% cite hunterMatplotlib2DGraphics2007 %} to make our point:

{% include notebook.html html="/infrastructure/assets/notebooks/smile.html" %}

Our notebook file would then include an array of JSON objects that describe the contents of its cells. For example, our data loading cell would look something like this:

```json
{
   "cell_type": "code",
   "execution_count": 2,
   "id": "rapid-information",
   "metadata": {
    "scrolled": true
   },
   "outputs": [
    "..."
   ],
   "source": [
    "x, y, sizes = get_data('@jonny:my-project:Analysis1')"
   ]
}
```

The `"outputs"` description has been abbreviated above, but it describes to the jupyter notebook server [how to display it](https://ipywidgets.readthedocs.io/en/latest/examples/Widget%20Low%20Level.html). Regular text piped through [stdout](https://en.wikipedia.org/wiki/Standard_streams) is represented like this:

```json
{
  "name": "stdout",
  "output_type": "stream",
  "text": [
    "Downloading dataset @jonny:my-dataset\n",
    "--------------------\n"
  ]
}
```

And multiple output types can be combined in a single cell, for example a widget like our loading progress bar is described like this:

```json
{
  "data": {
    "application/vnd.jupyter.widget-view+json": {
      "model_id": "5799ac2959084a4596ffbad3f9940f48",
      "version_major": 2,
      "version_minor": 0
    },
    "text/plain": [
      "  0%|          | 0/100 [00:00<?, ?it/s]"
    ]
    },
    "metadata": {},
  "output_type": "display_data"
}
```

where the `model_id`, `version_major`, and `version_minor` describe which rendering code to use for the cell, similarly to the "metadata that indicates code" that we discussed in [analytical frameworks](#analytical-frameworks).

Notice that there is already a metadata field! In order to link our notebook to our analysis --- and thus to our extended graph of data, experiment, etc. --- we could do it [manually](https://jupyterbook.org/en/stable/content/metadata.html), but since we're thinking about interfaces we can also imagine that our `p2p_framework` is capable of filling it in for us. We don't need to invent a new metadata protocol for JSON, [JSON-LD](https://json-ld.org/) is already quite similar to the syntax we've been using already. For simplicity, say we use a `@comms` ontology to denote various features of our communication system. Our data loading function might then populate a field in our cell like this: 

```json
"metadata": {
  "scrolled": true,
  "@comms:usesData": "@jonny:my-project:Analysis1"
}
```

Other frameworks might make their own metadata annotations, like an indication that we're plotting some feature of the data, or performing some statistical analysis on the data. These annotations might be responsive to the parameterization of the function call or its results, but if we emphasize a design process that makes interfaces at multiple levels we could also imagine using something like iPython "[magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)" to declare metadata for our cell. For example, each cell is automatically assigned a random combination of words as an ID, but if we wanted to be able to specifically refer to a cell we could give it an explicit one:

```
%%meta @comms:cellID smilePlot
plt.scatter(x, y, s=sizes)
```

We're familiar with two types of cells, code and markdown, but we can extend our thinking to arbitrary cell types. What is a cell? A cell has a a) **type** that indicates its capabilities and representation, b) **metadata** that describes it, we can also generalize that to include *arguments* that parameterize it, and c) the content, or information contained by the cell. The jupyter [document model](https://jupyterlab.readthedocs.io/en/stable/api/classes/cells.cellmodel-1.html) more or less reflects this already, but in its base model only has [code](https://jupyterlab.readthedocs.io/en/stable/api/classes/cells.codecellmodel-1.html), [markdown](https://jupyterlab.readthedocs.io/en/stable/api/classes/cells.markdowncellmodel.html), and [raw](https://jupyterlab.readthedocs.io/en/stable/api/classes/cells.rawcellmodel.html) cell types, and the metadata field is unstructured. Its extension system allows for additional cell types as well as restructuring the program more generally, but since we're focused on self-contained documents we'll limit our discussion to additional cell types. 

From this it's relatively trivial to imagine additional cell types that serve common needs in academic writing: a citation cell type[^notebookcites] that takes a [BibTeX](http://www.bibtex.org/Format/) object (or its fields) as arguments and then preserves the full metadata as well as renders it in a chosen style. A figure cell type that takes an image or plot and a caption. A contributor cell type that takes an author's name, affiliation, ORCID, email, and so on. Currently jupyter extensions use the NPM registry, but we could imagine being able to use other people's cell types directly by referring to them like `@jonny:celltypes:citation`. 

[^notebookcites]: The original Jupyter Notebook paper describes the need for this near the end {% cite kluyverJupyterNotebooksPublishing2016 %}.

Notebooks have multiple levels of metadata, so we can also specify document-level metadata that describe the type of our document (like a [`@schema:ScholarlyArticle`](https://schema.org/ScholarlyArticle)), its [`creativeWorkStatus`](https://schema.org/creativeWorkStatus) as a `Draft`, our authorship information, permissions, and whatever else we'd like. But what is a document? In the case of our jupyter notebook, it's a series of cell descriptions in a JSON array. Trivially, a document is a cell that contains other cells. What about in the other direction? The contents of our cells are *also* a cell-like system. The very notion of a programming language is a means of mapping structured syntax to machine instructions, and to do that code (in some languages) is interpreted or compiled by parsing it into an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that relates data and its structuring metadata. Markdown can also be thought of as a series of subcells, where using a `# header` indicates how the text is to be represented as compared to `*italic*` text or `[links](https://link.com)`. The use of a programming language or markup syntax is represented by the `cell_type` field, which the notebook server knows to translate `"code"` to mean Python and `"markdown"` to mean its particular flavor of markdown (of which there are [several](https://www.iana.org/assignments/markdown-variants/markdown-variants.xhtml)). 

This points towards a model of **recursive** cells that can contain other cells. An editor could, for example, draw from templating engines like [liquid](https://shopify.github.io/liquid/), where an abstract representation of the content of a cell could include a `{{ content }}` marker that indicates that additional cells can be included inside of it. Recursive models, coupled with structuring metadata that indicates the relationship between a parent and child cell could then be used to model compound concepts. Another simple example using citation might be to have a cell with one child cell containing a reference to another work that ours [`@cito:disagrees_with`](https://sparontologies.github.io/cito/current/cito.html#d4e449) {% cite peroniFaBiOCiTOOntologies2012 %}, and another child cell that in turn contains some writing in markdown and a plot. Recursive cells also naturally lend themselves to **transclusion** by making each of the individual subcomponents of a document referenceable with full granularity. We will expand on both compount concepts and transclusion in a moment in talking about the extension of our cellular system to [wikis](#trackers-clients--wikis). 

Before we go beyond a document system that would be unrecognizable to most scientists, and thus yet another nice pipedream, it's important to pause on the continuity with existing document systems. Microsoft Word, or Word-like WYSIWYG editors like [LibreOffice](https://www.libreoffice.org/) or Google docs are the dominant mode of preparing academic documents. Word-like editors are *already* create recursive cell-like documents, though their interface obscures them. They support semantic markup like heading styles (though their use compared to manual formatting is far from universal {% cite sorgaardUseParagraphStyles1996 %}), and every paragraph can be considered a cell, with the default paragraph styling as its metadata and additional styled elements like bolded words as sub-cells. It should then be possible to import existing word documents into a cellular document system. Care should also be taken to smooth the cognitive transition from word-like editors: Jupyter currently treats cells as being strictly separate, and new cells need to be created manually. Instead it should be possible for cells to "recede into the background" and be created with common gestures like a double return to make a new paragraph. The "insert" menu used to create things like tables or images is already a familiar tool in word-like editors, so the notion of adding elaborated types like citations shouldn't be that big of a lift.

The other major document preparation tool modalities are markup syntaxes and their associated builders like LaTeX. Though TeX-like tools have an exceedingly opinionated and obscure design history {% cite knuthTeXbook1986 %}, they have three major affordances: 1) document-level structure provided by document classes, packages, and the options they provide, 2) environments that enclose some section of text between `\begin{}` and `\end{}` and provide some specific functionality or formatting like [lists](https://www.overleaf.com/learn/latex/Lists), and 3) commands that accept arguments and modify some smaller unit of text like creating a link with `\href{https://url.com}{link text}`. Each of these maps onto a cellular document system, with document-level metadata or the templates commonly used to render markdown, and cells that take arguments to approximate environments and commands. Markdown extensions like [MyST](https://myst-parser.readthedocs.io/en/latest/) {% cite dupreAdvertisingNewInfrastructures2022 %} make this translation even more straightforward with direct analogies to LaTeX commands and environments and their "role" and "directive" counterparts in [reStructuredText](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html). Since the goal should be a 1:1 relationship between source code and visual editor, the difference between representing a cell visually versus in markup should be left as a matter of author preference.

Bidirectional translation from a WYSIWYG editor to its markup is not a trivial task --- the mediawiki team started writing theirs in [2011](https://www.mediawiki.org/wiki/VisualEditor) and rolled it out as a default feature in [2020](https://en.wikipedia.org/wiki/MediaWiki_version_history) {% cite forresterInventingWeGo2012 %}. It's a careful balance between ease of use, power of syntax, and accomodation of historical usage patterns. Markdown is on one extreme of ease with only a handful of markup elements to learn, but has a relatively steep learning curve to do anything more complex. On the other end is the wonderful [dokieli](https://dokie.li/) {% cite capadisliDecentralisedAuthoringAnnotations2017  %} (and see Sarven's [masterpiece](https://csarven.ca/linked-research-decentralised-web) {% cite capadisliLinkedResearchDecentralised2019 %}, spiritual cousin to this document), which does essentially everything that we want our linked documents to do, but requires authors to write their documents in HTML and manually manage the semantic markup. Extending Notebooks to use recursive cells with reusable types sacrifices some of the ability to directly edit the source of a document as a potential way to balance familiarity and expressiveness.

Notebooks, with some architectural and interfaces then become a straightforward way of breaking up the scientific paper as a singular unit of knowldge work when embedded in a linked data system. Their use in scholarly publishing has been proposed many times before, but our linking system lets us resolve some of the largest outstanding limitations {% cite chattopadhyayWhatWrongComputational2020 %}: dependency management {% cite ruleTenSimpleRules2019 %}, archiving {% cite woffordJupyterNotebooksDiscovery2020 %}, and discovery, among others. The same gradient of access control rules we discussed in controlling access to sensitive data would support a process of gradual publication of smaller units of work, from a private demo in our lab meeting to a public part of scientific discourse. 

What happens when we invite other people to respond?