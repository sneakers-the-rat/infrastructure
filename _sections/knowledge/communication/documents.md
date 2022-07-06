
#### Documents & Notebooks

<div class="draft-text" markdown="1">
todo:

- Extend the notion of markdown basically being a very simple type system, and we can extend the notion of a general document preparation system to use ideas from cells as well: eg. we have a citation block, you can put in some bibtex or whatever, and it'll generate the relevant semantic information. 
- The generalization of that is having some notion of slots and appearance for different block elements. Note the "cell-type" field in the notebook JSON
</div>

Say we have a means of downloading the results of some analysis we have already run as a result of `#my-project`. Recall that the data system we described was a system that links names under our `@jonny` namespace to a content-addressed p2p system, but someone has built a package to handle that under the hood. We might do a quick writeup in a notebook like this:

<div class="draft-text">embed notebook here</div>

The .json inside our notebook file would look something like this:

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

We could make use of another linked data technology, [JSON-LD](https://json-ld.org/), that is an extension and format that is interoperable with the RDF links we have been using implicitly throughout, to note that this cell[^notebookcell] contains a reference to our dataset. Say we use a `@comms` ontology to denote the various parts of our communication system, and put that in the `metadata` field:

```json
"metadata": {
  "scrolled": true,
  "@comms:usesData": "@jonny:my-project:Analysis1"
}
```

Now say we have another little interface to declare links inline in our notebook using [magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html). We might declare the name of our notebook like 

`%%docId @jonny:my-project:Writeup`

and then in the cell we indicate that we have plotted our data like this:

```
%%cellId Plotty
%%cellLink @comms:plotsData @jonny:my-project:Analysis1
```

So then, say, we indicate in `@jonny:my-project` that this document is related to it, and the links embedded within the notebook indicate that it has cells that use a specific result and plot it. If I enable sharing from my namespace, it becomes a creditable and discoverable part of my scientific work --- a straightforward means of breaking up the scientific paper as the unit of knowledge work. Recall that our sharing rules weren't just a binary switch, but can indicate different people and groups, so we can communicate the intention of publication and status of the document[^explicitlytoo] on an analogue scale from a private demo to our lab, a presentation to an institute or conference, or a public part of the scientific discourse.

[^explicitlytoo]: While we're at it, why not make it explicit by declaring its [`creativeWorkStatus`](https://schema.org/creativeWorkStatus) as `Draft`

<div class="draft-text">nod to other document systems like https://dokie.li/</div>
