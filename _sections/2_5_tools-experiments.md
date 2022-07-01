Across from the tools to analyze data are those to collect it, and tools to integrate the diversity of experimental practice are a different challenge altogether: *everyone needs completely different things!* Imagine the different stages of research as a cone of complexity: at the apex we can imagine the relatively few statistical outcomes from a family of tests and models. For every test statistic we can imagine a thousand analysis scripts, for every analysis script we might expect a thousand data formats, and so the complexity of the thousand experimental tools used to collect each type of data feels ... different. 

Beyond a narrow focus of the software for performing experiments itself, the surrounding contextual knowledge work largely lacks a means of communication and organization. Methods sections have been increasingly marginalized, abbreviated, pushed to the end, and relegated to the supplement. The large body of work that is not immediately germane to experimental results, like animal care, engineering instruments, lab management, etc. have effectively no formal means of communication --- and so little formal means of credit assignment.

Extending our ecosystem to include experimental tools has a few immediate benefits: bridging the gap between collection and sharing of data would resolve the need for format conversion as a prerequisite for inclusion in the linked system, allowing the expression of data to be a fluid part of the experiment itself. It would also serve as a means of building a body of cumulative contextual knowledge in a creditable system.

I have previously written about the design of a generalizable, distributed experimental framework {% cite saundersAutopilotAutomatingBehavioral2019 %}, so to avoid repeating myself, and since many of the ideas from the section on analysis tools apply here as well, I will be relatively brief.

We don't have the luxury of a natural formalism like a DAG to structure our experimental tools. Some design constraints on experimental frameworks might help explain why: 

* They need to support a wide variety of instrumentation, from **off-the-shelf parts,** to **proprietary instruments** as are common in eg. microscopy, to **custom, idiosyncratic designs** that might make up the existing infrastructure in a lab. Writing and testing embedded code that controls external hardware is a wholly different kind of difficulty than writing analysis tools.
* To be supportive, rather than constraining, they need to be able to **flexibly perform many kinds of experiments** in a way that is **familiar to patterns of existing practice.** That effectively means being able to coordinate heterogeneous instruments in some "task" with a flexible syntax.
* They need to be **inexpensive to implement,** in terms of both money and labor, so it can't require buying a whole new set of hardware or dramatically restructuring existing research practices.
* They need to be **accessible and extensible,** with many different points of control with different expectations of expertise and commitment to the framework. It needs to be useful for someone who doesn't want to learn it to its depths, but also have a comprehensible codebase at multiple scales so that reasearchers can **easily extend** it when needed.
* They need to be designed to support **reproducibility and provenance,** which is a significant challenge given the heterogeneity inherent in the system. On one hand, being able to produce *data that is clean at the time of acquisition* simplifies automated provenance, but enabling experimental replication requires multiple layers of abstraction to keep the idiosyncracies of an experiment separable from its implementation: it shouldn't require building *exactly* the same apparatus with *exactly* the same parts connected in *exactly* the same way to replicate an experiment. 
* Ideally, they need to support **cumulative labor and knowledge organization,** so an additional concern with designing abstractions between system components is allowing work to be made portable and combinable with others. The barriers to contribution should be extremely minimal, not requiring someone to be a professional programmer to make a pull request to a central library, and contributions should come in many modes --- code is not the only form of knowing and it's far from the only thing needed to perform an experiment.

