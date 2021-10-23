---
layout: post
title:  "Decentralized Infrastructure for (Neuro)science"
subtitle: "Or, Kill the Cloud in Your Mind"
author: "Jonny Saunders"
navigation: false
canonical_url: "https://jon-e.net/infrastructure"
---

<div id="react-test"></div>

{% include status.html %}
{% include annotation.html %}


1. table of contents
{:toc}

[**PDF VERSION**](/infrastructure/tex/decentralized_infrastructure_render.pdf)


*This is a draft document, so if you do work that you think is relevant here but I am not citing it, it's 99% likely that's because I haven't read it , not that I'm deliberately ignoring you! Odds are I'd love to read & cite your work, and if you're working in the same space try and join efforts!*

----


> If we can make something decentralised, out of control, and of great simplicity, we must be prepared to be astonished at whatever might grow out of that new medium. 
> 
> [Tim Berners-Lee (1998): Realising the Full Potential of the Web](https://www.w3.org/1998/02/Potential.html)

>  A good analogy for the development of the Internet is that of
> constantly renewing the individual streets and buildings of a city,
> rather than razing the city and rebuilding it. The architectural
> principles therefore aim to provide a framework for creating
> cooperation and standards, as a small "spanning set" of rules that
> generates a large, varied and evolving space of technology.
>
>   [RFC 1958: Architectural Principles of the Internet](https://datatracker.ietf.org/doc/html/rfc1958)

> In building cyberinfrastructure, the key question is not whether a problem is a “social” problem or a “technical” one. That is putting it the wrong way around. The question is whether we choose, for any given problem, a primarily social or a technical solution
>
> [Bowker, Baker, Millerand, and Ribes (2010): Toward Information Infrastructure Studies](https://doi.org/10.1007/978-1-4020-9789-8_5) {% cite bowkerInformationInfrastructureStudies2010 %}

> The critical issue is, how do actors establish generative platforms by instituting a set of control points acceptable to others in a nascent ecosystem? {% cite tilsonDigitalInfrastructuresMissing2010 %}

Acknowledgements in no order at all!!! (make sure to double check spelling!!! and then also double check it's cool to list them!!!):

* Lucas Ott, the steadfast
* Tillie Morris
* Nick Sattler
* Sam Mehan
* Molly Shallow
* Mike and as always ty for letting me always go rogue
* Matt Smear
* Santiago Jaramillo
* Gabriele Hayden
* Eartha Mae
* jakob voigts for participating in the glue wiki
* nwb & dandi team for dealing w/ my inane rambling
* Tomasz Pluskiewicz
* James Meickle
* Gonçalo Lopes
* Mackenzie Mathis
* Lauren E. Wool
* Gabi Hayden
* Mark Laubach & Open Behavior Team
* Os Keyes
* Avery Everhart
* Eartha Mae Guthman
* Olivia Guest
* NWB & DANDI teams
* Kris Chauvin
* Phil Parker
* Chris Rogers
* Danny Mclanahan
* Petar 
* Jeremy Delahanty
* Andrey Andreev
* Joel Chan
* Sanjay Srivastava & Metascience Class
* Ralph Emilio Peterson
* Manuel Schottdorf
* Ceci Herbert
* The Emerging ONICE team
* The Janet Smith House, especially Leslie Harka
* Rumbly Tumbly Lawnmower
* lmk if we talked and i missed ya!

# Introduction

{% include_relative _sections/0_intro.md %}

# The State of Things

## The Costs of being Deinfrastructured

{% include_relative _sections/1_0_costs.md %}

## Systems Neuroscience Specifically...

{% include_relative _sections/1_0_state-neuro.md %}

## Scientific Software Generally...

{% include_relative _sections/1_1_state-general.md %}

## Whose Job is Infrastructure? - The Ivies, Institutes, Consortia, and "The Rest of Us"

{% include_relative _sections/1_2_state-who.md %}

# A Draft of Decentralized Scientific Infrastructure

{% include_relative _sections/2_0_principles.md %}

## Shared Data

### Formats as Onramps

{% include_relative _sections/2_1_p2p.md %}

### Linked Data or Surveillance Capitalism?

{% include_relative _sections/2_1_1_linking.md %}

### Federated Systems (of Language)

{% include_relative _sections/2_2_federation.md %}

## Shared Tools

{% include_relative _sections/2_3_tools-analysis.md %}


### Experimental Framework

I've taken this out for now because it needs to be reworked dramatically, but it's basically a lot of what I talk about in the autopilot manuscript, cross apply a lot of the same thinking from the previous section, and put it on the other side of the data where we're feeding data directly from the tool into the data stream. The other part to note is that it becomes possible to make the same kinds of semantic links that we're talking about from a semantic communication medium (next section) that can gather contextual knowledge, publications, etc. back to the code we used to run the experiments. 

### Collectivizing the State of the Art

{% include_relative _sections/2_4_1_collectivize-sota.md %}

## Shared Knowledge

{% include_relative _sections/2_5_knowledge.md %}

# Conclusion

{% include_relative _sections/3_0_conclusion.md %}

# References

{% include_relative _sections/bib.md %}

# Footnotes

{% include_relative _sections/x_footnotes.md %}


