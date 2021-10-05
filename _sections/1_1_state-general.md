
## Scientific Software Generally...

The constraints posed by the structure of systems neuroscience as a discipline are of course echos and elaborations of larger constraints in the system of scientific infrastructure production. 

### Incentivized Fragmentation

The incentive systems in science are complex, but tend to reward the production of many isolated, single-purpose software packages rather than cumulative work on shared infrastructure. The primary means of evaluation for a scientist is academic reputation, primarily operationalized by publications, but a software project will yield a single paper (if any at all). Traditional publications are static units of work that are "finished" and frozen in time, but software is never finished: the thousands of commits needed to maintain and extend the software are formally not a part of the system of academic reputation. 

Shoehorning reputational rewards through traditional scientific publications has three immediate consequences: 1) Scientists are incentivized to make new, independent software that can be independently published, rather than integrating their work to extend the functionality of existing software. Howison & Herbsleb described this dynamic in the context of BLAST 

> In essence we found that BLAST innovations from those motivated to improve BLAST by academic reputation are motivated to develop and to reveal, but not to integrate their contributions. Either integration is actively avoided to maintain a separate academic reputation or it is highly conditioned on whether or not publications on which they are authors will receive visibility and citation. {% cite howisonIncentivesIntegrationScientific2013 %}


For an example in Neuroscience, one can browse the papers that cite the DeepLabCut {% cite mathisDeepLabCutMarkerlessPose2018a %} to find hundreds of downstream projects that make various extensions and improvements that are not integrated into the main library. While the logical extreme of the alternative of a single monolithic ur-library is also undesirable, the point is that a scientist that released 10 barely working, barely documented, rapidly abandoned packages along with 10 code papers would have 10 times the academic credit than one who spent the time integrating them into a unified, well-documented framework for something 1/10th[^figuratively] as useful.

[^figuratively]: Figuratively! Non-quantitatively!

2) After publication, scientists have little incentive to **maintain** software outside of the domains in which the primary contributors use it (to satisfy reputational incentives by publishing in their own discipline), so outside of the most-used libraries most scientific software is brittle and difficult to use {% cite mangulImprovingUsabilityArchival2019 kumarBioinformaticsSoftwareBiologists2007 %}. 

3) Since the reputational value of a publication depends on its placement within a journal and number of citations (among other metrics), and citation practices for scientific software are far from uniform and universal, the incentive to write scientific software at all is relatively low compared to its near-universal use {% cite howisonSoftwareScientificLiterature2016 %}.

### Domain-Specific Silos

When funding exists for scientific infrastructure development, it typically comes in the form of side effects from, or administrative supplements to research grants. The NIH describes as much in their Strategic Plan for Data Science {% cite NIH StrategicPlan2018 %}:

> from 2007 to 2016, NIH ICs used dozens of different funding strategies to support data 
resources, most of them linked to research-grant mechanisms that prioritized innovation and hypothesis testing over user service, utility, access, or efficiency. In addition, although the need for open and efficient data sharing is clear, where to store and access datasets generated by individual laboratories—and how to make them compliant with FAIR principles—is not yet straightforward. Overall, it is critical that the data-resource ecosystem become seamlessly integrated such that different data types and information about different organisms or diseases can be used easily together rather than existing in separate data “silos” with only local utility. 

