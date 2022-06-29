<div style="color: #f00; padding: 20px; border: 1px red dashed; border-radius: 20px; background-color:#fff5f5;">This section should be split back up s.t. the parts specific to analysis/experimental tools are at the ends of those sections, and we should move the discussion about layers of abstraction congealing into a protocol in the end in the practical implementation section. I'm leaving this here until I have time to do that, but for now you probably want to skip to the next section :)</div>

Though there are many similarities between the three domains of data, analytical, and experimental tools, the different constraints each impose on a generalizable framework for integration and interoperability are instructive. Each requires a careful consideration of the *layers of abstraction* needed to maintain the modularity of the system --- this is an elemental feature of any protocol design. What are the minimal affordances needed to implement a wide array of systems and technologies within each domain? By being careful with specifying abstraction, when considered together, the linked system described so far represents a powerful step towards *collectivizing the scientific state of the art.*



!! while the analysis system seeks to make multiple software packages and environments be interoperable together, the experimental framework makes no such attempt. !! the need for careful timing and adaptation to individual systems leaves integration for the implementing codebases.

!! this is all extraordinarily reproducible because even though I have my portable markup description of the analysis, I can just refer to it by name in my paper (ya ya need some content based hash or archive but you get the idea)

!! since we have a bunch of p2p systems all hooked up with constantly-running daemons, to compete with the compute side of cloud technology we also should implement a voluntary compute grid akin to  [Folding@Home](https://foldingathome.org/). This has the same strawmen and answers to them as the peer-to-peer system --- no i'm not saying everyone puts their shitty GPU up, but it lets us combine the resources that are present at an institutional level and makes a very cheap onramp for government-level systems to be added to the mix. !! also see the pacific research platform!

!! this is all very exciting, and we can immediately start digging towards larger scientific problems, eg. what it would mean for the file drawer problem and publication bias when the barriers to analyzing data are so low you don't even need to write the null result: the data is already there, semantically annotated and all. Dreams of infinite meta-analyses across all data and all time, but hold your horses! We don't get magic for free, we haven't talked about the community systems yet that are the unspoken glue of all of this!!

The category distinction between experimental and analytical tools is, of course, a convenient ordering fiction for the purpose of this piece. Autopilot is designed to make it easy to integrate other tools, and {% cite kaneRealtimeLowlatencyClosedloop2020 %} 

!! so in parallel to our linking scheme is the development patterns that we use. The linking system is general enough for allcomers, and it implies the patterns of linkage that should exist, but they then need to be implemented. Much like desire pathways though, the frequent co-use of different tools gives a good idea about the direction that development should go. So the systems work reciprocally: metadata linking system connect ideas and tools, and can 

!! these are examples of what happens when you relax the demanding parts of an exact ontology/knowledge graph -- we don't guarantee computability across the graph itself, there's no way to automatically whiz uncritically across all datasets in the system, but as we have seen that's also not really true of the other systems either, to the degree that it's desirable at all. Instead of having formal guarantees on the graph, we can design tools that automate certain parts of the interaction with the system to actually make our jobs easier. By being very permissive, we let the desire paths of tool use form. This is a very literal example of the 'empower people, not systems' principle.

!! reciprocally, we can also imagine the reverse: being able to develop metadata structures that are then code generators for tools that have a sufficiently sophisticated API -- for example remember how we said Bonsai might have a hard time making generalizable behavioral tasks/etc? Imagine if someone made a code compilation tool that allowed people to declare abstract structures that could then be reusably reparameterzied that autocreated a bonsai workflow? In the same way that the metadata system can be used for *storage* of existing work, it can also be used to create abbreviate and abstract constructs for *use* with other tools. 

!! continue the example of needing to select within datasets instead of metadata from federation section.

To take stock:

We have described a system of three component modalities: **data, analytical tools, and experimental tools** connected by a **linked data** layer. We started by describing the need for a **peer-to-peer** data system that makes use of **data standards** as an onramp to linked metadata. To interact with the system, we described an identity-based linked data system that lets individual people declare linked data resources and properties that link to **content addressed** resources in the p2p system, as well as **federate** into multiple larger organizations. We described the requirements for **DAG-based analytical frameworks** that allow people to declare individual nodes for a processing chain linked to code, combine them into workflows, and apply them to data. Finally, we described a design strategy for **component-based experimental frameworks** that lets people specify experimental metadata, tools, and output data. 

This system as described is a two-layer system, with a few different domains linked by a flexible metadata linking layer. The metadata system as described is not merely *inert* metadata, but metadata linked to code that can *do something* --- eg. specify access permissions, translate between data formats, execute analayis workflows, parameterize experiments, etc. Put another way, we have been attempting to describe a system that *embeds the act of sharing and curation in the practice of science.* Rather than a thankless post-hoc process, the system attempts to provide a means for aligning the daily work of scientists so that it can be cumulative and collaborative. To do this, we have tried to avoid rigid specifications of system structure, and instead described a system that allows researchers to pluralistically define the structure themselves.

!! Now we need to consider the social tools needed to communicate within, negotiate over, and govern the system.

<div class="draft-text">
    Point here is to lead into interfaces --- these are two examples of classes of interfaces to and from the linked data system. Ways to create, read, and use links. Translation of our metadata system into code and computation. 
</div>

