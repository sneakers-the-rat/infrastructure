Straddling our system for sharing data are the tools to gather and analyze it. Experimental and analytical tools are the natural point of extension for collectively developed scientific digital infrastructure, and considering them together shows the combinatoric power of integrating interoperable domains of scientific practice. In particular, in addition to benefits from their development in isolation, we can ask how a more broadly integrated system helps problems like adoption and incentives for distributed work, enables a kind of deep provenance from experiment to results, and lets us reimagine the form of the community and communication tools for science.

This section will be relatively short compared to [shared data](#shared-data). We have already introduced, motivated, and exemplified many of the design practices of the broader infrastructural system. There is much less to argue against or "undo" in the spaces of analytical and experimental tools because so much more work has been done, and so much more power has been accrued in the domain of data systems. Distributed computing does have a dense history, with huge numbers of people working on the problem, but its hegemonic form is much closer to the system articulated below than centralized servers are to federated semantic p2p systems. I also have written extensively about [experimental frameworks](#experimental-frameworks) before {% cite saundersAutopilotAutomatingBehavioral2019 %}, and develop [one of them](https://docs.auto-pi-lot.com/en/latest/) so I will be brief at risk of repeating myself or appearing self-serving.

!! both these sections are also relatively unstandardized, so before jumping to some protocol just yet, we can build frameworks that start congealing the pieces en route to one.

Integrated scientific workflows have been written about many times before, typically in the context of the "open science" movement. One of the founders of the Center for Open Science, Jeffrey Spies, described a similar ethic of toolbuilding as I have in a 2017 presentation:

> Open Workflow:
> 1. Meet users where they are
> 2. Respect current incentives
> 3. Respect current workflow
>
> We could... demonstrate that it makes research more efficient, of higher quality, and more accessible.
>
> Better, we could... demonstrate that researchers will get published more often.
>
> Even better, we could... make it easy
>
> Best, we could... make it automatic {% cite spiesWorkflowCentricApproachIncreasing2017 %}

To build an infrastructural system that enables "open" practices, *convincing* or *mandating* a change are much less likely to be successful and sustainable than focusing on building them to make doing work easier and openness automatic. To make this possible, we should focus on developing *frameworks to build* experimental and analysis tools, rather than developing more tools themselves. 

### Analytical Framework

The first natural companion of shared data infrastructure is a shared analytical framework. A major driver for the need for everyone to write their own analysis code largely from scratch is that it needs to account for the idiosyncratic structure of everyone's data. Most scientists are (blessedly) not trained programmers, so code for loading and negotiating loading data is often intertwined with the code used to analyze and plot it. As a result it is often difficult to repurpose code for other contexts, so the same analysis function is rewritten in each lab's local analysis repository. Since sharing raw data and code is still a (difficult) novelty, on a broad scale this makes results in scientific literature as reliable as we imagine all the private or semi-private analysis code to be.

Analytical tools (anecdotally) make up the bulk of open source scientific software, and range from foundational and general-purpose tools like numpy {% cite harrisArrayProgrammingNumPy2020 %} and scipy {% cite virtanenSciPyFundamentalAlgorithms2020 %}, through tools that implement a class of analysis like DeepLabCut {% cite mathisDeepLabCutMarkerlessPose2018a %} and scikit-learn {% cite pedregosaScikitlearnMachineLearning2011 %}, to tools for a specific technique like MoSeq {% cite wiltschkoRevealingStructurePharmacobehavioral2020 %} and DeepSqueak {% cite coffeyDeepSqueakDeepLearningbased2019 %}. The pattern of their use is then to build them into a custom analysis system that can then in turn range in sophistication from a handful of flash-drive-versioned scripts to automated pipelines. 

Having tools like these of course puts researchers miles ahead of where they would be without them, and the developers of the mentioned tools have put in a tremendous amount of work to build sensible interfaces and make them easier to use. No matter how much good work might be done, inevitable differences between APIs is a relatively sizable technical challenge for researchers --- a problem compounded by the incentives for fragmentation described previously. For toolbuilders, many parts of any given tool from architecture to interface have to be redesigned with varying degrees of success each time. For science at large, with few exceptions of well-annotated and packaged code, most results are only replicable with great effort. 

To be clear, we have reached levels of "not the developer's fault" to the tune of "API discontinuity" being *"the norm for 99% of software."* Negotiating boundaries between (and even within) software and information structures is an elemental part of computing. The only time it becomes a conceivable problem to "solve" is when the problem domain coalesces to the point where it is possible to articulate its abstract structure as a protocol, and the incentives are great enough to adopt it. Thankfully that's what we're trying to do here. 

It's unlikely that we will solve the problem of data analysis being complicated, time consuming, and error prone by teaching every scientist to be a good programmer, but we can build experimental frameworks that make analysis tools easier to build and use. 

Specifically, a shared analytical framework should be 

* **Modular** - Rather than implementing an entire analysis pipeline as a monolith, the system should be broken into minimal, composable modules. The threshold of what constitutes "minimal" is of course to some degree a matter of taste, but the framework doesn't need to make normative decisions like that. The system should support modularity by providing a clear set of hooks that tools can provide: eg. a clear place for a given tool to accept some input, parameters, and so on. Since data analysis can often be broken up into a series of relatively independent stages, a straightforward (and common) system for modularity is to build hooks to make a directed acyclic graph (DAG) of data transformation operations. This structure naturally lends itself to many common problems: caching intermediate results, splitting and joining multiple inputs and outputs, distributing computation over many machines, among others. Modularity is also needed within the different parts of the system itself -- eg. running an analysis chain shouldn't require a GUI, but one should be available, etc.
* **Pluggable** - The framework needs to provide a clear way of incorporating external analysis packages, handling their dependencies, and exposing their parameters to the user. Development should ideally not be limited to a single body of code with a single mode of governance, but should instead be relatively conservative about requirements for integrating code, and liberal with the types of functionality that can be modified with a plugin. Supporting plugins means supporting people developing tools for the framework, so it needs to make some part of the toolbuilding process easier or otherwise empower them relative to an independent package. This includes building a visible and expressive system for submitting and indexing plugins so they can be discovered and credit can be given to the developers. Reciprocal to supporting plugins is being interoperable with existing and future systems, which the reader may have assumed was a given by now.
* **Deployable** - For wide use, the framework needs to be easy to install and deploy locally and on computing clusters. A primary obstacle is dependency management, or making sure that the computer has everything needed to run the program. Some care needs to be taken here, as there are multiple emphases in deployability that can be in conflict. Deployable for who? A system that can be relatively challenging to use for routine exploratory data analysis but can distribute analysis across 10,000 GPUs has a very circumscribed set of people it is useful for. This is a matter of balancing design constraints, but we should prioritize broad access, minimal assumptions of technological access, and ease of use over being able to perform the most computationally demanding analyses possible when in conflict. Containerization is a common, and the most likely strategy here, but the interface to containers may need a lot of care to make accessible compared to opening a fresh .py file.
* **Reproducible** - The framework should separate the *parameterization* of a pipeline, the specific options set by the user, and its *implementation*, the code that constitutes it. The parameterization of a pipeline or analysis DAG should be portable such that it, for example, can be published in the supplementary materials of a paper and reproduced exactly by anyone using the system. The isolation of parameters from implementation is complementary to the separation of metadata from data and if implemented with semantic triplets would facilitate a continuous interface from our data to analysis system. This will be explored further below and in [shared knowledge](#shared-knowledge)

Thankfully a number of existing projects that are very similar to this description are actively being built. One example is [DataJoint](https://datajoint.io/) {% cite yatsenkoDataJointSimplerRelational2018 %}, which recently expanded its facility for modularity with its recent [Elements](https://github.com/datajoint/datajoint-elements) project {% cite yatsenkoDataJointElementsData2021 %}. Datajoint is a system for creating analysis pipelines built from a graph of processing stages (among [other features](https://docs.datajoint.org/python/v0.13/intro/01-Data-Pipelines.html#what-is-datajoint)). It is designed around a refinement on traditional relational data models, which is reflected throughout the system as most operations being expressed in its particular schema, data manipulation, and query languages. This is useful for operations that are expressed in the system, but makes it harder to integrate external tools with their dependencies --- [at the moment](https://github.com/datajoint/element-array-ephys/blob/1fdbcf12d1a518e686b6b79e9fbe77b736cb606a/Background.md) it appears that spike sorting (with [Kilosort](https://github.com/MouseLand/Kilosort) {% cite pachitariuKilosortRealtimeSpikesorting2016 %}) has to happen outside of the extracellular electrophysiology elements pipeline.

Kilosort is an excellent and incredibly useful tool, but its idiomatic architecture designed for standalone use is illustrative of the challenge of making a general-purpose analytic framework that can integrate a broad array of existing tools. It is built in MATLAB, which requires a paid license, making arbitrary deployment difficult, and MATLAB's flat path system requires careful and usual manual orchestration of potentially conflicting names in different packages. Its parameterization and use are combined in a "[main](https://github.com/MouseLand/Kilosort/blob/db3a3353d9a374ea2f71674bbe443be21986c82c/main_kilosort3.m)" script in the repository root that creates a MATLAB struct and runs a series of functions --- requiring some means for a wrapping framework to translate between input parameters and the representation expected by the tool. Its preprocessing script combines [I/O](https://github.com/MouseLand/Kilosort/blob/a1fccd9abf13ce5dc3340fae8050f9b1d0f8ab7a/preProcess/datashift.m#L74-L77), preprocessing, and [plotting](https://github.com/MouseLand/Kilosort/blob/a1fccd9abf13ce5dc3340fae8050f9b1d0f8ab7a/preProcess/datashift.m#L57-L68), and requires data to be [loaded from disk](https://github.com/MouseLand/Kilosort/blob/a1fccd9abf13ce5dc3340fae8050f9b1d0f8ab7a/preProcess/preprocessDataSub.m#L82-L84) rather than passed as arguments to preserve memory --- making chaining in a pipeline difficult.

This is not a criticism of Datajoint or Kilosort, which were both designed for different uses and with different philosophies (that are of course, also valid). I mean this as a brief illustration of the design challenges and tradeoffs of these systems. 

---

<div id="draftmarker"><h1># draftmarker</h1><br>~ everything past here is purely draft placeholder text ~  </div>

We can start getting a better picture for the way a decentralized analysis framework might work by considering the separation between the metadata and code modules, hinting at a protocol as in the federated systems sketh above. Since we're considering modular analysis elements, each module would need some elemental properties like the parameters that define it, its inputs, outputs, dependencies, as well as some additional metadata about its implementation (eg. this one takes *numpy arrays* and this one takes *matlab structs*). The precise implementation of a modular protocol also depends on the graph structure of the analysis system. We invoked DAGs before, but analysis graph structure of course has its own body of researchers refining them into eg. [Petri nets](https://en.wikipedia.org/wiki/Petri_net) which are graphs whose nodes necessarily alternate between "places" (eg. intermediate data) and "transitions" (eg. an analysis operation), and their related workflow markup languages (eg. [WDL](https://openwdl.org/) or {% cite vanderaalstYAWLAnotherWorkflow2005 %}). In that scheme, a framework could provide tools for converting data between types, caching intermediate data, etc. between analysis steps, as an example of how different graph structures might influence its implementation.

Say we use `@analysis` as the namespace for our analysis protocol, and `~someone~` has provided mappings to objects in `numpy`. We can assume they are provided by the package maintainers, but that's not necessary: this is my node and it takes what I want it to! 

In pseudocode, I could define some analysis node for, say, converting an RGB image to grayscale under my namespace as `@jonny:bin-spikes` like this:

```

<#bin-spikes>
  a @analysis.node
    Version >=1.0.0

  hasDescription
    "Convert an RGB Image to a grayscale image"

  inputType
    @numpy:ndarray
      # ... some spec of shape ...

  outputType
    @numpy:ndarray
      # ... some spec of shape ...
```

I have abbreviated the specification of shape to not overcomplicate the pseudocode example, but say we successfully specify a 3 dimensional (width x height x channels) array with 3 channels as input, and a a 2 dimensional (width x height) array as output.

The code doesn't run on nothing! We need to specify our node's dependencies, say in this case we need to specify an operating system image `ubuntu`, a version of `python`, a system-level package `opencv`, and a few python packages on `pip`. We are pinning specific versions with [semantic versioning](https://semver.org/), but the syntax isn't terribly important. Then we just need to specify where the code for the node itself comes from:

```
  dependsOn
    @ubuntu:^20.*:x64
    @python:3.8
    @apt:opencv:^4.*.*
    @pip:opencv-python:^4.*.*
    @pip:numpy:^14.*.*

  providedBy
    @git:repository https://mygitserver.com/binspikes/fast-binspikes.git
      @git:hash fj9wbkl
    @python:class /main-module/binspikes.py:Bin_Spikes
```

Here we can see the advantage of being able to mix and match different namespaces in a practical sense. Our `@analysis.node` protocol gives us several slots to connect different tools together, each in turn presumably provides some minimal functionality expected by that slot: eg. `inputType` can expect `@numpy:ndarray` to specify its own dependencies, the programming language it is written in, shape, data type, and so on. Coercing data between chained nodes then becomes a matter of mapping between the `@numpy` and, say a `@nwb` namespace of another format. In the same way that there can be multiple, potentially overlapping between data schemas, it would then be possible for people to implement mappings between intermediate data formats as-needed. 

This node also becomes available to extend, say someone wanted to add an additional input format to my node:

```
<@friend#bin-spikes>
  a @jonny:bin-spikes

  inputType
    @pandas:DataFrame

  providedBy
    ...
```

They don't have to interact with my potentially messy codebase at all, but it is automatically linked to my work so I am credited. One could imagine a particular analysis framework implementation that would then search through extensions of a particular node for a version that supports the input/output combinations appropriate for their analysis pipeline, so the work is cumulative. This functions as a dramatic decrease in the size of a unit of work that can be shared.

This also gives us healthy abstraction over implementation. Since the functionality is provided by different, mutable namespaces, we're not locked into any particular piece of software --- even our `@analysis` namespace that gives the `inputType` etc. slots could be forked. We could implement the dependency resolution system as, eg. a docker container, but it also could be just a check on the local environment if someone is just looking to run a small analysis on their laptop with those packages already installed.

We use providedBy to indicate a python class which implements the node in code. 

Where I could implement the code for one of them by, for example, providing a set of methods to implement the different parts of the node (a la [luigi](https://luigi.readthedocs.io/en/stable/tasks.html)). This lets us implement the logic of the node directly in the method, but also provides a very thin wrapper that we can place around existing tools. Here I'll show an example that sets some of the metadata in the preceding spec in the code --- since we assume that `Example_Framework` is only one of many that implements the workflow syntax, our framework is designed to let people write nodes easily and then export their metadata as-needed.

```python
from Example_Framework import Node, Param, Types

class Bin(Node):
  bin_width = Param(dtype=int, default=10)
  input_format = 

  def input(self, input_1: Types[some_typinglike_example]):
    # validate
    self.input = input_1

  def process() -> typing[output_type]:
    # some stuff!
    return [answer]
```

Then I could describe some workflow like this, using some .wdl-like pseudocode:

```
workflow @jonny.mydata {
  Input InputAlias < @nwb:NWBFile
  Output InputAlias:processed

  Param ParamAlias < Step2.param1.type

  step Step1 { input: InputAlias.neurophys }
  step Step2 { 
    input: Step1.output.value, 
    param1: ParamAlias 
  }
  split Step3_1 { input: Step2.output1.value}
}
```

!! explain markup, make sure the input/output/etc. param names are recursively valid with nodes.

Having kept the description of our data in particular abstract from the implementation of the code and the workflow specification, we now have a reusable workflow we can apply to all of our datasets! Assuming literally zero abstraction and using the tried-and-true "hardcoded dataset list" pattern, something like:

```
project @jonny:project_name {
  analyze @jonny.mydata:v0.1.0:raw { 
    Input=@jonny:cool-dataset1, Param="hi!" 
    } ->  @jonny.mydata:v0.1.0:processed
  analyze @jonny.mydata2:^0.1.*:raw { 
    Input=@jonny:cool-dataset1, Param="hi!" 
      } -> @jonny.mydata2:-:processed
}
```

So that's useful, but the faint residue of "well actually" that hangs in the air while people google the link for that xkcd comic about format expansion is not lost on me. The magic is in the way this hypothetical analysis framework and markup interact with our data system and emerging federated metadata system --- The layers of abstraction here are worth unpacking.

-  First, the markup description of the node gives us abstraction from programming language and implementation. This lets us do stuff like use multiple tools with competing environmental needs, adapt to multiple versions of the code markup as it develops, etc. Note the interaction with the rest of the metadata system: because we required a particular type of data file, and that link should provide us some means of opening/instantiating the file with dependencies, we didn't need to write loading code. Since it's in a linked system, someone could override the implementation of my node -- say someone comes up with a faster means of binning, then they just inherit from my node and replace the reference to the code. Boom we have cumulative and linked development.
- The separation of the node from the workflow means that the node can be shared and swapped and reintegrated easily, dramatically reducing the brittleness of the systme. Since there is no restriction on what constitutes a node, though, there's no reason that nodes can't be either made massive, like putting a whole library in the process method, or be packaged up together. If we made the argument and method names recursive between the workflow and the node objects then tooling could automatically traverse multiple layers of node/workflow combinations at different levels of abstraction. This being a schematic description means that there can be multiple "workflow runner" packages that eg. distribute the task across a billion supercomputers or not. 
- Finally, the separation between the data applied and the workflow itself are very cool indeed given our linked and namespaced system. My workflow effectively constitutes "an unit of analysis." I have linked my data to this unit of analysis. Play out the permutations: 

    - I can see all the analyses that this particular pipeline has been applied to. Since it is embedded within the same federated system as our schema system, I can draw and connect semantic links to similar analysis pipelines as well as pipeline/data combinations. 
    - I can see all the different analyses that have been applied to my data: if my data is analyzed a zillion different times, in a zillion different combinations of data, I effectively get a "multiverse analysis" (cite dani) and we get to measure robustness of my data for free. It also gets to live forever and keep contributing to problems !! and i also get credited for it automatically by golly! This also applies on cases like cross-validation or evaluating different models on the same data: the versioning of it falls out naturally. Also since model weights would be an input to an analysis chain, we also get stuff like DLC's model zoo where we can share different model weights, combine them, and have a cumulative library of pretrained models as well!
    - being able to look across the landscape... we start being able to actually really make cumulative progress on best practices. A common admonishment in cryptographically-adjacent communities is to "never roll your own crypto," because your homebrew crypto library will never be more secure than reference implementations that have an entire profession of people trying to expose and patch their weaknesses. Bugs in analysis code that produce inaccurate results are inevitable and rampant {% cite millerScientistNightmareSoftware2006 soergelRampantSoftwareErrors2015 eklundClusterFailureWhy2016a bhandarineupaneCharacterizationLeptazolinesPolar2019 %}, but impossible to diagnose when every paper writes its own pipeline. A common analysis framework would be a single point of inspection for bugs, and facilitate re-analysis and re-evaluation of affected results after a patch. 
    - looking forward, we might imagine our project object being linked to a DOI... we'll get there.


!! this is all extraordinarily reproducible because even though I have my portable markup description of the analysis, I can just refer to it by name in my paper (ya ya need some content based hash or archive but you get the idea)

!! since we have a bunch of p2p systems all hooked up with constantly-running daemons, to compete with the compute side of cloud technology we also should implement a voluntary compute grid akin to  [Folding@Home](https://foldingathome.org/). This has the same strawmen and answers to them as the peer-to-peer system --- no i'm not saying everyone puts their shitty GPU up, but it lets us combine the resources that are present at an institutional level and makes a very cheap onramp for government-level systems to be added to the mix.

!! this is all very exciting, and we can immediately start digging towards larger scientific problems, eg. what it would mean for the file drawer problem and publication bias when the barriers to analyzing data are so low you don't even need to write the null result: the data is already there, semantically annotated and all. Dreams of infinite meta-analyses across all data and all time, but hold your horses! We don't get magic for free, we haven't talked about the community systems yet that are the unspoken glue of all of this!!

!! continue the example of needing to select within datasets instead of metadata from federation section.


