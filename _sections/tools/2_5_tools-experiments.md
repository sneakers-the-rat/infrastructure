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

This separation of the different components of an experiment is a balance between reusable code and clear metadata: we might allow freedom of terminology for each individual class, but by designing the system to encourage reuse of flexible classes we reduce the number of times unique terms need to be redefined. For example, we can imagine a trivial use of our lightswitch inside a task measuring an experimental subject's estimation of time intervals: we toggle the switch once some analog sensor reaches a certain threshold, and then the subject tries to press a button at the same time as the light turns on after a fixed delay. While this is very similar to how Autopilot currently works, note that we are using pseudocode to indicate how it might extend the system we're describing.

```python
from autopilot import Task
from autopilot.data.modeling import Field
from datetime import datetime, timedelta

class Controlled_Switch(Task):
  """
  A [[Discipline::Psychophysics]] experiment 
  to measure [[Research Topic::Interval Estimation]].
  """

  class Params(Task.Param_Spec):
    on_delay: '@si:seconds' = Field(
        description="Delay (s) before turning light on",
        parameterizes="@jonny:hardware:Lightswitch")
    threshold: float = Field(
        description="Flick switch above this value",
        is_a="@interlex:Threshold")

  class TrialData(Task.TrialData_Spec):
    switch_time: datetime = Field(
        description="Time the switch was flicked")
    target_time: datetime = Field(
        description="Time the subject should respond")
    response_time: datetime = Field(
        description="Time the subject did respond")
    error: timedelta = Field(
        description="Difference between target and response",
        is_a="@psychophys:ReactionTime")


  HARDWARE = {
    'sensor': 'Analog_In',
    'button': 'Digital_In',
    'lightswitch': '@jonny:hardware:Lightswitch'
  }

  def __init__(self, 
      on_delay:float, 
      threshold:float):
    self.on_delay = on_delay
    self.threshold = threshold

    super(Controlled_Switch, self).__init__()
    self.poll()

  def poll(self):
    while self.running:
      if self.hardware['sensor'].value > self.threshold:
        self.hardware['lightswitch'].switch()
        switch_time = datetime.now()
        target_time = switch_time + self.on_delay

        # Wait for the subject to press the button
        response_time = self.hardware['button'].wait()

        # Send the data for storage
        self.node.send(key="DATA", value={
            'switch_time': switch_time,
            'target_time': target_time,
            'response_time': response_time,
            'error': target_time - response_time
          })
```

