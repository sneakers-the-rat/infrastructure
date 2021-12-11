When last we left it, our peer-to-peer system needed some way of linking data together. Instead of a big bucket of files as is traditional in torrents and domain-general databases, we need some way of exposing the metadata of disparate data formats so that we can query for and find the particular range of datasets appropriate to our question. We'll be playing in the world of linked data and the semantic web, but thinking about using those tools for a fluid means of expression more akin to natural language than to an engineering specification.

Each format has a different metadata structure with different names, and even within a single format we want to support researchers who extend and modify the core format. Additionally, each format has a different implementation, eg. as an hdf5 file, binary files in structured subdirectories, SQL-like databases. 

That's a lot of heterogeneity to manage, but fret not: there is hope. Researchers navigate this variability manually as a standard part of the job, and we can make that work cumulative by building tools that allow researchers to communally describe and negotiate over the structure of their data and the local relationships to other data structures. We can extend our peer-to-peer system to be a *federated database* system[^federatedterminology].

Federated systems consist of *distributed*, *heterogeneous*, and *autonomous* agents that implement some minimal agreed-upon standards for mutual communication and (co-)operation. Federated databases were proposed in the early 1980's {% cite heimbignerFederatedArchitectureInformation1985 %} and have been developed and refined in the decades since as an alternative to either centralization or non-integration {% cite litwinInteroperabilityMultipleAutonomous1990 kashyapSemanticSchematicSimilarities1996 hullManagingSemanticHeterogeneity1997 %}. Their application to the dispersion of scientific data in local filesystems is not new {% cite busseFederatedInformationSystems1999 djokic-petrovicPIBASFedSPARQLWebbased2017 hasnainBioFedFederatedQuery2017  %}, but their implementation is more challenging than imposing order with a centralized database or punting the question into the unknowable maw of machine learning. 

Amit Sheth and James Larson, in their reference description of federated database systems, describe **design autonomy** as one critical dimension that characterizes them:

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

Susanne Busse and colleagues add an additional dimension of **evolvability,** or the ability of a particular system to adapt to inevitable changing uses and requirements {% cite busseFederatedInformationSystems1999 %}. 

In order to support such radical autonomy and evolvability, federated systems need some means of translating queries and representations between heterogeneous components. The typical conceptualization of federated databases have five layers that implement different parts of this reconciliation process {% cite shethFederatedDatabaseSystems1990 %}:

* A **local schema** is the representation of the data on local servers, including the means by which they are implemented in binary on the disk
* A **component schema** serves to translate the local schema to a format that is compatible with the larger, federated schema
* An **export schema** defines permissions, and what parts of the local database are made available to the federation of other servers
* The **federated schema** is the collection of export schemas, allowing a query to be broken apart and addressed to different export schemas. There can be multiple federated schemas to accomodate different combinations of export schemas.
* An **external schema** can further be used to make the federated schema better available to external users, but in this case since there is no notion of "external" it is less relevant.

This conceptualization provides a good starting framework and isolation of the different components of a database system, but a peer-to-peer database system has different constraints and opportunities {% cite bonifatiDistributedDatabasesPeertopeer2008 %}. In the strictest, "tightly coupled" federated systems, all heterogeneity in individual components has to be mapped to a single, unified federation-level schema. Loose federations don't assume a unified schema, but settle for a uniform query language, and allow multiple translations and views on data to coexist. A p2p system naturally lends itself to a looser federation, and also gives us some additional opportunities to give peers agency over schemas while also preserving some coherence across the system. I will likely make some database engineers cringe, but the emphasis for us will be more on building a system to support distributed social control over the database, rather than guaranteeing consistency and transparency between the different components.

Though there are hundreds of subtleties and choices in implementation beneath the level of detail I'll reach here, allow me to illustrate the system by example:

Let us start with the ability for a peer to choose who they are associated with at multiple scales of organization: a peer can directly connect with another peer, but peers can also federate into groups, groups can federate into groups of groups, and so on. Within each of these grouping structures, the peer is given control over what data of theirs is shared. 

Clearly, we need some form of *identity* in the system, let's make it simple and flat and denote that in pseudocode as `@username`[^chainz]. Someone would then be able to use their `@name`space as a root, under which they could refer to their data, schemas, and so on, which will be denoted `@name:subobject` (see this notion of personal namespaces for knowledge organization discussed in early wiki culture here {% cite MeatballWikiPersonalCategories %}). Let us also assume that there is no categorical difference between `@usernames` used by individual researchers, institutions, consortia, etc. --- everyone is on the same level. 

