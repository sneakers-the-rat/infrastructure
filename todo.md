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
- Resolve [Abstraction & Protocol Design](/infrastructure/#abstraction--interfaces)
- Summaries at the end of every section that needs them - [full system](/infrastructure/#what-we’ve-described-is-a-nonutopian-fully-realizable-path-to-ma)

## Introduction

- Redo introductory paragraph, too jokey and also doesn't really give a clear explanation of what we're talking about
- Introduce the notion that we're also talking about the journal system early.

# Editing
- Redundancy in [federated systems](/infrastructure#federated-systems-of-language)

# Trims
- Trim down translator example/move out of main text.

# Organization
- Glossary for terms with hover for definition! Probably implement as yaml data for multiple render at end of document and in tooltips.

# Updates Pre-Release

Things to update just before releasing a public version

- [/infrastructure#the-articulated-plan-being-to-pay-platform-holders-to-house-data] - cost of STRIDES



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