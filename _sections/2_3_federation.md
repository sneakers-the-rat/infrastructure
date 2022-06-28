> Human language thrives when using the same term to mean somewhat different things, but automation does not. *Tim Berners-Lee (1999) The Semantic Web* {% cite berners-leeSemanticWeb2001 %}

> Wittgenstein’s contribution to communism was his robust proof of the proposition that there is no private language, but in our time, privatized languages are everywhere. And not just languages: Images, codes, algorithms, even genes can become private property, and in turn private property shapes what we imagine the limits and possibilities of this information to be. *McKenzie Wark (2021) Capital Is Dead: Is This Something Worse?* {% cite warkCapitalDeadThis2021 %}

To structure our p2p data sharing system, we should use *Linked Data.* Linked data is at once exceptionally simple and deceptively complex, a set of technologies and social histories. In this section we will introduce the notion of linked data, extend it for a p2p context, and then add a twist from *federated systems.*[^federatedterminology] Our goal will be to articulate the foundation for a "protocol of protocols," a set of minimal operations by which individual people can create, extend, borrow, and collectively build a space of linked folk schemas and ontologies, or *folksonomies.* 

When last we left it, we had developed the notion of a p2p system to the point where we had big torrentlike piles of files with a few additional features like versioning and sharded storage. We need to add an additional layer of *metadata* that exposes information about the contents of each of these file piles. But what is that metadata *made of?* 

