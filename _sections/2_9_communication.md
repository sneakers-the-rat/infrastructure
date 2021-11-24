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

#### Notebooks (JSON-LD)

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

`%%docId @jonny:my-project:Writeup`

and then in the cell we indicate that we have plotted our data like this:

```
%%cellId Plotty
%%cellLink @comms:plotsData @jonny:my-project:Analysis1
```

So then, say, we indicate in `@jonny:my-project` that this document is related to it, and the links embedded within the notebook indicate that it has cells that use a specific result and plot it. If I enable sharing from my namespace, it becomes a creditable and discoverable part of my scientific work --- a straightforward means of breaking up the scientific paper as the unit of knowledge work. Recall that our sharing rules weren't just a binary switch, but can indicate different people and groups, so we can communicate the intention of publication and status of the document[^explicitlytoo] on an analogue scale from a private demo to our lab, a presentation to an institute or conference, or a public part of the scientific discourse.

[^explicitlytoo]: While we're at it, why not make it explicit by declaring its [`creativeWorkStatus`](https://schema.org/creativeWorkStatus) as `Draft`

!! also brief nod to other document systems like https://dokie.li/

#### Forums & Feeds

Communication doesn't need to be (and shouldn't be) exclusively unidirectional statements of fact. Our linked data system that allows us to directly references the subcomponents of an experiment, including analysis results and visualizations, naturally lends itself to use in a **forum.** In between feed-only mediums like most social media platforms and the indexical permanence of a wiki or publication, forums are a currently missing piece in most scientific communication systems: a way to have longform discussions about science in a public and semipermanent environment. 

We can start by imagining a forum where people in our discipline go to present their work and solicit feedback. We think we really have something, and it challenges some widely held previous results:

> hi everyone it is me, take a look at my analysis: `[[@forum:showImage @jonny:my-project:Writeup:Plotty]]` !!render inline
>
> I think it raises a number of interesting questions, in particular about `@rival`'s long-standing argument `@rival:hillsToDieOn:earthIsInsideTheSun` I also wonder what this means about this conversation we've been having more broadly about `@discipline:whereAreThePlanets`. Anyway, write back soon, xoxo

Our rival is polite and professional, so they take the criticism in stride and do their own analysis:

> Interesting results! I think I will have to revisit that, as well as something else I have been working on, `@rival:projects:escapeTheSun`. I wonder what it would look like if we used my analysis pipeline instead. I wrote a few conversion nodes (`@rival:nodes:newNode`) that could make our work easier to synchronize in the future.
>
> `[[@forum:rerunAnalysis @jonny:my-project:Analysis1 @rival:newAnalysis]]`
>
> `[[@forum:completeGraph @rival:newAnalysis @jonny:my-project:Writeup:Plotty]]`
>
> `[[@forum:showImage @rival:newAnalysis:Writeup:Plotty]]`

They have their own compute server set up that listens for commands like `@forum:rerunAnalysis` and so once they post, their server downloads the container and re-runs the analysis. `rerunAnalysis` is a link between our two analysis pipelines, so it is also possible to cross-apply the other parts of my analysis chain to their reanalysis. In this case say my `@rival` was careful to ensure their pipeline returned exactly the same data format as mine did, so it's possible to use something like `completeGraph` to retrace the steps in between the results and the plots that were generated. These are, of course, speculative features of a speculative forum, but they serve as examples of how this kind of federated naming system allows for new kinds of tools.

Sharing results, communicating them to the people that might be interested, reconsidering and re-analyzing work is an extremely normal part of science, but in this parallel universe we have the tools to also contribute to a cumulative body of knowledge that is explicit and public. If we allowed it, people that were interested in our data would be able to find the other ways it was analyzed, visualized, and discussed. We have recontextualized ours and our `@rival`'s previously published work and enriched the discussion surrounding our discipline's ongoing struggle to understand `whereAreThePlanets`. And we managed to do it incrementally, with a smaller document than an occasionally-titanic manuscript might be.

