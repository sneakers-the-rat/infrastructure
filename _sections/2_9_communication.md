It's time to start thinking about interfaces. We have sketched our system in turtle-like pseudocode, but directly interacting with our linking syntax would be labor intensive and technically challenging. Instead we can start thinking about tools for interacting with it in an abstract way. Beneath every good interface we're familiar with, a data model lies in wait. A .docx file is just a zipped archive full of xml, so a blank word document that contains the single word "melon" is actually represented (after some preamble) like:

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

A federated, multi-interface, autonomously-hosted system of social media systems already exists, and we've been talking about it: the roughly construed "[Fediverse](https://fediverse.party/)" based (largely) on ActivityPub. 

<div class="draft-text">!! check rest of document and see how much explanation of activitypub is needed here/what can be consolidated. but in any case provide some other examples like peertube and agora, dokieli, funkwhale</div>

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

There is no single answer to systems of discovery, but somewhere between explicit categorical organization, person and subject-centric threads, semantic annotation, and making smaller p2p federations is a recipe for a broad, continuous, and cumulative scientific discussion. Instead of casting about for advice within our information bubbles, we might aspire to having a *place* to *ask* the people who *might know*. Instead of starting another new slack with a few hundred posts that then vanishes entirely, we might imagine being able to fluidly form and dissolve communities and be able to build on their history.

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


#### Trackers & Wikis

The final set of social interfaces is effectively the "body" of social technology. So far our infrastructural systems have an unsatisfyingly hollow center: there's a lot of talk about tool frameworks and protocols for linked data, but *where is it? what does it look like?* We can pick up the threads left hanging from our description of [bittorrent trackers](#archives-need-communities) and knit them in with those from [the wiki way](#the-wiki-way) and describe how systems for surfacing procedural and technical knowledge work can also serve as a basis of searching, indexing, and governing the rest of the system. 

