When last we left it, our peer-to-peer system needed some way of linking data together. Instead of a big bucket of files as is traditional in torrents and domain-general databases, we need some way of exposing the metadata of disparate data formats so that we can query for and find the particular range of datasets appropriate to our question. !! For this section, I want to develop a notion of data linking that's a lot closer to natural language than an engineering specification. 

Each format has a different metadata structure with different names, and even within a single format we want to support researchers who extend and modify the core format. Additionally, each format has a different implementation, eg. as an hdf5 file, binary files in structured subdirectories, SQL-like databases. 

That's a lot of heterogeneity to manage, but fret not: there is hope. Researchers navigate this variability manually as a standard part of the job, and we can make that work cumulative by building tools that allow researchers to communally describe and negotiate over the structure of their data and the local relationships to other data structures. We can extend our peer-to-peer system to be a *federated database* system.

Federated systems consist of *distributed*, *heterogeneous*, and *autonomous* agents that implement some minimal agreed-upon standards for mutual communication and (co-)operation. Federated databases[^federatedterm] were proposed in the early 1980's {% cite heimbignerFederatedArchitectureInformation1985 %} and have been developed and refined in the decades since as an alternative to either centralization or non-integration {% cite litwinInteroperabilityMultipleAutonomous1990 kashyapSemanticSchematicSimilarities1996 hullManagingSemanticHeterogeneity1997 %}. Their application to the dispersion of scientific data in local filesystems is not new {% cite busseFederatedInformationSystems1999 djokic-petrovicPIBASFedSPARQLWebbased2017 hasnainBioFedFederatedQuery2017  %}, but their implementation is more challenging than imposing order with a centralized database or punting the question into the unknowable maw of machine learning. 

!! we also have to give up the golden idol of perfect computability, reasoning, and integrity in favor of transparency, autonomy. not just as a "it's hard in federated dbs" but also because we *shouldn't try* to do them because those projects are fundamentally coercive. !! the goal is to make something that *works* and *does the things that scientists want to do* instead of something *magic*. Those constraints are mostly from the needs of corporate DBs who don't need people to access and modify the database. We have different needs -- something to support our research instead creating a database for the sake of the database.

[^federatedterm]: though there are subtleties to the terminology, with related terms like "multidatabase," "data integration," and "data lake" composing subtle shades of a shared idea. I will use federated databases as a single term that encompasses these multiple ideas here, for the sake of constraining the scope of the paper.  

Amit Sheth and James Larson, in their reference description of federated database systems, describe the *design autonomy* as one critical dimension that characterizes them:

> Design autonomy refers to the ability of a component DBS to choose its own design with respect to any matter, including 
> 
> (a) The **data** being managed (i.e., the Universe of Discourse), 
>
> (b) The **representation** (data model, query language) and the **naming** of the data elements, 
>
> (c) The conceptualization or **semantic interpretation** of the data (which greatly contributes to the problem of semantic heterogeneity), 
>
> (d) **Constraints** (e.g., semantic integrity constraints and the serializability criteria) used to manage the data,
>
> (e) The **functionality** of the system (i.e., the operations supported by system),
>
> (f) The **association and sharing with other systems**, and
>
> (g) The **implementation** (e.g., record and file structures, concurrency control algorithms). 

Susanne Busse and colleagues add an additional dimension of **evolvability**: "Following "natural" tendencies, autonomous components will inevitably develop heterogeneous structures. It is the task of the federation layer to cope with the different types of heterogeneity." {% cite busseFederatedInformationSystems1999 %}. 

!! critically we also need *communication, association, and execution autonomy* to control the use of data.

The typical conceptualization of federated databases that follow typically have five layers {% cite shethFederatedDatabaseSystems1990 %}:

* A **local schema** is the representation of the data on local servers, including the means by which they are implemented in binary on the disk
* A **component schema** serves to translate the local schema to a format that is compatible with the larger, federated schema
* An **export schema** defines permissions, and what parts of the local database are made available to the federation of other servers
* The **federated schema** is the collection of export schemas, allowing a query to be broken apart and addressed to different export schemas. There can be multiple federated schemas to accomodate different combinations of export schemas.
* An **export schema** can further be used to make the federated schema better available to external users, but in this case since there is no notion of "external" it is less relevant.

This conceptualization provides a good starting framework and isolation of the different components of a database system, but a peer-to-peer database system has different constraints and opportunities {% cite bonifatiDistributedDatabasesPeertopeer2008 %}. 

---

!! drafting the sketch here so i can refine it later i am very tired!

Beneath this description is a tremendous amount of subtlety and contingency in implementation, but bear with me through a conceptual description.

