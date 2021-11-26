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

Forums are just one point in a continuous feature space of communication media: nested, chronological, feedlike collections of threads within categories. If we were to take forum threads out of their categories, pour them into our water supply, and drink whatever came our way like a dog drinking out of an algorithmic fire hydrant, we would have Twitter. Algorithmic, rather than purposefully organized feed systems have their own sort of tachycardic charm. They are effective at what they aim to do, presenting us whatever maximizes the amount of time we spend looking at them in a sort of hallucinatory timeless now of infinite disorganization --- at the expense of desirable features of a communication system like a sense of stable, autonomously chosen community, perspective on broader conversation, and cumulative collective memory. 

Still, the emergence of a recognizable "Science Twitter" demonstrates the depth of need for rapid, informal communication systems in science. We should embrace the plurality of registers in scientific communication, that there needs to be space for near-amateurs to pose naive questions alongside careful and considered formal scholarship. That is just to say that we should reflect the division of formality from scientific value in what we build, and build systems to support the implicit communicative labor of science like whisper networks, mailing lists, and groupchats that have always existed. The blending of digital cultures, and broadly 'non-academic scientists' with traditional scientific communication streams is healthy: with appropriate caveats for abuse, strawmen, et al. I don't think it takes that much critical analysis to argue that "shitposts are good, actually, for science."

A federated, multi-interface, autonomously-hosted system of social media systems already exists, and we've been talking about it: the roughly construed "[Fediverse](https://fediverse.party/)" based (largely) on ActivityPub. <span style="color:#f00;">!! check rest of document and see how much explanation of activitypub is needed here/what can be consolidated. but in any case provide some other examples like peertube and agora, dokieli, funkwhale</span>

