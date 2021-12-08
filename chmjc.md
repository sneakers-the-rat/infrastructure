---
layout: slides
title: CMHJC
---

<section data-markdown>
## pharma, publishers, surveillance capitalism 
### (and u can come 2)

On the dangers of "personalized medicine" from Amazon/Elsevier

Jonny Saunders - 21-12-08

Corin Humphrey Memorial Journal Club
</section>
<section data-markdown>
# Overview

- Elsevier: Surveillance Publisher
- NIH Biomedical Data Translator: Automating Medicine?
- Full-stack "Personalized Medicine"
</section>

<section data-markdown>
## What is an Elsevier/RELX?
- STM: Journals, biomedical products, databases..
- Risk: Risk assessments for insurance companies, etc. Lexisnexis et al.
- Legal: Law information resources!
- Exhibitions: Conferences et al.

![](elsevier-divisions.png)

</section>

<section data-markdown>
## Business Model
- Suck up personal data
- repackage into products

![](personaldata.png)

</section>

<section data-markdown>
## Selling Science to Itself

> Elsevier expanded its leadership position in research institution benchmarking analytics through further investment in its SciVal Topic Prominence in Science. Big data technology takes into consideration nearly all of the articles available in Scopus since 1996 and clusters them into nearly 96,000 global, unique research topics based on citations patterns.

- 2019 Shareholders Report
</section>

<section data-markdown>
## For Clinicians...

> Elsevier’s flagship clinical reference platform, ClinicalKey, provides physicians, nurses and pharmacists with access to leading Elsevier and third-party reference and evidence-based medical content […] Elsevier has developed a **Healthcare Knowledge Graph,** which utilises ML and Natural Language Processing (NLP) to knit together its collection of the world’s foremost clinical knowledge. The Healthcare Knowledge Graph enhances ClincialKey, the portal into Elsevier’s vast medical content library by **providing more timely clinical results for users.**

</section>

<section data-markdown data-background-color="white">
### What a Knowledge Graph?

![](kg.png)
</section>

<section data-markdown>
## Biomedical Data Translator
- [2018 NIH Strategic Plan for Data Science](https://web.archive.org/web/20210907014444/https://datascience.nih.gov/sites/default/files/NIH_Strategic_Plan_for_Data_Science_Final_508.pdf)
- [About Translator](https://ncats.nih.gov/translator/about)
- [SmartAPI](https://smart-api.info/portal/translator/metakg) - link together a bunch of APIs built on [Biolink Model](https://github.com/biolink/biolink-model)
- Ranking: [ROBOKOP](https://covar.com/case-study/robokop/)

"Find me drugs that might treat x disease using multimodal data from genetics, pharmacology, patient data, ..."
</section>

<section data-markdown>
### Garbage in, garbage out

- [MyDisease.info: DOID:10919 - "Transsexualism"](http://mydisease.info/v1/query?q=%22DOID%3A10919%22)
- [Ontobee: DOID:1234](http://www.ontobee.org/ontology/DOID?iri=http://purl.obolibrary.org/obo/DOID_1234)
- Source: [mental-functioning-ontology](https://github.com/jannahastings/mental-functioning-ontology/blob/8428cdf4d6de09c09ac2791e0034eed844fdadc3/ontology/external/doid-slim.owl#L2118-L2133)

A *single repository* maintained by a *single person* encodes transness as a disease in the NIH-Official Knowledge Graph
</section>

<section data-markdown>
### Industry Capture
Amazon...
- [Health technology/biosensors/wearables](https://aws.amazon.com/blogs/publicsector/aws-announces-healthcare-accelerator-program-startups-public-sector/)
- Literal [health insurance](https://amazon.care/)
- NIH Cloud Services - [STRIDES](https://cloud.nih.gov/)

Elsevier...
- Mass-surveillance of entire scientific workflow (and credit card transactions and much more)
- Data sharing agreements with LEOs, ICE, et al.
- Algorithmic ranking of researchers, institutes and topics (see example from Korea)
- Point of service clinical tools
</section>

<section data-markdown>
### Full Circle "personalized medicine"
- Scoop up medical records, personal wearable data, biomedical knowledge...
- Sell tools for pharmaceutical research and clinical care
- Algorithm made by defense contractors learns from doctors, pharma companies...
- Encoding anti-trans practices into clinical standard of care
- Steer the course of future research with ranking tools.
</section>