In this example, we first define a data model (see section 3.2 - Data in {% cite saundersAUTOPILOTAutomatingExperiments2022 %}) for the Tasks `Params`, the data that the task produces as `TrialData`, and the `HARDWARE` that the task uses. Our `Params` each have a [type hint](https://peps.python.org/pep-0483/) indicating what type of data they are, as well as a `Field` that gives further detail about them. Specifically, we have exposed the Lightswitch's `on_delay` parameter, indicated that it will be in seconds by referring to some namespace that defines SI units `@si` and that it parameterizes the lightswitch object that we defined above. The `TrialData` is similarly annotated, and by default Autopilot will use this specification to create an hdf5 table to store the values. The `HARDWARE` dictionary makes abstract references the hardware objects that will be made available in the task, each of which would have its configuration --- which GPIO pin they are plugged into, the polarity of the signal, etc. --- using some local system configuration. Finally, the single `poll()` method continuously compares the value of the sensor to the threshold, switches the lightswitch when the threshold is crossed, records the time the button was pressed, and sends it for storage with its network node.

As before, we are using our experimental framework as an interface to our linked data system. Currently, Autopilot uses a [semantic wiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) to organize technical knowledge and to share [plugins](https://docs.auto-pi-lot.com/en/latest/guide/plugins.html) - [https://wiki.auto-pi-lot.com](https://wiki.auto-pi-lot.com). In this case, I would write my task and hardware classes inside a git repository and then add them to Autopilot's [plugin registry](https://wiki.auto-pi-lot.com/index.php/Autopilot_Plugins), which uses a [form](https://wiki.auto-pi-lot.com/index.php/Form:Autopilot_Plugin) to fill in semantic properties and allows further annotation in free text and semantic markup.

We could instead imagine being able to document the task in its [docstring](https://peps.python.org/pep-0257/), including describing the relevant subdiscipline, research topic, and any other relevant metadata. Rather than manually entering it in the wiki, then, we might export the triplet annotations directly from the class and make them available from my `@jonny` namespace and mirroring that to the wiki. Since the plugin specifies its dependencies using standard Python tools, it would then be possible for other researchers to use its task and hardware objects by referring to them as above.

In our pseudocode, the (abbreviated) exported metadata for this task might look like this:


```turtle
<#tasks:Controlled_Switch>
  a @autopilot:Task

  hasDescription
    "A Psychophysics experiment 
    to measure Interval Estimation."

  Discipline "Psychophysics"
  Research_Topic "Interval Estimation"

  Params
    on_delay @si:seconds
      hasDescription "..."
      parameterizes @jonny:hardware:Lightswitch
    ...

  TrialData
    switch_time @python:datetime
    ...

  usesHardware
    @autopilot:hardware:Analog_In
      hasID "sensor"
    @autopilot:hardware:Digital_In
      hasID "button"
    @jonny:hardware:Lightswitch
      hasID "lightswitch"
```

and we might combine it with metadata that describes our particular use of it like this, where we combine that task with a series of other `level`s that shape the behavior, make it more challenging, or measure something else entirely:

<span id="myproject-experiment"></span>
```turtle
<#projects:my-project>
  a @autopilot:protocol
  experimenter @jonny
  ...

  level @jonny:tasks:Controlled_Switch
    on_delay 2
    threshold 0.5
    graduation @autopilot:graduation:ntrials
      n_trials 200

  level @jonny:tasks:Another_Task
    ...

  hardwareConfig
    button @autopilot:hardware:Digital_In
      gpioPin 17
      polarity 1
    sensor @autopilot:hardware:Analog_In
      usesPart @apwiki:parts:<Part_Number>
      ...
```

On the other side, our output data can be automatically exported to NWB[^nwbisanexample]. Our experimental framework knows that data contained within a `TrialData` model is a `@nwb:behavior:BehavioralEvents` object, and can combine it with the metadata in our task docstring and system configuration. If we needed more specific data export - say we wanted to record the timeseries of the analog sensor - we could use the same `is_a` parameter to declare it as a `@nwb:TimeSeries` and create an extension to store the metadata about the sensor alongside it[^autopilotv050].

[^nwbisanexample]: Recall that we're using NWB for the sake of concreteness, but this argument applies to any standardized data format.

[^autopilotv050]: Though this is a description of something we could build towards, v0.5.0 (at the time of writing released as alpha) of Autopilot has a [data modeling](https://docs.auto-pi-lot.com/en/latest/changelog/v0.5.0.html) framework that should make this possible in future versions.

So while our code is mildly annotated and uses a mixture of standard and nonstandard terminology, we make use of the structure of the experimental framework to generate rich provenance to understand our data and task in context. It's worth pausing to consider what this means for our infrastructural system as a whole

To start, we have a means of integrating our task with the knowledge that precedes it in the hardware and system configuration that runs it. In addition to documenting plugins, among others, the Autopilot wiki also has schema for [custom built](https://wiki.auto-pi-lot.com/index.php/Autopilot_Behavior_Box) and [off-the-shelf](https://wiki.auto-pi-lot.com/index.php/Parts) hardware like [sensors](https://wiki.auto-pi-lot.com/index.php/TT_Electronics_OPB901L55) and [sound cards](https://wiki.auto-pi-lot.com/index.php/HiFiBerry_Amp2). These correspond to local hardware configuration entries that link them to the hardware classes required to use them[^futureversions]. That link can be used bidirectionally: metadata about the hardware used to perform an experiment can be used in the experiment and be included with the produced data data, but the data from experiments can also be used to document the hardware. That means that usage data like calibrations and part longevity can be automatically collected and contributed to the wiki and then used to automatically configure hardware in future uses. This makes using the experimental framework more powerful, but also makes building a communal library of technical knowledge a normal part of doing experiments. Though the wiki is a transitional medium towards what we will discuss in the next section, since contributions are tracked and versioned that allows a currently undervalued class of knowledge work to be creditable. 

[^futureversions]: Not yet, but this is planned development for future versions.

This gives us a different model of designing and engineering experiments than we typically follow. Rather than designing most of it from scratch or decoding cryptic methods sections, researchers could start with a question and basic class of experiment, browse through various implementations based on different sets of tools, see which hardware they and analogous experiments use, which is then linked to the code needed to run it. From some basic information researchers would then be most of the way to performing an experiment: clone the task, download the necessary system configuration information to set up the hardware, make incremental modifications to make the experiment match what they had designed, all the while contributing and being credited for their work.

Much of this is possible because of the way that Autopilot isolates different components of an experiment: hardware is defined separately from tasks, both are separate from their local configuration. In addition to thinking about how to design tools for our infrastructural system, we can also think of the way it might augment existing tools. Another widely used and extremely capable tool, Bonsai {% cite lopesBonsaiEventbasedFramework2015a lopesNewOpenSourceTools2021 %}, is based on XML documents that [combine the pattern of nodes](https://github.com/bonsai-rx/bonsai-examples/blob/cbc2c1decc11e1dc1df920421ef88a16fd2e184c/RoiTrigger/RoiTrigger.bonsai) that constitute an experiment with specific parameters like a [crop bounding box](https://github.com/bonsai-rx/bonsai-examples/blob/cbc2c1decc11e1dc1df920421ef88a16fd2e184c/RoiTrigger/RoiTrigger.bonsai#L76-L85). That makes sharing and reusing tasks difficult without exactly matching the original hardware configuration, but we could use our metadata system to *generate* code for Bonsai in addition to consuming data from it. Given some schematic pattern of nodes that describes the operation of the experiment, we could combine that with the same notion of separable parameterization and hardware configurations as we might use in Autopilot to generate the XML for a bonsai workflow. As with analytical tools, our infrastructural system could be used to make a wide array of experimental tools interoperable with an evolving set of vernacular metadata schema. 

Together, our data, experimental, and analytical infrastructures would dramatically reshape what is possible in science. What we've described is a complete provenance chain that can be traced from analyzed results back through to the code and hardware used to perform the experiment. Trivially, this makes the elusive workflow where experimental data is automatically scooped up and analyzed as soon as it is collected that is typically a hard-won engineering battle within a single lab the normal mode of using the system. Developing tools that give researchers control over the mode of exported data renders the act of cleaning data effectively obsolete. The role of our experimental tool is to be able to make use of collected technical knowledge, but also to lower the barriers to using the rest of the system by integrating it with normal experimental practice.

The effects on collaboration and metascience are deeper though. Most scientific communication describes collecting and analyzing a single dataset. Making sense of many experiments is only possible qualitatively as a review or quantitatively as meta-analysis. Even if we have a means of linking many datasets and analysis pipelines as in the previous section, the subtle details in how a particular experiment is performed matter: things as small as milliseconds of variation in valve timings through larger differences in training sequences or task design powerfully influence the collected data. This makes comparing data from even very similar experiments --- to say nothing of a class of results from a range of different experiments --- a noisy and labor-intensive statistical process, to the degree that it's possible at all. This system extends the horizon of meta-analysis to the experiment itself and turns experimental heterogeneity into a strength rather than a weakness. Is some result a byproduct of some unreported parameter in the experimental code? Is a result only visible when comparing across these different conditions? Individual experiments only allow a relatively limited set of interpretations and inferences to be drawn, but being able to look across the variation in experimental design would allow phenomena to be described in the full richness supported by available observations. 

This would also effectively dissolve the "file drawer problem." {% cite sterlingPublicationDecisionsTheir1959 francoPublicationBiasSocial2014 %} Though malice is not uncommon in science, I think it's reasonably fair to assume that most researchers do not withhold data given a null result in order to "lie" about an effect, but because there is no reward for a potentially laborious cleaning and publication process. Collecting data that is clean and semantically annotated at the time of acquisition resolves the problem. Even without the analysis or paper, being able to index across experiments of a particular kind would make it possible to have a much fairer look at a landscape distorded by the publication process and prevent us from repeating the same experiments because no one has bothered to publish the null. This would also open new avenues for collaboration as we will explore in the next section.
