To take stock:

We have described a system of three component modalities: **data, analytical tools, and experimental tools** connected by a **linked data** layer. We started by describing the need for a **peer-to-peer** data system that makes use of **data standards** as an onramp to linked metadata. To interact with the system, we described an identity-based linked data system that lets individual people declare linked data resources and properties that link to **content addressed** resources in the p2p system, as well as **federate** into multiple larger organizations. We described the requirements for **DAG-based analytical frameworks** that allow people to declare individual nodes for a processing chain linked to code, combine them into workflows, and apply them to data. Finally, we described a design strategy for **component-based experimental frameworks** that lets people specify experimental metadata, tools, and output data. 

This system as described is a two-layer system, with a few different domains linked by a flexible metadata linking layer. The metadata system as described is not merely *inert* metadata, but metadata linked to code that can *do something* --- eg. specify access permissions, translate between data formats, execute analayis workflows, parameterize experiments, etc. Put another way, we have been attempting to describe a system that *embeds the act of sharing and curation in the practice of science.* Rather than a thankless post-hoc process, the system attempts to provide a means for aligning the daily work of scientists so that it can be cumulative and collaborative. To do this, we have tried to avoid rigid specifications of system structure, and instead described a system that allows researchers to pluralistically define the structure themselves.


<div class="draft-text">
Point here is to lead into interfaces --- these are two examples of classes of interfaces to and from the linked data system. Ways to create, read, and use links. Translation of our metadata system into code and computation. 

    
We also haven't described any sort of governance or development system that makes these packages anything more than "some repository on GitHub somewhere" with all the propensity to calcify into fiefdoms that those entail. This leads us back to a system of communication, the central piece of missingness that we have been circling around the whole piece. If you'll allow me one more delay, I want to summarize the system so far before finally arriving there.
</div>