Mastodon already implements most of the forum example described above: it has its own protocol that [extends activitypub](https://docs.joinmastodon.org/spec/activitypub/), but it functions as an interface to a protocol-based threaded communication. For example [this post](https://social.coop/@jonny/107328829457619549) is represented in (abbreviated) JSON:

```json
{
    "id": "107328829457619549",
    "created_at": "2021-11-23T22:52:49.044Z",
    "in_reply_to_id": "107328825611826508",
    "in_reply_to_account_id": "274647",
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "url": "https://social.coop/@jonny/107328829457619549",
    "content": "<p>and making a reply to the post to show the in_reply_to and context fields</p>",
    "account":
    {
        "id": "274647",
        "username": "jonny",
        "fields":
        [ ... ]
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
}
```

and then rendered by the particular version of Mastodon implemented on the host, [social.coop](https://social.coop). As long as the host sends and receives post (and other) data in a compatible format, it can render it however it wants, add tools, etc. It becomes trivial to imagine, then, a continuum of communication tools between and around microblogging sites like Twitter and Mastodon and forums: just add categorization, tagging, or systems for whatever need is revealed by the normal dynamics of use. 

The problem with an endless homogenous feed is filtering and prioritizing what to show. The lack of control over feed content is not an accident: it's the product --- ready access to a hundred million hamsters on personalized content wheels with whatever combination of micro and macrotargeting you could want. Nothing seems out of the ordinary when you have no control over what you see. Reciprocally, there's no way aside from herding a flock of alternate accounts to direct what you say to different audiences. Mastodon can filter posts at a federation level[^onlyfederated], with hashtags, and lets users make lists of peers, but is a proudly chronological feed. No algorithms allowed. Using it has a learning curve, as when you start you see nothing, but before you know it you can't find anything in the pile. Forums threads, within categories are also typically chronologically sorted, but because they are identified with a *subject* rather than by the *person* who started the thread typically have longer lifespans and more findable. 

[^onlyfederated]: Only other servers that the host server federates with are listed

!! There is no single answer to systems of discovery, but somewhere between explicit categorical organization, person and subject-centric threads, semantic annotation, and making smaller p2p federations is a recipe for a broad, continuous, and cumulative scientific discussion. Instead of casting about for advice within our information bubbles, we might aspire to having a *place* to *ask* the people who *might know*. Instead of starting another new slack with a few hundred posts that then vanishes entirely, we might imagine being able to fluidly form and dissolve communities and be able to build on their history.

#### Annotation & Overlays

We can't expect the entire practice of academic publishing to transition to cell-based text editors anytime soon. In the same way that we discussed frameworks for integrating heterogeneous analytical and experimental tools, we need some means of **bridging** communication tools and **overlays** for interacting with communication formats. Bridging communication protocols is a relatively well-defined project, eg. the [many ways to use Matrix](https://matrix.org/bridges/) with [Slack](https://matrix.org/bridges/#slack), [email](https://matrix.org/bridges/#email), [Signal](https://matrix.org/bridges/#signal), etc. The overlays for websites, pdfs, and other more static media that we'll discuss are means for annotation and bidirectional transclusion: including pieces of the work elsewhere, and representing inclusions elsewhere on the work. In representing the intrinsically interactive and social nature of reading (eg. see {% cite jacksonMarginaliaReadersWriting2001 %}), overlays naturally lend themselves to imagining new systems to replace traditional mechanisms for peer-review and criticism. We don't need to look far to find a well-trod interface for annotation overlays: we shouldn't underrate the humble highlighter.

[Hypothes.is](https://hypothes.is), enabled on this page, lets readers highlight and annotate any webpage with a [browser extension](https://chrome.google.com/webstore/detail/hypothesis-web-pdf-annota/bjfhmglciegochdpefhhlphglcehbmek) or javascript bookmarklet. At its heart is a system for making anchors, references to specific places in a text, and the means of matching them even when the text changes or the reference is ambiguous {% cite csillagFuzzyAnchoring2013 %}. For example, [this anchor](https://hypothes.is/a/oLw4uk7_Eeyt5N-FVlE3fw) has three features, a `RangeSelector` that anchors it given the position within the paragraph, an absolute `TextPositionSelector`, and a contextual `TextQuoteSelector` that you can see with an [API call](https://api.hypothes.is/api/annotations/oLw4uk7_Eeyt5N-FVlE3fw)[^anchorapi].

On its own, it serves to give a `Talk:` page to every website. With an integration into a system of linked data and identity, it also serves as a means of extending the notion of bidirectional transclusion described above to work that is not explicitly formatted for it. Most scientific work is represented as `.pdf`s rather than `.html` pages, and hypothes.is [already supports](https://web.hypothes.is/help/annotating-locally-saved-pdfs/) annotating PDFs. With an integration into pdf reading software, for example [Zotero's (currently beta) PDF reader](https://www.zotero.org/support/pdf_reader_preview), there would be a relatively low barrier to integrating collaborative annotation into existing workflows and practices.

The dream of public peer review with public annotation is relatively straightforward, but so are the nightmares of a scientific literature swamped with trolls. Talking about our work on a forum with a "forward" reference, of the work linked to by the forum or on PubPeer feels fine, but the "reverse" reference of an annotation appearing on your page that links to a forum discussion is significantly more challenging --- "who gets to annotate my work?"

Framed as an annotation system, the answer given by the current model of peer review is "usually three, usually anonymous people." Except the document and annotations are usually private until the author revises the document to the point where no annotations remain, and the peer reviewers become invisible along with the social nature of the review. The notion that the body of scientific knowledge is best curated by passing each paper through a gauntlet of three anonymous reviewers, after which it becomes Fact and nearly as a rule never changed is ridiculous on its face.

Digital publishing makes imagining the social regulation of science as a much more broadly based and continuous process much easier, but the problem of moderation remains. Some movement has been made towards public peer review: eLife has integrated hypothes.is since 2016 {% cite ELifePartnersHypothes2016 %}, and bioRxiv had decided to integrate it as well in 2017 {% cite dwhlyBioRxivSelectsHypothesis2017 %} before getting cold feet about the genuinely hard problem of moderation (among others {% cite heatherstainesPreprintServicesGather2018 %}) and instead adopting the more publisher-friendly TRiP system of refereed peer-reviews {% cite nateangellAnnouncingTRiPTransparent2019 %}.

Asking every author to become a forum moderator and constantly patrolling the annotations of their papers sounds bad, as does the work of maintaining block and allowlists for every individual account. While a full description of the norms and tools needed to maintain healthy public peer review is out of scope here, the system of autonomous users being able to organize into overlapping federations described throughout *provides a space for having that conversation.* Authors could, for example, allow the display of annotations from a professional society like `@sfn` that has a code of conduct and moderation team, or annotations associated with comments on `@pubpeer`, or from a looser organization of colleagues and other `@neurofriends`. Conversely, being able to make annotations and comments from different federations gives us a rough proxy to different registers of communication and preserves the plurality of our expression. While my official `@university`-affiliated federation is restrained and academic, my `@neurotrans` alt might be a little more freewheeling. A protocol for federating peers that we first described in the context of sharing data has the more general consequence of creating a means of negotiating and experimenting with different systems of social norms and governance.

Social tools like these are in the hypothes.is team's [development roadmap](https://web.archive.org/web/20211015213849/https://github.com/hypothesis/product-backlog/projects/6), but I intend it as a well-developed and mature example of a general type of technology[^genius]. Many scientists are already familiar with another implementation: the comment and review features of Google Docs and Microsoft Word. We already use these tools to work together to improve our work, but there's no reason the process should stop at the time of publication. Combined with a system for valuing and publishing smaller units of work, the process of public peer review starts to look a lot healthier as a continuous process of communication and collective mentorship instead of the current system of a gladitorial thumbs up/down indictment on years of your life.

[^genius]: cf. the [genius.com](https://genius.com) overlay.

---
<div id="draftmarker"><h1># draftmarker</h1><br>~ everything past here is purely draft placeholder text ~  </div>
---


#### Trackers

- refine the notion of client and tracker: our client needs a UX too!!

- getting the data needed to do an experiment
- federated data indexing
- return to notions of social incentives to use





#### Wikis
- resolving schema conflicts -- and as {% cite StandardizingActivityPubGroups2021 %} demonstrates it needs to move constructively within a pluralistic system of governance models.
- contextual knowledge
- programming interfaces a la autopilot wiki 
- organizing & governance
- theory wiki yo.

- [anagora!!!](https://anagora.org/)


!! relationship between linked data and social media protocols stuff goes here, as compared to libresocial: https://libresocial.com/en/startpage/ {% cite graffiLibreSocialPeertopeerFramework2021 %}

!! open engiadina https://openengiadina.net/ - https://octodon.social/@cwebber/107158266685022617


#### ???

- the indefinite future! who knows what people will come up with, and that's the point!


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


!! skohub! https://skohub.io/


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