We pick up where we left off earlier with a peer who has their data in some discipline-specific format, which let us assume for the sake of concreteness has a representation as an [OWL](https://www.w3.org/OWL/) schema. 

That schema could be "owned" by the `@username` corresponding to the standard-writing group --- eg `@nwb` for neurodata without borders. In a [turtle-ish](https://www.w3.org/TR/turtle/) pseudocode[^whypseudo], then, our dataset might look like this:

```turtle
<#cool-dataset>
  a @nwb:NWBFile
  @nwb:general:experimenter @jonny
  @nwb:ElectricalSeries
    .electrodes [1, 2, 3]
    .rate 30000
    .data [...]
```

This indicates that me, `@jonny` collected `a @nwb:NWBFile` dataset named `<#cool-dataset>`, making it available as `@jonny:cool-dataset` that consisted of an `@nwb:ElectricalSeries` and the relevant attributes (where a leading `.` is a shorthand for the parent schema element, so `@nwb:ElectricalSeries:electrodes`).

<div class="draft-text" markdown="1">
- Here would be a good time to describe triplet links as the basic tech of the semantic web world.
- We can use object oriented programming as an example: attributed and methods instead of just pointers.
</div>

I have some custom field for my data, though, which I extend the format specification to represent. Say I have invented some new kind of solar-powered electrophysiological device --- the SolarPhys2000 --- and want to annotate its specs alongside my data. 

```turtle
<#SolarEphys>
  extends @nwb:NWBContainer
    
  UsedWith @hw:SolarPhys2000

  ManufactureDate
    a @schema:Date

  InputWattageSeries
    extends @nwb:ElectricalSeries

    sunIntensity
      a @nwb:TimeSeries
```

Here I create a new extension `@jonny:SolarEphys` that `extends` the `@nwb:NWBContainer` schema. We use `extends` rather than `a` because we are adding something new to the *description* of the container rather than *making* a container to store data. I declare that this container is `UsedWith` our SolarPhys2000 which we have registered in some general `@hw` hardware registry. I then add two new fields, `ManufactureDate` and `InputWattageSeries`, declaring types from, for example [`@schema:Date`](https://schema.org/Date) and `@nwb`.

There are many strategies for making my ontology extension available to others in a federated network. We could use a distributed hash table, or [**DHT**](https://en.wikipedia.org/wiki/Distributed_hash_table), like bittorrent, which distributes references to information across a network of peers (eg. {% cite pirroDHTbasedSemanticOverlay2012 %}). We could use a strategy like the [**Matrix** messaging protocol](https://matrix.org/), where users belong to a single home server that federates with other servers. Each server is responsible for keeping a synchronized copy of the messages sent on the servers and rooms it's federated with, and each server is capable of continuing communication if any of the others failed. We could use [**ActivityPub** (AP)](https://www.w3.org/TR/2018/REC-activitypub-20180123/) {% cite Webber:18:A %}, a publisher-subscriber model where users affiliated with a server post messages to their 'outbox' and are sent to listening servers (or made available to HTTP GET requests). AP uses [JSON-LD](https://json-ld.org/) {% cite spornyJSONLDJSONbasedSerialization2020 %}, so is already capable of representing linked data, and the related ActivityStreams vocabulary {% cite snellActivityStreams2017 %} also has plenty of relevant [action types](https://www.w3.org/TR/activitystreams-vocabulary/#activity-types) for [creating](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-create), [discussing](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-question), and [negotiating](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tentativeaccept) over links (also see [cpub](https://github.com/openEngiadina/cpub)). We'll return to ActivityPub later, but for now the point is to let us assume we have a system for distributing schemas/extensions/links associated with an identity publicly or to a select group of peers.

For the moment our universe is limited only to other researchers using NWB. Conveniently, the folks at NWB have set up a federating group so that everyone who uses it can share their format extensions. Since our linking system for manipulating schemas is relatively general, we can use it to "formalize" a basic configuration for a federating group that automatically `Accept`s request to `Join` and allows any schema that inherits from their base `@nwb:NWBContainer` schema. Let's say `@fed` defines some basic properties of our federating system --- it constitutes our federating "protocol" --- and loosely use some terms from the [ActivityStreams](https://www.w3.org/ns/activitystreams#class-definitions) vocabulary as `@as`

```turtle
<#nwbFederation>
  a @fed:Federation
  onReceive
    @as:Join @as:Accept
  allowSchema
    extensionOf @nwb:NWBContainer
```

Now anyone that is a part of the `@nwbFederation` would be able to see the schemas we have submitted, sort of like a beefed up, semantically-aware version of the existing [neurodata extensions catalog](https://nwb-extensions.github.io/). In this system, many overlapping schemas could exist simultaneously under different namespaces, but wouldn't become a hopeless clutter because similar schemas could be compared and reconciled based on their semantic properties. 

So far we have been in the realm of metadata, but how would my computer know how to read and write the data to my disk so i can use it? In a system with heterogeneous data types and database implementations, we need some means of specifying different programs to use to read and write, different APIs, etc. Why not make that part of the file schema as well? Suppose the HDF5 group (or anyone, really!) has a namespace `@hdf` that defines the properties of an `@hdf:HDF5` file, basic operations like `Read`, `Write`, or `Select`. NWB could specify that in their definition of `@nwb:NWBFile`:

```turtle
@nwb.NWBFile
  a @hdf:HDF5
    isVersion "x.y.z"
    hasDependency "libhdf5"=="x.y.z"
  usesContainer @nwb:NWBContainer
```

The abstraction around the file implementation makes it easier for others to consume my data, but it also makes it easier for *me* to use and contribute to the system. Making an extension to the schema wasn't some act of charity, it was the most direct way for me to use the tool to do what I wanted. Win-win: I get to use my fancy new instrument and store its data by extending some existing format standard, and in the process make the standard more complete and useful. We are able to make my work useful by *aligning the modalities of use and contribution.*

Now that I've got my schema extension written and submitted to the federation, time to submit my data! Since it's a p2p system, I don't need to manually upload it, but I do want to control who gets it. By default, I have all my NWB datasets set to be available to the `@nwbFederation` , and I list all my metadata on, say the Society for Neuroscience's `@sfnFederation`. 

```turtle
<#globalPermissions>
  a @fed:Permissions
  permissionsFor @jonny

  federatedWith 
    name @nwbFederation
    @fed:shareData 
      is @nwb:NWBFile

  federatedWith
    name @sfnFederation
    @fed:shareMetadata
```

Let's say this dataset in particular is a bit sensitive --- say we apply a set of permission controls to be compliant with `@hhs.HIPAA` --- but we do want to make use of some public server space run by our Institution, so we let it serve an encrypted copy that those I've shared it with can decrypt. Since we've applied the `@hhs.HIPAA` ruleset, we would be able to automatically detect if we have any conflicting permissions, but we're doing fine in this example.

```turtle
<#datasetPermissions>
  a @fed:Permissions
  permissionsFor @jonny:cool-dataset

  accessRuleset @hhs:HIPAA
    .authorizedRecipient <#hash-of-patient-ids>
  
  federatedWith
    name @institutionalCloud
    @fed:shareEncrypted
```

Now I want to make use of some of my colleagues data. Say I am doing an experiment with a transgenic dragonfly and collaborating with a chemist down the hall. This transgene, known colloquially in our discipline as `"@neuro:superstar6"` (which the chemists call `"@chem:SUPER6"`) fluoresces when the dragonfly is feeling bashful, and we have plenty of photometry data stored as `@nwb:Fluorescence` objects. We think that its fluorescence is caused by the temperature-dependent conformational change from blushing. They've gathered NMR and Emission spectroscopy data in their chemistry-specific format, say `@acs:NMR` and `@acs:Spectroscopy`. 

We get tired of having our data separated and needing to maintain a bunch of pesky scripts and folders, so we decide to make a bridge between our datasets. We need to indicate that our different names for the gene are actually the same thing and relate the spectroscopy data.   


Let's make the link explicit, say we use an already-existing vocabulary like the "simple knowledge organization system" for describing logical relationships between concepts: [`@skos`](https://www.w3.org/2009/08/skos-reference/skos.html)?

```turtle
<#super-link-6>
  a @fed:Link
  
  from @neuro:superstar6
  to @chem:SUPER6
  link @skos:exactMatch

```

Our `@nwb:Fluorescence` data has the emission wavelength in its `@nwb:Fluorescence:excitation_lambda` property[^notreallynwb], which is the value of their `@acs:Spectroscopy` data at a particular value of its `wavelength`. Unfortunately, `wavelength` isn't metadata for our friend, but does exist as a column in the `@acs:Spectroscopy:readings` table, so for now the best we can do is indicate that `excitation_lambda` is one of the values in `wavelength` and pick it up in our analysis tools.

[^notreallynwb]: not really where it would be in the standard, but go with it plz

```turtle
<#imaging>
 a @fed:Link
 
 from @nwb:Fluorescence:excitation_lambda
 to @acs:Spectroscopy:readings
 link @fed:Subset
   valueIn "wavelength"
```

This makes it much easier for us to index our data against each other and solves a few real practical problems we were facing in our collaboration. We don't need to do as much cleaning when it's time to publish the data since it can be released as a single linked entity.

Rinse and repeat our sharing and federating process from our previous schema extension, add a little bit of extra federation with the `@acs` namespace, and in the normal course of our doing our research we've contributed to the graph structure linking two common data formats. Ours is one of many, with idiosyncratic names like `@jonny:super-link-6`[^creditte]. We might not have followed the exact rules, and we only made a few links rather than a single authoratative mapping, but if someone is interested in compiling one down the line they'll start off a hell of a lot further than if we hadn't contributed it!

[^creditte]: we'll return to credit assignment, don't worry! I wouldn't leave a friend out to dry.

With a protocol for how queries can be forwarded and transformed between users and federations, one could access the same kind of complex query structure as traditional databases with [SPARQL](https://www.w3.org/TR/sparql11-federated-query/) {% cite SPARQLFederatedQuery2013 %} as has been proposed for biology many times before {% cite simaEnablingSemanticQueries2019 djokic-petrovicPIBASFedSPARQLWebbased2017 hasnainBioFedFederatedQuery2017 %}. Some division in the way that data and metadata are handled is necessary for the network to work in practice, since we can't expect a search to require terabytes of data transfer. A natural solution to this is to have metadata query results point to [content addressed](https://en.wikipedia.org/wiki/Content-addressable_storage) identifiers that are served peer to peer. A mutable/changeable/human-readable name and metadata system that points to a system of permanent, unique identifiers has been one need that has hobbled IPFS, and is the direction pointed to by DataLad[^p2pdatalad] {% cite hankeDefenseDecentralizedResearch2021 %}. A [parallel](https://mastodon.social/@humanetech/107155144840782386) 
[set](https://web.archive.org/web/20211024082055/https://socialhub.activitypub.rocks/t/which-links-between-activitypub-and-solid-project/529) of [conversations](https://web.archive.org/web/20211024080845/https://socialhub.activitypub.rocks/t/how-solid-and-activitypub-complement-each-other-best/727) has been [happening](https://web.archive.org/web/20211024081238/https://forum.solidproject.org/t/discussion-solid-vs-activitypub/2685) in the broader linked data community with regard to using ActivityPub as a way to index data on Solid. 

In this example I have been implicitly treating the `@nwbFederation` users like bittorrent [trackers](#trackers--wikis), keeping track of different datasets in their federation and caching for faster quaeries. There is no reason why queries couldn't themselves be distributed across the participating peers, though I believe tracker-like federations at various intermediary scales of organization are useful and might emerge naturally. A system like this doesn't need the radical zero trust design of, for example, some distributed ledgers, and an overlapping array of institutional, disciplinary, interest, and so on federations would be a good means of realizing the evolvable community structure needed for sustained archives. 

Extend this practice across the many overlapping gradients of cooperation and collaboration in science, and on a larger scale a system like this could serve as a way to make explicit the organic, continual negotiation over meaning and practice that centralized ontologies can only capture as a snapshot. I don't happen to know where the physicists store their data or what format it's in, *but the chemists might,* and the best way to get there from here might be a dense, multiplicative web of actual practical knowledge instead of some sparsely used corporate API. We don't make the same guarantees of consistency or support for algorithmic reasoning as a top-down system would in theory, but it would give us agency over the structure of our information and have the potential to be useful for a far broader base of researchers. 

As will be developed through the rest of the piece, this system effectively functions as a *protocol for protocols.* The `@fed:Federation` notion of federation defines its own set of properties and requirements that let the people who implement it implement a variety of federation types and relationships with each other, but it is one of many. By building on the "meta-protocol" of a peer-to-peer linked data platform we can change the problem from needing to agree on a single protocol for scientific communication, data indexing, and so on to making a means of creating *many* protocols as fluidly as is needed. Are the rules of `@fed:Federation` too limited? Extend it to suit your needs. 

Like the preceding description of the basic peer-to-peer system, this joint metadata/p2p system could be fully compatible with existing systems. Translating between a metadata query and a means of accessing it on heterogeneous databases is a requisite part of the system, so, for example, there's no reason that an HTTP-based API like SmartAPI couldn't be queried.  

<div class="draft-text" markdown="1">
- close by taking a larger view on p2p: p2p systems already in use, academic torrents, biotorrents {% cite langilleBioTorrentsFileSharing2010 %}, libgen on IPFS
- proof of utility is in the pudding: CDNs are effectively p2p systems where they just own all the peers.
</div>