Traditional forums like [phpBB](https://www.phpbb.com/) are housed on a single domain and server, and have fixed moderation and structure. A forum built on top of a p2p system of linked data designed for **transclusion** and **ease of forking** could look a little different. Rather than independent web service, we could build a forum as another peer in our p2p swarm, and the forum could operate as an *interface* to the linked data system. 

For concreteness, let's call our forum `@neurochat`. We join the forum with our existing identity by sending them a [`@as.Join`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-join) request from their login portal, which gives them permission to issue certain links and activity on our behalf. `@neurochat` is a minimal forum, a glassy reflection of a platonic ideal projected against the cave wall of our laptop. It has a few broad categories like "Neuromodulation" and "Sensory Neuroscience," within which are collections of threads full of chronologically-sorted posts. This organization is reflective of their internal concept model, so, for example, threads within the Neuromodulation category are represented as members of `@neurochat:categories:Neuromod` and so on. When we post through their web interface, we create a few links with shared custody: We create a [`@as:Note`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note) that is [`@as:attributedTo`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-attributedto) us, has the [`@as:context`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-context) of the thread we're posting in, and is linked as [`@as:inReplyTo`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-inreplyto) the preceding post or any we've quoted. The forum is thus represented as a *discourse graph* whose structure is encoded as triplet links, but also provides a set of UX tools for viewing and interacting with it. Our humble `@jonny:myproject` now also carries with it references to the places where it is discussed.

In the simplest case, the content of our posts could be mirrored between the `@neurochat` server and our own namespace. Say our post `@neurochat:posts:<post_id>` is mirrored as `@jonny:neurochat:...`. The embedding within our linked system give us a much richer space of negotiation over permissions and the status of our writing, though. Since this is a public forum, the server might set posts to be able to be seen and re-represented by default. We could then imagine a set of federated forums where a single post to one of them is then crossposted to several different communities: eg. if our work was an interdisciplinary project that was also releant to some people from `@linguisticsChat`. If we have need for a bit more privacy, our forum could take into account our own blocks of users and federations, eg. if we never wanted our data/posts to be used by any `@amazon`-affiliated federations or by known troll users. `@neurochat` is a very barebones forum, so it would also be possible for someone to create their own *fork* of the *interface* to provide additional functionality, ux improvements, etc. We could then trivially make a *fork* of the *community* by picking up our corner of the discourse graph and associating it with a new forum in the event of, eg. disagreements with the moderation team, the strictures of the category system, etc. Since our posts are in our own namespace, we could then transclude them wherever we wanted, eg. in a wiki page about a topic as in [agora's twitter bot](https://anagora.org/node/agora-bot). 

We have been considering `@neurochat` as a distinct site with its own code and features, presumably located at something like `neurochat.com`, but we can further imagine it in conversation with the parallel namespaces of wiki `Talk:` pages. If we think of a paper or some other primary text as the "Article" page, we can imagine being able to have a `Forum:` attached to it for further discussion. This isn't far-fetched at all: this paper has [its own gitter chatroom](https://gitter.im/scientific-infrastructure/community), which is a primarily web-based [Matrix](https://matrix.org/) client {% cite hodgsonGitterNowSpeaks2020 hodgsonWelcomingGitterMatrix2020 %}. Combined with transclusion between instances of forums, we could imagine the forum for our particular project being indexed in a larger system of scientific forums. So rather than a collection of empty rooms and new logins to make, our forum is part of a broader scientific conversation, but remains under our control.

Forums are just one point in a continuous feature space of communication media. Specifically, they are nested, chronological, feedlike collections of threads within categories. If we were to take forum threads out of their categories, pour them into our water supply, and drink whatever came our way like a dog drinking out of an algorithmic fire hydrant, we would have Twitter. Algorithmic, rather than purposefully organized feed systems have their own sort of tachycardic charm. They are effective at what they aim to do, presenting us whatever maximizes the amount of time we spend looking at them in a sort of hallucinatory timeless now of infinite disorganization --- at the expense of desirable features of a communication system like autonomy of affiliation, perspective on broader conversation, and a sense of stable community. 

!! still, a system for rapid and informal communication has been massively useful for some* scientists, so we should embrace that end of the communications continuum as well rather than focus solely on more formal communication. !! we should embrace the multiple registers of scientific communication rather than run from them.

- system of linked social media systems with different interfaces already exist, fediverse on top of activitypub
- mastodon has probs with chronological feed and difficulty of moving identities from server. but p2p and emphasis on preserved communication space across interfaces helps with this. 
- practical need and use, eg. being able to find multiple registers of communicationa about a paper, ability to send a message to people within a research area, start a collaboration and then work a little less secretively within groups by maintaining a continuous conversation among disciplines across multiple scales of organization. Eg. like what if instead of starting a new slack about everything, we were able to address an intelligible group of people by some self-identified set of labels and tags, etc?

#### Annotation
- preserving traditional writing systems
- backlinking and transclusions
- commentary
- peer review

#### Trackers

- refine the notion of client and tracker: our client needs a UX too!!

- getting the data needed to do an experiment
- federated data indexing
- return to notions of social incentives to use





#### Wikis
- resolving schema conflicts
- contextual knowledge
- programming interfaces a la autopilot wiki 
- organizing & governance
- theory wiki yo.

- [anagora!!!](https://anagora.org/)

#### ???

- the indefinite future! who knows what people will come up with, and that's the point!

---
<div id="draftmarker"><h1># draftmarker</h1><br>~ everything past here is purely draft placeholder text ~  </div>
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