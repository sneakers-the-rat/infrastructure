
### (Gestural) Roadmap

Some of the tactical vision for this piece is embedded in its structure and has been discussed throughout, but to again reaffirm the strictly *non-utopian* nature of this argument it's worth revisiting the practical means by which we might build it. I have tried to take care to hew as close to existing technologies and practices as possible, and so the amount of new development that is needed is relatively light. As is true in the rest of the piece, the recommendations here are just for the purpose of illustration, and here more than anywhere else every step of this is subject to negotiation and the contingency of future work.

For the purposes of brevity, I'm going to refer to the family of RDF-based tools like JSON-LD, turtle, OWL, and so on as "RDF-like."

!! the real reason to use AP is just that it is build on LD, but matrix p2p is also dope https://matrix.org/blog/2020/06/02/introducing-p-2-p-matrix and also works by just using the homeserver ias a client lol

1. Build bridge from RDF-like descriptions of data to p2p indexing and AP metadata sharing !! dat can do sub-dataset indexing, https://docs.dat.foundation/docs/faq and
1. Build client for hosting a single-person instance of activitypub
	- identity, {% cite webberActivityPubDecentralizedDistributed2017 %} say mebs https://w3c-ccg.github.io/did-spec/
	- declare and interact with linked data
	- share with p2p 
	- hybrid p2p AP systems exist, see PeerTube, and *tons* of people want to build a p2p AP client. {% cite webberActivityPubDecentralizedDistributed2017 %}
1. Build AP bridge to Dandihub and other centralized data repositories?
1. Ontologies to adapt
	- !! jonny gotta look for which of these already exist!
	- to some degree this system makes ontologies equivalent to protocols. need a protocol for federation and basic social interaction in the system by extending activitystreams to account for p2p needs.
	- analysis
	- "project" 
	- syntax for namespaces. URIs are great but permanent forever-indexable data is only a focus for a subset of the system. We want to be able to refer to things in a way that fits in a tweet basically. 
1. then the other essential feature is some kind of tracker/forum system for caching ppls listings and mutually listing them with each other. 
1. Framework for building data-loading/indexing as well as data translation tools: let ppl draw links between different nodes.
1. which, oh which analysis framework to extend? 
1. dependency management (see spack)
1. extend eg. autopilot to read and write data into LD format
1. communication
	- start with masto as microblogging to use LD for communication system, then notebooks (MD for dokieli?)
	- transclusive systems like agora or extending mediawiki
	- what can be rescued from Gazelle?



### All Interested Parties...

!! addressing the different interest groups explicitly.

!! Some of the tactical vision for this is embedded in the structure and serial order of the piece. There is no reason that the metadata framework described here needs to be intrinsically linked to the p2p data sharing system, and there is no inherent need to first arrive at some state of quasi-standardization, but because many data standards are already in OWL or other RDF system and need some mechanism for making extensions, there is an immediate practical problem solved by implementing a linked data layer on top of a data standard and sharing system. There is little reason for a developer of an experimental library to declare a rich metadata system, but if it was possible to use it to make data output easier and make the system more powerful in the process, we then have a strong incentive.

!! describe need for mutually reinforcing integration and the need for each additional step to be *useful* for the people using and developing the system.

!! ally with the many disaffected tech workers that don't want to work with google and facebook -- we all talk about ppl fleeing for industry, but what academia can offer in return is jobs building tools that aren't soul sucking click maximizers.
