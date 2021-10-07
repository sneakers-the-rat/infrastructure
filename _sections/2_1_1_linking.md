There is no shortage of databases for scientific data, but their traditional structure chokes on the complexity of representing multi-domain data. Typical relational databases require some formal schema to structure the data they contain, which have varying reflections in the APIs used to access them and interfaces built atop them. This broadly polarizes database design into domain-specific and domain-general[^trackeranalogy]. This design pattern results in a fragmented landscape of databases with limited interoperability. In a moment we'll consider *federated systems* as a way to resolve this dichotomy and continue developing the design of our p2p data infrastructure, but for now we need a better sense of the problem.

[^trackeranalogy]: To continue the analogy to bittorrent trackers, an example domain-specific vs. domain-general dichotomy might be What.cd (with its specific formatting and aggregation tools for representing artists, albums, collections, genres, and so on) vs. ThePirateBay (with its general categories of content and otherwise search-based aggregation interface)

Domain-specific databases require data to be in one or a few specific formats, and usually provide richer tools for manipulating and querying by metadata, visualization, summarization, aggregation that are purpose-built for that type of data. For example, NIH's [Gene](https://www.ncbi.nlm.nih.gov/gene/12550) tool has several visualization tools and cross-referencing tools for finding expression pathways, genetic interactions, and related sequences (Figure xx). This pattern of database design is reflected at several different scales, through institutional databases and tools like the Allen [brain atlases](https://connectivity.brain-map.org/) or [observatory](http://observatory.brain-map.org/visualcoding/), to lab- and project-specific dashboards. This type of database is natural, expressive, and powerful --- for the researchers to whom the database as designed is useful. While some of these databases allow open data submission, they often require explicit moderation and approval to maintain the guaranteed consistency of the database, which can hamper mass use.

![An example specialized plot of genomic regions, transcripts and products for the CDH1 gene (linked above), showing how specific tools have been built for this specific dataset](/infrastructure/assets/images/nih_gene_cdh1.png)
*NIH's Gene tool included many specific tools for visualizing, cross-referencing, and aggregating genetic data. Shown is the "genomic regions, transcripts, and product" plot for Mouse Cdh1, which gives useful, common summary descriptions of the gene, but is not useful for, say, visualizing reading proficiency data.*

