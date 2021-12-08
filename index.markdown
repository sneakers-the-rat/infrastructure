---
layout: post
title:  "Decentralized Infrastructure for (Neuro)science"
subtitle: "Or, Kill the Cloud in Your Mind"
author: 
  - name: Jonny Saunders
    affiliation: 
      - University of Oregon
      - Institute of Neuroscience
    email: jsaunder@uoregon.edu
navigation: false
canonical_url: "https://jon-e.net/infrastructure"
toc_levels: "1..3"
acknowledgements:
  - name: lab
    prefix: Labmates
    members:
      - Lucas Ott, the steadfast
      - Tillie Morris
      - Nick Sattler
      - Sam Mehan
      - Molly Shallow
      - Mike and as always ty for letting me always go rogue
  - name: committee
    prefix: Committee
    members:
      - Matt Smear
      - Santiago Jaramillo
  - name: ld
    prefix: linked data
    members:
      - Gabriele Hayden
      - Joel Chan
      - Tomasz Pluskiewicz
      - James Meickle
      - Christine Lemmer-Webber
      - Arnold Schrijver
      - Aad Versteden
      - nwb & dandi teams
  - name: sts
    prefix: STS
    members:
      - Os Keyes
      - Avery Everhart
      - Eartha Mae Guthman
      - Olivia Guest
  - name: neuroscience
    prefix: Neuroscientists
    members:
      - Lauren E. Wool
      - Kris Chauvin
      - Phil Parker
      - Ceci Herbert
      - Chris Rogers
      - Petar Todorov
      - Jeremy Delahanty
      - Andrey Andreev
      - Ralph Emilio Peterson
      - Manuel Schottdorf
  - name: hardware
    prefix: Open Source Ppl
    members:
      - jakob voigts for participating in the glue wiki
      - Gonçalo Lopes
      - Mackenzie Mathis
      - Mark Laubach & Open Behavior Team
  - name: freeinternet
    prefix: Free Internet and Information Liberationists
    members:
      - Irene Knapp
      - Nire Bryce
      - Danny Mclanahan
      - Björn Brembs
  - name: general
    prefix: And all the other wisdom givers
      - Sanjay Srivastava & Metascience Class
      - The Emerging ONICE team
      - The Janet Smith House, especially Leslie Harka
      - Rumbly Tumbly Lawnmower
---

<div class="trimlink">
<a href="trims">Trimmings</a> <span>from the main document for future pieces</span>
</div>

{% include status.html %}
{% include annotation.html %}



{% include toc_start.html %}
1. table of contents
{:toc}
{% include toc_end.html %}


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


# Introduction

{% include_relative _sections/0_intro.md %}

# The State of Things

## The Costs of being Deinfrastructured

{% include_relative _sections/1_0_costs.md %}


## (Mis)incentives in Scientific Software

<div class="trimlink">
<a href="trims.html#systems-neuroscience-specifically">Systems Neuro</a> <span>specific problems for infrastructure</span>
</div>

{% include_relative _sections/1_1_state-general.md %}

## The Ivies, Institutes, and "The Rest of Us"

{% include_relative _sections/1_2_state-who.md %}

# A Draft of Decentralized Scientific Infrastructure

{% include_relative _sections/2_0_principles.md %}

## Shared Data

### Formats as Onramps

{% include_relative _sections/2_1_p2p.md %}

### Linked Data or Surveillance Capitalism?

{% include_relative _sections/2_2_ld-or-surveillance.md %}

### Federated Systems (of Language)

{% include_relative _sections/2_3_federation.md %}

## Shared Tools

{% include_relative _sections/2_4_tools-analysis.md %}


### Experimental Frameworks

{% include_relative _sections/2_5_tools-experiments.md %}

### Abstraction & Protocol Design

{% include_relative _sections/2_6_collectivize-sota.md %}

## Shared Knowledge

{% include_relative _sections/2_7_knowledge.md %}

### The Wiki Way 

{% include_relative _sections/2_8_wikis.md %}


### Rebuilding Scientific Communication

{% include_relative _sections/2_9_communication.md %}

### Credit Assignment

{% include_relative _sections/2_10_credit-assignment.md %}

# Conclusion

{% include_relative _sections/3_0_conclusion.md %}

## Tactics & Strategy

{% include_relative _sections/3_1_strategy.md %}

## Limitations 

{% include_relative _sections/3_2_limitations.md %}

## Contrasting Visions of Science

{% include_relative _sections/3_3_contrasting_visions.md %}

# References

{% include_relative _sections/bib.md %}

# Footnotes

{% include_relative _sections/x_footnotes.md %}