Here, as in the domains of data and analysis, the temptation to universalize is strong, and the parts of the problem that are emphasized influence the tools that are produced. A common design tactic for experimental tools is to design them as state machines, a system of states and transitions not unlike the analysis DAGs above. One such nascent project is [BEADL](https://archive.org/details/beadl-xml-documentation-v-0.1/mode/2up) {% cite wulfBEADLXMLDocumentation2020 %} from a Neurodata Without Borders [working group](https://archive.org/details/nwb-behavioral-task-wg). BEADL is an XML-based markup for standardizing a behavioral task as an abstraction of finite state machines called [statecharts](https://statecharts.github.io/). Experiments are fully abstract from their hardware implementation, and can be formally validated in simulations. The working group also describes creating a standardized ontology and metadata schema for declaring all the many variable parameters for experiments, like reward sizes, stimuli, and responses {% cite nwbbehavioraltaskwgNWBBehavioralTask2020 %}. This group, largely composed of members from the Neurodata Without Borders team, understandably emphasize systematic description and uniform metadata as a primary design principle.

Personally, I *like* statecharts. The problem is that it's not necessarily natural to express things as statecharts as you would want to, or in the way that your existing, long-developed local experimental code does. There are only a few syntactical features needed to understand the following statechart: blocks are states, they can be inside each other. Arrows move between blocks depending on some condition. Entering and exiting blocks can make things happen. Short little arrows from filled spots are where you start in a block, and when you get to the end of the chart you go back to the first one. See the following example of a statechart for controlling a light, described in the [introductory documentation](https://statecharts.dev/on-off-statechart.html) and summarized in the figure caption:

![on off delayed exit statechart, see https://statecharts.dev/on-off-statechart.html for full descriptive text](/infrastructure/assets/images/on-off-delayed-exit-1.svg)
*"When you flick a lightswitch, wait 0.5 seconds before turning the light on, then once it's on wait 0.5 seconds before being able to turn it back off again. When you flick it off, wait 2 seconds before you can turn it on again.*

They have an extensive set of documents that defend the consistency and readability of statecharts on their [homepage](https://statecharts.dev/), and my point here is not to disagree with them. My point is instead that tools that aspire to the status of generalized infrastructure can't ask people to dramatically change the way they think about and do science. There are many possible realizations of any given experiment, and each is more or less natural to every person. 

The problem here is really one of emphasis, BEADL seeks to solve problems with inconsistencies in terminology by standardizing them, and in order to do that seeks to standardize the syntax for specifying experiments.

This means of standardization has many attractive qualities and is being led by very capable researchers, but I think the project is illustrative of how the differing structures of problems constrain the possible space of tooling. Analysis tasks are often asynchronous, where the precise timing of each node's completion is less important than the path dependencies between different nodes.  Analysis tasks often have a clearly defined set of start, end, and intermediate cache points, rather than branching or cyclical decision paths that change over multiple timescales. Statecharts are a hierarchical abstraction of finite state machines, the primary advantage of which is that they are better able to incorporate continuous and history-dependent behavior, which cause state explosion in traditional finite-state machines. 

The difficulty of a controlled ontology for experimental frameworks is perhaps better illustrated by considering a full experiment. In Autopilot, a full experiment can be parameterized by the `.json` files that define the task itself and the system-specific configuration of the hardware. An [example task](https://gist.github.com/sneakers-the-rat/eebe675326a157df49f66f62c4e33a6e) from our lab consists of 7 behavioral shaping stages of increating difficulty that introduce the animal to different features of a fairly typical auditory categorization task. Each stage includes the parameters for at most 12 different stimuli per stage, probabilities for presenting lasers, bias correction, reinforcement, criteria for advancing to the next stage, etc. So just for one relatively straightforward experiment, in one lab, in one subdiscipline, there are **268 parameters** -- excluding all the default parameters encoded in the software.

How might we approach this problem differently, to accommodate diversity of thought styles and to be complementary to our data and analysis systems? The primary things we need from our experimental frameworks are a) to be able to link a particular realization of an experiment with the metadata that describes it, and b) to be able to produce similarly metadata-rich data. Rather than linked data indicating code as in our analysis frameworks, we might invert our strategy and think about code that draws from linked data. 

As an example, [Autopilot](https://docs.auto-pi-lot.com) {% cite saundersAutopilotAutomatingBehavioral2019 %} approaches the problem by avoiding standardizing *experiments* themselves, instead providing smaller building blocks of experimental tools like hardware drivers, data transformations, etc. and emphasizing understanding their use in *context.* This approach sacrifices some of the qualities of a standardized system like being a logically complete or guaranteeing a standardized vocabulary in order to better support integrating with existing work patterns and making work cumulative. Because we can't possibly predict the needs and limitations of a totalizing system, we split the problem along a different set of concerns, those of the elements of experimental practice, and give facility for describing how they are used together.

For concrete example, we might imagine the lightswitch in an autopilot-like framework like this: 

```python
from autopilot.hardware.gpio import Digital_Out
from time import sleep
from threading import Lock

class Lightswitch(Digital_Out):
  def __init__(self,
    off_debounce: float = 2,
    on_delay:     float = 0.5,
    on_debounce:  float = 0.5):
    """
    Args:
      off_debounce (float): 
        Time (s) before light can be turned back on
      on_delay (float): 
        Time (s) before light is turned on
      on_debounce (float): 
        Time (s) after turning on that light can't be turned off
    """
    self.off_debounce = off_debounce
    self.on_delay     = on_delay
    self.on_debounce  = on_debounce

    self.on = False
    self.lock = Lock()

  def switch(self):
    # use a lock to make sure if
    # called while waiting, we ignore it
    if not self.lock.acquire():
      return

    # if already on, switch off
    if self.on: 
      self.on = False
      sleep(self.off_debounce)

    # otherwise switch on
    else: 
      sleep(self.on_delay)
      self.on = True
      sleep(self.on_debounce)

    self.lock.release()
```

The class `Lightswitch` inherits from the `Digital_Out` class, which in turn inherits from `GPIO` and eventually `Hardware`. This hierarchy of inheritance carries with it a progressive refinement of meaning about what this class does. The terms `off_debounce`, `on_delay`, and `on_debounce` are certainly not part of a controlled ontology, but the context of their use bounds their meaning. Rather than being bound by, for example, the abstract `Latency` term from [interlex](https://scicrunch.org/scicrunch/interlex/view/ilx_0106040#annotations), we have defined terms that we need to make a hardware object do what we need it to. These terms don't have too much meaning on their own --- there isn't even much in this class to uniquely identify it as a "lightswitch" beyond its name, it is just a timed digital output. What makes them meaningful is how they are used. 

The way Autopilot handles various parameters are part of set of layers of abstraction that separate idiosyncratic logic from the generic form of a particular `Task` or `Hardware` class. The general structure of a two-alternative forced choice task is shared across a number of experiments, but they may have different stimuli, different hardware, and so on. Autopilot `Task`s use abstract references to classes of hardware components that are required to run them, but separates their implementation as a system-specific configuration so that it's not necessary to have *exactly the same* components plugged into *exactly the same* GPIO pins, etc. Task parameters like stimuli, reward timings, etc. are similarly split into a separate task parameterization that both allow `Task`s to be generic and make provenance and experimental history easier to track. `Task` classes can be subclasses to add or modify logic while being able to reuse much of the structure and maintain the link between the root task and its derivatives --- for example [one task we use](https://github.com/auto-pi-lot/autopilot-plugin-wehrlab/blob/9cfffcf5fe1886d25658d4f1f0c0ffe41c18e2cc/gap/nafc_gap.py#L13-L49) that starts a continuous background sound but otherwise is the same as the root `Nafc` class. The result of these points of abstraction is to allow exact experimental replication on inexactly replicated experimental apparatuses.

This separation of the different components of an experiment is a balance between reusable code and clear metadata: we might allow freedom of terminology for each individual class, but by designing the system to encourage reuse of flexible classes we reduce the number of times unique terms need to be redefined. For example, we can imagine a trivial use of our lightswitch inside a task that uses a signal from an analogue sensor to toggle the switch when it passes a certain value. While this is very similar to how Autopilot currently works, note that we are using pseudocode to indicate how it might extend the system we're describing.

<div class="draft-text">
  jonny start here 22-06-30
</div>

```python
from autopilot import Task
from autopilot.data.modeling import Field
from datetime import datetime

class Controlled_Switch(Task):
  class Params(Task.Param_Spec):
    on_delay: '@si:seconds' = Field(
        description="Delay (s) before turning light on",
        parameterizes="@jonny:hardware:Lightswitch"
      )
    threshold = 

  class TrialData(Task.TrialData_Spec):
    switch_time: datetime = Field(
        description="Timestamps for switch flicks"
      )


```

> describe code

> plugin system - how it works with the wiki, and how it facilitates the sharing of data and could then be used to pull data in about common hardware components.

> data architecture - how to make it possible for data to automatically be output into these common formats.

> 

> change bonsai example to being a well defined markup syntax, but one that mixes things together. However with a system like that we could invert the problem and use linked data to define the experiment. Our system could let us generate different experiments: eg we have a more general task structure in the metadata and then use that to separate the task from the instantiation in hardware. As we will soon see, our linked data system gives us a rich framework for designing interfaces.


In contrast, workflows in Bonsai {% cite lopesBonsaiEventbasedFramework2015a lopesNewOpenSourceTools2021 %}, another very popular and very capable experimental tool, [combine the pattern of nodes](https://github.com/bonsai-rx/bonsai-examples/blob/cbc2c1decc11e1dc1df920421ef88a16fd2e184c/RoiTrigger/RoiTrigger.bonsai) that constitute an experiment with idiosyncratic parameters like a [crop bounding box](https://github.com/bonsai-rx/bonsai-examples/blob/cbc2c1decc11e1dc1df920421ef88a16fd2e184c/RoiTrigger/RoiTrigger.bonsai#L76-L85). To be clear, I love Bonsai, and this kind of workflow reproducibility is a huge step up from the more common practice of totally lab-specific code. The flat design of Bonsai is extremely useful for prototyping and extends through to complex experiments, but would have a hard time being able to support generalizable and reusable software classes for basic experimental operations, as well as creation and negotiation over experimental terminology.

We can imagine extending the abstract specification of experimental parameters, hardware requirements, and so on to work with our federated naming system to overcome the challenges to standardizing. First, we can make explicit declarations about the relationship between our potentially very local vocabulary and other vocabularies at varying degrees of generality. Here we can declare our `Lightswitch` object and 1) link its `on_delay` to our friend `@rumbly`'s object that implements the same thing as `on_latency`, and 2) link it to a standardized `Latency` term from [interlex](https://scicrunch.org/scicrunch/interlex/view/ilx_0106040#annotations), but since that term is for time elapsed between a stimulus and behavioral response in a psychophysical context, it's only a partial match.

```turtle
<#Lightswitch>
  a @autopilot.hardware.Digital_Out

  param on_delay
    @skos:exactMatch @rumbly:LED:on_latency
    @skos:nearMatch @interlex:Latency

  providedBy
    @git:repository ...
    @python:class ...
```

Further, since our experimental frameworks are intended to handle off the shelf parts as well as our potentially idiosyncratic lightbulb class, we can link many implementations of a hardware controlling class to the product itself. Take for example the [I2C_9DOF](https://docs.auto-pi-lot.com/en/latest/hardware/i2c.html#autopilot.hardware.i2c.I2C_9DOF) class that controls a 9 degree of freedom motion sensor from [Sparkfun](https://www.sparkfun.com/products/13944) where we both indicate the specific part itself as well as the generic `ic` that it uses:

```turtle
<#I2C_9DOF>
  @autopilot.controlsHardware
    @sparkfun:13944
    @ic:LSM9DS1
```

This hints at the first steps of a system that would make our technical work more cumulative, as it is then easy to imagine being able to search for all the different implementations for a given piece of hardware. Since the `@sparkfun:13944` element can in turn specify properties like being an inertial motion sensor, this kind of linking becomes powerful very quickly to make bridges that allow similar work to be discovered and redeployed quickly.

We can also extend our previous connection between a dataset and the results of its analysis to also include the tools that were used to collect it. Say we want to declare the [example experiment](https://gist.github.com/sneakers-the-rat/eebe675326a157df49f66f62c4e33a6e) above, and then extend our `<#project-name>` project to reference it:

```turtle
<#example-experiment>
  a @autopilot:protocol

  level @autopilot:freeWater
    reward
      type @si:mL
      value 5
    graduation 
      a @autopilot:graduation:ntrials
      n_trials 200

  level @autopilot:Nafc
    stim
      @autopilot:stim:sound:Tone
        frequency 5000
        duration 100

  ...

  @autopilot:prefs
    @jonny:Lightswitch
      on_delay 1

<#project-name>
  a @jonny:project-name
  collectedBy @jonny:example-experiment
```

So while we sacrifice the direct declaration of standardized terminology and syntax, we gain the potential for a much denser and richer expressive structure for our experiments. Instead of a single authoritative dictionarylike meaning for a term, we instead appreciate it in the context of its use, linked to the code that implements it as well as the data it produces and the kinds of arguments that are made with different analysis chains. Of course there is no intrinsic conflict with this kind of freewheeling system and controlled vocabularies and syntaxes: in this system, they can be one of many means of expression rather than need to be singular sources of truth that depend on wide adoption. While individual instances of uncontrolled vocabularies might mean chaos, when they are integrated in a system of practice we get something much wilder but also more intricate, beautiful, and useful. 

As in the case of analytical tools, the role of the experimental frameworks is also to make interacting with the rest of the system easier and doesn't involve manually editing a lot of metadata. For example, currently autopilot `Task`s ask users to declare collected data as a [pytables](https://www.pytables.org/) {% cite altedPyTablesProcessingAnalyzing2003 %} datatypes like `target = tables.StringCol(1)` to record whether a target is `'L'` or `'R'`. If instead it was capable of specifying a Neurodata Without Borders data type like `target = '@nwb:behavior:BehavioralEvents'`, then it would be possible to directly output to a standardized format, potentially also automatically creating a [`BehavioralEpochs`](https://pynwb.readthedocs.io/en/stable/pynwb.behavior.html#pynwb.behavior.BehavioralEpochs) container or other data that are implied but otherwise have to be explicitly created. Autopilot already automatically tracks the entire behavioral history of an experimental subject, so we can also imagine it being able to automatically create a `@analysis:project` object described above that groups together multiple datasets that connected them to an analysis pathway. So in this example the elusive workflow where experimental data is automatically scooped up and incrementally analyzed that is typically a hard-won engineering battle within a single lab would become the normal mode of using the system.

The experimental framework described so far could solve some of the software challenges of doing experiments by providing a system for extending a set of reusable classes that can be combined into experiments and linked together, but we haven't described anything to address the rest of the contextual knowledge of practical scientific work. We also haven't described any sort of governance or development system that makes these packages anything more than "some repository on GitHub somewhere" with all the propensity to calcify into fiefdoms that those entail. This leads us back to a system of communication, the central piece of missingness that we have been circling around the whole piece. If you'll allow me one more delay, I want to summarize the system so far before finally arriving there.



---

Stuff that's common between analysis and experimental tools

- make tool development easier: Linking domains of data manipulation with analysis makes developing tools easier. Rather than having to reimplement basic routines like data loading and parameterization, developers can contribute to and use methods from a common framework. Since we aren't intending a single framework, but instead a means of linking them, it is possible to spread development of different features beyond the core team, so for example creating links from varying data formats would expand the scope of data a tool is useful for. 

<div class="draft-text" markdown="1">

Todo:

- DANDI is already doing this with tools built on top of NWB.

Experimental tools:
- we intended the bonsai example to be positive dang it! the xml description is good!
- rewrite autopilot description in light of data module!
- main revision should be that with experimental tools we probably need to go the other direction: rather than being able to specify experiments post-hoc we need experimental tools that can specify their data and dump it out into linked data format. 
</div>



