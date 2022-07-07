
#### Documents & Notebooks

<div class="draft-text" markdown="1">
todo:

- Extend the notion of markdown basically being a very simple type system, and we can extend the notion of a general document preparation system to use ideas from cells as well: eg. we have a citation block, you can put in some bibtex or whatever, and it'll generate the relevant semantic information. 
- The generalization of that is having some notion of slots and appearance for different block elements. Note the "cell-type" field in the notebook JSON
</div>

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

Notebooks have multiple levels of metadata, so we can also specify document-level metadata that describe the type of our document (like a [`@schema:ScholarlyArticle`](https://schema.org/ScholarlyArticle)), our authorship information, permissions, and whatever else we'd like. What about in the other direction? The contents of our cells are *also* a cell-like system. The very notion of a programming language is a means of mapping structured syntax to machine instructions, and to do that code (in some languages) is interpreted or compiled by parsing it into an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that relates data and its structuring metadata. Markdown can also be thought of as a series of subcells, where using a `# header` indicates how the text is to be represented as compared to `*italic*` text or `[links](https://link.com)`. The use of a programming language or markup syntax is represented by the `cell_type` field, which the notebook server knows to translate `"code"` to mean Python and `"markdown"` to mean its particular flavor of markdown (of which there are [several](https://www.iana.org/assignments/markdown-variants/markdown-variants.xhtml)). 

<div class="draft-text">below here is gonna be all draft text just thinkin out loud</div>

What is a document? in the context of our notebook, it's a series of cells in a JSON array. A cell has a type which determines how it is rendered, and it also contains a set of contents whose rendering is determined by the syntax specified by their metadata. It's three layers, but what if it was recursive? If any cell a) specified its type, which using our link expansion could indicate additional code used to interpret it as well as b) its metadata that was the arguments to that type system, and c) content, which could additionally include more cells, then we might get something really exciting. 

!! first we can imagine doing something very familiar, adding a citation block where we can input Bibtex and then render something into the representation of a citation (like how the notebook people talk about at the end of the paper!) Normally this information has to be parsed out of PDFs wen they're published, but instead we preserve the programmatic interface and also make the entire notion of citation formatting obsolete - sure go ahead and render it like however you want.

!! in a linear system this gets us transclusion. one of the major flaws of the mediawiki ecosystem is the adherence to the page-only document model. If instead a page was an arbitrary structuring unit of any number of other containers, then it would be possible to do things like subdocument transclusion, building complex and recursive concepts that consist of many layers of meaning (eg. all the times you're forced to use subobjects which are awkward and unnecessary).

!! in a horizontal system then we get threads and forums where we can just indicate that our responses are in reply to something.

!! if we generalize this beyond spatial, we can start thinking about it in the context of a more general citation ontology where there are many types of relationships between information. A reply is just one kind of relationship that carries with it a particular representation. 

!! imagine this in an interface design context - we have a drawer of document elements like what wordpress wants to be. Relate it back to the notion that a word doc is ultimately something that creates a bazillion types on the fly that have no structure but just have a bunch of potential metadata attributes. If instead we use both the ability to have arbitrary metadata extensions along with loose types that give us some scaffolding for how to represent particular types of classes, then there's no need to go off and develop any new platform or app in particular, but a series of views to a body of globally linked data.

!! you do need to have a figure to be able to explain this! make a graph of a continuous conversation and then show how all the following elements are just views from it.

> recursion is part of the whole power of RDF -- being able to follow a link to something else, and then the result of that *also being a link* instead of crossing domains into something unknowable. Because that's not always possible, because sometimes you don't want to represent everyhting in freaking RDF lol. So that's why we have a spanning layer of linked metadata that can refer to things as terminal nodes while remaining embedded in the linked system. 



This pattern of content in **cells** with **metadata** that describes their representation is powerful, and we can generalize it to a fluid system that looks less like a series of platforms and discrete format than a continuous space of multimodal communication. Considering the rest of the structure of our notebook with similar generality helps us get there. 

!! combine with the notion of a specification being able to specify code. So if a cell was able to indicate a particular parsing system and how to interpret it then we have an arbitrary document system.





---

- different types of links, other frameworks can indicate different types of things like plots, or we can do it manually
- recursive cells:
  - different levels of metadata, eg. document level metadata.
  - what binds our cells together? their order in a list.
  - recursive cells
      - content within the cells is itself subject to a sort of typing system
      - the very notion of a programming language is a way to specify a particular link between syntax and machine instructions
      - markdown is like this too: a # markdown title element is parsed into different types with particular metadata input and output.
      - eg extension with myst that you can have a commandlike syntax inside of a document to have arbitrary directives.

---



Now say we have another little interface to declare links inline in our notebook using [magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html). We might declare the name of our notebook like 

`%%docId @jonny:my-project:Writeup`

and then in the cell we indicate that we have plotted our data like this:

```
%%cellId Plotty
%%cellLink @comms:plotsData @jonny:my-project:Analysis1
```



---

So then, say, we indicate in `@jonny:my-project` that this document is related to it, and the links embedded within the notebook indicate that it has cells that use a specific result and plot it. If I enable sharing from my namespace, it becomes a creditable and discoverable part of my scientific work --- a straightforward means of breaking up the scientific paper as the unit of knowledge work. Recall that our sharing rules weren't just a binary switch, but can indicate different people and groups, so we can communicate the intention of publication and status of the document[^explicitlytoo] on an analogue scale from a private demo to our lab, a presentation to an institute or conference, or a public part of the scientific discourse.

[^explicitlytoo]: While we're at it, why not make it explicit by declaring its [`creativeWorkStatus`](https://schema.org/creativeWorkStatus) as `Draft`

<div class="draft-text">nod to other document systems like https://dokie.li/</div>
