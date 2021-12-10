---
layout: post
title:  "TODO"
subtitle: "a lot!"
author: "Jonny Saunders"
navigation: false
canonical_url: "https://jon-e.net/infrastructure/todo"
---

# Writing

- Integrate {% cite larsenPoliticalNatureTCP2012 %} in [design principles?](/infrastructure#design-principles)
- Write about DDoSecrets in [p2p benefits?](/infrastructure/#the-network-is-extremely-resilient-since-the-data-is-shared-acro)
- Write a triplet links description [here?](/infrastructure/#here-would-be-a-good-time-to-describe-triplet-links-as-the-basic)
- Resolve [Abstraction & Protocol Design](/infrastructure/#abstraction--protocol-design)

# Trims
- Trim down translator example/move out of main text.

# Organization
- Glossary for terms with hover for definition! Probably implement as yaml data for multiple render at end of document and in tooltips.


# UX
- 'Expand all' checkbox for TOC
- finish RDF browser?

```
{% include rdfa2.html 
id="protocols"
resource="protocols" 
typeof="skos:Concept" 
contents = "*protocols*" %}

{% include rdfa2.html resource="protocols" property="skos:example" contents="A simple and common example is email over SMTP (Simple Mail Transfer Protocol)" %}
```



{% bibliography --cited %}