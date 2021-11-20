!! need introduction!

It's time to start thinking about interfaces. We have sketched our system in turtle-like pseudocode, but directly interacting with our linking syntax would be labor intensive and technically challenging. Instead we can start thinking about tools for interacting with it in an abstract way. Beneath every good interface we're familiar with, a data model lies in wait. A .docx file is just a zipped archive full of xml, so a document with the single word "melon" is actually represented (after some preamble) like:

```xml
<w:body>
  <w:p 
    w14:paraId="0667868A" 
    w14:textId="50600F77" 
    w:rsidR="002B7ADC" 
    w:rsidRDefault="00A776E4">
    <w:r>
        <w:t>melon</w:t>
    </w:r>
  </w:p>  
</w:body>
```

Same thing with jupyter notebooks, where a block of code:

```python
>>> rating = 100
>>> print(f'I rate this dream {rating}')
'I rate this dream 100'
```

is represented as JSON (simplified for brevity):

```json
{
  "cell_type": "code",
  "id": "thousand-vermont",
  "outputs": [{
    "name": "stdout",
    "output_type": "stream",
    "text": [
      "I rate this dream 100\n"
    ]
  }],
  "source": [
    "rating = 100\n",
    "print(f'I rate this dream {rating}')"
  ]
}
```

So we are already used to working with interfaces to data models, we just need to think about what kind of interfaces we need for a scientific communication system. 

Let's pick up where we left off with our linked data and tools. Recall that we had a `project` named `#my-project` that made reference to our experiment, a few datasets that it produced, and an analysis pipeline that we ran on it. We *could* just ship the raw numbers from the analysis, wash our hands of it, and walk straight into the ocean without looking back, but usually scientists like to take a few additional steps to visualize the data and write about what it means. 

Say we have a means of downloading the results of some analysis we have already run as a result of `#my-project`. Recall that the data system we described was a system that links names under our `@jonny` namespace to a content-addressed p2p system, but someone has built a package to handle that under the hood. We might do a quick writeup in a notebook like this:

!! insert jupyter notebook here!

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

We could make use of another linked data technology, [JSON-LD](https://json-ld.org/), that is an extension and format that is interoperable with the RDF links we have been using implicitly throughout, to note that this cell contains a reference to our dataset. Say we use a `@comms` ontology to denote the various parts of our communication system, and put that in the `metadata` field:

```json
"metadata": {
  "scrolled": true,
  "@comms:usesData": "@jonny:my-project:Analysis1"
}
```

Now say we have another little interface to declare links inline in our notebook using [magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html). We might declare the name of our notebook like 

`%%docName @jonny:my-project:Writeup`

and then in the cell we indicate that we have plotted our data like this:

`%%cellLink @comms:plotsData @jonny:my-project:Analysis1`








---
<div id="draftmarker"><h1># draftmarker</h1><br>~ everything past here is purely draft placeholder text ~  </div>
---

---
local outline
- basic linked data writing
- transclusion to a forum

---

"full cycle"
- Initial communication
  - p2p mastodon!?
- Forming a group
  - p2p mastodon!
- Group research & sharing/annotating papers
  - reference manager & shared annotations & wikilike system for notes. carry through annotations to the writing process & use as backlinks. example of private -> public links
- Planning experiment
  - example of autopilot wiki!?
- Doing experiment & Analysis (we already talked about)
  - example of autopilot wiki!?
- Drafting paper
  - notebooklike interface
  - early stopping point of not needing to publish a paper at all, every part of the paper is public at this point, so we could communicate in much smaller bites of linked analyses and commentary
  - example of backlinks put on top of the other paper, since we're friends future people are able to see when a particular part of a paper is being referenced
- Reviewing paper
  - public or facilitated peer review
- Communicating paper
  - non-ephemeral p2p masto & linked forum, multimodal transclusion
- Criticism and Integration into larger whole
  - theory wiki!
- Splitting of group!

---

Example interfaces
- personal webpage that indexes your links!
- trackerlike data indexing system
- semantic notebooks for publication, example with annotations & browser
- jupyterlike forum
- highlighter interface for transclusion, anchor dropping, and reverse transclusion
  - hypothes.is/zoterolike integration to be able to carry annotations between versions of a paper as well as interacting with "non-system" items.
- Schema resolution linking example
- Wiki with embedded analyses, theory wiki!
- Examples of aggregating parameters/metadata for use in experimental tools and analysis chains, autopilot wiki example!

Caveats!
- Not prescriptive about using these tools in particular! Should be easy to link anything, which it is with p2p! Eg. Need to be able to indicate a .docx without needing to write in a different way as a reference.







Threads left dangling
- Interfaces for everything!
- Schema negotiation
- Contextual knowledge preservation
- Knowledge Graphs

!! skohub! https://skohub.io/

!!!!!! extending jupyter notebook to use JSON-LD!!!


!! discovery of papers for scientists as well as general public, being able to trace history.

> Though frequently viewed as a product to finish, it is dynamic ontologies with associated process-building activities designed, developed, and deployed locally that will allow ontologies to grow and to change. And finally, the technical activity of ontology building is always coupled with the background work of identifying and informing a broader community of future ontology users. {% cite bowkerInformationInfrastructureStudies2010 %}

!! stop sweating about computational accuracy and completeness. the only danger is a system that makes appeal to perfection and promises accuracy like those sold in golden foil by the platform capitalists. if we are conceptualizing this appropriately as a *system of communication* where particular results are intended to be *interpreted in context* then we would treat computational errors and semantic inaccuracies like we do with *language*: like a *joke*.

> For example, one person may define a vehicle as having a number of wheels and a weight and a length, but not foresee a color. This will not stop another person making the assertion that a given car is red, using the color vocabular from elsewhere. - https://www.w3.org/DesignIssues/RDB-RDF.html


>  Relational database systems, manage RDF data, but in a specialized way. In a table, there are many records with the same set of properties. An individual cell (which corresponds to an RDF property) is not often thought of on its own. SQL queries can join tables and extract data from tables, and the result is generally a table. So, the practical use for which RDB software is used typically optimized for soing operations with a small number of tables some of which may have a large number of elements.
> 
> RDB systems have datatypes at the atomic (unstructured) level, as RDF and XML will/do. Combination rules tend in RDBs to be loosely enforced, in that a query can join tables by any comlumns which match by datatype -- without any check on the semantics. You could for example create a list of houses that have the same number as rooms as an employee's shoe size, for every employee, even though the sense of that would be questionable.
> 
> The Semantic Web is not designed just as a new data model - it is specifically appropriate to the linking of data of many different models. One of the great things it will allow is to add information relating different databases on the Web, to allow sophisticated operations to be performed across them. https://www.w3.org/DesignIssues/RDFnot.html

!! caution about slipping into techno-utopianism even here, we need the UI and tooling here to be simple to not only use but also build on. yes that does mean yet another framework! but this one is the most mythical yet, because I don't really know what it would look like! but bad UI has killed lots of projects, eg. IPFS (though it's not dead just slow!)
 https://macwright.com/2019/06/08/ipfs-again.html
https://blog.bluzelle.com/ipfs-is-not-what-you-think-it-is-e0aa8dc69b