The National Library of Medicine within the NIH currently lists 122 separate databases in its [search tool](https://eresources.nlm.nih.gov/nlm_eresources/), each serving a specific type of data for a specific research community. Though their current funding priorities signal a shift away from domain-specific tools, the rest of the scientific software system consists primarily of tools and data formats purpose-built for a relatively circumscribed group of scientists without any framework for their integration. Every field has its own challenges and needs for software tools, but there is little incentive to build tools that serve as generalized frameworks to integrate them.

### "The Long Now" of Immediacy vs. Idealism

Digital infrastructure development takes place at multiple timescales simultaneously --- from the momentary work of implementing it, through longer timescales of planning, organization, and documenting to the imagined indefinite future of its use --- what Ribes and Finholt call "The Long Now. {% cite ribesLongNowTechnology2009 %}" Infrastructural projects constitutively need to contend with the need for immediately useful results vs. general and robust systems; the need to involve the effort of skilled workers vs. the uncertainty of future support; the  balance between stability with mutability; and so on. The tension between hacking something together vs. building something sustainable for future use is well-trod territory in the hot-glue and exposed wiring of systems neuroscience rigs.

Deinfrastructuring divides the incentives and interests of senior and junior researchers. Established researchers face little pressure to improve the state of infrastructure, as (very crudely) their primary incentives are to push enough publications through the door to be able to secure the next round of funding to keep their lab afloat. Their time preference is very short: hack it together, get the paper out, we'll fix it later.

ECRs are tasked with develping the tools, often interested in developing tools they'll be able to use throughout their careers, but between the pressure to establish their reputation with publications rarely have the time to develop something fully. As a consequence, a lot of software tools are developed by ECRs with no formal software training, contributing to the brittleness of scientific software and the low rates of adoption of best practices {% cite altschulAnatomySuccessfulComputational2013 %}. Anecdotally, the constant need to produce software that *does something* in the context of scientific programming which largely lacks the institutional systems and expert mentorship needed for well-architected software means that some programmers *never* have a chance to learn best practices commonly accepted in software engineering.

The problem of time horizon in development is not purely a product of inexperience, and a longer time horizon is not uniformly better. For an example, look no further than the history and cultural dynamics of the semantic web and linked data communities, revisted more fully in a moment as Scruffiness vs. Neatness. In the semantic web era, thousands of some of the most gifted programmers worked with an eye to the indefinite future, but the raw idealism and neglect of the pragmatic reality of the need for software to *do something* drove many to abandon the effort:

> But there was no *use* of it. I wasn't using any of the technologies for anything, except for things related to the technology itself. The Semantic Web is utterly inbred in that respect. The problem is in the model, that we create this metaformat, RDF, and *then* the use cases will come. But they haven't, and they won't. Even the genealogy use case turned out to be based on a fallacy. The very few use cases that there are, such as Dan Connolly's hAudio export process, don't justify hundreds of eminent computer scientists cranking out specification after specification and API after API.
>
> When we discussed this on the Semantic Web Interest Group, the conversation kept turning to how the formats could be fixed to make the use cases that I outlined happen. “Yeah, Sean's right, let's fix our languages!” But it's not the languages which are broken, except in as much as they are entirely broken: because it's the *mentality* of their design which is broken. You can't, it has turned out, make a metalanguage like RDF and then go looking for use cases. We thought you could, but you can't. It's taken eight years to realise.
> {% cite palmerDitchingSemanticWeb2008 %}

Developing digital infrastructure must be both bound to fulfilling immediate needs and a sense of incrementalism as well as guided by a long-range vision. The technical and social lessons run in parallel: We need software that solves problems people actually have right now, but can flexibly support its eventual form. We need a long-range vision to know what kind of tools we should build and which we shouldn't, and we need to keep it in a tight loop with the always-changing needs of the people it supports. In short, to develop digital infrastructure we need to be *strategic.* To be strategic we need a *plan.* To have a plan we need to value planning as *work.* On this, Ribes and Finholt are instructive:

> "On the one hand, I know we have to keep it all running, but on the other, LTER is about long-term data archiving. If we want to do that, we have to have the time to test and enact new approaches. But if we’re working on the to-do lists, we aren’t working on the tomorrow-list" (LTER workgroup discussion 10/05).
>
> The tension described here involves not only time management, but also the differing valuations placed on these kinds of work. The implicit hierarchy places scientific research first, followed by deployment of new analytic tools and resources, and trailed by maintenance work. [...] While in an ideal situation development could be tied to everyday maintenance, in practice, maintenance work is often invisible and undervalued. As Star notes, infrastructure becomes visible upon breakdown, and only then is attention directed at its everyday workings (1999). Scientists are said to be rewarded for producing new knowledge, developers for successfully implementing a novel technology, but the work of maintenance (while crucial) is often thankless, of low status, and difficult to track. *How can projects support the distribution of work across research, development, and maintenance?* {% cite ribesLongNowTechnology2009 %}


{% cite gawerBridgingDifferingPerspectives2014 %}

### "Neatness" vs "Scruffiness"

Closely related to the tension between "Now" and "Later" is the tension between "Neatness" and "Scruffiness." Lindsay Poirier traces its reflection in the semantic web community as the way that differences in "thought styles" result in different "design logics"  {% cite poirierTurnScruffyEthnographic2017 %}. On the question of how to develop technology for representing the ontology of the web -- the system of terminology and structures with which everything should be named -- there were (very roughly) two camps. The "neats" prioritized consistency, predictability, uniformity, and coherence -- a logically complete and formally valid System of Everything. The "scruffies" prioritized local systems of knowledge, expressivity, "believing that ontologies will evolve organically as everyday webmasters figure out what schemas they need to describe and link their data. {% cite poirierTurnScruffyEthnographic2017 %}" 

Practically, the differences between these thought communities impact the tools they build. Aaron Swartz put the approach of the "neat" semantic web architects the way he did:

> Instead of the “let’s just build something that works” attitude that made the Web (and the Internet) such a roaring success, they brought the formalizing mindset of mathematicians and the institutional structures of academics and defense contractors. They formed committees to form working groups to write drafts of ontologies that carefully listed (in 100-page Word documents) all possible things in the universe and the various properties they could have, and they spent hours in Talmudic debates over whether a washing machine was a kitchen appliance or a household cleaning device. 
> 
> With them has come academic research and government grants and corporate R&D and the whole apparatus of people and institutions that scream “pipedream.” And instead of spending time building things, they’ve convinced people interested in these ideas that the first thing we need to do is write standards. (To engineers, this is absurd from the start—standards are things you write after you’ve got something working, not before!) {% cite swartzAaronSwartzProgrammable2013 %}

The "scruffies," recognizing the limitations of this approach diverged into a distinct thought community under the mantle of linked data. The linked data developers, starting by acknowledging that no one system can possibly capture everything, build tools that allow expression of local systems of meaning with the expectation and affordances for linking data between these systems as an ongoing social process.

The outcomes of this cultural rift are subtle, but the broad strokes are clear: the linked data community has taken some of the core semantic web technology like RDF, OWL, and the like, and developed a broad range of downstream technologies that have found broad use across information sciences, library sciences, and other applied domains. The vision of a totalizing and logically consistent semantic web, however, has largely faded into obscurity. One developer involved with semantic web technologies (who requested not be named), captured the present situation in their description of a still-active developer mailing list: 

> I think that some people are completely detached from practical applications of what they propose. [...] I could not follow half of the messages. these guys seem completely removed from our plane of existence and I have no clue what they are trying to solve.

This division in thought styles generalizes across domains of infrastructure, though outside of the linked data and similar worlds the dichotomy is more frequently between "neatness" and "people doing whatever" -- with integration and interoperability becoming nearly synonymous with standardization. Calls for standardization without careful consideration and incorporation of existing practice have a familiar cycle: devise a standard that will solve everything, implement it, wonder why people aren't using it, funding and energy dissipiates, rinse, repeat. The difficulty of scaling an exacting vision of how data should be formatted, the tools researchers should use for their experiments, and so on is that they require dramatic and sometimes total changes to the way people do science. The alternative is not between standardization and chaos, but a potential third way is designing infrastructures that allow the diversity of approaches, tools, and techniques to be expressed in a common framework or protocol along with the community infrastructure to allow the continual negotiation of their relationship.

### Taped-on Interfaces: Open-Loop User Testing

The point of most active competition in many domains of commercial software is the user interface and experience (UI/UX), and to compete software companies will exhaustively user-test and refine them with pixel precision to avoid any potential customer feeling even a thimbleful of frustration. Scientific software development is largely disconnected from usability testing, as what little support exists is rarely tied to it. This, combined with the above incentives for developing new packages -- and thus reduplicating the work of interface development -- and the preponderance of semi-amateurs make it perhaps unsurprising that most scientific software is hard to use!

I intend the notion of "interface" in an expansive way: In addition to the graphical user interface (GUI) exposed to the end-user, I am referring generally to all points of contact with users, developers, and other software. Interfaces are intrinsically social, and include the surrounding documentation and experience of use --- part of using an API is being able to figure out how to use it! The typical form of scientific software is a black box: I implemented an algorithm of some kind, here is how to use it, but beneath the surface there be dragons. Ideally, software would be designed with programming interfaces and documentation at multiple scales of complexity to enable clean entrypoints for developers with differing levels of skill and investment to contribute. Additionally, it would include interfaces for use and integration with other software. Without care given to either of these interfaces, the community of codevelopers is likely to remain small, and the labor they expend is less likely to be useful outside that single project. This, in turn, reinforces the incentives for developing new packages and fragmentation.


### Platforms, Industry Capture, and the Profit Motive

Publicly funded science is an always-irresistable golden goose for private industry. The fragmented interests of scientists and the historically light touch of funding agencies on encroaching privatization means that if some company manages to capture and privatize a corner of scientific practice they are likely to keep it. Industry capture has been thoroughly criticized in the context of the journal system (eg. recently, {% cite brembsReplacingAcademicJournals2021 %}), and that criticism should extend to the rest of our infrastructure. Another major engine for privatization of scientific infrastructure has been the preponderance of software as a service (SaaS), from startups to international megacorporations, that sell access to some, typically proprietary software without selling the software itself. 

While in isolation SaaS can make individual components of the infrastructural landscape easier to access --- and even free!!* --- the business model is fundamentally incompatible with integrated and accessible infrastructure. The SaaS model derives revenue from subscription or use costs, often operating as freemium models that make some subset of its services available for free. Even in freemium models, though, the business model requires that some functionality of the platform is paywalled (See a more thorough treatment of platform capitalism in science in {% cite mirowskiFutureOpenScience2018 %}) 

As isolated services, one can imagine the practice of science devolving along a similar path as the increasingly-fragmented streaming video market: to do my work I need to subscribe to a data storage service, a cloud computing service, a platform to host my experiments, etc. For larger software platforms, however, vertical integration of multiple complementary services makes their impact on infrastructure more insidious. Locking users into more and more services makes for more and more revenue, which encourages platforms to be as mutually incompatible as they can get away with {% cite macinnesCompatibilityStandardsMonopoly2005 %}. To encourage adoption, platforms that can offer multiple services may offer one of the services -- say, data storage -- for free, forcing the user to use the adjoining services -- say, a cloud computing platform. 

Since these platforms are often subsidiaries of information industry monopolists, scientists become complicit in their ethically nightmarish behavior by funneling millions of dollars into, for example, the parent company of Elsevier and their surveillance technology agreement with ICE {% cite biddleLexisNexisProvideGiant2021 %}, or AWS and the laundry list of human rights abuses by Amazon {% cite CriticismAmazon2021 %}.

Structurally, the adoption of SaaS on a wide scale necessarily sacrifices the goals of an integrated mass infrastructure as the practice of research is carved into small, marketable chunks within vertically integrated technology platforms. Worse, it stands to amplify, rather than reduce, inequities in science, as the labs and institutes that are able to afford the tolls between each of the weigh stations of infrastructure are able to operate more efficiently, in turn begetting more funding, and the cycle spins ever faster. 

Funding models and incentive structures in science are uniformly aligned towards the platformatization of scientific infrastructure. Aside from the tragic rhetoric of "technology transfer" that pervades the neoliberal university, the relative absence of major funding opportunities for scientific software developers competitive with the profit potential from "industry" often leaves it as the only viable career path. The preceding structural constraints on local infrastructural development strongly incentivize labs and researchers to rely on SaaS that provides a readymade solution to specific problems. Distressingly, rather than supporting infrastructural development that would avoid obligate payments to platform-holders, funding agencies seem all too happy to lean into them:

> NIH will leverage what is available in the private sector, either through strategic partnerships or procurement, to create a workable Platform as a Service (PaaS) environment. [...] NIH will partner with cloud-service providers for cloud storage, computational, and related infrastructure services needed to facilitate the deposit, storage, and access to large, high-value NIH datasets.
>
> These negotiations may result in partnership agreements with top infrastructure providers from U.S.-based companies whose focus includes support for research. Suitable cloud environments will house diverse data types and high-value datasets created with public funds. NIH will ensure that they are stable and adhere to stringent security requirements and applicable law, to protect against data compromise or loss. [...] NIH’s cloud-marketplace initiative will be the first step in a phased operational framework that establishes a SaaS paradigm for NIH and its stakeholders. (-NIH Strategic Plan for Data Science, 2018 {% cite NIHStrategicPlan2018 %})

The articulated plan being to pay platform holders to house data while also paying for the labor to maintain those databases veers into parody, haplessly building another triple-pay industry {% cite buranyiStaggeringlyProfitableBusiness2017 %} into the economic system of science --- one can hardly wait until they have the opportunity to rent their own data back with a monthly subscription. It is unclear to me whether this is the result of the cultural hegemony of platform capitalism narrowing the space of imaginable infrastructures, industry capture of the decision-making process, or both, but the effect is the same in any case. 

### Protection of Institutional and Economic Power

The current state of deinfrastructuring certainly is not without its beneficiaries --- those that have already accrued power and status within science. (I have already articulated the positive feedback loop of scientific funding, engineering costs, and prestige publishing and need to consolidate that here. The result of the protective nature of deinfrastructuring on concentrated power means that, barring some exogenous effort, we should not expect liberatory infrastructure to be developed by the places where the resources it requires are concentrated.)