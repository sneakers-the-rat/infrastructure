To take stock:

---
<div id="draftmarker"><h1># draftmarker</h1><br>~ everything past here is purely draft placeholder text ~  </div>
---

- So far we have described a system for using **semantic web** and **linked data** technology to bridge several interacting subsystems. 
- We have endorsed a **folksonomy** oriented system with 
- a low barrier to **identity declaration** 
- but with ability to **federate** at multiple scales and in overlapping groups, !! specifics on using AS for creating norms and rules 
- **versioning**
- A **peer-to-peer** data sharing system 
- Use of formats for establishing a base of OWL/RDF-based schema as a seed.
- content addressing from metadata index
- **data sharding**
- **I/O abstraction** to introduce the notion of metadata indicating code routines
- **flexible attribute propagation** eg. the ability to have stuff spec hooks like `accessRuleset` accepts `@hhs:HIPAA` and being able to resolve dependencies flatly
- **embracing the notion of expand space** by letting people declare and link schema extensions
- ... brb 

!! this system as described is a two-layer system, with a few different domains linked by a flexible metadata linking layer. But we also haven't necessarily *just* described a metadata linking system. We haven't been describing linking things in a vaccuum, but as applied in several different domains, so we can think of it as "functional metadata" -- or metadata that can *do something* by declaring it. Eg. by linking our data to a new datatype, it can then make use of linked code to actually literally read and write the files and make that happen. The act of declaring an analysis chain is continuous with applying that analysis chain to a series of datasets. In short we have been attempting to describe a system that *embeds the act of sharing and curation in the practice of science.* Rather than a thankless post-hoc process, we can align the practice of our daily work in a system that makes it easier as well as allows it to be cumulative with the work of other scientists. 




-  First, the markup description of the node gives us abstraction from programming language and implementation. This lets us do stuff like use multiple tools with competing environmental needs, adapt to multiple versions of the code markup as it develops, etc. Note the interaction with the rest of the metadata system: because we required a particular type of data file, and that link should provide us some means of opening/instantiating the file with dependencies, we didn't need to write loading code. Since it's in a linked system, someone could override the implementation of my node -- say someone comes up with a faster means of binning, then they just inherit from my node and replace the reference to the code. Boom we have cumulative and linked development.
- The separation of the node from the workflow means that the node can be shared and swapped and reintegrated easily, dramatically reducing the brittleness of the systme. Since there is no restriction on what constitutes a node, though, there's no reason that nodes can't be either made massive, like putting a whole library in the process method, or be packaged up together. If we made the argument and method names recursive between the workflow and the node objects then tooling could automatically traverse multiple layers of node/workflow combinations at different levels of abstraction. This being a schematic description means that there can be multiple "workflow runner" packages that eg. distribute the task across a billion supercomputers or not. 
- Finally, the separation between the data applied and the workflow itself are very cool indeed given our linked and namespaced system. My workflow effectively constitutes "an unit of analysis." I have linked my data to this unit of analysis. Play out the permutations: 

    - I can see all the analyses that this particular pipeline has been applied to. Since it is embedded within the same federated system as our schema system, I can draw and connect semantic links to similar analysis pipelines as well as pipeline/data combinations. 
    - I can see all the different analyses that have been applied to my data: if my data is analyzed a zillion different times, in a zillion different combinations of data, I effectively get a "multiverse analysis" (cite dani) and we get to measure robustness of my data for free. It also gets to live forever and keep contributing to problems !! and i also get credited for it automatically by golly! This also applies on cases like cross-validation or evaluating different models on the same data: the versioning of it falls out naturally. Also since model weights would be an input to an analysis chain, we also get stuff like DLC's model zoo where we can share different model weights, combine them, and have a cumulative library of pretrained models as well!
    - being able to look across the landscape... we start being able to actually really make cumulative progress on best practices. A common admonishment in cryptographically-adjacent communities is to "never roll your own crypto," because your homebrew crypto library will never be more secure than reference implementations that have an entire profession of people trying to expose and patch their weaknesses. Bugs in analysis code that produce inaccurate results are inevitable and rampant {% cite millerScientistNightmareSoftware2006 soergelRampantSoftwareErrors2015 eklundClusterFailureWhy2016a bhandarineupaneCharacterizationLeptazolinesPolar2019 %}, but impossible to diagnose when every paper writes its own pipeline. A common analysis framework would be a single point of inspection for bugs, and facilitate re-analysis and re-evaluation of affected results after a patch. 
    - looking forward, we might imagine our project object being linked to a DOI... we'll get there.


!! this is all extraordinarily reproducible because even though I have my portable markup description of the analysis, I can just refer to it by name in my paper (ya ya need some content based hash or archive but you get the idea)

!! since we have a bunch of p2p systems all hooked up with constantly-running daemons, to compete with the compute side of cloud technology we also should implement a voluntary compute grid akin to  [Folding@Home](https://foldingathome.org/). This has the same strawmen and answers to them as the peer-to-peer system --- no i'm not saying everyone puts their shitty GPU up, but it lets us combine the resources that are present at an institutional level and makes a very cheap onramp for government-level systems to be added to the mix.

!! this is all very exciting, and we can immediately start digging towards larger scientific problems, eg. what it would mean for the file drawer problem and publication bias when the barriers to analyzing data are so low you don't even need to write the null result: the data is already there, semantically annotated and all. Dreams of infinite meta-analyses across all data and all time, but hold your horses! We don't get magic for free, we haven't talked about the community systems yet that are the unspoken glue of all of this!!

The category distinction between experimental and analytical tools is, of course, a convenient ordering fiction for the purpose of this piece. Autopilot is designed to make it easy to integrate other tools, and {% cite kaneRealtimeLowlatencyClosedloop2020 %} 

!! so in parallel to our linking scheme is the development patterns that we use. The linking system is general enough for allcomers, and it implies the patterns of linkage that should exist, but they then need to be implemented. Much like desire pathways though, the frequent co-use of different tools gives a good idea about the direction that development should go. So the systems work reciprocally: metadata linking system connect ideas and tools, and can 

!! these are examples of what happens when you relax the demanding parts of an exact ontology/knowledge graph -- we don't guarantee computability across the graph itself, there's no way to automatically whiz uncritically across all datasets in the system, but as we have seen that's also not really true of the other systems either, to the degree that it's desirable at all. Instead of having formal guarantees on the graph, we can design tools that automate certain parts of the interaction with the system to actually make our jobs easier. By being very permissive, we let the desire paths of tool use form. This is a very literal example of the 'empower people, not systems' principle.

!! reciprocally, we can also imagine the reverse: being able to develop metadata structures that are then code generators for tools that have a sufficiently sophisticated API -- for example remember how we said Bonsai might have a hard time making generalizable behavioral tasks/etc? Imagine if someone made a code compilation tool that allowed people to declare abstract structures that could then be reusably reparameterzied that autocreated a bonsai workflow? In the same way that the metadata system can be used for *storage* of existing work, it can also be used to create abbreviate and abstract constructs for *use* with other tools. 

!! continue the example of needing to select within datasets instead of metadata from federation section.