Let us start with the ability for a peer to choose who they are associated with and what they share at multiple scales of organization: a peer can directly connect with another peer, but peers can also federate into groups, groups can federate into groups of groups, and so on. Within each of these grouping structures, the peer is given control over what data of theirs is shared. Clearly, we need some form of *identity* in the system, let's make it simple and flat and denote that in pseudocode as `@username` --- in reality, without any form of distributed uniqueness checking, we would need to have some notion of where this username is "from," so let's say we actually have a system like `username@name-provider` but for this example assume a single name provider, say ORCID.

!! now would be the time blockchain ppl are like "but wait! that's centralization! how can you trust ORCID??" Those kinds of systems are designed for zero-trust environments, but we don't need absolute zero trust in this system since we are assuming we're operating with visible entities in a system already bound to some degree by reputation.

Let us also assume that there is no difference between `@usernames` used by individual researchers, institutions, consortia, etc. 

The peer starts with their data in some discipline-specific format, which let us assume for the sake of concreteness has a representation as an [OWL](https://www.w3.org/OWL/) schema. 

That schema could be "owned" by the `@username` corresponding to the standard-writing group --- eg `@nwb` for neurodata without borders. In a [turtle-ish](https://www.w3.org/TR/turtle/) pseudocode, then, our dataset might look like this:

```
<#dataset-name>
	@nwb:general:experimenter @jonny
	@nwb:ElectricalSeries
	    .electrodes [1, 2, 3]
	    .rate 30000
	    .data [...]
```

Where I indicate that me, `@jonny` collected a dataset (indicated with `<#dataset-name>` to differentiate an application/instantiation of a schema from its definition) that consisted of an `@nwb:ElectricalSeries` and the relevant attributes (where a leading `.` is a shorthand for the parent schema element.)

I have some custom field for my data, though, which I extend the format specification to represent. Say I have invented some new kind of solar-powered electrophysiological device and want to annotate its specs alongside my data. 

```
<@jonny:SolarEphys < @nwb:NWBContainer>
	ManufactureDate
	InputWattageSeries < @nwb:ElectricalSeries
	    newprop
	    -removedprop
```
!! think of a better example lmao^^ and then annotate what's going on.

There are many strategies for making my ontology extension available to others in a federated network. We could use a distributed hash table, or [**DHT**](https://en.wikipedia.org/wiki/Distributed_hash_table), like bittorrent, which distributes references to information across a network of peers (eg. {% cite pirroDHTbasedSemanticOverlay2012 %}). We could use a strategy like the [**Matrix** messaging protocol](https://matrix.org/), where users belong to a single home server that federates with other servers. Each server is responsible for keeping a copy of the messages sent on the servers and rooms it's federated with. We could use [**ActivityPub** (AP)](https://www.w3.org/TR/2018/REC-activitypub-20180123/) {% cite Webber:18:A %}, a publisher-subscriber model where users affiliated with a server post messages to their 'outbox' and are sent to listening servers (or made available to HTTP GET requests). AP uses [JSON-LD](https://json-ld.org/) {% cite spornyJSONLDJSONbasedSerialization2020 %}, so is already capable of representing linked data, and the related ActivityStreams vocabulary {% cite snellActivityStreams2017 %} also has plenty of relevant [action types](https://www.w3.org/TR/activitystreams-vocabulary/#activity-types) for [creating](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-create), [discussing](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-question), and [negotiating](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tentativeaccept) over links (also see [cpub](https://github.com/openEngiadina/cpub)). We'll return to ActivityPub later, but for now the point is to let us assume we have a system for distributing schemas/extensions/links associated with an identity publicly or to a select group of peers.

!! Now ppl can query by my additional datatype alongside nwb datatypes

!! Now I want to make use of my colleagues data. In order to bridge them together and compare like terms, I could describe some link between them. Say I use some vocabulary someone has set up to describe different links, say we use [`@skos`](https://www.w3.org/2009/08/skos-reference/skos.html)

```
<@jonny:ElectricalSeries < @nwb:ElectricalSeries>
	@skos:closeMatch .frequency @chemistry:ReagentMonitor:fs
```

!! making this mapping lets me *use* their data, rather than being the drudgery of linking --- hold on till the next section. This is something that happens all the time in the normal course of reserach, but by integrating it into the system of our data's representation and giving me agency over it, I contribute to the rest of it.

!! ah but what of different data implementations? how do i actually *read* the data if it's in hdf and i'm used to SQL? well there's no reason that the implementation cant' itself be a schema that instructs us how to read the data (in turn allowing us to overwrite it and make our own mapping between eg. a video file held externally.) !! same thing with linking up with existing databases -- if they aren't p2p, just indicate that in the representational schema. !! to enable p2p with arbitrary data structures (we just have to add a step to hash the addressable pieces of data)

!! illustrate incentive to fix and link terminology to be discoverable as well as do your own work.

!! example of search between two schemas -- find me all the ways that these schemas have been related and let me pick them! Browse all the ways this schema has been extended. !! federated querying like SPARQL are complicated and involve breaking up the request and executing it, but let's also assume that's possible. !! separate the querying part which refers to content-addresses hashes and the p2p part

!! again being purposefully nonprescriptive in implementation here -- eg. you could have aggregators built on top that make queries speedier, and so on.

!! Now to search and download many other schemas -- query your federation -- again also could have trackerlike sites sitting on top to make indexing faster, or DHT system, implementation not important here. The point is we *want* lots of space to make different kinds of community overlays, interfaces, and tools. You do a query to find the unique IDs of the dataset that you want, then start the transfer. 

!! extend this beyond just pairwise interactions. I don't know what the physicists are up to, but the *chemists might.* so I could try traversing the graph and find out what links have been made to get there. If they don't exist, i can make my own.

!! long-range schema resolution is what's needed, that's shared knowledge section

!! what we're *not* trying to do is make an automated, web-crawlable system to serve corporate clients, but make something that is social, communal, evolving (and maybe eventually it will reach a point of coherency where that is possible, but it really isn't the goal -- we'd rather have some of the data and understand where it came from than access to all of the data with some of it potentially being junk and off-target but we just machine-learned through it anywaay). 

!! we don't *need* to appeal to a single unifying graph because we have many overlapping ones at multiple scales. Ya it's noisier, but that's the point -- it's about deducing graph structure from use rather than imposing it. If you don't like a particular structure, you're free to fork it (if they export their schemas) or make your own. If people want to use your data, they can write links from their format to yours, and vice versa. You *should* be able to determine which dialect your data is in in the same way you get to choose how you speak, and it doesn't necessarily need to be mutually compatible with others. If translations are possible, then great we should make them, but universality is not part of this system.

---

In the case of federated database systems, the federation layer provides a uniform  way to mediate differences in schemas and formats between individual databases in the system. To share data between subdisciplines and fields we need to be able to perform some *mapping* between the different data formats and standards that they use: we need some way of translating the neuroscientist's `GENOTYPE` to the geneticists `GENETIC_SEQUENCE`. 


!! I will be purposefully vague about the means of implementing these mappings until we reach the [shared knowledge](#shared-knowledge) section, but first we need a brief practical example of how a system like this might work.


Say I'm a neuroscientist who just collected a dataset that consists of a few electrophysiological recordings from a cluster of Consciousness Cells in some obscure midbrain nucleus, and then sectioned the brain and imaged their positions. I deposit my dataset on my local in-lab server, which I have set up to federate with the fancy new Neurophysiologist's Extravagant, Undying, Repository of Open data (NEUROd). All servers in this federation are required to have their data in the standardized NWB format, and since mine already is (go me!) my server announces to the others that we have some new data available! Some enterprising group of neuroscientific programmers has built a website that allows its users to search, browse, and do all the fancy visualization of data they would expect from a modern database, so I go and see how my new dataset has changed some standard aggregated analysis of all the Concscious Cells from all the other labs participating in the federation. Hang on, I say, a question mark appearing over my head like a cartoon caricature of a curious scientist -- I wonder if these Consciousness Cells are in the same place in the evolutionary neighbors of my model organism!? I then run a query for all datasets that have positional data for Consciousness Cells. NEUROd has chosen to federate with the Evolutionary Volitional data sharing Operation (EVO), a federation of evolutionary biologists, some of whom study the origins of Consciousness Cells. They have their data in their own evolutionary biologist-specific format, but since there is some mapping between fields in the NWB standard and theirs, that's no problem. My search then returns data from not only all the other neuroscientists in NEUROd, then, but also matching data from EVO --- and my cross-disciplinary question then becomes trivial to answer. 

(figure of federated databases here).

The federated database system extends the peer to peer systems discussed earlier and provides a direct means of solving the problems of database fragmentation by subdiscipline. Since the requirements for being a 'node' in the federation are minimal, individual, local servers work seamlessly with institutional servers and large, national servers to take advantage of all available storage and bandwidth of the participating servers ---  a promising way to solve the problems posed by the "big data" of contemporary science (eg. one articulation by {% cite charlesCommunityDrivenBigOpen2020 %}). While mappings between schemas are not magical and require work, they provide a single point of mediation between the data formats of different disciplines. Federation gets us the best of both worlds: the flexibility and domain-specific tools of subdisciplinary databases with the availability of domain-general databases. The radical autonomy of federated systems dramatically lowers the barriers to standardization: rather than requiring everyone to do *the same thing in the same way* and fundamentally change how they do things, researchers need to just build the bridges to connect their existing systems to the federated standard. These bridges can be created gradually. Since nodes in a federated system are free to choose whether they connect to others, there do not need to be mappings between *all* types of data in a federation, and there is no need for creating the oft-fabled *"one true standard"* for all data. Researchers that are interested in interfacing their data with others are strongly incentivized to write the mappings that permit it, and so they can emerge as they are demanded. Researchers are also given far more control over their own data than is afforded by traditional databases: it is entirely possible to have fine-grained permissions controls that allow researchers to share only the data they want to with the rest of the system while still taking advantage of, for example, locally federated servers that make their data available to other collaborating labs.

It's difficult to overstate how fundamentally a widely-adopted federated database system would be for all domains of science: when designing a behavioral experiment to study the circadian cycle, rather than relying on rules of thumbs or a handful of papers, one could directly query data about the sleep-wake cycles of animals recorded by field biologists in their natural habitats, cross reference that with geophysical measurements of daylight times and temperatures in those locations, and normalize the intensity of light you plan to give your animals by estimating tree-canopy coverage from LIDAR data from the geographers. One could make extraordinarily biophysically realistic models of neural networks by incorporating biophysical data about the properties of ion channels and cell membranes, tractography data from human DTI fMRI images, and then compare some dynamical measurement of your network against other dynamic systems models like power grids, telecommunications networks, swarming ants, and so on. Seemingly-intractable problems like the "file drawer" problem simply dissolve: null results are self-evident and don't *need* publication when researchers asking a question are able to see it themselves by analyzing all previous data gathered. Without exaggeration, they present the possibility of making *all* experiments multidisciplinary, making use of our collected human knowledge without disciplinary barriers. Indeed nearly all scientific literature [is already available on a federated database system](https://freeread.org/ipfs/) to anyone with an internet connection --- arguably the largest expansion of scientific knowledge accessibility ever.

The fundamental tradeoff between centralized and decentralized database systems is that of flexibility vs. coherence: centralized systems can simply enforce a single standard for data and assume that everything it works with will have it. Federated systems require some means of maintaining the mappings between schemas that allow their fluid translation. They also require some means of representing and negotiating data that is unanticipated by existing schemas. The fine details of implementing a federated database system are outside the scope of this paper, but we will return to a means of distributed maintenance of mappings between schemas by taking advantage of semantic web technologies in [shared knowledge](#shared-knowledge). Before we do though, we need to discuss the shared tools to analyze and generate the data for the system in this section.

!! federated systems let us bridge the gap between localized server technology like datajoint and mass server technology like databases. If you let people federate at a local scale to share data between an institute, a consortium, etc. and then let those things scale to federate together you have a plausible means by which slowly a generalized database system could be accumulated over time.

!! lots of times this has been proposed before {% cite simaEnablingSemanticQueries2019 djokic-petrovicPIBASFedSPARQLWebbased2017 hasnainBioFedFederatedQuery2017 %}



!! [DataLad](https://www.datalad.org/) {% cite halchenkoDataLadDistributedSystem2021 %} and its application in Neuroscience as [DANDI](https://dandiarchive.org) are two projects that are conceptually and practically much closer to the kinds of systems that I am describing here (a peer-to-peer backend for DataLad is, I think, a promising development path). !! brief explanation of datalad !! problem is that it slices the problem in a different place, and needs two extensions: federation for affiliating into larger networks, and federation for negotiating distributed queries across linked datasets

!! finally and perhaps most importantly we need to build the UI and communication tools to let us fluidly negotiate over the schema, including how to make multiple overlapping schemas associated eg. with a username. across several levels, eg. a format can have an export schema, and there can be canonical mappings between export schemas, which can the in turn be combined into higher-level common standards for combinations of formats, and so on. We want to be able to flexibly use these mappings without necessarily participating in the entire system, and we also want to make it possible for our local changes to be accessed by the larger system.


!! close this section by taking a larger view - {% cite langilleBioTorrentsFileSharing2010 %} DANDI is in on the p2p system, as is kachery-p2p!! p2p systems already plenty in use, academic torrents, biotorrents, libgen on IPFS !! the proof of their utility is in the pudding, arguably when i've been talkiung about 'centralized servers' what i'm actually talking about content delivery networks, which are effectively p2p systems -- they just own all the peers.