Bittorrent trackers serve to index data and organize a curation community --- we need that too, let's start there. Say we have a tracker that indexes a particular format of data, as [`@dandihub`](https://hub.dandiarchive.org) does with `@nwb`. We can search for data using all the fields of NWB, but don't want to rely just on the peers that are active, so the role of the tracker is to maintain a searchable index of metadata that refers to the datasets shared by peers. We want to be interoperable with other trackers that index compatible data, so let's say that's implemented as a database that supports [SPARQL federated queries](https://www.w3.org/TR/sparql11-federated-query/)[^sparqldb] where requests can be spread across many databases. For concreteness, let's assume that the results of our search are some content-addressed reference to a resource on a p2p network like a [magnet link](https://en.wikipedia.org/wiki/Magnet_URI_scheme).

We need some kind of *client* that can download files and run in the background to share them. We can start with the image of a bittorrent client like [qBittorrent](https://www.qbittorrent.org/) that does just that, but we also need a means of making the link declarations that we did before in pseudocode, and it makes sense for the client to handle that as well. Let's say our client handles our identity, either by a self-created cryptographic hash as in IPFS{% cite benetIPFSContentAddressed2014 %}, or attested by some trusted third party as in ActivityPub. Instead of our identity being tied to the services provided by the server, however, we can think of this as a peer-to-peer ActivityPub where we can directly send and receive messages containing our links and negotiating our connections. As an interface, say we have a typical file browser that we can set permissions for files, group them into projects, and share them with others. Since the system consists of links, an editor that allows users to visualize and edit a hierarchical graph of nodes and (typed) edges:

!! input network editing React figure from presentation here!

So say it's time for us to share a dataset. We click the 'share' button in our client which sends an ActivityPub-style message saying we have [`@as:Create`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-create)d a new resource to the other peers indicated in our permission settings. This message both uploads the metadata for our dataset to the, say, `@dandihub` tracker, but since `@dandihub` is an equivalent peer in our system, and modeling off ActivityPub we are able to have "friends," we can notify other researchers directly. The tracker can host our metadata pointing to our data so it's available from any other peer that's hosting it even if we go offline, but peers can query us directly to enumerate all the links, datasets, etc. we have allowed them to.

What about handling format extensions not included in the base `@nwb` format? Since we own the representation of our data, we can imagine a strict base `@nwb`-only tracker, but also think of `@dandihub` that has built tools to handle extensions. So alongside our dataset we can upload an extension like our `@jonny:SolarEphys` example that derives from `@nwb:ElectricalSeries`, and the tracker then can display our extension as well as all the other extensions that branch off the various points of the standard. At this point we can imagine a spray of thousands of trivially different extensions to handle overlapping data types, which is where most data stores typically stop, but let's explore community systems built on forums and wikis for schema resolution as an example of *distributed governance.*

!! figure of lots of leaf nodes hanging off ElectricalSeries

Wikis are not magical systems of infinite pluralistic knowledge, but one thing they do well is provide the means of developing durable but plastic systems norms and policies for a wide variety of social systems. Butler, Joyce and Pike, emphasis mine:

> Providing tools and infrastructure mechanisms that support the development and management of policies is an important part of creating social computing systems that work. [...] 
>
> When organizations invest in [collaborative] technologies, [...] their first step is often to put in place a collection of policies and guidelines regarding their use. **However, less attention is given to the policies and guidelines created by the groups that use these systems which are often left to “emerge” spontaneously.** The examples and concepts described in this paper highlight the complexity of rule formation and suggest that support should be provided to help collaborating groups create and maintain effective rulespaces.
> 
> [...] **The true power of wikis lies in the fact that they are a platform that provides affordances which allow for a wide variety of rich, multifaceted organizational structures.** Rather than assuming that rules, policies, and guidelines are operating in only one fashion, wikis allow for, and in fact facilitate, the creation of policies and procedures that serve a wide variety of functions {% cite butlerDonLookNow2008 %} 

So between discussion on the forum or in `Talk:`-like pages, we can imagine a set of norms and policies evolving from the community on this particuar tracker, perhaps unlike other trackers. In this case we can imagine someone wanting to clean up some near-equivalent extensions by starting a thread in the forum to discuss the proposed changes. Say we want to merge `@jonny:Extension1` and `@rumbly:Extension2` -- the forum notifies us that someone is talking about our extension so we have a chance to weigh in. If we reach some sort of amicable consensus where we agree to supercede it with a merged `@forum:Extension3` type, the forum could send us a [`@as:Offer`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-offer) to [`@as:Update`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-update) our extension, which should we [`@as:Accept`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-accept) from our client then notifies all the downstream consumers of our data and extension that its format has changed. 

What if consensus fails? Since every link in the system is underneath a `@namespace`, links never have a pretense of "correctness," but have the ontological status of a linguistic gesture: links are "something someone said" that we're free to disagree with[^timblcar]. In that case, the `@forum:Extension3` exists as "someone said these are equivalent, but I don't necessarily agree" and the forum is free to represent its cleaned up representation while preserving the plurality of expression in our data format. If I want to go to greener pastures to a forum that has policies and culture closer to mine, it's relatively straightforward to federate with a new tracker and move my data there since I still own it all.

[^timblcar]: "For example, one person may define a vehicle as having a number of wheels and a weight and a length, but not foresee a color. This will not stop another person making the assertion that a given car is red, using the color vocabular from elsewhere." - https://www.w3.org/DesignIssues/RDB-RDF.html

Let's pick up scientific communication in linked data [forums](#forums--feeds) in conversation with the [social incentives for curation](#archives-need-communities) of trackers. This system as described is a forum where everyone in the conversation has access to the data and results in question reminiscent of What.cd and access to music. While upload/download ratio might not be the best social incentive system for scientific trackers, there are plenty of others. 

For example, we briefly mentioned a Folding@Home-like system of donated computing resources, and separately described embedding analyses in a forum by calling our own compute resources. Together, a tracker could implement a compute ratio where to use shared computing resources you need to contribute a certain amount of your own. The bounty system where peers would donate their excess upload in exchange for uploading a rare album on what.cd could translate to one where someone who has donated a lot of excess compute time could donate it for someone uploading or collecting a particular dataset. 

Another tracker more focused on sharing and reviewing results might make a review ratio system, where for every review your work receives you need to review n other works. This would effectively function as a **reviewer co-op** that can make the implicit labor of reviewing explicit, and develop systems for tying the reviews required for frequent publication with explicit norms around reciprocal reviewing. 

Forum and feedlike media are good for organizing continuous conversation, but wikis serve as a more durable knowledge store for cumulative reference information. We don't need to imagine wikis as being text-only, with wiki formatting used just to change the appearance of text, but as a means of declaring and manipulating semantic links. For example, [Semantic MediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) is an extension to Wikipedia's wiki system that extends `[[Wikilinks]]` to be able to declare semantic links like `[[linkType::Target]]`. For example, if our project had a wiki page like `[[My Project]]` we could say it `[[hasType::@analysis:project]]` and `[[usesDataset::@jonny:mydata1]]` etc. These wikis have the capability to not only organize knowledge, but also serve as a flexible means of declaring new programming interfaces and assigning credit. 

As a live example, let's consider the [Autopilot Wiki](https://wiki.auto-pi-lot.com) at [https://wiki.auto-pi-lot.com](https://wiki.auto-pi-lot.com). This wiki has a set of categories, properties, templates, and forms for describing the additional contextual technical knowledge needed to use [Autopilot](https://docs.auto-pi-lot.com/en/latest/), a framework for behavioral experiments {% cite saundersAutopilotAutomatingBehavioral2019 %}. The semantic structure of the links is useful for designing interfaces based on complex queries, for example "find me all the [`passive electronic components`](https://wiki.auto-pi-lot.com/index.php/Category:Passive_Component) that have a [`guide`](https://wiki.auto-pi-lot.com/index.php/Category:Guide) that describes [`using`](https://wiki.auto-pi-lot.com/index.php/Property:Uses_Tool) a [`soldering iron`](https://wiki.auto-pi-lot.com/index.php?title=Property%3AUses+Tool&limit=20&offset=0&filter=Soldering+Iron) to build [`lighting`](https://wiki.auto-pi-lot.com/index.php?title=Property%3AModality&limit=20&offset=0&filter=Illumination) for a behavioral [`enclosure`](https://wiki.auto-pi-lot.com/index.php?title=Property%3AModality&limit=20&offset=0&filter=Enclosures)". Each page can have a [rich semantic description](https://wiki.auto-pi-lot.com/index.php/Autopilot_Behavior_Box#tab-content-facts-list) with multimodal links describing tools, CAD diagrams, associated DOIs, software dependencies, etc. Links can be declared `[[linkModality::inline]]` as a fluid part of writing, but also can be submitted by using forms (eg for new [Parts](https://wiki.auto-pi-lot.com/index.php/Form:Part)) with structured, autocompleting properties to lower syntax barriers for new users. 

The "soft durability" of wikis makes space to discuss "off-label" uses for hardware common across many disciplines that typically exists as lab lore rather than documented. For example, an early-adopter of Autopilot sent me a message saying they weren't able to get ultrasound from an [amplifier](https://wiki.auto-pi-lot.com/index.php/HiFiBerry_Amp2) that was advertised up to 192kHz. Upon further study, we found there was a 20kHz low-pass output filter and were able to find and remove the components and leave a trail of breadcrumbs for future users. Though this is a simple example, it is emblematic of the kind of knowledge work that currently has no good means of communication or professional valuation.

The blend of programmatic and natural language descriptions makes it easy to contribute to, but also makes knowledge organization improve the software that uses it. The [Amp2](https://wiki.auto-pi-lot.com/index.php/HiFiBerry_Amp2) page lists which of the GPIO pins of a raspberry pi it depends on, so Autopilot will be extended to check for conflicting hardware configurations[^mutingamp2]. Better: since it's possible for anyone to make new templates, forms, categories, and pages, the wiki can be used to build new programming interfaces entirely. Autopilot's [plugin system](https://docs.auto-pi-lot.com/en/latest/guide/plugins.html) is built this way, where one submits a [plugin](https://wiki.auto-pi-lot.com/index.php/Autopilot_Plugins) with a [form](https://wiki.auto-pi-lot.com/index.php/Form:Autopilot_Plugin) which then makes it immediately available to any Autopilot user.

[^mutingamp2]: for example, pin 7 mutes the board, but is still exposed in the 40-pin header. We powered an LED with pin 7 and were absolutely baffled why the sound would mute every time the light went on for a week or so.

The addition of structured contextual knowledge to our system gives us an almost comical degree of provenance: from conversations in a forum that reference a paper, that links to its analysis, data, experimental software, all the way back to the properties of the solenoids used in the experiment. It's not just provenance for provenance's sake as extra labor, every step is *useful* to the experimenter. I give the example of the Autopilot wiki for concreteness, but the broader point is that forums and wikis can serve the role of negotiating systems of expression for different parts of the system. 

The same combination of trackers, forums, and wikis has a natural application to analysis pipelines. Ideally, to move beyond fragile code reduplicated in every lab, we need some means of reaching consensus on a few canonical implementations of fundamental analysis operations. Given a system where analysis chains are linked to the formats and subdisciplines they are used with, we can map a semantically dense map of the analysis paths used in a research domain. In neurophysiology: "What are the different ways spikes are extracted and analyzed from extracellular electrophysiology recordings?" Having the ability to discuss and contextualize different analytical methods elevates all the exasperated methods critiques and exhortations to "not use this statistically unsound technique" into something *structurally expressed in the practice of science.* See all the `@neurotheory` threads about this specific analysis chain, or the `@methodswiki` page that summarizes this general category of techniques.

We're now in a place where we can address the problem of a cumulative knowledge system for science directly. In many (most?) scientific epistemologies, scientific results do not directly reflect some truth about reality, but instead instead are embedded in a system of meaning through a process of active interpretation (eg. {% cite meehlTheoreticalRisksTabular1978 %}). The interpretation of every scientific result is left as the responsibility of the authors to recreate and a few reviewers to evaluate, which would be a monumental amount of labor given the velocity of papers, so researchers do the best they can engaging with a small amount of research. Since the space of argumentation is built from scratch each time from incomplete information, there's no guarantee of making cumulative progress on a shared set of theories, and most fall far from the supposed ideal of hard refutation and can have long lives as "zombie theories." van Rooij and Baggio describe the "collecting seashells" approach of gathering many results and leaving the theory for later with an analogy:

> "In a sense, trying to build theories on collections of effects is much like trying to write novels by collecting sentences from randomly generated letter strings. Indeed, each novel ultimately consists of strings of letters, and theories should ultimately be compatible with effects. Still, the majority of the (infinitely possible) effects are irrelevant for the aims of theory building, just as the majority of (infinitely possible) sentences are irrelevant for writing a novel." {% cite vanrooijTheoryTestHow2021 %}

They and others (eg. {% cite guestHowComputationalModeling2021 %}) have argued for an iterative process of experiments informed by theory and modeling that confirm or constrain future models. Their articulation of the need for multiple registers of formality and rigidity is particularly resonant here. van Rooij and Baggio again:

> "The first sketch of an f need not be the final one; what matters is how the initial f is constrained and refined and how the rectification process can actually drive the theory forward. Theory building is a creative process involving a dialectic of divergent and convergent thinking, informal and formal thinking." {% cite vanrooijTheoryTestHow2021 %}

Let's turn our provenance chain into a circle: a means of linking theories to analytical results and interpretation as well as experimental design and tooling. Say the theorists have a wiki. They start making some loose schematic descriptions of their theories and linking them to different experimental results that constrain, affirm, refute, or otherwise interact with them. These could be forward or backlinks: declared by the original author or by someone else describing their results. 

In the most optimistic case, where we have a full provenance chain from analytical results back through experimental practice, we have a means of formally evaluating the empirical contingencies that serve as the evidence for scientific theories. For a given body of experimental data bearing on a theoretical question, what kinds of evidence exist? As the state of the art in analytical tooling changes, how are the interpretations of prior results changed by different analyses? How do different experimental methodologies influence the form of our theories? The points of conflicting evidence and unevaluated predictions of theory are then a means of distributed coordination of future experiments: guided by a distributed body of evidence and interpretation, rather than the amount of the literature base individual researchers are able to hold in mind, what are the most informative experiments to do?

The pessimistic case where we only have scientific papers in their current form to evaluate is not that much worse --- it requires the normal reading and evaluation of experimental results of a review paper, but the process of annotating the paper to describe its experimental and analytical methods as a shared body of links makes that work cumulative. Even more pessimistic, where for some reason we aren't able to formulate theories even as rough schematics but just link experimental results to rough topic domains is still vastly better than the current state of disorganization and proprietary indices. 

For both researchers and the public at large a meta-organization of experimental results changes the way we interact with scientific literature. It currently takes many years of implicit knowledge to understand any scientific subfield: finding canonical papers, knowing which researchers to follow, which keywords to search in table of contents alerts. Being able to find a collection of papers about an object of research, as well as the conversations at all levels of formality that contextualize them --- to say nothing of building a world without paywalls --- would profoundly lower barriers to access to primary scientific knowledge for *everyone.* 

It is worth pausing to compare a world where we boisterously and fluidly organize knowledge explicitly as a collective project of understanding with one where knowledge organization is weaponized into a product that lets us get ahead of our competitors without necessarily improving our understanding of the body of scientific literature. One sounds like science, the other sounds like industry capture.

All the technological-social tools described here are not a definitive set of tools needed for scientific communications infrastructure, but *examples of interfaces to a linked data system.* Using JSON-LD notebooks to enable us to embed links in our writing to be mentioned or transcluded elsewhere. Using a forum as a means of creating linked discussions about experimental results and analyses. Using linked microblogging tools for a rapid, informal means of organizing and discussing knowledge. Using all of the above to represent the many expressions of a work across multiple linked namespaces. Using annotation tools to create anchors and links for referencing links in other communication media. Using tracker-like and wiki-like systems to interact with, negotiate about, and govern a wily body of autonomously declared links.

Each is intended to be mutable, easy to iterate on, uncontrolling, mutually coordinated. Each interacts with and augments the previously described systems for shared data, analytical, and experimental tools. The purpose of this section is not to advocate a specific set of technologies, but to describe a base layer of familiar technologies for an indefinite future of possible interfaces for representing and interacting with a body of shared knowledge. 

What we've described is a nonutopian, fully realizable path to making a scientific system that is fully negotiable through the entire theoretical-empirical loop with minor development of existing tools and minimal adjustment of scientific practices. No clouds, no journals, a little rough around the edges but collectively owned by all scientists.

<div class="draft-text">Final system summary</div>




