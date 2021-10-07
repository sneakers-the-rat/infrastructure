
!! jimmy wales on wikipedia: 

!! why is it that literally every project is organized on google docs and slack? we can do better for collective organization

!! https://www.dbpedia.org/

!! why is public trust in scientists so low? could it be that there is an alternative to scientists seeing themselves as cloistered experts? re: cold war peer review paper

The (part of the system that's most needed and potentially transformative) is a system of scientific communication. 

Except for certain domain-specific exceptions, the scientific communication system consists of the two ancient monoliths groaning with the dust of their obsolescence: the dead and static papers of the traditional journal system, and the ephemeral halo of insider knowledge shared at conferences. The remainder of the gigantic overflowing franzia bag of scientific discourse is funelled ingloriously onto Twitter[^twitterheg] --- and it *sucks*.

Since the advent of the contemporary journal system, communication technology has been stripped to its very atoms and rebuilt --- and it has managed to dig in and *persist* while all the letterman jackets and beatniks of its era have become vape teens on tiktok. A reconsideration of the entire scientific publishing system is strictly out of scope for this paper, but the communication system I will describe exists in the gaps of need it leaves unfilled. Criticisms of the scientific communication system typically start by imaginging much of the contemporary journal system as etched as fact on the face of reality, and tweaking at a few of its more ticklish knobs (eg. {% cite heesenPeerReviewGood2020 %}). Instead let's try it the other way: to trace the outlines of how a scientific communication system *should* work, given the basis of holistic infrastructure described so far. I will argue that a communication system, and more specifically the community it supports, is the blood that must pump through any of these digital systems that aspire to call themselves infrastructure. To arrive at a proposed form for a system, I'll start by laying the basic axes of communication technology, and then load the scales with the empirical girth of the largest knowledge systems that have ever existed: Wikipedia and internet piracy. 

There simply isn't a place to have longform, thoughtful, durable discussions about science. The direct connection between the lack of a communcaition venue to the lack of a way of storing technical, contextual knowledge is often overlooked. Because we don't have a place to talk about what we do, we don't have a place to write down how to do it. Science needs a communcation platform, but the needs and constraints of a scientific communication platform are different than those satisfied by the major paradigms of chatrooms, forums etc. By considering this platform as another infrastructure project alongside and integrated with those described in the previous sections, its form becomes much clearer, and it could serve as the centerpiece of scientific infrastructure.

I will argue that we should build a semantically-enabled communication and knowledge-base system on top of activitypub to unify the preceding digital infrastructure elements. !!importantly, should also have means of ingest for existing tools and elements -- easy to import existing papers and citation trees, plugins for existing data sharing systems. 



!! description of its role as a schema resolution system -- currently we implement all these protocols and standards in these siloed, centralized groups that are inherently slow to respond to changes and needs in the field. instead we want to give people the tools so that their the knowledge can be directly preserved and acted on. 

!! descrption of its role as a tool of scientific discussion -- integrated with the data server and standardized analysis pipelines, it could be possible to have a discussion board where we were able to pose novel scientific questions, answerable with transparent, interrogatable analysis systems. Semantic linking makes the major questions in the field possible to answer, as discussions are linked to one another in a structured way and it is possible to literally trace the flow of thought. 

!! let's tour through wikipedia for a second and see how it's organized. Look at these community incentive structures and the huge macro-to-micro level organization of the wiki projects. The infinitely mutable nature of a wiki is what makes it powerful, but the SaaS wikis we're familiar with don't capture the same kind of 'build the ground you walk on ' energy of the real wiki movement. 

[^twitterheg]: no citation needed, right? if there is some other bastion of scientific discourse i would love to know about it.

!! what's critically different here between other projects is that we are explicitly considering the incentives to join each of these efforts, and by integrating them explicitly, each of them is more appealing. so while there are lots of databases, lots of analysis systems, lots of wikis, and so on, there aren't many that are linked with one another such that participating in one part of the system makes the rest of the system more powerful as well as makes it more useful to the user.

### Axes of Communication Systems


### Semantic Wikis - Technical Knowledge Preservation

{% cite kamelboulosSemanticWikisComprehensible2009 %}

!! Read and cite! {% cite classeDistributedInfrastructureSupport2017 %}

!! the word for communally curated schemas is https://en.wikipedia.org/wiki/Folksonomy

!! {% cite goodSocialTaggingLife2009 %}

!! wikibase can do federated SPARQL queries https://wikiba.se/
- and has been used to make folksonomies https://biss.pensoft.net/article/37212/

> I can see my bank statements on the web, and my photographs, and I can see my appointments in a calendar. But can I see my photos in a calendar to see what I was doing when I took them? Can I see bank statement lines in a calendar? https://www.w3.org/2001/sw/

!! lots of scientific wikis 
- https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Molecular_Biology/Genetics/Gene_Wiki/Other_Wikis
- https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Molecular_Biology/Genetics/Gene_Wiki




### Semantic Wikis - Schema Resolution & Communication platform

!! bids is doing something like this https://nidm-terms.github.io/

!! interlex

> The Semantic Web is about two things. It is about common formats for integration and combination of data drawn from diverse sources, where on the original Web mainly concentrated on the interchange of documents. It is also about language for recording how the data relates to real world objects. That allows a person, or a machine, to start off in one database, and then move through an unending set of databases which are connected not by wires but by being about the same thing. https://www.w3.org/2001/sw/

!! Semantic combination of databases in science are also not new {% cite cheungSemanticWebApproach2007 simaEnablingSemanticQueries2019 %}. We need both though! semantic federated databases!


Part of what is missing and a place where we could learn from librarians is the notion of governance over a knowledge schema. People have a lot of trouble with NWB because they doubt if it could account for all the idiosyncracies in the types of data that we have to represent. But instead if we have a way of capturing all that thought and insight and practical experience in a governance and decisionmaking structure then we could flexibily work our way to a set of schemas that work for everyone. Part of what needs to be done is to move from SQL queries to a more expressive abstract system of schema creation that more people can participate in -- that's what infrastructure building is, making things that seem impossible or difficult routine. Practically, this can mean an explicit versioning system that not only specifies different versions of a data representation, but for every transition between state there is some notion of making that transition in the data structure. (give example of the subject upgrade system). If that was possible, then the notion of data structure would entirely evaporate, best of both worlds. we get everything and the game is over forever. This is also the distinction between centralized and decentralized systems. we can just make the changes and since they're done against a background of unified intent and expression they can exist simulataneously, commune with one another, while being forwardly productive as their contradictions are resolved.


### Linked communication platform 

We all hate science twitter, why does it exist?

> Though frequently viewed as a product to finish, it is dynamic ontologies with associated process-building activities designed, developed, and deployed locally that will allow ontologies to grow and to change. And finally, the technical activity of ontology building is always coupled with the background work of identifying and informing a broader community of future ontology users. {% cite bowkerInformationInfrastructureStudies2010 %}

good science community infra
- https://www.zooniverse.org

> Two essential features coordinate this information to better serve our organizational decision-making, learning, and memory. The first is our constellation of Working Groups that maintain and distribute local, specialized knowledge to other groups across the network. [...] A second, more emergent property is the subgroup of IBL researchers who have become experts, liaisons, and interpreters of knowledge across the network. These members each manage a domain of explicit records (e.g., written protocols) and tacit information (e.g., colloquialisms, decision histories) that are quickly and informally disseminated to address real-time needs and problems. A remarkable nimbleness is afforded by this system of rapid responders deployed across our web of Working Groups. However, this kind of internalized knowledge can be vulnerable to drop-out when people leave the collaboration, and can be complex to archive. An ongoing challenge for our collaboration is how to archive both our explicit and tacit processes held in both people and places. This is not only to document our own history but as part of a roadmap for future science teams, whose dynamics are still not fully understood. {% cite woolKnowledgeNetworksHow2020 %}

importantly, semantic wiki can be accessed progrtammatically, so you don't need to use the service and can build your own interface to it.

>  Relational database systems, manage RDF data, but in a specialized way. In a table, there are many records with the same set of properties. An individual cell (which corresponds to an RDF property) is not often thought of on its own. SQL queries can join tables and extract data from tables, and the result is generally a table. So, the practical use for which RDB software is used typically optimized for soing operations with a small number of tables some of which may have a large number of elements.
> 
> RDB systems have datatypes at the atomic (unstructured) level, as RDF and XML will/do. Combination rules tend in RDBs to be loosely enforced, in that a query can join tables by any comlumns which match by datatype -- without any check on the semantics. You could for example create a list of houses that have the same number as rooms as an employee's shoe size, for every employee, even though the sense of that would be questionable.
> 
> The Semantic Web is not designed just as a new data model - it is specifically appropriate to the linking of data of many different models. One of the great things it will allow is to add information relating different databases on the Web, to allow sophisticated operations to be performed across them. https://www.w3.org/DesignIssues/RDFnot.html

in addition to a wiki, we need some conversational engine -- talk pages are ok, but they're too fragmented and all hard to keep up to date with. Realtime, chatlike interfaces don't preserve information well, so we should use some intermediate medium like a forum or stack exchange that allows conversations to be tagged and searched and sorted and organized. 

Social incentive structure is huge here. 

Compared to RDBMS https://www.w3.org/DesignIssues/RDB-RDF.html -- rather than individual schemas, groupings of properties, we have 'relationships.' this example is good:

> For example, one person may define a vehicle as having a number of wheels and a weight and a length, but not foresee a color. This will not stop another person making the assertion that a given car is red, using the color vocabular from elsewhere. 

We're talking about a collaboration medium here... we need a way of organizing open questions in the field and discussing them in a straightfoward way. Why is it that every scientist needs to figure out their own completely gray-area way of discovering papers? 

Bad APIs have killed projects with shitloads of funding like NWB and IPFS https://macwright.com/2019/06/08/ipfs-again.html - usability needs to be *the first priority* - you can develop all the fancy shit that you want, if no one can install and unse it in 10 minutes then it's totally useless. This is why the community also has to be collaborative, not just the technology, hends the shared governance idea... ppl note that IPFS has no economic model -- that's like true, because there has to be some other incentive system for using it -- it makes your work more powerful, it plugs you into a community, etc. https://blog.bluzelle.com/ipfs-is-not-what-you-think-it-is-e0aa8dc69b

### Credit Assignment


depth of linking is combinatoric -- if you have a paper ecosystem where the numbers are linked to the data, and then the data is annotated, then it's possible to index information across papers not just by textual similarity metrics but on similarity of the structure of experiment and data. 

the work of maintaining the system can't be invisible, read & cite {% cite classeDistributedInfrastructureSupport2017 bowkerInformationInfrastructureStudies2010 %}