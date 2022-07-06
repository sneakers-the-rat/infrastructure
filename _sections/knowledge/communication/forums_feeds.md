
#### Forums & Feeds

<div class="draft-text">
    Note that the only thing that makes a feed a feed is that it has some link to some other document. Start there!
</div>

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