General-purpose databases like [figshare](https://figshare.com/) and [zenodo](https://zenodo.org/)[^yrcool] are useful for the mass aggregation of data, typically allowing uploads from most people with minimal barriers. Their general function limits the metadata, visualization, and other tools that are offered by domain-specific databases, however, and are essentially public, versioned, folders with a DOI. Most have fields for authorship, research groups, related publications, and a single-dimension keyword or tags system, and so don't programmatically reflect the metadata present in a given dataset.

[^yrcool]: No shade to Figshare, which, among others, paved the way for open data and are a massively useful thing to have in society. 

The dichotomy of fragmented, subdomain-specific databases and general-purpose databases makes combining information from across even extremely similar subdisciplines combinatorically complex and laborious. In the absence of a formal interoperability and indexing protocol between databases, even *finding* the correct subdomain-specific database can be an act of raw experience or the raw luck of stumbling across just the right blog post list of databases. It also puts researchers who want to be good data stewards in a difficult position: they can hunt down the appropriate subdomain specific database and risk general obscurity; use a domain-general database and make their work more difficult for themselves and their peers to use; or spend all the time it takes to upload to multiple databases with potentially conflicting demands on format. 

What can be done? There are a few parsimonious answers from standardizing different parts of the process: If we had a universal data format, then interoperability becomes trivial. Conversely, we could make a single ur-database that supports all possible formats and tools. 

Universalizing a single part of a database system is unlikely to work because organizing knowledge is intrinsically political. Every system of representation is necessarily rooted in its context: one person's metadata is another person's data. Every subdiscipline has conflicting *representational* needs, will develop different local terminology, allocate differing granularity and develop different groupings and hierarchies for the same phenomena. At mildest, differences in representational systems can be incompatible, but at their worst they can reflect and reinforce prejudices and become tools of intellectual and social power struggles. Every subdiscipline has conflicting *practical* needs, with infinite variation in privacy demands, different priorities between storage space, bandwidth, and computational power, and so on. In all cases the boundaries of our myopia are impossible to gauge: we might think we have arrived at a suitable schema for biology, chemistry, and physics... but what about the historians?

Matthew J Bietz and Charlotte P Lee articulate this tension better than I can in their ethnography of metagenomics databases:

> "Participants describe the individual sequence database systems as if they were shadows, poor representations of a widely-agreed-upon ideal. We find, however, that by looking across the landscape of databases, a different picture emerges. Instead, **each decision about the implementation of a particular database system plants a stake for a community boundary. The databases are not so much imperfect copies of an ideal as they are arguments about what the ideal Database should be.** [...]
>
> When the microbial ecology project adopted the database system from the traditional genomic “gene finders,” they expected the database to be a boundary object. They knew they would have to customize it to some extent, but thought it would be able to “travel across borders and maintain some sort of constant identity”. In the end, however, **the system was so tailored to a specific set of research questions that the collection of data, the set of tools, and even the social organization of the project had to be significantly changed.** New analysis tools were developed and old tools were discarded. Not only was the database ported to a different technology, the data itself was significantly restructured to fit the new tools and approaches. While the database development projects had begun by working together, in the end they were unable to collaborate. **The system that was supposed to tie these groups together could not be shielded from the controversies that formed the boundaries between the communities of practice.**" {% cite bietzCollaborationMetagenomicsSequence2009 %}

As one ascends the scales of formalizing to the heights of the ontology designers, the ideological nature of the project is like a klaxon (emphasis in original):

> An exception is the Open Biomedical Ontologies (OBO) Foundry initiative, which accepts under its label only those ontologies that adhere to the principles of ontological realism. Where the prevailing, i.e. computer science, view of ontology is focused on the logical consistency and inferential implications of ontologies as sets of assertions, the view of the OBO Foundry is that the quality of an ontology is also - indeed primarily - determined by the accuracy with which it represents the preexisting structure of reality. Ontologies, from this perspective, are representational artifacts, comprising a taxonomy as their central backbone, whose representational units are intended to designate *universals* (such as *human being* and *patient role*) or *classes defined in terms of universals* (such as *patient,* a class encompassing *human beings* in which there inheres a *patient role*) and certain relations between them.
>
> [...]
>
> BFO is a realist ontology [15,16]. This means, most importantly, that representations faithful to BFO can acknowledge only those entities which exist in (for example, biological) reality; thus they must reject all those types of putative negative entities - lacks, absences, non-existents, possibilia, and the like - which are sometimes postulated as artifacts of specific terminologies or of associated logical or computational frameworks {% cite ceustersFoundationsRealistOntology2010 %}

Another formulation that allows us to keep most of our existing server infrastructure unchanged and charge headlong down the gingerbread lane into the loving arms of AWS is linking existing databases. The problem of linking databases is an old one with much well-trodden ground, and in the current regime of large server farms tend to find themselves somewhere close to metadata-indexing overlays. These overlays provide some additional tool that can translate and combine data between databases without needing to change the databases themselves. The NIH articulates this as a "Biomedical Data Translator" in its Strategic plan for Data Science:

> Through its Biomedical Data Translator program, the National Center for Advancing Translational Sciences (NCATS) is supporting research to develop ways to connect conventionally separated data types to one another to make them more useful for researchers and the public. The Translator aims to bring data types together in ways that will integrate multiple types of existing data sourcess, including objective signs and symptoms of disease, drug effects, and other types of biological data relevant to understanding the development of disease and how it progresses in patients. {% cite NIHStrategicPlan2018 %} 

And NCATS elaborates it a bit more on the project ["about"](https://ncats.nih.gov/translator/about) page (emphasis mine):

> As a result of recent scientific advances, a tremendous amount of data is available from biomedical research and clinical interactions with patients, health records, clinical trials and adverse event reports that could be useful for understanding health and disease and for developing and identifying treatments for diseases. **Ideally, these data would be mined** collectively to provide insights into the relationship between molecular and cellular processes (the targets of rational drug design) and the signs and symptoms of diseases. Currently, these very rich yet different data sources are housed in various locations, often in forms that are not compatible or interoperable with each other.  - https://ncats.nih.gov/translator/about

The Translator is being developed by 28 institutions and nearly 200 team members as of 2019. They credit their group structure and flexible Other Transaction Award (OTA) funding mechanism for their successes {% cite consortiumBiomedicalDataTranslator2019 %}. OTA awards give the granting agency broad flexibility in to whom and for what money can be given, and consist of an initial competetive segment with possibility for indefinite noncompetitive extensions at the discretion of the agency {% cite fleisherOtherTransactionAward2019 %}. It's relatively difficult to figure out exactly what it is that has been built, as the [projects page](https://web.archive.org/web/20210710012427/https://ncats.nih.gov/translator/projects) doesn't link to anything, but some parts of the project are visible through a bit of searching. They describe a registry of APIs for existing databases collected on their platform [SmartAPI](https://smart-api.info/portal/translator) that are to be combined into a semantic knowledge graph {% cite consortiumUniversalBiomedicalData2019 %}. There are many kinds of knowledge graphs, and we will return to them and other semantic web technologies in [shared knowledge](#shared-knowledge), but the Translator's knowledge graph explicitly sits "on top" of the existing databases as the only source of knowledge. Specifically, the graph structure consists of the nodes and edges of the [biolink model](https://github.com/biolink/biolink-model) {% cite bruskiewichBiolinkBiolinkmodel2021 %}, and an edge is matched to a corresponding API that provides data for both elements. 

They articulate a very similar set of beliefs about the impossibility of a unified dataset or ontology[^impossibledata]{% cite consortiumUniversalBiomedicalData2019 %}, although arguably create one in [biolink](https://biolink.github.io/biolink-model/docs/), and then arrive at the conclusion that the answer is Machine Learning. This form of a database linking system effectively kicks the can of the impossibility of a single ontology of everything up a level to an ontology of ontologies of everything, and then proposes to use black-box machine learning models to bring them back down to usability. The final form of the translator is still unclear, but between [SmartAPI](https://smart-api.info/portal/translator), a seemingly-preliminary description of the reasoning engine {% cite goelExplanationContainerCaseBased2021 %}, and descriptions from contractors {% cite ROBOKOPCoVar2021 %}, the model of the Translator could actually be quite dangerous.

The Translator builds on top of a large number of databases and database aggregators, and so for any given query of "genes implicated in x disease," since the translator is designed to be a knowledge generation system, it needs to rank the and aggregate the results. As with any machine-learning based system, if the input data is biased or otherwise (inevitably) problematic then the algorithm can only reflect that. Taking a very narrow sample of APIs that return data about diseases, I queried [mydisease.info](https://mydisease.info) to see if it still had the outmoded definition of "transsexualism" as a disease {% cite ramTransphobiaEncodedExamination2021 %}. Perhaps unsurprisingly, it did, and was more than happy to give me a list of genes and variants that supposedly "cause" it - [see for yourself](http://mydisease.info/v1/query?q=%22DOID%3A10919%22).

An abbreviated sample for the sake of illustration: 

{% highlight json %}
{
    "disease_ontology":
    {
        "ancestors":
        [
            "DOID:1234",
            "DOID:150",
            "DOID:4"
        ],
        "def": "\"A gender identity disorder that is characterized by an individual's identification with a gender inconsistent or not culturally associated with their biological sex.\" [url:http\\://en.wikipedia.org/wiki/Transsexualism]",
        "doid": "DOID:10919",
        "name": "transsexualism",
        "parents":["DOID:1234"],
        "xrefs":
        {
            "icd9": "302.50",
            "snomedct_us_2020_09_01": "191782007",
            "umls_cui": "C0040630"
        }
    },
    "disgenet":
    {
        "genes_related_to_disease":
        [
            {
                "DPI": 0.846,
                "DSI": 0.35100000000000003,
                "EI": 1,
                "YearFinal": 2017,
                "YearInitial": 2017,
                "gene_id": 367,
                "gene_name": "AR",
                "pubmed":
                [
                    28539237
                ],
                "score": 0.01,
                "source": "BEFREE"
            }
        ]
    }
}
{% endhighlight %}

This example shows the fragility just underneath the surface of centralized knowledge graphs built by aggregating opaquely sourced data. If one follows the provenance of the entry for "gender identity disorder" (renamed in DSM-V), one reaches first the disease ontology [DOID:1234](https://web.archive.org/web/20211007053446/https://www.ebi.ac.uk/ols/ontologies/doid/terms?iri=http%3A%2F%2Fpurl.obolibrary.org%2Fobo%2FDOID_1234) which seems to trace back into an entry in a graph aggregator [Ontobee](http://www.ontobee.org/ontology/DOID?iri=http://purl.obolibrary.org/obo/DOID_1234) ([Archive Link](https://web.archive.org/web/20210923110103/http://www.ontobee.org/ontology/DOID?iri=http://purl.obolibrary.org/obo/DOID_1234)), which in turn lists this [github repository](https://github.com/jannahastings/mental-functioning-ontology) **maintained by a single person** as its source[^ipredit].

[^ipredit]: I submitted a [pull request](https://github.com/jannahastings/mental-functioning-ontology/pull/8) to remove it. A teardrop in the ocean. 

To rank particular answers, the algorithm measures the structural similarity between candidates by looking several nodes outward in the knowledge graph from it to compare them to the question at hand {% cite goelExplanationContainerCaseBased2021 %} -- eg. to compare two candidate drugs, if one of them shares targeted proteins and used with similar diseases, it is a more likely match than one that doesn't. Since, in the available materials, it is unclear how this ranking algorithm works, but is likely to remain proprietary due to its development by a for-profit company (CoVar, who no-joke call the ranking algorithm ROBOKOP), harmful input data could have unpredictable long-range consequences on the practice of medicine as well as the course of medical research. 

If at its core the algorithm believes that being transgender is a disease, won't it orient its care of related phenomena around trying to cure it? Even if it doesn't, won't it influence the surrounding network of entities with its links to genes, prior treatment, and so on in unpredictable ways? Combined with the online training that is then shared by other users of the translator {% cite consortiumUniversalBiomedicalData2019 %}, socially problematic treatment and research practices could be built into our data infrastructure without any way of knowing their effect. In the long-run, an effort towards transparency could have precisely the opposite effect by being run through a series of black boxes.

A larger problem is reflected in the scope and evolving direction of the Translator when combined with the preceding discussion of putting all data in the hands of cloud platform holders. There is mission creep from the original NIH initiative language that essentially amounts to a way to connect different data sources --- what could have been as simple as a translation table between different data standards and formats. The original [funding statement from 2016](https://web.archive.org/web/20210709100523/https://ncats.nih.gov/news/releases/2016/feasibility-assessment-translator) is similarly humble, and press releases [through 2017](https://web.archive.org/web/20210709171335/https://ncats.nih.gov/pubs/features/translator) also speak mostly in terms of querying the data -- though some ambition begins to creep in. 

That is remarkably different than what is articulated in 2019 {% cite consortiumUniversalBiomedicalData2019 %} to be much more focused on *inference* and *reasoning* from the graph structure of the linked data for the purpose of *automating drug discovery.* It seems like the original goal of making a translator in the sense of "translating data between formats" has morphed into "translating data to language," with ambitions of providing a means of making algorithmic predictions for drug discovery and clinical practice rather than linking data {% cite hailuNIHfundedProjectAims2019 %} (all this despite the litany of research about the diverse set of ethical challenges tools like these pose, eg. {% cite groteEthicsAlgorithmicDecisionmaking2020 obermeyerDissectingRacialBias2019 panchArtificialIntelligenceAlgorithmic2019 panchInconvenientTruthAI2019 %})

Oddly, based on the only technical description I can find of the algorithm in September 2021, the linking part seems to be awkward and the results seem dubious (emphases mine):

> The strategy used by the Translator consortium in this case is to 1) identify phenotypes that are associated with [Drug-Induced Liver Injury] DILI, then 2) find genes which are correlated with these presumably pathological phenotypes, and then 3) identify drugs which target those genes’ products. The rationale is that drugs which target gene products associated with phenotypes of DILI may possibly serve as candidates for treatment options.
>
> **We constructed a series of three queries,** written in the Translator API standard language and submitted to xARA to select appropriate KPs to collect responses (Figure 4). **From each response, an exemplary result is selected and used in the query for the next step.** 
>
> The results of the first query produced several phenotypes, one of them was ”Red blood cell count” (EFO0004305). When using this phenotype in the second step to query for genes, we identified one of the results as the telomerase reverse transcriptase (TERT) gene. This was then used in the third query (Figure 4) to identify targeting drugs, which included the drug Zidovudine.
>
> xARA use this result to call for an explanation. The xcase retrieved uses a relationship extraction algorithm [6] fine-tuned using BioBert [7]. The explanation solution seeks previously pre-processed publications where both biomedical entities (or one of its synonyms) is found in the same article within a distance shorter than 10 sentences. The excerpt of entailing both terms is then used as input to the relationship extraction method. When implementing this solution for the gene TERT (NCBIGene:7015) and the chemical substance Zidovudine (CHEBI:10110), the solution was able to identify corroborating evidence of this drug-target interaction with the relationship types being one of: ”DOWNREGULATOR,” ”INHIBITOR,” or ”INDIRECT DOWNREGULATOR” with respect to TERT. {% cite goelExplanationContainerCaseBased2021 %}

As a recap, since I'm not including the screenshots of the queries, the researchers searched first for a phenotypic feature of DILI, then selected "one of them" --- red blood cell count --- to search for genes that affect the phenotype, and eventually find a drug that effects that gene: all seemingly manually (an additional $1.4 million has been allocated to unify them {% cite haendelCommonDialectInfrastructure2021 %}). Zidovudine, as a nucleoside reverse transcriptase inhibitor, does inhibit telomerase reverse transcriptase {% cite hukezalieVitroExVivo2012 %}, but can also cause anemia and lower red blood cell counts {% cite ZidovudinePatientNIH %} -- so through the extended reasoning chain the system has made a sign flip and recommended a drug that will likely make the identified phenotype (low red blood cell count) worse? 

Contrast this with the space-age and chromed-out description from CoVar: 

> ROBOKOP technology scours vast, diverse databases to find answers that standard search technologies could never provide. It does much more than simple web-scraping. It considers inter-relationships between entities, such as colds cause coughs. Then it searches for new connections between bits of knowledge it finds in a wide range of data sources and generates answers in terms of these causal relationships, on-the-fly.
>
> Instead of providing a simple list of responses, ROBOKOP ranks answers based on various criteria, including the amount of supporting evidence for a claim, how many published papers reference a given fact, and the specificity of any particular relationship to the question.

For-profit platform holders are not incentivized to do responsible science, or even really make something that works, provided they can get access to some of the government funding that pours out for projects that are eventually canned - [$75.5 million](https://reporter.nih.gov/search/kDJ97zGUFEaIBIltUmyd_Q/projects?sort_field=FiscalYear&sort_order=desc) so far since 2016 for the Translator {% cite RePORTRePORTERBiomedical2021 %}. As exemplified by the trial and discontinuation of the NIH Data Commons after [$84.7 million](https://reporter.nih.gov/search/H4LxgMGK9kGw6SeWCom85Q/projects?shared=true), centralized infrastructure projects often an opportunity to "dance until the music stops." Again, it is relatively difficult to see from the outside what work is going on and how it all fits together, but judging from RePORTER there seem to be a [profusion](https://reporter.nih.gov/project-details/10332268) of [projects](https://reporter.nih.gov/project-details/10333468) and [components](https://reporter.nih.gov/project-details/10333460) of the [system](https://reporter.nih.gov/project-details/10330627) with unclear functional overlap, and the model seems to have developed into allocating funding to develop each separate knowledge source.

The risk with this project is very real because of the context of its development. After 5 years, it still seems like the the Translator is relatively far from realizing the vision of biopolitical control through algorithmic predictions, but combined with Amazon's aggressive expansion into health technology {% cite AWSAnnouncesAWS2021 %} and even literally providing [health care](https://amazon.care/) {% cite lermanAmazonBuiltIts2021 %}, and the uploading of all scientific and medical data onto AWS with entirely unenforceable promises of data privacy --- the notion of spending public money to develop a system for aggregating patient data with scientific and clinical data becomes dangerous. It doesn't require takeover by Amazon to become dangerous --- once you introduce the need for data to train an algorithm, you need to feed it data, and so the translator gains the incentive to suck up as much personal and other data as it can.

Even assuming the Translator works perfectly and has zero unanticipated consequences, the development strategy still reflects the inequities that pervade science rather than challenge them. Biopharmaceutical research, followed by broader biomedical research, being immediately and extremely profitable, attracts an enormous quantity of resources and develops state of the art infrastructure, while no similar infrastructure is built for the rest of science, academia, and society. 

---

I think it is important to pause and appreciate the potential for harm in the data infrastructural system describes so far, continuing to use structural transphobia as one example among many possible harms. First, a brief recap:

Through STRIDES, cloud providers like AWS, Google Cloud, and Microsoft Azure are intended to become the primary custodians of scientific data. Regardless of contracts and assurances, since their system is opaque and proprietary, there is no way to ensure that they will not crawl this data and use it to train their various algorithms-as-a-service --- and they seem all too happy to do so, as evidenced by GitHub Co-Pilot reproducing copyrighted code and code with licenses that explicitly forbade its use in that context. Given that Amazon is expanding aggressively into health technology{% cite AWSAnnouncesAWS2021 %}, including wearables and literally providing [health care](https://amazon.care/) {% cite lermanAmazonBuiltIts2021 %}, primary scientific data is a valuable prize in their mission to cement dominance in algorithmic health. 

The effort to unify data across the landscape of databases, patient data, and so on is built atop a rickety pile of SaaS so fragile that a single person with a single repository can have ripple effects across the aggregators that impact the whole knowledge graph. In the above example, an outdated set of terminology classifies a subset of human gender as a disease, which then is linked to candidate genes and other nodes in the knowledge graph. Since there is a preponderance of misguided research about about the etiology and "biological mechanisms" of transgender people, the graph neighboorhood around transness is rich with biomarkers and functional data. 

All of the above is known to be true now, but let's see how it could play out practically in an all-too-plausible thought experiment.

Though the translator system now is intended for basic research and drug discovery, there is stated desire for it to eventually become a consumer/clinical product {% cite hailuNIHfundedProjectAims2019 %}. Say a cloud provider rolls out a service for clinical recommendations for doctors informed by the full range of scientific, clinical, wearable, and other personal data they have available --- a trivial extension of [existing](https://web.archive.org/web/20211003070018/https://support.apple.com/en-us/HT208680) patient medical aggregation and [recommendation](https://web.archive.org/web/20210408221213/https://support.google.com/fit/answer/7619539?hl=en&co=GENIE.Platform%3DAndroid) services that [express](https://web.archive.org/web/20210930203834/https://press.aboutamazon.com/news-releases/news-release-details/amazon-adds-more-halo-introducing-halo-view-halo-fitness-and) their biopolitical control as a slick wristband with app. It's very "smart" and is very "private" in the sense that only the algorithm ever sees your personal data. 

Since these cloud providers as a rule depend on developing elaborate personal profiles for targeted advertising algorithmically inferred from available data[^googlepatent], that naturally includes diagnosed or inferred disease --- a practice they explicitly describe in the patents for the targeting technology{% cite bharatGeneratingUserInformation2005 %}, gone to court to defend {% cite SmithFacebookInc2018 %}, formed secretive joint projects with healthcare systems to pursue {% cite bourreauGoogleFitbitWill2020 %}, and so on. 

[^googlepatent]: A patent from Google is telling about how they view privacy concerns: whatever we can't get explicitly, we'll infer to sell better ads!
> One possible method to improve ad targeting is for ad targeting systems to obtain and use user profiles. For example, user profiles may be determined using information voluntarily given by users (e.g., when they subscribe to a service). This user attribute information may then be matched against advertiser specified attributes of the ad (e.g., targeting criteria). Unfortunately, user profile information is not always available since many Websites (e.g., search engines) do not require subscription or user registration. Moreover, even when available, the user profile may be incomplete (e.g., because the information given at the time of subscription may be limited to what is needed for the service and hence not comprehensive, because of privacy considerations, etc.). Furthermore, advertisers may need to manually define user profile targeting information. In addition, even if user profile information is available, advertisers may not be able to use this information to target ads effectively. {% cite bharatGeneratingUserInformation2005 %}



!* (true) A single person maintains a single repository that defines being "transsexual" as a disease.
!* (true) A single knowledge graph aggregator indexes that repository
! * (true) A broad array of meta-indexers and aggregators index that repository and include it in meta knowledge graphs
! * (true) AWS is the official data and analytic host of all NIH-funded scientific, including biomedical research
! * (true) Amazon crawls your personal data to make inferences on a personal profile
! * (true) An large amount of misguided research is done to study the "biological mechanisms" of transgender people: fMRI scans, endocrinology, facial features, etc.
! * (in progress) NIH funds tool to combine commercial knowledgebases, primary research data, and personal health data
* (true) Tool is graph-based query. Ask a question: "What [drug] reduces inflammation?" To rank answers, the algorithm measures the structural similarity between candidates by looking several nodes outward in the knowledge graph {% cite goelExplanationContainerCaseBased2021 %} -- eg. when comparing two candidate drugs, if one of them has an "upregulates" link with a protein that is also connected with inflammation, it is a more likely match than one that doesn't. Connections extend arbitrary distances because the algorithm is proprietary

Follow me a few steps further on a thought experiment, though at each point I want to emphasize that what I am describing is not a *possible* decision but the kind of decision that is *always* made.

* (of course they will) Based on machine learning algorithms trained on the world's basic research and wearable data, combined with your shopping, browsing, and other data, **Amazon diagnoses you as trans,** doesn't tell you, (available by searching a raw GDPR dump tho)
* (consequence of algorithm design) Being trans is a disease, knowledge graph has no means of parsing the cultural or technological context of the disease object in the database, so drug and treatment recommendations recalibrate to eliminate the disease
* (in progress) Tool is currently for primary research only, but is designed as a clinical use tool and built in collaboration with clinical technology companies. Doctor prescribes algorithmically recommended medicines, trusting its "robust provenance assurance" to always explain the reason for the recommendation in plain english.
* (true) Algorithm is only able to explain its decisionmaking process with the elegance of BERT neural-net language model {% cite goelExplanationContainerCaseBased2021 %}
* (consequence of algorithm design) You are, at best, prevented from receiving medical care, and at worst, prescribed medicine to "reduce" their transness. 
* (consequence of algorithm design) Patient has no way of knowing. Doctor has no way of knowing. Amazon has plausible deniability if they have any way of knowing. Engineers lauded for their work because no one has any way of knowing that a single person with digitally encoded transphobia in a single github repository has, maybe entirely by accident, and entirely automatically, committed mass eugenics.
* (???) The algorithm had a 60% certainty you were trans, so who knows? The prescribed drugs were given an algorithmic efficacy rating of "15.78" but the scale is uninterpretable, so who knows what they do? The algorithm is designed to learn from its mistakes {% cite goelExplanationContainerCaseBased2021 %}, so just consider yourself training data.
* (stated design goal) The algorithm is used to steer automated, high-throughput drug screening and development. and so it went.
* (true) trans people are fucking smart, and talk, and figure out that they shouldn't participate in any research and self-seclude from society. 
* (???) society at large sees science as it will be, another branch of amazon, and has no reason to participate in it as its study subjects, or believe it as true at all.

!! Where is this story wrong?

---

I have no doubt that everyone working on the Translator is doing so for good reasons, and they have done useful work. Forming a consortium and settling on a development model is hard work and this group should be applauded for that. Unifying APIs with Smart-API, drafting an ontology, and making a knowledge graph, are all directly useful to reducing barriers to desiloing data and shared in the vision articulated here. So where does the translator lose its way?



Navigating a relationship with existing technology in new development is tricky, but there is a distinction between integrating with it and embodying its implications. It is true that 

- constrained by existing infra, so intrinsicly embraces it. presumption of cloud, resting on benevolence of APIs
- doesn't cover (and doesn't purport to cover) all data
- lack of transparent control over data sharing
- centralized governance: 
- focus on communal interaction with code only
- integration into the daily practice of science
- ultimately the question is what is the *goal* -- do we want to do some diderot-like encyclopedia, or do we want to make something useful?



!! example of how everyone locally thinks they are doing good, the technologies are good, but in the broader context of how the infrastructure is developed and deployed can become very dangerous

Overlay-like systems like this can replicate the design problems they aim to solve: because the format of the different existing databases are mutually incompatible and changing them would be cumbersome becauase they are so rigid, we need to link them. If the linking is then cumbersome, rigid, and centralized, then one might expect the cycle to repeat indefinitely.

we can't hope to rely on small dedicated groups of people to be able to provide linkings between all forms of all data, nor can we turn to the dark magic of machine learning and hope it fixes everything. 

Let's return to the scheduled programming.