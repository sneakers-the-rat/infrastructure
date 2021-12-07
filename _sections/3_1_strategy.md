
### (Gestural) Roadmap

Some of the tactical vision for this piece is embedded in its structure and has been discussed throughout, but to again reaffirm the strictly *non-utopian* nature of this argument it's worth revisiting the practical means by which we might build it. I have tried to take care to hew as close to existing technologies and practices as possible, and so the amount of new development that is needed is relatively light. As is true in the rest of the piece, the recommendations here are just for the purpose of illustration, and here more than anywhere else every step of this is subject to negotiation and the contingency of future work.

For the purposes of brevity, I'm going to refer to the family of RDF-based tools like JSON-LD, turtle, OWL, and so on as "RDF-like."

These, I think, are the most minimal development steps that would get a system like this off the ground and offer some basic use.

1. Build framework for **bridging RDF-like schema to p2p client** - The implementation of a given schema needs to be made abstract so that data can be subset from a given dataset using the notation of the schema namespace. This can happen gradually -- at first mapping from metadata to the entire dataset, but need to be able to read/write individual entities. [Dat](https://docs.dat.foundation/docs/faq) can share subsets of data using Hypercore's [sparse mode](https://hypercore-protocol.org/guides/walkthroughs/creating-and-sharing-hypercores/). Work could also happen in the other direction, extending DANDI/Datalad with a peer-to-peer backend.
1. Build **p2p/ActivityPub client** - currently activitypub accounts are associated with a homeserver like [https://mastodon.social/](https://mastodon.social/), but the authors of the ActivityPub protocol and JSON-LD have described how a system of decentralized identity (eg. DID {% cite spornyDecentralizedIdentifiersDIDs2021 %}) could make it fully peer-to-peer {% cite webberActivityPubDecentralizedDistributed2017 %}. Joint ActivityPub/p2p systems that use AP to index data and p2p to share it already exist (eg. [PeerTube](https://joinpeertube.org/#what-is-peertube)). Much of the work left undefined here would be interface and UX design to make hosting an instance as easy as possible.
1. Experiment with **minimal schema for federation.** We want to get code running first in smaller communities to experiment with the basic ontologies for communication, data sharing, and framework linking. There are a [large number](https://lov.linkeddata.es/dataset/lov/vocabs) of existing vocabularies and ontologies to draw from, so we don't need to start from scratch. More important than *which* ontology is chosen is making it *simple* to browse and manipulate them. Eg.:
	- Social interaction: [ActivityStreams](https://www.w3.org/TR/activitystreams-vocabulary/) {% cite snellActivityStreams2017 %}, Semantically Interlinked Online Communities ([SIOC](http://sioc-project.org/)) {% cite harthLinkingSemanticallyEnabled2004 %}
	- Permissions: Open Digital Rights Language ([ODRL](https://www.w3.org/ns/odrl/2/))
	- Scientific communication - [Linked Science Core](http://linkedscience.org/lsc/ns/) {% cite kauppinenLinkedOpenScienceCommunicating2011 %}, Modern Science Ontology ([ModSci](https://saidfathalla.github.io/Science-knowledge-graph-ontologies/doc/ModSci_doc/index-en.html#dataproperties-headline))
	- Workflows/Analysis Pipelines - Open Provenance Model for Workflows ([OPMW](https://www.opmw.org/model/OPMW/))
	- and many, many more.
1. A basic **tracker-like web framework** for caching and serving metadata, as well as hosting some initial forums or other semidurable communication system for organizing federations. It's an open question to me how much of [Gazelle](https://github.com/WhatCD/Gazelle)/[Ocelot](https://github.com/WhatCD/Ocelot) is worth resurrecting, or whether it would be better to build from an ActivityPub client or a torrent tracker (or some other existing code I'm not familiar with).

From that basic means of communication, the rest of the development path needs less specification, the examples I have given are just one way of realizing the [design principles](#design-principles). Beyond that, doing accounting for the other functionality described above:

- Start building **bridges to existing repositories** like [Dandihub](https://gui.dandiarchive.org/#/), Wikidata, and so on.
- Refine vocabularies! Refine schema negotiation, etc.
- Build tools for data translation - *theoretically* building I/O tools from RDF-like schema to individual data formats should allow for interconversion, but it will of course be more difficult than that.
- Extend analysis and experimental tools to incorporate and produce linked data within our p2p/AP system.
- Integrate dependency management for linked data that specifies code to run, eg. see [spack](https://spack.readthedocs.io/en/latest/#) (see spack)
- The wide world of communication tools awaits...

The numerical order of these lists is just a byproduct of the linearity of text, and many of these development projects can happen simultaneously with minimal mutual coordination. The chronology given is mostly strategic: finding an incremental development path where every step is useful and allows for the next to be taken. 

A p2p data system is, to me, is the most likely and proximal anchor from which the rest of the technologies might flow --- this is part of the idea animating the Solid project as well {% cite berners-leeSociallyAwareCloud2009 finleyTimBernersLeeInventor2017 barabasDefendingInternetFreedom2017 sambraSolidPlatformDecentralized2016 %}. 

There is no reason, in principle, that data must first be converted into some standardized format --- ideally, it would be possible to fluidly link data in-place, incorporating whatever means by which metadata is stored already. Passing through a point of standardization serves a few purposes: first, lowering the work associated with linking by only needing to declare links between a few hundred formats instead of the infinity of arbitrarily structured data. Second, to minimize frustration and maximize delight of early adopters: people are more likely to stick around if they can run a client, plug their data in, and see it hosted with the links prepopulated from the format schema. Third, to integrate with existing tools and databases to avoid the perception of potential sunk cost spending time formatting data in some new idiosyncratic way.

Shared data is a concrete, widely understood goal shared by many scientists already, but there are relatively slim incentives for spending the time to do it. The first major hurdle is to make those incentives. Propping up a p2p system will eventually need new development, but existing p2p systems can still make a strong case for themselves with small, local examples: using them to share data with local collaborators, or to share data during a workshop or conference, or even to start rehosting already-public centrally hosted data. Small communities of practice can start their own "retreat from the cloud" by documenting their process and setting up their own local hosting and servers. They also make natural allies with the p2p tool developers. Being a test case for their software and cultivating social ties across domains is one way to start aligning our goals and movement building. Tools like Dat and Solid are good fits, though they currently need some UX and docs work to be accessible to a broad audience.


<div class="draft-text" markdown="block">
- once some people are sharing their data on p2p, need some means of organizing it. adapting frontend tools and start using distributed communication tools. People are clearly eager to use stuff like DandiHub and get their data into an index, but they are all so lonely and vacant! Only instead of discord and slack stuff like Matrix is scalable!
- general pattern of integrating with new communities, for that we need some means of communication. Where are the technologists we should ally with? They're on fediverse and Matrix!
- Lots of proofs of concept, but need communities to actually start testing them and using them! https://scenaristeur.github.io/agora/ https://openengiadina.net/
- Starting communication and knowledge organization on wikis and etc. is itself a step towards realizing the system! Tools like Matrix make it so people don't have to commit to *one community or platform in particular* but instead can explore and sort themselves. The UX has come a long way in the last few years, and Element and Gitter are both ready for general use.
- Knowledge organizing systems like openbehavior and stuff are cool, we should start transcluding them (with credit!) into wikis and other social tools in order to organize a broader scope of the software and social scene.
- Flanking technologies of data analysis and experimental tooling serve as stronger incentive systems. 
- Not needing to build a single new platform, or new journal, or even a new organization, but focusing on means of communication. 
</div>

### To Whom It May Concern...

Who is supposed to do what, and why would different interested groups want to pursue decentralized infrastructure? A few love letters addressed to different groups:

#### Rank and File Researchers

!! PIs vs grad students/post-docs: PIs need to realize that the true cost is doing nothing, the ROI on infrastructure is massive given the extremely high costs of labor for doing all this shit. Grad students and Post docs should start seeing the total isolatino of their local tooling as problematic and engage with their neighboring labs to share technologies and start building locally integrated tools!

!! We need to start making alliances we're not necessarily used to, but this is the fun part! !! ally with the many disaffected tech workers that don't want to work with google and facebook -- we all talk about ppl fleeing for industry, but what academia can offer in return is jobs building tools that aren't soul sucking click maximizers. !! also need to get in better touch with our Librarians, they are also facing the squeeze and have had their profession degraded to being subscription custodians. 

!! We need to recognize our place outside of the highest echelons as fundamentally in danger by advancing infrastructural polarization. "Not my job" mentality is not going to cut it. 

!! Less concretely, we need to start expanding what we think is possible! We need to be realistic and demand the impossible! Let's let the work of escaping ownership by platform capitalism be joyful, a rennaisance of working cooperatively and rejuvinating the sense of purpose as scientists invested in the health of society.

#### Open Source Developers

- UX and community systems first! Start a project by reaching out to other devs and seeing who's doing overlapping work. 
- Integrate with existing tools rather than bulding new ones is holy: you can still get credit in existing systems for writing the paper, and your tool is more likely to be used, and it's likely to benefit from some of the structuring elements of the framework. 
- Stop building cloud shit! Or if you have to make something for the cloud bc compute infrastructure isn't there, make sure it's also deployable on local computers. We don't need any more single-use platforms! 


#### Funding Agencies

!! You're being swindled! Sort of a COI because to some degree centralization is politically useful: eg. see data sharing agreement with ICE, but this probably isn't shared by the people actually at the granting agencies and I don't want to speculate on some conspiracy theory. If you pay us we will build it! 
- fund integrating existing tools in addition to maintaining them. Target funding for new tools that fill specific gaps --- it's almost impossible to get a really well maintained library off the ground b/c catch-22 of development!


#### University Administrators

!! You're also being swindled! Local infrastructure is good for you too --- many universities are plagued by SaaS that is expedient but ultimately makes the entire operation of the university very fragile. Having good local data infrastructure is a really good thing to be able to tell applicants, and makes use of intranet for collaboration instead of external bandwidth. You get to say "we have a sick new storage and compute server" instead of "we're a huge subscriber to AWS" Y'all are the ones who have to pay the journal costs and deal with your university being uncompetetive with other institutions that can afford more, and so you should be leading the charge to nonprofit journals and a move beyond them, rather than mandating Open Access which is a regressive move.