The core format of linked data is the Resource Document Format (RDF) {% cite klyneRDFConceptsAbstract2014 %} and its related syntaxes like Turtle {% cite beckettRDFTurtle2014 %}. Typical hyperlinks are *duplet* links --- linking from the source to the target. The links of linked data are instead **triplet** links that consist of a **subject**, a **predicate** that *describes* the link, and an **object** that is linked to. Subjects and objects (generally, nodes) have particular types like a number, or a date, or something more elaborate like an [Airline](https://schema.org/Airline) or [Movie](https://schema.org/Movie) that have particular sets of predicates or properties: eg. a `Movie` has a `director` property which links to a `Person`. A `Person` has an `address` which links to a `PostalAddress`, and so on. Types and properties are themselves defined in **vocabularies** (or, seemingly interchangeably {% cite w3cOntologiesW3C %}, ontologies and schemas) by a special subset of RDF schema modeling classes and properties {% cite brickleyRDFSchema2014 %}. Linked data thus consists of semantically annotated **graphs** of linked nodes[^dlg].

[^dlg]: Or, precisely, a "directed labeled graph" (DLG).

<div class='draft-text'>
  Put a little vocab box here.
</div>

Linked data representations are very general and encompass many others like relational {% cite berners-leeRelationalDatabasesSemantic2009 %} and object-oriented models, but have a few properties that might be less familiar. The first is that triplet links have the status of an utterance or a proposition: much like typical duplet hyperlinks, anyone can make whatever links they want to a particular object to say what they'd like about it. As opposed to object-oriented models where a class is defined beforehand and its attributes or data are stored "within" the object, RDF schemas are composed of links just like any other, and the link, object, and predicate can all be stored in separate places by different people {% cite berners-leeWhatSemanticWeb1998 %}. For example:

> One person may define a `vehicle` as having a `number of wheels` and a `weight` and a `length`, but not foresee a `color`. This will not stop another person making the assertion that a given car is red, using the color vocabulary from elsewhere. {% cite berners-leeWhatSemanticWeb1998 %}

Linked data has an ambivalent history of thought regarding the location and distribution of ontology building. Its initial formulation came fresh from the recent incendiary success of the internet, where without any system of organization "people were frightened of getting lost in it. You could follow links forever." {% cite berners-leeWhatSemanticWeb1998 %} Linked data was conceptualized to be explicitly without authoritative ontologies, but intended to evolve like language with local cultures of meaning meshing and separating at multiple scales {% cite berners-leeSemanticWeb2001 %}. The dream of mass automaticity, however, with computational "agents" capable of seamlessly crawling consistent graphs of linked data to extract surplus meaning necessarily requires that the meaning of terms does not "mutate" between different uses. For many early linked data architects the resolution was more automation, to use additional semantic structure about the equivalence between different ontologies as a means of estimating how trustworthy a particular result was. This tension is sewn into one of its most well known ontologies, the Simple Knowledge Organization System (skos) {% cite brickleySKOSCoreGuide2005 %}, which is intended to represent relationships between terms and vocabularies {% cite milesQuickGuidePublishing2005 %}.

The fluidity of the original vision for linked data never emerged, however, and is remembered instead as being monstrously complicated {% cite palmerDitchingSemanticWeb2008 %}. While HTML, CSS, and Javascript developed a rich ecosystem of abstractions that let people create websites without directly writing HTML, the same never materialized for RDF. While linked data entities are intended to be designated by the very general notion of a URI, in practice URIs are near-synonymous with URLs, and maintaining a set of URLs is hard. In the absence of interfaces for manipulating linked data and the pain of hosting them, the dream of a distributed negotiation over language-like ontologies was largely confined to information scientists and what became corporate knowledge graphs.

In our revival of this dream we are describing a system where heterogeneous data is indicated by its metadata, rather than representing all data in a uniform format --- similarly to the mixture of RDF and non-RDF data in the linked data platform standard {% cite speicherLinkedDataPlatform2015 %}. We want to handle a broad span of heterogeneity: data with different naming schemes, binary representations, sizes, nested structures, and so on. The first task is to describe some means of accessing this heterogeneous data in a reasonably standard way despite these differences.

While that may seem a tall order, currently it's mostly done manually whenever researchers want to use anyone else's data. One way of characterizing the task at hand is systematizing the idiosyncratic paths by which a researcher might dump out a .csv file from a sql database to load into MATLAB to save in the .mat format with the rest of their data. To do that we can draw from a parallel body of thought on *federated databases.*

Like our p2p system, federated systems consist of *distributed*, *heterogeneous*, and *autonomous* agents that implement some minimal agreed-upon standards for mutual communication and (co-)operation. Federated databases were proposed in the early 1980's {% cite heimbignerFederatedArchitectureInformation1985 %} and have been developed and refined in the decades since as an alternative to either centralization or non-integration {% cite litwinInteroperabilityMultipleAutonomous1990 kashyapSemanticSchematicSimilarities1996 hullManagingSemanticHeterogeneity1997 %}. Their application to the dispersion of scientific data in local filesystems is not new {% cite busseFederatedInformationSystems1999 djokic-petrovicPIBASFedSPARQLWebbased2017 hasnainBioFedFederatedQuery2017  %}, but their implementation is more challenging than imposing order with a centralized database or punting the question into the unknowable maw of machine learning. 

Amit Sheth and James Larson, in their reference description of federated database systems, describe **design autonomy** as one critical dimension that characterizes them:

> Design autonomy refers to the ability of a component DBS to choose its own design with respect to any matter, including 
> 
> * (a) The **data** being managed (i.e., the Universe of Discourse),
> * (b) The **representation** (data model, query language) and the **naming** of the data elements, 
> * (c) The conceptualization or **semantic interpretation** of the data (which greatly contributes to the problem of semantic heterogeneity), 
> * (d) **Constraints** (e.g., semantic integrity constraints and the serializability criteria) used to manage the data,
> * (e) The **functionality** of the system (i.e., the operations supported by system),
> * (f) The **association and sharing with other systems**, and
> * (g) The **implementation** (e.g., record and file structures, concurrency control algorithms). 

Susanne Busse and colleagues add an additional dimension of **evolvability,** or the ability of a particular system to adapt to inevitable changing uses and requirements {% cite busseFederatedInformationSystems1999 %}. 

In order to support such radical autonomy and evolvability, federated systems need some means of translating queries and representations between heterogeneous components. The typical conceptualization of federated databases have five layers that implement different parts of this reconciliation process {% cite shethFederatedDatabaseSystems1990 %}:

* A **local schema** is the representation of the data on local servers, including the means by which they are implemented in binary on the disk
* A **component schema** serves to translate the local schema to a format that is compatible with the larger, federated schema
* An **export schema** defines permissions, and what parts of the local database are made available to the federation of other servers
* The **federated schema** is the collection of export schemas, allowing a query to be broken apart and addressed to different export schemas. There can be multiple federated schemas to accomodate different combinations of export schemas.
* An **external schema** can further be used to make the federated schema better available to external users, but in this case since there is no notion of "external" it is less relevant.

This conceptualization provides a good starting framework and isolation of the different components of a database system, but a peer-to-peer database system has different constraints and opportunities {% cite bonifatiDistributedDatabasesPeertopeer2008 %}. In the strictest, "tightly coupled" federated systems, all heterogeneity in individual components has to be mapped to a single, unified federation-level schema. Loose federations don't assume a unified schema, but settle for a uniform query language, and allow multiple translations and views on data to coexist. A p2p system naturally lends itself to a looser federation, and also gives us some additional opportunities to give peers agency over schemas while also preserving some coherence across the system. I will likely make some database engineers cringe, but the emphasis for us will be more on building a system to support distributed social control over the database, rather than guaranteeing consistency and transparency between the different components.

Let us take the notion of a loosely coupled systems to its extreme, and invert the meaning of federation as it is used in other systems like ActivityPub: rather than a server-first federation, where peers create accounts on servers that define their operation and the other servers they federate with, ours will be peer-first federation. In this system, individual peers will maintain their own vocabularies and be able to make them available to other peers. Peers can directly connect to one another, but can also federate into groups, which can federate into groups of groups, and so on. A peer will implement the local, component, and export schema with a client that handles requests for vocabularies and and datasets according to their scheme of permissions. Translation from a metadata-based query to a particular binary representation of a file, whether it be in a relational database, binary, file, or otherwise, will also be supported by vocabularies that indicate the necessary code.

Clearly, we need some form of *identity* in the system so that a peer can have their links unambiguously identified and discovered. This is a challenging problem that we leave open here, but strategies ranging from URI-based resolution like `username@domain.com`, to locally-held cryptographic key based identity, to decentralized systems like the w3c's Decentralized Identifiers {% cite spornyDecentralizedIdentifiersDIDs2021 %} would suffice. For the sake of example, let's make identity simple and flat, denoted in pseudocode as `@username`. Someone would then be able to use their `@name`space as a root, under which they could refer to their data, schemas, and so on, which will be denoted `@name:subobject` (see this notion of personal namespaces for knowledge organization discussed in early wiki culture here {% cite MeatballWikiPersonalCategories %}). Let us also assume that there is no categorical difference between `@usernames` used by individual researchers, institutions, consortia, etc. --- everyone is on the same level. 

To illustrate the system by example, we pick up where we left off earlier with a peer who has their data in some discipline-specific format, which let us assume for the sake of concreteness has a representation as an [OWL](https://www.w3.org/OWL/) schema. 

That schema could be "owned" by the `@username` corresponding to the standard-writing group --- eg `@nwb` for neurodata without borders. In all the following examples, we will use a [turtle-ish](https://www.w3.org/TR/turtle/) syntax that is *purposely pseudocode* with the intention of demonstrating general qualities without being concerned with syntactic correctness or indicating one syntax in particular. Our dataset might look like this:

```turtle
@base @jonny

<#my-data>
  a @nwb:NWBFile
  @nwb:general:experimenter @jonny
  @nwb:ElectricalSeries
    .electrodes [1, 2, 3]
    .rate 30000
    .data [...]
```

Unpacking the pseudocode, this indicates:

* We declare a `@base` context underneath my identity, `@jonny`,
* Underneath the base, individual objects are declared with their name like `<#object-name>`, a shorthand for `<@base:object-name>`. In this case I have made a dataset identified as `@jonny:my-data`.
* I have identified the type of this object with the `a` token, in this case a `@nwb:NWBFile`
* Subsequent lines indicate particular properties of the indicated type and their value, specifically I have indicated that the `@nwb:general:experimenter` is me, `@jonny`, and that the dataset also contains a `@nwb:ElectricalSeries`. While my identity object might have additional links like an `@ORCID:ID`, we can assume some basic inference that resolves my identity to a string as specified in the NWB specification, or else specify it explicitly as `@jonny:name`
* Additional subproperties are assigned with a leading `.`, so `.electrodes` would resolve to `@nwb:ElectricalSeries:electrodes`.  

How would my client know how to read and write the data to my disk so i can use and share it? In a system with heterogeneous data types and database implementations, we need some means of specifying different programs to use to read and write, different APIs, etc. This too can be part of the format specification. Suppose the HDF5 group (or anyone, really!) has a namespace `@hdf` that defines the properties of an `@hdf:HDF5` file, basic operations like `Read`, `Write`, or `Select`. NWB could specify that in their definition of `@nwb:NWBFile`:

```turtle
<@nwb:NWBFile>
  a @hdf:HDF5
    .isVersion "x.y.z"
    .hasDependency "libhdf5"=="x.y.z"
  usesContainer @nwb:NWBContainer
```

So when I receive a request for the raw data of my electrical series, my client knows to use the particular methods from the HDF5 object type to index the data contained within the file.

I have some custom field for my data, though, which I extend the format specification to represent. Say I have invented some new kind of solar-powered electrophysiological device --- the SolarPhys2000 --- and want to annotate its specs alongside my data. 

```turtle
<#SolarEphys>
  extends @nwb:NWBContainer
    
  UsedWith @jonny:hw:SolarPhys2000

  ManufactureDate
    a @schema:Date

  InputWattageSeries
    extends @nwb:ElectricalSeries

    sunIntensity
      a @nwb:TimeSeries
```

Here I create a new extension `@jonny:SolarEphys` that `extends` the `@nwb:NWBContainer` schema. We use `extends` rather than `a` because we are adding something new to the *description* of the container rather than *making* a container to store data. I declare that this container is `UsedWith` our SolarPhys2000 which we have defined elsewhere in our `hw` namespace using some hardware ontology. I then add two new fields, `ManufactureDate` and `InputWattageSeries`, declaring types from, for example [`@schema:Date`](https://schema.org/Date) and `@nwb`. 

The abstraction around the file implementation makes it easier for others to consume my data, but it also makes it easier for *me* to use and contribute to the system. Making an extension to the schema wasn't some act of charity, it was the most direct way for me to use the tool to do what I wanted. Win-win: I get to use my fancy new instrument and store its data by extending some existing format standard. We are able to make my work part of a cumulative schema building effort by *aligning the modalities of use and contribution.*

For the moment our universe is limited only to other researchers using NWB. Conveniently, the folks at NWB have set up a federating group so that everyone who uses it can share their format extensions. In the same way that we can use schemas to refer to code as with our HDF5 files, we can use it to indicate the behavior of clients and federations. Say we want to make a federating peer that automatically `Accept`s request to `Join` and indexes any schema that inherits from their base `@nwb:NWBContainer`. Let's say `@fed` defines some basic properties of our federating system --- it constitutes our federating "protocol" --- and loosely use some terms from the [ActivityStreams](https://www.w3.org/ns/activitystreams#class-definitions) vocabulary as `@as`

```turtle
<@nwbFederation>
  a @fed:Federation
  onReceive
    @as:Join @as:Accept
  allowSchema
    extensionOf @nwb:NWBContainer
```

Now anyone that is a part of the `@nwbFederation` would be able to see the schemas we have submitted, sort of like a beefed up, semantically-aware version of the existing [neurodata extensions catalog](https://nwb-extensions.github.io/). In this system, many overlapping schemas could exist simultaneously under different namespaces, but wouldn't become a hopeless clutter because similar schemas could be compared and reconciled based on their semantic properties. 

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

Let's say this dataset in particular is a bit sensitive --- say we apply a set of permission controls to be compliant with `@hhs.HIPAA` --- but we do want to make use of some public server space run by our Institution, so we let it serve an encrypted copy that those I've shared it with can decrypt.

```turtle
<#datasetPermissions>
  a @fed:Permissions
  permissionsFor @jonny:my-data

  accessRuleset @hhs:HIPAA
    .authorizedRecipient <#hash-of-patient-ids>
  
  federatedWith
    name @institutionalCloud
    @fed:shareEncrypted
```

Now I want to make use of some of my colleagues data. Say I am doing an experiment with a transgenic dragonfly and collaborating with a chemist down the hall. This transgene, known colloquially in our discipline as `@neuro:superstar6` (which the chemists call `@chem:SUPER6`) fluoresces when the dragonfly is feeling bashful, and we have plenty of photometry data stored as `@nwb:Fluorescence` objects. We think that its fluorescence is caused by the temperature-dependent conformational change from blushing. They've gathered NMR and Emission spectroscopy data in their chemistry-specific format, say `@acs:NMR` and `@acs:Spectroscopy`. 

We get tired of having our data separated and needing to maintain a bunch of pesky scripts and folders, so we decide to make a bridge between our datasets. We need to indicate that our different names for the gene are actually the same thing and relate the spectroscopy data.   

Let's make the link explicit, say we use an already-existing vocabulary like the "simple knowledge organization system" for describing logical relationships between concepts: [`@skos`](https://www.w3.org/2009/08/skos-reference/skos.html)?

```turtle
<#links:super6>
  @neuro:superstar6
    @skos:exactMatch @chem:SUPER6
```

Our `@nwb:Fluorescence` data has the emission wavelength in its `@nwb:Fluorescence:excitation_lambda` property[^notreallynwb], which is the value of their `@acs:Spectroscopy` data at a particular value of its `wavelength`. Unfortunately, `wavelength` isn't metadata for our friend, but does exist as a column in the `@acs:Spectroscopy:readings` table, so where we typically have a singular value they have a set of measurements. Since the same information has a structurally different meaning across disciplines, we dont expect there to be an automated 1:1 mapping between them, but presumably their data format also specifies some means of reading the data akin to the HDF5 methods indicated by our NWB data format so we can add an additional translation later like `@math:mean` and pick it up in our analysis tools.

[^notreallynwb]: not really where it would be in the standard, but again, for the sake of example...

```turtle
<#links:lambda>
  @acs:Spectroscopy:readings:wavelength
    @skos:narrowMatch @nwb:Fluorescence:excitation_lambda
      @skos:note
        "Multiple spectrographic readings are
        aggregated to a single excitation lambda"
      @translate:aggregate @math:mean
```

This makes it much easier for us to index our data against each other and solves a few real practical problems we were facing in our collaboration. We don't need to do as much cleaning when it's time to publish the data since it can be released as a single linked entity. 

Though this example is relatively abstract (which metadata from spectroscopy readings would need to match which in a fluorescence series to compare wavelengths to lambda?), it serves as an example in its own right of the quasi-inversion of reasoning that we can make use of in our particular version of linked data with code. We refer to the general notion of taking a `@math:mean`, but don't specify a particular implementation of it. Other package maintainers could indicate that their function implements it, so we could be prompted to choose one when resolving the link. Alternatively, if we specified our aggregation used `@numpy:mean`, we could trace it backwards to find which general operation it implements and choose a different one. Since the objects of any triplet link have their own type, we can use the *context* of the link to infer how to use it. 

Rinse and repeat our sharing and federating process from our previous schema extension, add a little bit of extra federation with the `@acs` namespace, and in the normal course of our doing our research we've contributed to the graph structure linking two common data formats. Our link is one of many, and is a proposition that other researchers can evaluate in the context of our project rather than as an authoritative reference link. We might not have followed the exact rules, but we have also changed the nature of rules --- rather than logical coherence guaranteed *a priori* by adherence to a specification language, much like language the only rules that matter are those of *use.* We may have only made a few links rather than a single authoratative mapping, but if someone is interested in compiling one down the line they'll start off a hell of a lot further than if we hadn't contributed it! Rather than this format translation happening ad-hoc across a thousand lab-specific analysis libraries, we have created a space of *discourse* where our translation can be contextually compared to others and negotiated by the many people concerned, rather than handed down by a standards body.

Queries across what amounts to the federated schema, in the federated database parlance, are by design less seamless than they would be with centrally governed schema --- which is a feature, not a bug. While this example deals with relatively dry fluorescence and spectrographic data, if this system were to expand to clinical, cultural, and personal data, the surveillance economy that emerged subsequent to they heydey of the semantic web has made it abundantly clear that *we don't necessarily want* arbitrary actors to be able to index across all available data. It is much more valuable to have low-barrier, vernacular expression usable by collections of subdisciplines and communities of people than a set of high-barrier, fixed, logically correct schemas. Researchers and people alike typically are only concerned with using the information within or a few hops outside of their local systems of meaning, so who is a totalizing database of everything *for?* This framing of linked data, by rejecting the goal of global inference altogether, could be considered beyond even Lindsay Poirier's conception of "scruffiness" to something we might properly call *vulgar linked data.* 

The act of translation is always an act of creation, and by centering the multiplicity of links between extensible schemas we center the dialogic reality of that creation: *who says* those things are equivalent? Since the act of using translating links between schemas itself creates links --- ie. I link to `@<user>`'s link to link my dataset and another --- we are both able to assess the status of consensus around which links are used, as well as bring a currently invisible form of knowledge work into a system of credit. As we will develop in the following two sections, this multiplicity also naturally lends itself to a fluid space of tools that implement translations and analyses, as well as a means of discussing and contextualizing the results.

We have been intentionally vague about the technical implementation here, but there are many possible strategies and technologies for each of the components.

For making our peers and the links within their namespace discoverable we could use a distributed hash table, or [**DHT**](https://en.wikipedia.org/wiki/Distributed_hash_table), like bittorrent, which distributes references to information across a network of peers (eg. {% cite pirroDHTbasedSemanticOverlay2012 %}). We could use a strategy like the [**Matrix** messaging protocol](https://matrix.org/), where peers could federate with "relay" servers. Each server is responsible for keeping a synchronized copy of the messages sent on the servers and rooms it's federated with, and each server is capable of continuing communication if any of the others failed. We could use [**ActivityPub** (AP)](https://www.w3.org/TR/2018/REC-activitypub-20180123/) {% cite Webber:18:A %}, a publisher-subscriber model where users affiliated with a server post messages to their 'outbox' and are sent to listening servers (or made available to HTTP GET requests). AP uses [JSON-LD](https://json-ld.org/) {% cite spornyJSONLDJSONbasedSerialization2020 %}, so is already capable of representing linked data, and the related ActivityStreams vocabulary {% cite snellActivityStreams2017 %} also has plenty of relevant [action types](https://www.w3.org/TR/activitystreams-vocabulary/#activity-types) for [creating](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-create), [discussing](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-question), and [negotiating](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tentativeaccept) over links (also see [cpub](https://github.com/openEngiadina/cpub)). We could use a strategy like IPFS where peers will voluntarily rehost each other's data in order to gain trust with one another. To preserve interoperability with existing systems, we will want to make links referenceable from a URI (as IPFS does) as well as be able to resolve multiple protocols, but beyond that the space of possible technologies is broad.



Indexing and querying metadata across federated peers could make use of the [SPARQL](https://www.w3.org/TR/sparql11-federated-query/) query language {% cite SPARQLFederatedQuery2013 %} as has been proposed for biology many times before {% cite simaEnablingSemanticQueries2019 djokic-petrovicPIBASFedSPARQLWebbased2017 hasnainBioFedFederatedQuery2017 %}. The distinction between metadata and data is largely practical --- a query shouldn't require transferring and translating terabytes of data --- so we will need some means of resolving references to data from metadata as per the linked data platform specification {% cite speicherLinkedDataPlatform2015 %}. A mutable/changeable/human-readable name and metadata system that points to a system of unique [content addressed](https://en.wikipedia.org/wiki/Content-addressable_storage) identifiers has been one need that has hobbled IPFS, and is the direction pointed to by DataLad[^p2pdatalad] {% cite hankeDefenseDecentralizedResearch2021 %}. A [parallel](https://mastodon.social/@humanetech/107155144840782386) 
[set](https://web.archive.org/web/20211024082055/https://socialhub.activitypub.rocks/t/which-links-between-activitypub-and-solid-project/529) of [conversations](https://web.archive.org/web/20211024080845/https://socialhub.activitypub.rocks/t/how-solid-and-activitypub-complement-each-other-best/727) has been [happening](https://web.archive.org/web/20211024081238/https://forum.solidproject.org/t/discussion-solid-vs-activitypub/2685) in the broader linked data community with regard to using ActivityPub as a way to index data on Solid. 

The design of federations of peers is intended to resolve several of the problems of prior p2p protocols. Rather than a separate swarm for every dataset per bittorrent, or a single global swarm per IPFS, this system would be composed of peers that can voluntarily associate and share metadata structure at multiple scales. Bittorrent requires trackers to aggregate and structure metadata, but they become single points of failure and often function as means of gatekeeping by the beloved petty tyrants who host them. IPFS has turned to [filecoin](https://filecoin.io/) to incentivize donating storage space among quasi-anonymous peers, a common design pattern among the radical zero-trust design of many cryptocurrencies and cryptocurrency-like systems. 

Voluntary federations are instead explicitly social systems that can describe and organize their own needs: peers in a federation can organize tracker or serverlike re-hosting of their data for performance, discoverability, guaranteed longevity. A federation can institute a cooperative storage model akin to private bittorrent trackers that requires a certain amount of rehosted data per data shared. A small handful of researchers can form a small federation to share data while collaborating on a project in the same way that a massive international consortioum could. Without enumerating their many forms, federations can be a way to realize the evolvable community structure needed for sustained archives. As may become clearer as we discuss systems for communication, in the context of science they might be a way of reconceptualizing scientific societies as something that supports the practice of science beyond their current role as ostensibly nonprofit journal publishers and event hosts.

So far we have described a system for sharing data with a p2p system integrated with linked data. We have given a few brief examples of how linked data can be used for standardized and vernacular metadata, integrating with heterogeneous local storage systems, and to perform actions like creating and joining federations of peers. As described, though, the system would still be decidedly unapproachable for most scientists and doesn't offer the kind of strong incentives that would create a broad base of use. We clearly need one or several *interfaces* to make the creation and use metadata easy. We will return to those in [Shared Knowledge](#shared-knowledge) and also describe a set of communication and governance systems sorely needed in science. To get there, we will first turn to a means of integrating our shared data system with analytical and experimental tools to make each combinatorically more useful than if considered alone. 
