The remaining set of problems implied by the infrastructural system sketched in the preceding sections is the *communication* and *organization* systems that make up the interfaces to maintain and use it. We can finally return to some of the breadcrumbs laid before: negotiating over distributed and conflicting data schema, the potential forms of social systems for incentivizing and organizing labor discussed previously in the context of bittorrent trackers, and a means of maintaining the links between the broadly dispersed components of the infrastructure. 

To do that we'll trace a bit more of the history of the semantic web community, as well as the parallel but distinct history of the early wiki movement. We'll land back in the realm of ActivityPub 

!! we'll describe a way to [summarize open spaces left by preceding sections] !! while a full consideration of the journal system as a whole is strictly out of scope of this paper, the system as developed renders it effectively irrelevant.


current status
- our current systems are largely journals and conferences, but as evidenced by the unfortunate but widescale adoption of twitter, scientific communication naturally spans dispersed forms of communication at different scales of formality, length, public engagement, etc.
- when we go to organize ourselves, why is the best we can do google docs and slack? 

problems 
- Despite being, in some sense, an effort to organize and systematize human knowledge, *science effectively has no system of organization.* 
- The best we have is journals that are only loosely organized around large topic areas and citation networks, citation networks, which are un-annotated and un-descriptive, and unidimensional keywords. 
- So one way of reading {% cite chuSlowedCanonicalProgress2021 %} is that there are too many papers, but another way of reading it is that our systems of organizing scientific communication simply don't scale well since they rely mostly on scanning TOC alerts, google scholar, and happenstance. 
- Another impact of the arcanity of scientific knowledge organization is that it is effectively impenetrable to people that aren't domain experts. Why is trust in science so low right now? one contributor is that they have no idea what the hell we do or how different domains of knowledge have evolved. (cite cold war peer review and journals paper)
- Practically, this makes the quality of scientific literature constantly in question. Each paper effectively exists as an island, and engagement with prior literature is effectively optional (outside the minimum bar set by the 3-5 additional private peer reviewers, each with their own limited scope and conflicting interests). Forensic peer-reviewers have been ringing the alarm bell, saying that there is "no net" to bad research {% cite heathersRealScandalIvermectin2021 %}, and brave and highly-skilled investigators like [Elisabeth Bik](https://scienceintegritydigest.com/) have found thousands of papers with evidence of purposeful manipulation {% cite shenMeetThisSuperspotter2020 bikPrevalenceInappropriateImage2016 %}. 
- So our existing systems of communication and organization are woefully inadequate for our needs, and don't serve the role of guaranteeing consistency or reliability in research that they claim to. 

contextual knowledge needed
- our limited systems of communication also render large sections of needed scientific communication without venue. The existing tools that *do* give some means of sharing technical knowledge are distinctly charity-driven, and don't confer the same type of credit incentive that publications do.



!! important of ease of leaving http://meatballwiki.org/wiki/RightToLeave

!! we've been tracing a distinction between the ability to express fluidly the contents of our reality with developing platforms that sift through it in an automated way, something that was an explicit cultural division throughout the semantic web project {% cite swartzTechniquesMassCollaboration2006 %}, which Peter Norvig (director of search at Google at the time) primarily attributes to user incompetence {% cite lombardiGoogleExecChallenges2007 %}. On trust, TBL says "Berners-Lee agreed with Norvig that deception on the Internet is a problem, but he argued that part of the Semantic Web is about identifying the originator of information, and identifying why the information can be trusted, not just the content of the information itself."

!! more techniques of communtiy growth http://meatballwiki.org/wiki/RewardReputation

!! wikis work! but they can break when people get too much power! http://www.aaronsw.com/weblog/whorunswikipedia

There simply isn't a place to have longform, thoughtful, durable discussions about science. The direct connection between the lack of a communcaition venue to the lack of a way of storing technical, contextual knowledge is often overlooked. Because we don't have a place to talk about what we do, we don't have a place to write down how to do it. Science needs a communcation platform, but the needs and constraints of a scientific communication platform are different than those satisfied by the major paradigms of chatrooms, forums etc. By considering this platform as another infrastructure project alongside and integrated with those described in the previous sections, its form becomes much clearer, and it could serve as the centerpiece of scientific infrastructure.

!! importantly, should also have means of ingest for existing tools and elements -- easy to import existing papers and citation trees, plugins for existing data sharing systems. 

!! description of its role as a schema resolution system -- currently we implement all these protocols and standards in these siloed, centralized groups that are inherently slow to respond to changes and needs in the field. instead we want to give people the tools so that their the knowledge can be directly preserved and acted on. 

!! descrption of its role as a tool of scientific discussion -- integrated with the data server and standardized analysis pipelines, it could be possible to have a discussion board where we were able to pose novel scientific questions, answerable with transparent, interrogatable analysis systems. Semantic linking makes the major questions in the field possible to answer, as discussions are linked to one another in a structured way and it is possible to literally trace the flow of thought. 

!! should trace the development of AP and the difficulty of doing these things as a way to explaining the ecosystem and the different parts that are needed in it: https://www.w3.org/TR/social-web-protocols/ 

### Axes of Communication Systems

!! we need a few things, but there's no reason they should be different things! we need a system for

- permanent communication for archiving
- durable communication like technical knowledge and scientific discourse proper, like a wiki
- rapid communication for like talking lmao -- but not purposely temporary the way that social media is!

each of these systems can have multiple iterations, with different rules, and so forth, and we should have control over our content and contribution to all of them (opt-in).


### The Wiki Way

> So that's it --- insecure but reliable, indiscriminate and subtle, user hostile yet easy to use, slow but up to date, and full of difficult, nit-picking people who exhibit a remarkable community camaraderie. Confused? Any other online community would count each of these "negatives" as a terrible flaw, and the contradictions as impossible to reconcile. Perhaps wiki works because the other online communities don't. {% cite leufWikiWayQuick2001a -l 329 %}

!! wiki cultural history stuff!! differences in wiki philosophy, deletists vs not. !! meatball stuff on community maintenace, conflict resolution, 

!! also hints at the problems, difficulties with wiki culture

> It’s not too late to turn things around. Specs could be moved back into the wiki until they’re nearly done. Editors, instead of being gatekeepers, could be helpful moderators. A clear process for making controvertial decisions could be decided on. And the validator could follow consensus instead of leading it. But do the people running the show want this?
>
> Standards bodies tread a fine line between organizations for the public good and shelters for protecting collusion that would be otherwise illegal under antitrust law. For the dominent vendors involved, the goal is to give the illusion of openness while giving themselves full control to enforce their will behind the scenes.
>
> The IETF is a good example of this. Often lauded by the public as a model of openness and and and freedom, the reality is that working group chairs, appointed by a self-elected ruling board, get away with declaring whatever they want (usually an inferior and difficult to implement alternative) as “rough consensus”, routinely ignoring comments from the public and objections from working group members. One working group (in charge of DNS extentsions) went so far as to censor mail from working group members. The dictators running the IETF, when informed, didn’t seem to mind.
> 
> Is the same sort of thing at work in the Pie/Echo/Atom Project? It appears so at first glance: Sam running the show from behind the scenes, putting friends in charge of the specs (although that isn’t what actually happened). The lack of a dispute-resolution process only makes things worse: when there’s no clear guide on how to make decisions or contributions, it’s far from obvious how to challenge a decision Sam has made. {% cite swartzSecretsStandards2003 %}

!! give the example of the autopilot wiki

!! contextual knowledge stuff in this section, theory wiki stuff in next section

> Two essential features coordinate this information to better serve our organizational decision-making, learning, and memory. The first is our constellation of Working Groups that maintain and distribute local, specialized knowledge to other groups across the network. [...] A second, more emergent property is the subgroup of IBL researchers who have become experts, liaisons, and interpreters of knowledge across the network. These members each manage a domain of explicit records (e.g., written protocols) and tacit information (e.g., colloquialisms, decision histories) that are quickly and informally disseminated to address real-time needs and problems. A remarkable nimbleness is afforded by this system of rapid responders deployed across our web of Working Groups. However, this kind of internalized knowledge can be vulnerable to drop-out when people leave the collaboration, and can be complex to archive. An ongoing challenge for our collaboration is how to archive both our explicit and tacit processes held in both people and places. This is not only to document our own history but as part of a roadmap for future science teams, whose dynamics are still not fully understood. {% cite woolKnowledgeNetworksHow2020 %}

{% cite kamelboulosSemanticWikisComprehensible2009 %}

!! Read and cite! {% cite classeDistributedInfrastructureSupport2017 %}

!! {% cite goodSocialTaggingLife2009 %}

!! wikibase can do federated SPARQL queries https://wikiba.se/
- and has been used to make folksonomies https://biss.pensoft.net/article/37212/

!! lots of scientific wikis 
- https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Molecular_Biology/Genetics/Gene_Wiki/Other_Wikis
- https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Molecular_Biology/Genetics/Gene_Wiki

!! bids is doing something like this https://nidm-terms.github.io/

!! interlex

> The Semantic Web is about two things. It is about common formats for integration and combination of data drawn from diverse sources, where on the original Web mainly concentrated on the interchange of documents. It is also about language for recording how the data relates to real world objects. That allows a person, or a machine, to start off in one database, and then move through an unending set of databases which are connected not by wires but by being about the same thing. https://www.w3.org/2001/sw/

!! Semantic combination of databases in science are also not new {% cite cheungSemanticWebApproach2007 simaEnablingSemanticQueries2019 %}. We need both though! semantic federated databases!

!! let's tour through wikipedia for a second and see how it's organized. Look at these community incentive structures and the huge macro-to-micro level organization of the wiki projects. The infinitely mutable nature of a wiki is what makes it powerful, but the SaaS wikis we're familiar with don't capture the same kind of 'build the ground you walk on ' energy of the real wiki movement. 



### Rebuilding Scientific Communication

!! take stock of our communication technology, we publish pdfs in journals, have science twitter, and then a bunch of private slacks and smalltime stuff??? Science is fundamentally a communicative process, literally every part fo the system that I have described has been built aroudn the ability to express the structure of things, the order of things, how it relates to other things and *that's communication baby.* The system we've imagined so far takes us so far from forums and the ultradominant feed -> shallow thread-based communication that we're used to though. This is a system where we can have continuous dialogue about linked topics, be able to branch and see the reflections and subtle variations on ideas in the same place that we have our data, analysis, and tools.

!! theory wiki example from presentation

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

### Credit Assignment

the work of maintaining the system can't be invisible, read & cite {% cite classeDistributedInfrastructureSupport2017 bowkerInformationInfrastructureStudies2010 %}

!! essentially all questions about "changing the system of science" inevitably lead to credit assignment, but in our system it is the same as provenance. We can give credit to all work from data production, analysis tooling, technical work, theoretical work, and so on that we currently do with just author lists. brief nod to semantic publishing, though a treatment of the journal system is officially out of scope.