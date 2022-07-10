#### Forums & Feeds

What if we think of our documents as "threads" and their cells as "posts?" What makes a cellular document a document is some (relatively arbitrary) notion of a 'root' cell that contains the others --- ie. for notebooks a JSON array of cells. That could be trivially reformulated as cells with metadata indicating that they are [`PartOf`](https://schema.org/isPartOf) a document, each indicating their [`position`](https://schema.org/position) or linked to the cells they are before and after. If we also allow cells to be [`inReplyTo`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-inreplyto) each other, we have the basis of a threaded communication system continuous with documents. Where cells in a linear document have at most one preceeding and succeeding cell, multiple replies allow a tree structure that maps onto the patterns of most contemporary social media. Metadata that describes category and content extends this to include the structure of forums, and could be the basis of a rich continuum of media spanning order and chaos, permanence and ephemerality, between the *magnum opus* and the shitpost: media absent but sorely needed in academic communication. 

Traditional forums like [phpBB](https://www.phpbb.com/) and contemporary social media operate from a single host with a fixed interface and representation of posts. What would a communication system that decouples hosting, identity, interface, and format look like? We can draw inspiration from the "[fediverse](https://en.wikipedia.org/wiki/Fediverse)," a collection of interoperable software platforms and protocols. The fediverse makes it possible to communicate across radically different interfaces: someone using [Funkwhale](https://funkwhale.audio/), which resembles music software like spotify, can communicate with people on [PeerTube](https://joinpeertube.org/), a p2p video streaming program like YouTube, and [Mastodon](https://joinmastodon.org/), a microblogging medium like Twitter. Rather than a single host, instances of each of these programs are hosted independently and can choose to federate with other instances to enable communication between them. Most of these programs use the [ActivityPub](https://www.w3.org/TR/2018/REC-activitypub-20180123/) {% cite Webber:18:A %} protocol, which defines a standard set of capabilities for client-server and server-server communication. 

Mastodon posts (or "toots") already resemble the kind of document-interoperable medium hinted at above. For example [this post](https://web.archive.org/web/20220708215201/https://social.coop/@jonny/107328829457619549) is represented in (abbreviated) JSON:

```json
{
    "id": "107328829457619549",
    "created_at": "2021-11-23T22:52:49.044Z",
    "in_reply_to_id": "107328825611826508",
    "in_reply_to_account_id": "274647",
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

As described [previously](#for-making-our-peers-and-the-links-within-their-namespace-discov), ActivityPub supports linked data with JSON-LD -- a remarkable feat despite the justifiable angst with the protocol {% cite kaniiniActivityPubPresentState2019 schubertActivityPubFinalThoughts2019 %} given the historical grudges between linked data and indieweb communities (See this retrospective by one of its authors, Christine Lemmer-Webber {% cite 
lemmer-webberStandardsDivisionsCollaboration2018 %}). So we could imagine that post using a reference to a document or one of its cells in its `in_reply_to` field.

Mastodon might be a good traditional medium, but extend it to make use of our linked p2p system. The fediverse decouples the network from a single host and platform with federation between instances, but instances still bundle together the underlying data of a post with an interface, host, and account (but see [hubzilla](https://hubzilla.org//page/hubzilla/hubzilla-project)). p2p helps us decouple accounts from hosts (see this discussion on a p2p ActivityPub {% cite webberActivityPubDecentralizedDistributed2017 %}), but we would also like to decouple interfaces from the underlying data so that we have a continuous communication medium where different interfaces are just *views* on the data. To do that we would want to start by replacing Mastodon's flat "`content`" field with the kind of typed cells in our documents that indicate what kind of message they are. For example a simple text-based message might use the ActivityStreams [`Note`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note) type:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "name": "My Message",
  "content": "A note I send to you!"
}
```

But we might equivalently send a `@jupyter:Notebook` as a message, or some compound object like a [`Collection`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-collection):

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "summary": "A Compound Message!",
  "type": "Collection",
  "totalItems": 2,
  "items": [
    {
      "type": "Note",
      "name": "Hey how ya doin here's a notebook"
    }
    {
      "@context": "https://jupyter.com/",
      "type": "Notebook",
      "content": "..."
    },
  ]
}
```

So the *existence* of a particular type of message is not bound to the ability of any given program's ability to render it. Our notebook program might not be able to understand what it means to have people responding to and making threads about its cells, but we would still be able to receive them and open them with an interface that does, and we could further imagine the ability for a type to recommend a program to us for rendering it as we did with the ability for analysis nodes to specify the code to execute them. We will set aside for a moment the issues of moderation and permission for which messages can link to our work and the practicalities of sending, receiving, storing, and serving messages and return to them in the context of [annotations](#overlays--adversarial-interoperability) and [trackers](#trackers-clients--wikis), respectively.

*Where* do our posts go? For concreteness, we can start with a forum called "NeuroChat." `@neurochat` is a peer like any other, and it supports some of the basic ActivityStreams vocabulary. We can request to join it by sending a [`@as:Join`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-join) request, which gives it permission to index our public posts and issue links on our behalf through its web interface. It has a few broad categories like "Neuromodulation" and "Sensory Neuroscience," within which are collections of threads full of chronologically-sorted posts. Threads are objects that indicates a category like `@neurochat:categories:Neuromod`, and when we post in them we create links that are [`@as:attributedTo`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-attributedto) us with the [`@as:context`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-context) of the thread we're posting in and any [`@as:inReplyTo`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-inreplyto) links to preceding or quoted posts. 

We want to announce and describe some recent results in our document `@jonny:my-project:Writeup`. This kind of post is common in `@neurochat`, and so instead of a generic citation we use a `@neurochat:AnnouncesResult` link to indicate the relevant document. In our forum pseudocode we'll use a `#prefix` macro to give a short name to our project and semantic wikilinks with a `[[predicate::object]]` syntax for the purpose of demonstration, though ideally these would be part of the forum's interface.  We think we really have something that challenges some widely held previous results:

```turtle
#prefix project @jonny:my-project 
#prefix nc @neurochat

Hi everyone, happy to present my new work
[[nc:AnnouncesResult :: project:Writeup]].

I think it raises a number of interesting questions,
in particular @rival's longstanding argument
[[@cito:disputes :: @rival:TheBrainIsInTheLiver]].

I also wonder what this means about the conversation
we've been more generally about
[[@cito:discusses :: @discipline:whereAreTheOrgans]].

Anyway, write back soon, xoxo.
```

Our rival takes the criticism in stride but wants to run their own analysis. They follow the links back to find our data, and reanalyze it. Their analysis framework has already issued a link indicating that it reanalyzes our data, and rather than do an independent writeup our rival returns to the thread to continue the discussion.

```turtle
Interesting result, you old scoundrel. 

That indeed [[disputes :: @doi:<id>]],
in particular its section [[.:results:main]]
and my re-analysis adds another wrinkle to the problem!
Take a look:

[[nc:embed :: @rival:reanalysis]]

This really complicated another project of mine,
[[@rival:projects:NeuronsCanSwim]]
```

Our forum's `embed` link knows how to embed the notebook our rival used to do their reanalysis and in the underlying message indicates the the current version so if they update it in the future the message will still be comprehensible. Our rival doesn't use a predicate for their link to their side-project and our forum uses its default `Mentions` predicate. It's still more informative than a duplet link because the context of being a discussion in our forum the links in the surrounding posts. We could imagine additional capabilities we give to our forum, like the ability to automatically trigger a re-analysis by someone mentioning a different pipeline for a given dataset, but we'll leave those as an exercise to the reader.

This example is a relatively trivial instance of scientific communication: sharing results, relating them to previous findings, and thinking about the broader implications on the field. However in our current regime of scientific communication, even in the most progressive publication venues that allow communication directly on a work, this kind of communication is *entirely invisible* to the broader state of our understanding. With our system of linked communication, however, the entire provenance chain from our experiment through its analysis and contextualizing discussion is related to immediately related work as well as the standing questions in our field. Our work is enriched by the additional analysis from our rival, and their work is continuously contextualized as the state of our understanding develops. We were capable of making incremental refinements to our shared understanding using units of work that were much smaller than the traditional scientific paper. It would be possible for someone entirely outside our field to browse through the general links from basic research questions to relevant work and its surrounding discussion. If they were to ask questions, our answers would represent the latent diffusion of understanding to other disciplines based on the graph context of our respective work --- and we could be credited the time we spent doing so! In short, scientific communication could actually be *cumulative.*

Forums are just one point in a continuous space of threaded media. If we were to take forum threads out of their categories, pour them into our water supply, and drink whatever came our way like a dog drinking out of an algorithmic fire hydrant, we would have Twitter. Remove the algorithm and arrange them strictly chronologically and we have Mastodon. In both, the "category" that organizes threads is the author of the initial post. Algorithmic, rather than purposefully organized threaded systems have their own sort of tachycardic charm. They are effective at what they aim to do, presenting us whatever maximizes the amount of time we spend looking at them in a sort of hallucinatory timeless now of infinite disorganization --- at the expense of desirable features of a communication system like a sense of stable, autonomously chosen community, perspective on broader conversation, and cumulative collective memory. 

Nevertheless the emergence of a recognizable "Science Twitter" points towards a need for relatively informal all-to-all communication. Serendipitously being able to discover unlikely collaborators or ideas is a beautiful dream, if one ill-served by the for-profit attention economy. Our formulation of the `@neurochat` forum was as an equal peer that mirrored, collected, and organized posts that otherwise are issued from other peers such as ourselves. In the same way that we might use the ActivityStreams `Join` action to have our posts mirrored by it, we might also use [`@as:Follow`](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-follow) to receive posts from any peer, and in the case of a federation that might include posts from its members sent to the federation. 

We can take advantage of the graph structure and rich metadata of our social network in ways that are impossible in corporate social media networks that require the expectation of disorder to be able to sell "native" ad placement. The instance-to-instance federation model of the fediverse, and the accompanying absence of any "global" scope of all posts, results in the need for multiple views on the network: in Mastodon, a "local" timeline that shows only posts from within the host instance, and a "federated" timeline that shows posts from all instances that the host instance has federated with. Since our network allows peer-to-peer, federation-to-federation, and peer-to-federation interaction, we can extend that further. We can construct views of the network based on granular control over graph depth: instead of seeing just the posts from the peers that we follow, we can request to see n-depth posts, from the peers that our peers follow, and so on. This could be done at the level of a "view" or at the level of the follow link itself --- since I know this person well, I want to see a graph depth of 2 from them, and a depth of 1 from others. At the federation level, we might imagine that `@neurochat` is federated with another `@linguisticsChat` group and the two mirror and rehost each other's posts. We could then make use of our extended social graph and prioritize posts from people who are part of overlapping subsets of the federations we are a part of. The peer-based nature of our social network serves as the basis for a system of fluid scoping and filtering of the kind of communication we are looking for at any given time. So rather than a disorganized public melee or the empty rooms and new logins from yet another closed Slack, our communication could be part of a coherent scientific conversation.

Across from filtering what we receive, the same could be done to what we send by choosing where our posts are addressed and who can see them. The same multimodality of "following" used to indicate the graph depth of the posts we see could let us indicate different kinds of relationships. We should be able to send global, undirected messages on a public feed, but we don't necessarily want to talk to our friends in the same way that we talk to strictly professional colleagues. We might want to organize privately with a few colleagues, or prevent trolls or hostile groups from accessing or making use of our work. Effectively, we should be able to direct our messages to different groups of peers to support the multiple registers of our communication. 

The need for rapid and informal scientific communication being mediated by corporate social networks has the unfortunate byproduct of needing to carefully manage a "personal brand." To be seen as a "serious," we need to maintain some proximity to the stilted academic voice, forfeiting any approachability to science that might be gained from public communication. If we are to expand the scope of what we consider as the labor of scientific communication, we should also take seriously its many registers and contexts. Informal media like alt accounts, mailing lists, groupchats, zines, and whisper networks are also an integral part of science, particularly for marginalized and vulnerable scientists {% cite jimenezBorderlandingAcademicResearchers2020 %}. Parallel to organizing our communication in empirical professional communication, we might build systems that support our organization into federations to more effectively bargain over our working conditions and protect ourselves. The venues that organize our communication being limited to journals, and the accompanying regulation over the registers of communication that count as "real" science, is even more limiting than its profound effects on scientific literature proper. The absence of infrastructure to support the multiregister communication of science limits our ability to organize over the broader state of our work, form extended communities, and reduces what should be the collective project of making our work broadly understandable to the individualistic projects of "scicomm influencers." It shouldn't take a lot of additional critical analysis to say "shitposts are good, actually, for science."

There's a balance to be struck between a system of granular control over the messages we send and receive with the ease of a monolithic algorithmic feed. Mastodon sorts all posts purely chronologically, which translates into relatively steep limits on the size of communities as feeds become unintelligible washes of posts. Instead of forgoing algorithmic organization altogether, another means by which we could take advantage of the graph structure of our network is by being able to *choose* the sorting algorithms we use. We might want to prioritize posts from someone who we don't necessarily follow but is interacting with people that we do in contexts that we share, or be able to deprioritize posts that are "close" to us in our social graph in order to discover new things. This too could be a cumulative, community-driven project, where we might want to try out our friend's `@friends:sorting:NewAlgorithm`, tweak it a bit for our preferences, and republish a new version. 

Generally, the impact of having a communication system that decouples hosting, identity, interface, and format on an underlying linked data grpah gives us a broad space to build different views and tools to use the underlying data. Specifically, without predicting the infinite future of communication media, our system of linked, cell-like communication generalizes threadlike media like forums and feeds into a continuous system that can blend their features as needed. Durable, cumulative discussion about the state of our understanding should be able to live side-by-side with ephemeral, informal conversations. It should be possible for us to serendipitously discover people and information as well as for a newcomer to have a place to ask questions and build their understanding. It should be possible for us to form and dissolve communities fluidly without substantial technical start-up costs and the total loss of memory when they close. A system that supports the fullness of scientific communication would be an unfathomably richer way of building reliable, accessible, and multivalent understanding of our reality than the stunted anachronism of journal-based peer review.