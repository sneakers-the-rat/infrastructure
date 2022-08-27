Straddling our system for sharing data are the tools to gather and analyze it --- combining tools to address the general need for *storage* with *computational resources.* Considering them together presents us with new opportunities only possible with cross-domain interoperability. In particular, we can ask how a more broadly integrated system makes each of the isolated components more powerful, enables a kind of deep provenance from experiment to results, and further builds us towards reimagine the form of the community and communication tools for science. Where the previous section focused on integrating linked metadata with data, here our focus is how to make linked data *do things* by integrating it with code.

This section will be relatively short compared to [shared data](#shared-data). We have already introduced, motivated, and exemplified many of the design practices of the broader infrastructural system. There is much less to argue against or "undo" in the spaces of analytical and experimental tools because so much more work has been done, and so much more power has been accrued in the domain of data systems. Distributed computing does have a dense history, with huge numbers of people working on the problem, but its dominant form is much closer to the system articulated below than centralized servers are to federated semantic p2p systems. I also have written extensively about [experimental frameworks](#experimental-frameworks) before {% cite saundersAutopilotAutomatingBehavioral2019 %}, and develop [one of them](https://docs.auto-pi-lot.com/en/latest/) so I will be brief at risk of repeating myself or appearing self-serving.

Integrated scientific workflows have been written about many times before, typically in the context of the "open science" movement. One of the founders of the Center for Open Science, Jeffrey Spies, described a similar ethic of toolbuilding as I have in a 2017 presentation:

> Open Workflow:
> 1. Meet users where they are
> 2. Respect current incentives
> 3. Respect current workflow
>
> - We could... demonstrate that it makes research more efficient, of higher quality, and more accessible.
> - Better, we could... demonstrate that researchers will get published more often.
> - Even better, we could... make it easy.
> - Best, we could... make it automatic {% cite spiesWorkflowCentricApproachIncreasing2017 %}

Similar to the impossibility of a single unified data format, it is unlikely that we will develop one tool to rule them all. We will take the same tactic of thinking about *frameworks* to integrate tools and make them easier to build, rather than building any tool in particular.

### Analytical Frameworks

The first natural companion of shared data infrastructure is a shared analytical framework. A major driver for the need for everyone to write their own analysis code largely from scratch is that it needs to account for the idiosyncratic structure of everyone's data. Most scientists are (blessedly) not trained programmers, so code for loading data is often intertwined with the code used to analyze and plot it. As a result it is often difficult to repurpose code for other contexts, so the same analysis function is rewritten in each lab's local analysis repository. Since sharing raw data and code is still a (difficult) novelty, on a broad scale this makes results in scientific literature as reliable as we imagine all the private or semi-private analysis code to be.

Analytical tools (anecdotally) make up the bulk of open source scientific software, and range from foundational and general-purpose tools like numpy {% cite harrisArrayProgrammingNumPy2020 %} and scipy {% cite virtanenSciPyFundamentalAlgorithms2020 %}, through tools that implement a class of analysis like DeepLabCut {% cite mathisDeepLabCutMarkerlessPose2018 %} and scikit-learn {% cite pedregosaScikitlearnMachineLearning2011 %}, to tools for a specific technique like MoSeq {% cite wiltschkoRevealingStructurePharmacobehavioral2020 %} and DeepSqueak {% cite coffeyDeepSqueakDeepLearningbased2019 %}. The pattern of their use is then to build them into a custom analysis system that can then in turn range in sophistication from a handful of flash-drive-versioned scripts to automated pipelines. 

Having tools like these of course puts researchers miles ahead of where they would be without them, and the developers of the mentioned tools have put in a tremendous amount of work to build sensible interfaces and make them easier to use. No matter how much good work might be done, inevitable differences between APIs is a relatively sizable technical challenge for researchers --- a problem compounded by the incentives for fragmentation described previously. For toolbuilders, many parts of any given tool from architecture to interface have to be redesigned each time with varying degrees of success. For science at large, with few exceptions of well-annotated and packaged code, most results are only replicable with great effort. 

Discontinuity between the behavior and interface of different pieces of software is, of course, the overwhelming norm. Negotiating boundaries between (and even within) software and information structures is an elemental part of computing. The only time it becomes a conceivable problem to "solve" interoperability is when the problem domain coalesces to the point where it is possible to articulate its abstract structure as a protocol, and the incentives are great enough to adopt it. That's what we're trying to do here. 

It's unlikely that we will solve the problem of data analysis being complicated, time consuming, and error prone by teaching every scientist to be a good programmer, but we can build experimental frameworks that make analysis tools easier to build and use. 

Specifically, a shared analytical framework should be 

* **Modular** - Rather than implementing an entire analysis pipeline as a monolith, the system should be broken into minimal, composable modules. The threshold of what constitutes "minimal" is of course to some degree a matter of taste, but the framework doesn't need to make normative decisions like that. The system should support modularity by providing a clear set of hooks that tools can provide: eg. a clear place for a given tool to accept some input, parameters, and so on. Since data analysis can often be broken up into a series of relatively independent stages, a straightforward (and common) system for modularity is to build hooks to make a directed acyclic graph (DAG) of data transformation operations. This structure naturally lends itself to many common problems: caching intermediate results, splitting and joining multiple inputs and outputs, distributing computation over many machines, among others. Modularity is also needed within the different parts of the system itself -- eg. running an analysis chain shouldn't require a GUI, but one should be available, etc.
* **Pluggable** - The framework needs to provide a clear way of incorporating external analysis packages, handling their dependencies, and exposing their parameters to the user. Development should ideally not be limited to a single body of code with a single mode of governance, but should instead be relatively conservative about requirements for integrating code, and liberal with the types of functionality that can be modified with a plugin. Supporting plugins means supporting people developing tools for the framework, so it needs to make some part of the toolbuilding process easier or otherwise empower them relative to an independent package. This includes building a visible and expressive system for submitting and indexing plugins so they can be discovered and credit can be given to the developers. Reciprocal to supporting plugins is being interoperable with existing and future systems, which the reader may have assumed was a given by now.
* **Deployable** - For wide use, the framework needs to be easy to install and deploy locally and on computing clusters. A primary obstacle is dependency management, or making sure that the computer has everything needed to run the program. Some care needs to be taken here, as there are multiple emphases in deployability that can be in conflict. Deployable for who? A system that can be relatively challenging to use for routine exploratory data analysis but can distribute analysis across 10,000 GPUs has a very circumscribed set of people it is useful for. This is a matter of balancing design constraints, but we should prioritize broad access, minimal assumptions of technological access, and ease of use over being able to perform the most computationally demanding analyses possible when in conflict. Containerization is a common, and the most likely strategy here, but the interface to containers may need a lot of care to make accessible compared to opening a fresh .py file.
* **Reproducible** - The framework should separate the *parameterization* of a pipeline, the specific options set by the user, and its *implementation*, the code that constitutes it. The parameterization of a pipeline or analysis DAG should be portable such that it, for example, can be published in the supplementary materials of a paper and reproduced exactly by anyone using the system. The isolation of parameters from implementation is complementary to the separation of metadata from data and if implemented with semantic triplets would facilitate a continuous interface from our data to analysis system. This will be explored further below and in [shared knowledge](#shared-knowledge)

Thankfully a number of existing projects that are very similar to this description are actively being built. One example is [DataJoint](https://datajoint.io/) {% cite yatsenkoDataJointSimplerRelational2018 %}, which recently expanded its facility for modularity with its recent [Elements](https://github.com/datajoint/datajoint-elements) project {% cite yatsenkoDataJointElementsData2021 %}. Datajoint is a system for creating analysis pipelines built from a graph of processing stages (among [other features](https://docs.datajoint.org/python/v0.13/intro/01-Data-Pipelines.html#what-is-datajoint)). It is designed around a refinement on traditional relational data models, which is reflected throughout the system as most operations being expressed in its particular schema, data manipulation, and query languages. This is useful for operations that are expressed in the system, but makes it harder to integrate external tools with their dependencies --- [at the moment](https://github.com/datajoint/element-array-ephys/blob/1fdbcf12d1a518e686b6b79e9fbe77b736cb606a/Background.md) it appears that spike sorting (with [Kilosort](https://github.com/MouseLand/Kilosort) {% cite pachitariuKilosortRealtimeSpikesorting2016 %}) has to happen outside of the extracellular electrophysiology elements pipeline.

Kilosort is an excellent and incredibly useful tool, but its idiomatic architecture designed for standalone use is illustrative of the challenge of making a general-purpose analytic framework that can integrate a broad array of existing tools. It is built in MATLAB, which requires a paid license, making arbitrary deployment difficult, and MATLAB's flat path system requires careful and usual manual orchestration of potentially conflicting names in different packages. Its parameterization and use are combined in a "[main](https://github.com/MouseLand/Kilosort/blob/db3a3353d9a374ea2f71674bbe443be21986c82c/main_kilosort3.m)" script in the repository root that creates a MATLAB struct and runs a series of functions --- requiring some means for a wrapping framework to translate between input parameters and the representation expected by the tool. Its preprocessing script combines [I/O](https://github.com/MouseLand/Kilosort/blob/a1fccd9abf13ce5dc3340fae8050f9b1d0f8ab7a/preProcess/datashift.m#L74-L77), preprocessing, and [plotting](https://github.com/MouseLand/Kilosort/blob/a1fccd9abf13ce5dc3340fae8050f9b1d0f8ab7a/preProcess/datashift.m#L57-L68), and requires data to be [loaded from disk](https://github.com/MouseLand/Kilosort/blob/a1fccd9abf13ce5dc3340fae8050f9b1d0f8ab7a/preProcess/preprocessDataSub.m#L82-L84) rather than passed as arguments to preserve memory --- making chaining in a pipeline difficult.

This is not a criticism of Datajoint or Kilosort, which were both designed for different uses and with different philosophies (that are of course, also valid). I mean this as a brief illustration of the design challenges and tradeoffs of these systems. 

We can start getting a better picture for the way a decentralized analysis framework might work by considering the separation between the metadata and code modules, hinting at a protocol as in the federated systems sketch above. In the time since the heydey of the semantic web there has been a revolution in containerization and dependency management that makes it possible to imagine extending the notion of linked data to being able to not only indicate binary data but also *executable code.* Software dependencies form a graph structure, with one top level package specifying a version range from a 1st-order dependent, which in turn has its own set of 2nd-order packages and versions, and so on. Most contemporary dependency managers (like Python's [poetry](https://python-poetry.org/), Javascript's [yarn](https://yarnpkg.com/), Rust's [cargo](https://doc.rust-lang.org/cargo/), Ruby's [Bundler](https://bundler.io/), etc.) compute an explicit dependency graph from each package's version ranges to create a 'lockfile' containing the exact versions of each package, and usually the repositories where they're located and the content hashes to verify them. More general purpose package managers like [spack](https://spack.readthedocs.io/en/latest/) {% cite gamblinSpackPackageManager2015 %}, or [nix](https://nixos.org/) {% cite dolstraNixSafePolicyFree2004 %} can also specify system-level software outside of an individual programming language, and containerization tools like [docker](https://www.docker.com/) can create environments that include entire operating systems.

Since we're considering modular analysis elements, each module would need some elemental properties like the parameters that define it, its inputs, outputs, as well as some additional metadata about its implementation (eg. this one takes *numpy arrays* and this one takes *matlab structs*). The precise implementation of a modular protocol also depends on the graph structure of the analysis pipelining system. We invoked DAGs before, but analysis graph structure of course has its own body of researchers refining them into eg. [Petri nets](https://en.wikipedia.org/wiki/Petri_net) which are graphs whose nodes necessarily alternate between "places" (eg. intermediate data) and "transitions" (eg. an analysis operation), and their related workflow markup languages (eg. [WDL](https://openwdl.org/) or {% cite vanderaalstYAWLAnotherWorkflow2005 %}). In that scheme, a framework could provide tools for converting data between types, caching intermediate data, etc. between analysis steps, as an example of how different graph structures might influence its implementation. 

The graph structure of our linked data system could flexibly extend to be continuous with these dependency pipeline graphs. With some means for a client to resolve the dependencies of a given analysis node, it would be possible to reconstruct the environment needed to run it. By example, how might a system like this work?

Say we use `@analysis` as the namespace for our specifying each analysis node's properties, and someone has provided bindings to objects in `numpy` (we'll give an example of how these bindings might work below, but for now assume they work analogously to the module structure of numpy, ie. `@numpy:ndarray == numpy.ndarray`). We can assume they are provided by the package maintainers, but that's not necessary: this is my node and it takes what I want it to! 

In pseudocode, I could define some analysis node for, say, converting an RGB image to grayscale under my namespace as `@jonny:bin-spikes` like this:

```turtle
<#bin-spikes>
  a @analysis:node
    Version ">=1.0.0"

  hasDescription
    "Convert an RGB Image to a grayscale image"

  inputType
    @numpy:ndarray
      # ... some spec of shape, dtype ...

  outputType
    @numpy:ndarray
      # ... some spec of shape, dtype ...

  params
    bin_width int
      default 10
```

I have abbreviated the specification of shape and datatype to not overcomplicate the pseudocode example, but say we successfully specify a 3 dimensional (width x height x channels) array with 3 channels as input, and a a 2 dimensional (width x height) array as output. An optional `bin_width` parameter with default "10" can also be provided.

The code doesn't run on nothing! We need to specify our node's dependencies. Say in this case we need to specify an operating system image `ubuntu`, a version of `python`, a system-level package `opencv`, and a few python packages on `pip`. We are pinning specific versions with [semantic versioning](https://semver.org/), but the syntax isn't terribly important. Then we just need to specify where the code for the node itself comes from:

```turtle
  dependsOn
    @ubuntu:"^20.*":x64
    @python:"3.8"
    @apt:opencv:"^4.*.*"
    @pip:opencv-python:"^4.*.*"
      .extraSource "https://pywheels.org/"
    @pip:numpy:"^14.*.*"

  providedBy
    @git:repository 
      .url "https://mygitserver.com/binspikes/fast-binspikes.git"
      .hash "fj9wbkl"
    @python:class "/main-module/binspikes.py:Bin_Spikes"
      method "run"
```

Here we can see the practical advantage of the "inverted" link-based system rather than an object-oriented-like approach. `@ubuntu` refers to a specific software image that would have a specific `providedBy` value, but both `@apt` and `@pip` can have different repositories that they pull packages from, and for a given version and repository there will be multiple possible software binaries for different CPU architectures, python versions, etc. Rather than needing to specify a generalized specification format, each of these different types of links could specify their own means of resolving dependencies: a `@pip` dependency requires some `@python` version to be specified. Both require some operating system and architecture. If we hadn't provided the `.extraSource` of pywheels (for ARM architectures), someone who had defined some link between a given architecture and `@pip` could be proposed as a way of finding the package. 

Our `@analysis.node` protocol gives us several slots to connect different tools together, each in turn presumably provides some minimal functionality expected by that slot: eg. `inputType` can expect `@numpy:ndarray` to specify its own dependencies, the programming language it is written in, shape, data type, and so on. Coercing data between chained nodes then becomes a matter of mapping between the `@numpy` and, say a `@nwb` namespace of another format. In the same way that there can be multiple, potentially overlapping between data schemas, it would then be possible for people to implement mappings between intermediate data formats as-needed. This gives us an opportunity to build pipelines that use tools from multiple languages, a problem typically solved by manually saving, loading, and cleaning intermediate data.

This node also becomes available to extend, say someone wanted to add an additional input format to my node:

```turtle
<@friend#bin-spikes>
  extends @jonny:bin-spikes

  inputType
    @pandas:DataFrame

  providedBy
    ...
```

They don't have to interact with my potentially messy codebase at all, but it is automatically linked to my work so I am credited. One could imagine a particular analysis framework implementation that would then search through extensions of a particular node for a version that supports the input/output combinations appropriate for their analysis pipeline, so the work is cumulative. This functions as a dramatic decrease in the size of a unit of work that can be shared.

This also gives us healthy abstraction over implementation. Since the functionality is provided by different, mutable namespaces, we're not locked into any particular piece of software --- even our `@analysis` namespace that gives the `inputType` etc. slots could be forked. We could implement the dependency resolution system as, eg. a docker container, but it also could be just a check on the local environment if someone is just looking to run a small analysis on their laptop with those packages already installed.

The relative complexity required to define an analysis node, as well as the multiple instances of automatically computed metadata like dependency graphs hints that we should be thinking about tools that avoid needing to write it manually. We could use an `Example_Framework` that provides a set of classes and methods to implement the different parts of the node (a la [luigi](https://luigi.readthedocs.io/en/stable/tasks.html)). Our `Bin` class inherits from `Node`, and we implement the logic of the function by overriding its `run` method and specify an `output` file to store intermediate data (if requested by the pipeline) with an `output` method. Our class is within a typical python package that specifies its dependencies, which the framework can detect. We also specify a `bin_width` as a `Param`eter for our node, as an example of how a lightweight protocol could be bidirectionally specified as an [interface](#shared-knowledge) to the linked data format: we could receive a parameterization from our pseudocode metadata specification, or we could write a framework with a `Bin.export_schema()` that constructs the pseudocode metadata specification from code.

```python
from Example_Framework import Node, Param, Target

class Bin(Node):
  bin_width = Param(dtype=int, default=10)

  def output(self) -> Target:
    return Target('temporary_data.pck')

  def run(self, input:'numpy.ndarray') -> 'numpy.ndarray':
    # do some stuff
    return output
```

Now that we have a handful of processing nodes, we could then describe some `@workflow`, taking some `@nwb:NWBFile` as input, as inferred by the `inputType` of the `bin-spikes` node, and then returning some output as a `:my-analysis:processed` child beneath the input. We'll only make a linear pipeline with two stages, but there's no reason more complex branching and merging couldn't be described as well. 

```turtle
<#my-analysis>
  a @analysis:workflow

  inputType 
    @jonny:bin-spikes:inputType

  outputName
    input:my-analysis:processed

  step Step1 @jonny:bin-spikes
  step Step2 @someone-else:another-step
    input Step1:output
```

Since the parameters are linked from the analysis nodes, we can specify them here (or in the workflow). Assuming literally zero abstraction and using the tried-and-true "hardcoded dataset list" pattern, something like:

<span id="myproject-analysis"></span>
```turtle
<#my-project>
  a @analysis:project

  hasDescription
    "I gathered some data, and it is great!"

  researchTopic
    @neuro:systems:auditory:speech-processing
    @linguistics:phonetics:perception:auditory-only

  inPaper
    @doi:10.1121:1.5091776 

  workflow Analysis1 @jonny:my-analysis
    globalParams
      .Step1:params:bin_width 10

    datasets
      @jonny.mydata1:v0.1.0:raw
      @jonny.mydata2:^0.2.*:raw
      @jonny.mydata3:>=0.1.1:raw
```

And there we are! The missing parameters like `outputName` from our workflow can be filled in from the defaults. Our project is an abstract representation of the analysis to be performed and where its output will be found - in this case as `:processed` beneath each dataset link. From this very general pseudocode example it's possible to imagine executing the code locally or on some remote server, pulling the data from our p2p client, installing the environment, and duplicating the resulting data to the clients configured to mirror our namespace. This system would work similar to the combination of configuration and lockfiles from package managers: we would give some abstract specification for a project's analysis, but then running it would create a new set of links with the exact dependency graph, links to intermediate products, and so on. We get some inkling of where we're going later by also being able to specify the paper this data is associated with, as well as some broad categories of research topics so that our data as well as the results of the analysis can be found. 

From here we could imagine how existing tools might be integrated without needing to be dramatically rewritten. In addition to wrapping their parameters, functions, and classes with the above `Node` class, we could imagine our analysis linking framework providing some function to let us indicate code within a package and prompt us for any missing pieces like dependency specification from, for example, old style python packages that don't require it. For packages that don't have an explicit declarative parameterization, but rely on programmatically created configuration files, we could imagine a tool ingestion function being able to extract default fields and then refer to them with a `fromConfig @yaml` link. A single tool need not be confined to a single analysis node: for example a tool that requires some kind of user interaction could specify that with an `@analysis:interactive` node type that feeds its output into a subsequent analysis node. There are infinitely more variations to be accounted for --- but adapting to them is the task of an extensible linking system.

As soon as we extend our relatively static protocol to the realm of arbitrary code we immediately face the question of security. Executing arbitrary code from many sources is inherently dangerous and worthy of careful thought, but any integrative framework becomes a common point where security practices could be designed into the system as opposed to the *relative absence of security practices of any kind* in most usages of scientific software. There is no reason to believe that this system is intrinsically more dangerous than running uninspected packages from PyPI, which, for example, have been known to [steal AWS keys and environment variables](https://blog.sonatype.com/python-packages-upload-your-aws-keys-env-vars-secrets-to-web) {% cite sharmaPythonPackagesUpload2022 %}. Having analysis code and its dependency graph specified publicly presents opportunities for being able to check for identified vulnerabilities at the time of execution --- a role currently filled by platform tools like GitHub's [dependabot](https://github.com/dependabot) or npm's [audit](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities). Running code by default in containers or virtual environments could be a way towards making code secure by default.

So that's useful, but comparable to some existing pipelining technologies. The important part is in the way this hypothetical analysis framework and markup interact with our data system --- it's worth unpacking a few points of interaction.

A dataset linked to an analysis pipeline and result effectively constitutes a "unit of analysis." If I make my data publicly available, I would be able to see all the results and pipelines that have been linked to it. Within a single pipeline, comparing the results across a grid of possible parameterizations gives us a "multiverse analysis {% cite steegenIncreasingTransparencyMultiverse2016 %}" for estimating the effects of each parameterization for free. Conversely, "rules of thumb" for parameter selection can be replaced by an evaluation of parameters and results across prior applications of the pipeline. Since some parameters like model weights in neural networks are not trivial to reproduce, and their use is linked to the metadata of the dataset they are applied to, all analyses contribute to a collection of models like the [DeepLabCut model zoo](http://www.mackenziemathislab.org/dlc-modelzoo) decreasing the need for fine tuning on individual datasets and facilitating metalearning across datasets. 

Across multiple pipelines, a dataset need no longer be dead on publication, but can instead its meaning and interpretation can continuously evolve along with the state of our tools and statistical practices. Since pipelines themselves are subject to the same kind of metadata descriptions as datasets are, it becomes to find multiple analysis nodes that implement the same operation, or to find multiple pipelines that perform similar operations despite using different sets of nodes. Families of pipelines that are applied to semantically related datasets would then become the substrate for a field's state of the art, currently buried within disorganized private code repositories and barely-descriptive methods sections. Instead of a 1:1 relationship where one dataset is interpreted once, we could have a many-to-many relationship where a cumulative body of data is subject to an evolving negotiation of interpretation over time --- ostensibly how science is *"supposed to"* work.

This system also allows the work of scientific software developers to be credited according to use, instead of according to the incredibly leaky process of individual authors remembering to search for all the citations for all the packages they may have used in their analysis. Properly crediting the work of software developers is important not only for equity, but also for the reliability of scientific results as a whole. A common admonishment in cryptography is to "never roll your own crypto," but that's how most homebrew analysis code works, and the broader state of open source scientific code is not much better without incentives for maintenance. Bugs in analysis code that produce inaccurate results are inevitable and rampant {% cite millerScientistNightmareSoftware2006 soergelRampantSoftwareErrors2015 eklundClusterFailureWhy2016a bhandarineupaneCharacterizationLeptazolinesPolar2019 %}, but impossible to diagnose when every paper writes its own pipeline. A common analysis framework would be a single point of inspection for bugs and means of providing credit to people who fix them. When a bug is found, rather than irreparably damaging collective confidence in a field, it would then be trivial to re-run all the analyses that were impacted and evaluate how their results were changed.

Finally, much like how we are building towards the social systems to support federations for sharing data, integrating analysis pipelines into a distributed network of servers is a means of realizing a generalized [Folding@Home](https://foldingathome.org/)-style distributed computing grid {% cite larsonFoldingHomeGenome2009 bebergFoldingHomeLessons2009 %}. Existing projects like F@H and the Pacific Research Platform {% cite smarrPacificResearchPlatform2018a %} show the promise of these distributed computing systems for solving previously-intractable problems, but they require large amounts of coordination and are typically centrally administered towards a small number of specific projects with specific programming requirements. With some additional community systems for governance, resource management, and access, they become tantalizingly in-reach from the system we are describing here. We will return to that possibility after discussing experimental tools.







