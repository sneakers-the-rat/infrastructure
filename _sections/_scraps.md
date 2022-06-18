d
# scraps 

!! this is also an ethical disposition: contrast data standardization and archiving being cumbersome, difficult, and with no personal return forcing people to do it by caveats in grant proposals or requirements in publication. vs. wanting to curate data because it gives you access to tools, makes you part of a community, and you can see the positive impacts of a growing cumulative datastore that doesn't feel like a vacant warehouse. We don't need to resort to authoritarianism to get to 'open science' as has plagued the open science community as of late, devolving into a purity contest and widescale bullying and shit!!


[^transgenes]: An abbreviated sample for the sake of illustration: 
	
	```
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
	```



------------------

# analysis


Perhaps more idealistic is the possibility of a new kind of scientific consensus. Scientific consensus is subtle and elusive, but to a very crude approximation two of the most common means of its expression are review papers and meta-analyses. Review papers make a prose argument for a consensus interpretation of a body of literature. Meta analyses do the same with secondary analyses, most often on the statistics reported in papers rather than the raw data itself. Both are vulnerable to sampling problems, where the author of a review may selectively cite papers to make an argument, and meta-analyses might be unable to recover all the relevant work from incomplete search and data availability. Instead if one could index across all data relevant to a particular question, and aggregate the different pipelines used to analyze it, it would be possible to make statements of scientific consensus rooted in a full provenance chain back to the raw data.

More fundamentally, a shared data and analysis framework would change the nature of secondary analysis. Increasing rates of data publication and the creation of large public datasets like those of the Allen Observatory make it possible for metascientists and theoreticians to re-analyze existing data with new methods and tools. There is now such a need for secondary analysis that the NIH, among other organizations, is providing [specific funding opportunities](https://grants.nih.gov/grants/guide/rfa-files/rfa-mh-20-120.html) to encourage it. Secondary analyses are still (unfortunately) treated as second-class research, and are limited to analyzing one or a small number of datasets due to the labor involved and the diversity of analytical strategies that makes a common point of comparison different. If, say some theoretician were to develop some new analytical technique that replaced some traditional step in a shared processing pipeline, in our beautiful world of infrastructure it would be possible to not only aggregate across existng analyses, as above, but apply their new method across an entire category of research. 

In effect, analytical infrastructure can at least partially "decouple" the data in a paper from its analyis, and thus the interpretations offered by the primary researchers. For a given paper, if it was possible to see its results as analyzed by all the different processing pipelines that have been applied to it, then a set of observations remains a living object rather than a fixed, historical object frozen in carbonite at the time of publication. In addition to statements of consensus that can programmatically aggregate *existing* results as described by the primary researchers, it also becomes possible to make *fluid* statements of consensus, such that a body of data when analyzed with some new analysis pipeline can yield an entirely *new* set of outcomes unanticipated by the original authors. I think many scientists would agree that this is how an ideal scientific process would work, and this is one way of dramatically lowering the structural barriers that make it deviate from that ideal.

---

centralized infrastructure and information companies are 7 out of the 10 largest companies in the world (cite mozilla internet health), and if there are any goodhearted decentralized tech companies out there they're simply swamped in size. 



----------

# knowledge


Part of what is missing and a place where we could learn from librarians is the notion of governance over a knowledge schema. People have a lot of trouble with NWB because they doubt if it could account for all the idiosyncracies in the types of data that we have to represent. But instead if we have a way of capturing all that thought and insight and practical experience in a governance and decisionmaking structure then we could flexibily work our way to a set of schemas that work for everyone. Part of what needs to be done is to move from SQL queries to a more expressive abstract system of schema creation that more people can participate in -- that's what infrastructure building is, making things that seem impossible or difficult routine. Practically, this can mean an explicit versioning system that not only specifies different versions of a data representation, but for every transition between state there is some notion of making that transition in the data structure. (give example of the subject upgrade system). If that was possible, then the notion of data structure would entirely evaporate, best of both worlds. we get everything and the game is over forever. This is also the distinction between centralized and decentralized systems. we can just make the changes and since they're done against a background of unified intent and expression they can exist simulataneously, commune with one another, while being forwardly productive as their contradictions are resolved.


contextual knowledge needed
- our limited systems of communication also render large sections of needed scientific communication without venue. The existing tools that *do* give some means of sharing technical knowledge are distinctly charity-driven, and don't confer the same type of credit incentive that publications do.



!! we've been tracing a distinction between the ability to express fluidly the contents of our reality with developing platforms that sift through it in an automated way, something that was an explicit cultural division throughout the semantic web project {% cite swartzTechniquesMassCollaboration2006 %}, which Peter Norvig (director of search at Google at the time) primarily attributes to user incompetence {% cite lombardiGoogleExecChallenges2007 %}. On trust, TBL says "Berners-Lee agreed with Norvig that deception on the Internet is a problem, but he argued that part of the Semantic Web is about identifying the originator of information, and identifying why the information can be trusted, not just the content of the information itself."

!! importantly, should also have means of ingest for existing tools and elements -- easy to import existing papers and citation trees, plugins for existing data sharing systems. 

!! description of its role as a schema resolution system -- currently we implement all these protocols and standards in these siloed, centralized groups that are inherently slow to respond to changes and needs in the field. instead we want to give people the tools so that their the knowledge can be directly preserved and acted on. 

!! descrption of its role as a tool of scientific discussion -- integrated with the data server and standardized analysis pipelines, it could be possible to have a discussion board where we were able to pose novel scientific questions, answerable with transparent, interrogatable analysis systems. Semantic linking makes the major questions in the field possible to answer, as discussions are linked to one another in a structured way and it is possible to literally trace the flow of thought. 

!! should trace the development of AP and the difficulty of doing these things as a way to explaining the ecosystem and the different parts that are needed in it: https://www.w3.org/TR/social-web-protocols/ 



--------

# conclusion


As a break from doomsaying, imagine the positive vision of doing neuroscience with all the power of basic infrastructure.

You have some new research question, and so you turn to the standard Python (or whatever) library that allows you to query data from yours and all other labs who share their data with this system. You’re immediately able to filter through to find all the recordings from a particular subtype of cell in a particular region being exposed to some particular set of stimuli across some particular manipulation. Since you have access to decades of labor by thousands of scientists, even with that complex filter you still find, say for the sake of having a round cool-sounding number, a million recordings. Because they’re all in some standardized format, over the years a common analysis pipeline has been developed, so you’re also immediately able to perform the analyses to confirm the hunch for your new question --- and it’s time to implement it. 

You don’t need to implement the whole thing from scratch because you can check out a similar experiment from the standardized experimental software framework, read the communally maintained documentation, make the minor tweaks you need for your experiment, and you’re off and running. You need to build some brand new component, but you also have a practical knowledge repository where other scientists working on similar problems have described the basic components, circuits, and have even uploaded some 3d-printable components for you to use. Because the repository was designed for ease of use and has a robust system of community incentives for contribution, as you build you document what you learn, and when you're finished upload the schematics and write instructions for your new component. The experimental software framework was designed to incorporate custom components, so you extend some similar hardware control code and integrate it with your experiment without needing to resort to some patchwork system of TTL synchronization pulses and serial port arcana.

You did it! Experiment Over! The experimental framework produces data that is clean, annotated, and standardized at the time of acquisition, and automatically integrates it with the analysis pipeline you built when your experiment was just a budding baby hypothesis, so your analysis is finished shortly after the experiment is. You have the "auto-upload" setting on, so without any additional effort your work has been firehosing information back the global knowledge pool. You do a pull request for the improvements you’ve made to the experimental software, write the paper, and the loop is complete: a closed knowledge system where nothing is wasted and everyone is more capable and empowered by drawing from and contributing to it.


OK Here's the moment at the end of 2001.

end with the more radical vision --- science post papers. Information is semantically organized, so it is possible to ask and answer questions through the medium in which information is represented. Discussion forums exist to describe particular kinds of questions, and a robust discussion of primary scientific data is made possible. Scientists lost their role as arbiters of all reality, but instead are just the comrades closest to the questions, capable of answering open questions in the community, able to design the experiments proposed. 

The notion of the filedrawer problem dissappearing, we don't need to publish null results when the data is all always available.

The fractal nature of provenance --- where if one can trace an intellectual lineage through its data, one solves credit assignment as centrality within a network. 

High school biology classrooms are able to directly interface with the fundament of science, open questions are directly open to students, 

!! ethical magnitude can't be lost, the information monopolists are 7 or the 10 largest companies in the world, and they got that way by buying industries like ours. https://2020.internethealthreport.org/slideshow-internet-health/#3

!! It's difficult to overstate how fundamentally a widely-adopted federated database system would be for all domains of science: when designing a behavioral experiment to study the circadian cycle, rather than relying on rules of thumbs or a handful of papers, one could directly query data about the sleep-wake cycles of animals recorded by field biologists in their natural habitats, cross reference that with geophysical measurements of daylight times and temperatures in those locations, and normalize the intensity of light you plan to give your animals by estimating tree-canopy coverage from LIDAR data from the geographers. One could make extraordinarily biophysically realistic models of neural networks by incorporating biophysical data about the properties of ion channels and cell membranes, tractography data from human DTI fMRI images, and then compare some dynamical measurement of your network against other dynamic systems models like power grids, telecommunications networks, swarming ants, and so on

!! A system of easily indexed data is useful in all the usual ways, but one nice one is Seemingly-intractable problems like the "file drawer" problem simply dissolve: null results are self-evident and don't *need* publication when researchers asking a question are able to see it themselves by analyzing all previous data gathered. Without exaggeration, they present the possibility of making *all* experiments multidisciplinary, making use of our collected human knowledge without disciplinary barriers. Indeed nearly all scientific literature [is already available on a federated database system](https://freeread.org/ipfs/) to anyone with an internet connection --- arguably the largest expansion of scientific knowledge accessibility ever.



# To mention or not???

- dbpedia

# Tools

The most basic requirement of a piece of shared experimental infrastructure is that it must be capable of expressing and being adapted to **perform any experiment.** The "any" there is a hard-ish "any," the reason for which should become clearer soon. At an extremely abstract level, this means that the framework needs to be able to **control potentially high numbers of independent hardware components,** record measurements from them, and coordinate them together in some logical system that constitutes a "task" (or more broadly an "experiment"). In order to be widely adoptable, it needs to be able to **integrate with the instrumentation that researchers already use** rather than requiring researchers to reoutfit their entire rigs. That means, in turn, that it needs to provide a clear means for users to **extend its functionality** and contribute their extensions to the framework. At the same time as providing a clear entrypoint for researcher-developers to interact with the code, it needs to provide a **simple user inferface** so that regular use doesn't require extensive programming knowledge. In other words, if it ain't usable by everyone, it ain't infrastructure, and the same can be said for expense: it must be **inexpensive to implement.** Finally, it needs to be purpose-built for **reproducibility and replication** by preserving a full chain of **provenance** across the wandering path of parameter tuning and experimental design in a clear, **standardized data format** and providing a means of **replicating experiments** even in rigs that are only an approximate match to the original. 

Autopilot attempts to achieve these lofty goals by embracing a distributed, modular architecture. Autopilot is built as a system of modules that each represent fundamental parts of experiments in general: hardware control, stimulus generation, data management, and so on. Everything is networked, so everything can talk to anything, even and especially across computers: in practice this means that it is capable of coordinating arbitrary numbers of experimental hardware components by just *using more computers.* It is built around the Raspberry Pi, a low-cost single-board computer with an enormous support community and library of off-the-shelf components, but can be used on any computer. Autopilot imposes few limitations on the structure of tasks and experiments, but also gives users a clear means of defining the parameters they require, the data that will be produced, how to plot it, and so on, such that any task has a portable, publishable representation that is not dependent on the local hardware used to implement it. Its modular hierarchy already provides structure that makes it easy for researchers to modify existing components to suit their needs, and some of its co-developers and I are currently implementing a generalized plugin system that will allow users to replace any component of the system in such a way that their work can be made available and referenceable by any other user of the system. Information about the state of the system, the plugins used, the history of tasks and parameters that an experimental subject experiences, are all obsessively documented, and the data it produces is clean at the time of acquisition. Portable task descriptions, referenceable plugins, and exact documentation of provenance make Autopilot capable of facilitating replication while still supporting extreme heterogeneity in its use. In sum, we designed Autopilot to be flexible, efficient, and reproducible enough for use as general experimental infrastructure.

When compared, the preceding reads as a rephrasing of the design principles articulated in (!! link to section). Autopilot is of course far from a finished project, and many of its design goals remain aspirational due to the small number of contributors[^autopilotbad]. I would be remiss in failing to mention [Bonsai](https://bonsai-rx.org/), which I love and have learned a lot from. I view Bonsai as a somewhat complementary project and would one day love to merge efforts. The primary differences between Bonsai and Autopilot, besides the massive and obvious difference in number of users and maturity of the library, are a) Autopilot is written in Python, a high-level programming language, and "glues" together fast, low-level library, where Bonsai is written in C#, which is also quite fast but is comparatively less accessible to a broad number of users. Relatedly, Autopilot's documentation describes how the library works down to the lowest levels while Bonsai's is more focused on the user level. b) Autopilot emphasizes communication between objects and their use in a distributed architecture, while Bonsai provides an excellent means of chaining objects together on a single system. c) Autopilot makes comparatively more nudges, and provides a few more features for making reproducible tasks and standardizing data. Again my intention is not a self-serving advocacy for my software, but to say that Bonsai is another extremely capable and widely-used system, and we need systems *like* them capable of serving the role in broader infrastructure that I will turn to now.

[^autopilotbad]: I am the first to admit Autopilot's shortcomings, which I document extensively in its [development roadmap](https://docs.auto-pi-lot.com/en/latest/todo.html) and github issues. 

In addition to the benefits of reduced duplication of labor and greater access to the state of the art that runs through this whole argument, a standardized experimental framework multiplies the benefits of the data and analytical systems described previously.

When we talk about standardizing data, we talk in the parlance of "conversion," but conversion is only necessary because reserachers collect data in local, idiosyncratic formats. The reason researchers rely on idiosyncratic formats is that it is far from straightforward to directly collect data from their heterogeneous tools in a standardized format. The need for data conversion leaves an airgap between the ideal of universal data access and its labor-intensive practical reality: only those that are most ideologically committed and have enough resources to convert & share their data will do so. We could (and should) lessen the chore of data conversion with continued development of intuitive conversion tools, but an experimental framework that collected data that was *clean at the time of acquisision* then we could shortcircuit the need for conversion altogether. It would also completely dissolve the need for researchers to interact with the peer-to-peer sharing system described previously by automatically dumping standardized data directly into it. In short, an experimental framework could make all the steps between collecting and sharing data completely seamless, and by doing so make the dream of universal data availability possible.

Neuroscience has made substantial progress standardizing an ontology of common terms for cells, chemicals, etc. (see the [Neuroscience Information Framework's Ontology](https://github.com/SciCrunch/NIF-Ontology)) but an ontology for the many minute parameters that define a behavioral experiment's operation has proven elusive. Creating a standardized language for expressing and communicating behavioral experiments is the object of one of the Neurodata Without Borders [working groups](https://archive.org/details/nwb-behavioral-task-wg), in collaboration with the [BEADL](https://archive.org/details/beadl-xml-documentation-v-0.1) project, and they've done admirable work there. They have an in-progress terminology for certain parameters like `Reward`, `Guess`, etc., as part of a state-machine (!!define in margin) based representation of a task. The model of standardization would then be to define some extensible terminology, and then either build some software that implements the state machine descriptions of tasks or else ask existing software developers to incorporate them in their systems. 

This path to standardization has many attractive qualities, like the formal verification possible with state machines, but may have trouble reaching universal adoption: at even modest complexities, experiments that are simple to explain in prose can be awkward and complicated to express as state machines (eg. section 3.1 in {% cite saundersAutopilotAutomatingBehavioral2019 %}, though the proposed [statecharts](https://statecharts.github.io/) model is a bit friendlier than traditional state machines). If it is difficult to express a particular feature of some experiment in some formalism, and easier to implement it as some external software, unintegrated with the behavioral framework, then much of the appeal of standardization is lost. 

--------

**bigg redundancy from here...**

Uniform standardization is desirable in the circumstances where it is possible, but the scale of variability in the parameters and designs of behavioral neuroscience experiments is truly on a different scale than the already-perplexing case of measurement data standardization. For example, a standard experiment in our lab implemented in Autopilot can be fully described by the parameters that define the experimental protocol itself, and those that parameterize the raspberry pi and the experimental hardware ([here they are](https://gist.github.com/sneakers-the-rat/eebe675326a157df49f66f62c4e33a6e)). The training protocol consists of 7 shaping stages that gradually introduce a mouse to a fairly typical auditory categorization task, each of which includes the parameters for at most 12 different stimuli per stage, probabilities for presenting lasers, bias correction, reinforcement, criteria for advancing to the next stage, etc. The rest of the parameterization includes details for configuring, calibrating and operating the rest of the system -- and this is the minimal set of parameters for replicating this experiment that excludes all the defaults, implicit behavior, and well, the rest of the system. For this one relatively straightforward experiment, in one lab, in one subdiscipline, there are 268 different parameters. It's not really about the *number* of parameters per se, but their unpredictability: one needs to parameterize every electrode on a neuropixel probe, but they are shared across a comparatively small number of things of their kind.

Asking people to change the entire way they think about, describe, down to the very mental model that they use to think about it is actually a huge ask. Even if some reasonable standardized lexicon was proposed, it will face the same difficulties as, well, normal lexicons: there is no neutral 'name' for anything, and any word is dependent on the way we conceptualize its use and meaning. This isn't woo-woo unknowability shit: one person's sensory response latency is another person's time of delayed gratification suppression. Even assuming that, getting everyone to start re-expressing all their experiments in a probably very different way than they have been thinking about them for 20-30 years with all the entrenched hardware decisions made over that time is just rounding the bend ready to beat u up for ur lunch money.

Another, complementary way of approaching this problem is to focus on giving people a way to express themselves in a 'safe' environment, focus on the way they *use* them rather than try to define all of them a-priori. sorta like lameguage lmao. 

 a behavioral framework designed for reproducibility, that preserves a complete history of task parameters as well as the code that uses them, solves both the problems of external inspection and replication without needing to prescribe a specific formalization or uniform ontology. It doesn't matter *what* terms you use if it's trivial to see *how* they're used. Importantly, this strategy punts on the goal of interoperability, but does not forsake it: we will revisit standardized ontologies in the next section. Asking large numbers of people to change the way that they think about their experiments and the words they use to describe them is, ultimately, a pretty big ask. Providing people a tool that allows themselves to express themselves in whatever form is natural to them and make their terminology meaningful by preserving its context might be easier. (put people in the same system and give them a space to express the terms they use and let them standardize among themselves rather than imposing.)


 **... to here**

 --------------

Replication is seriously hard. designing a software system that's smart enough about the division between the logical structure of the task and the implementation is seriously hard. the raspi is general purpose enough that was can incorporate pretty general purpose hardware control systems with nontrad components as well, so it balances being an approachable "start from somewhere" (actually in a really good place) with general still byo-hardware. replication needs to basically be incorporated from the ground up, as most behavioral packages that exist tend to rely on local script files that are still labor-intensive to create and are rarely shared, because they're not really intended to be made sharable. << point im' trying to make here is that it can't be an afterthought, the ways that it's easy to go wrong.

But for systems that do link code to a portable task description, where the documentation for each parameter is also good (like wat if that documentation was linked to the semantic wiki... return to in next section), then it is entirely possible to download a system that you point to whatever parts you have around and let er rip. (this doesn't address the technical complexity, but that's also a tease for the next section).

It is already occasionally possible to follow the trail of provenance back to some experimental code, but when all code is developed independently, is any of it reliable {% cite wallReliabilityStartsExperimental2018 %}? Like bugs in analytical software, bugs in experimental control software are likely rife, but unless they are present in the few pieces of commonly used open-source software they are almost entirely undiagnosable. Conversely, maybe more positively, a shared experimental framework gives a place to gather reference implementations of the many common algorithms, routines, and hardware controllers used in neuroscientific experiments. (!! the tiny details matter, but they almost never make it into methods sections. eg. we use bias correction methods, but the way we do it might be different than the way you do it. people do lots of great work optimizing over different training regimens, but that usually gets left as text. Algorithms for hardware control and sensor fusion are split across a zillion adafruit libraries, and they aren't modularized or split up or even documented that well)

As an example, intertial motion sensors (IMUs) are an increasingly common tool for neuroscientists interested in studying unrestrained, freely moving behavior. In our case, we were working with [an IMU](https://web.archive.org/web/20210127212527/https://www.sparkfun.com/products/13944) with three, 3-dimensional sensors: an accelerometer, gyroscope and magnetometer. The raw signals from these IMUs (linear acceleration, angular velocity) are rarely useful on its own, and researchers are usually after some derived value like orientation, position, etc. Since the readings are also noisy, these transformed signals typically rely on some [sensor fusion](https://en.wikipedia.org/wiki/Sensor_fusion) algorithms to condition and combine them. We were interested in measuring "absolute" geocentric vertical velocity to control a motorized platform in a closed-loop experiment (as I described in my [NMC3](https://neuromatch.io/abstract/?submission_id=recI5D0QaJ857Y4JI) [talk](https://youtu.be/l2K0l4ec0Xw)). Adafruit provides a [basic Python](https://github.com/adafruit/Adafruit_CircuitPython_LSM9DS1/blob/master/adafruit_lsm9ds1.py) library to control the IMU, but it was relatively undocumented, slow, and didn't expose all the functionality of the chip, so we [adapted it to Autopilot](https://web.archive.org/web/20210421223148/https://docs.auto-pi-lot.com/en/parallax/autopilot.hardware.i2c.html#autopilot.hardware.i2c.I2C_9DOF). We were able to find a number of whitepapers that described a sensor fusion algorithms, but no implementations. The algorithm we eventually landed on uses a [Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter) to combine accelerometer and gyroscope readings to estimate orientation {% cite abyarjooImplementingSensorFusion2015a %}. In this case were lucky to find Roger Labbe's excellent [filterpy](https://github.com/rlabbe/filterpy) library {% cite labbeKalmanBayesianFilters2020 labbeRlabbeFilterpy2021 %}, and with a few performance and syntax tweaks were also able to [adapt it to autopilot](https://web.archive.org/web/20210421223300/https://docs.auto-pi-lot.com/en/parallax/autopilot.transform.timeseries.html#autopilot.transform.timeseries.Kalman), extended it to implement the [orientation transformation](https://web.archive.org/web/20210421212747/https://docs.auto-pi-lot.com/en/parallax/autopilot.transform.geometry.html), and built it into the [IMU Object](https://github.com/wehr-lab/autopilot/blob/6843c0e7b6e2bfb4c35e2f7c41972336765feabd/autopilot/hardware/i2c.py#L469-L501). (!! - go back through and give names to each of the objects and methods for reference below)

OK cool so you programmed an accelerometer, what's the big deal? First, from the developer's perspective: we needed to implement some ``hardware`` object and teach it about some geometric ``transform``ation. The autopilot ``hardware`` and ``transform`` modules give a clear place to implement both. The minimal expected structure of these modules make it straightforward to adapt existing code to the library, but we can also copy and modify (or, "inherit from") some existing hardware object to avoid having to write basic operations from scratch (eg. the I/O operations) and extend their functionality (eg. they are now networked, can take advantage of autopilot's unified logging system, etc.). To the degree that the framework is widely adopted, it gives credit to and provides a direct means of making the algorithms and tools they develop available to users. (!! they don't even need to integrate with the system wholesale, just expose some API and write a quick wrapper for this, we're wrking on it!!) This is, in some sense, the essence of what i mean by a behavior "framework" --- a minimal "spanning set" of rules for how the system works that gives clear points of extension.

From the user's perspective: We could have implemented the sensor fusion algorithm and geometric transform directly "in" the ``IMU`` hardware object, but instead we separated them out as several independent ``transform`` objects. Rather than extending the functionality of a single hardware object, we instead gained several basic algorithms. Their generality is *noncoercive* --- The problem of getting absolute orientation from an IMU is solved for *everyone*, even those that don't want to adopt any other part of the system. The rotation algorithm is generic and modular: it can be used as just a trigonmetric transformation of accelerometer readings without a Kalman filter, incorporate gyroscopic readings, or use an entirely different timeseries filter altogether. By integrating them in an existing library of ``transform`` objects, they are made combinatorically more useful --- so far all I have discussed has been a means of estimating orientation, we still need to *use* that orientation estimate to extract "absolute" vertical acceleration. 

In autopilot, we can express the rest of what we need as a series of ``transform`` objects that can be added together with ``+`` and ``+=``:

```python
from autopilot import transform as t

# we start with some measurement of
# - subjective acceleration (x, y, z)
# - rotation (roll, pitch)
# then we...

# rotate the acceleration around the x and y axes
z_velocity = t.geometry.Rotate('xy') 
# select the "z," or vertical component, 
# aka accelerometer[2]
z_velocity += t.selection.Slice(slice(2,3))
# subtract the constant acceleration due to gravity
z_velocity += t.math.Add(-9.8)
# and then integrate the acceleration measurements
# over time to get velocity
z_velocity += t.timeseries.Integrate(dt_scale = True)
```

So then when used with the IMU object...

```python
from autopilot.hardware.i2c import IMU_9DOF

# create the sensor object to read from it
sensor = IMU_9DOF()

# get accelerometer readings by accessing its properties
>>> sensor.acceleration
array([0,0,9.8])

# apply our transformation by giving the accelerometer 
# and orientation readings to our transform object
>>> z_velocity.process((sensor.acceleration, sensor.rotation))
1.6095 # or whatever m/s
```

This transformation could itself be built into the sensor object as an additional ``IMU_9DOF.velocity`` property, as was done for ``.rotation``, reconfigured to add additional processing stages, and so on.

(!! add example of adding DLC to position estimate? yes. to show how things don't need to be built into autopilot, just given some API, as was done with deeplabcut, at the end of the developer section)

From the often-overlooked perspective of some downstream "reader": when everything is integrated into an extensible experimental framework, complete retrospective provenance becomes possible. Autopilot exhaustively logs all local parameters like hardware configuration, as well as references to all versions of all code used to generate a dataset *in the dataset itself* automatically. A reader can then trace all the data presented in a paper back through a standardized analysis pipeline to the raw data, and then continue to inspect every part of how it was generated. Since the code is all available by default, it becomes possible to audit experimental code on a broad scale: if a reader were to find a bug, they could raise an issue, patch it --- and flag all datasets that were effected.

At this point we have largely closed the loop of science: starting with standardized data, shared in a scalable p2p system, with some federated interface structure, through modularized analysis parts, published alongside the means to directly reproduce the experiment and re-generate the data... and when we start considering these technologies as an ensemble some things that truly sound like science fiction compared to scientific reality start to become possible. In addition to allowing all of the above features of standardized output data being cross-indexable, what about making the literal fine-grained parameters a way of indexing The All Knowledge Base (go back to previous section and make clearer that only the output data is indexable)? Doing a simultaneous optimization over all of our parameters is basically impossible, and we have all these heuristics for hopping and skipping over it, but what if the behavioral system could query all other times the experiment has been performed, cross reference with published outcome data from the parameterization, and recommend the optimal parameterization for whatever you are studying? The compounding nature of making systems that preserve and respect the diversity of labor to make it coproductive is tectonic: at every stage, from implementation to tweaking, to understanding a science with appropriate infrastructure would move at light speed compared to the way we do it now.

... the major part that's missing is some means of negotiating our schemas and data ... transition to next section


## Collectivizing SOTA 

- So far we have described a system for using **semantic web** and **linked data** technology to bridge several interacting subsystems. 
- We have endorsed a **folksonomy** oriented system with 
- a low barrier to **identity declaration** 
- but with ability to **federate** at multiple scales and in overlapping groups, !! specifics on using AS for creating norms and rules 
- **versioning**
- A **peer-to-peer** data sharing system 
- Use of formats for establishing a base of OWL/RDF-based schema as a seed.
- content addressing from metadata index
- **data sharding**
- **I/O abstraction** to introduce the notion of metadata indicating code routines
- **flexible attribute propagation** eg. the ability to have stuff spec hooks like `accessRuleset` accepts `@hhs:HIPAA` and being able to resolve dependencies flatly
- **embracing the notion of expand space** by letting people declare and link schema extensions
- ... brb 


## Wikis


{% cite kamelboulosSemanticWikisComprehensible2009 %}

!! Read and cite! {% cite classeDistributedInfrastructureSupport2017 %}

!! {% cite goodSocialTaggingLife2009 %}

!! wikibase can do federated SPARQL queries https://wikiba.se/
- and has been used to make folksonomies https://biss.pensoft.net/article/37212/

!! lots of scientific wikis 
- https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Molecular_Biology/Genetics/Gene_Wiki/Other_Wikis
- https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Molecular_Biology/Genetics/Gene_Wiki

- contemporary wikis
	- list of 'would be nice' in wiki engines: https://communitywiki.org/wiki/CategoryWikiTechnology

> It’s not too late to turn things around. Specs could be moved back into the wiki until they’re nearly done. Editors, instead of being gatekeepers, could be helpful moderators. A clear process for making controvertial decisions could be decided on. And the validator could follow consensus instead of leading it. But do the people running the show want this?
>
> Standards bodies tread a fine line between organizations for the public good and shelters for protecting collusion that would be otherwise illegal under antitrust law. For the dominent vendors involved, the goal is to give the illusion of openness while giving themselves full control to enforce their will behind the scenes.
>
> The IETF is a good example of this. Often lauded by the public as a model of openness and and and freedom, the reality is that working group chairs, appointed by a self-elected ruling board, get away with declaring whatever they want (usually an inferior and difficult to implement alternative) as “rough consensus”, routinely ignoring comments from the public and objections from working group members. One working group (in charge of DNS extentsions) went so far as to censor mail from working group members. The dictators running the IETF, when informed, didn’t seem to mind.
> 
> Is the same sort of thing at work in the Pie/Echo/Atom Project? It appears so at first glance: Sam running the show from behind the scenes, putting friends in charge of the specs (although that isn’t what actually happened). The lack of a dispute-resolution process only makes things worse: when there’s no clear guide on how to make decisions or contributions, it’s far from obvious how to challenge a decision Sam has made. {% cite swartzSecretsStandards2003 %}

!! give the example of the autopilot wiki

**wikipedia probs**

> Over time, the initial openness of these communities seems to shift. A body of recent researchincluding a number of studies that we have conducted—suggests that the decline in contributors in both English Wikipedia and a range of other peer production projects has been driven by an increase in newcomer rejection that results in a decrease in newcomer retention. {% cite hillWikipediaEndOpen2019 %}
(wikipedia probs are general probs)


> Two essential features coordinate this information to better serve our organizational decision-making, learning, and memory. The first is our constellation of Working Groups that maintain and distribute local, specialized knowledge to other groups across the network. [...] A second, more emergent property is the subgroup of IBL researchers who have become experts, liaisons, and interpreters of knowledge across the network. These members each manage a domain of explicit records (e.g., written protocols) and tacit information (e.g., colloquialisms, decision histories) that are quickly and informally disseminated to address real-time needs and problems. A remarkable nimbleness is afforded by this system of rapid responders deployed across our web of Working Groups. However, this kind of internalized knowledge can be vulnerable to drop-out when people leave the collaboration, and can be complex to archive. An ongoing challenge for our collaboration is how to archive both our explicit and tacit processes held in both people and places. This is not only to document our own history but as part of a roadmap for future science teams, whose dynamics are still not fully understood. {% cite woolKnowledgeNetworksHow2020 %}

!! bids is doing something like this https://nidm-terms.github.io/

> The Semantic Web is about two things. It is about common formats for integration and combination of data drawn from diverse sources, where on the original Web mainly concentrated on the interchange of documents. It is also about language for recording how the data relates to real world objects. That allows a person, or a machine, to start off in one database, and then move through an unending set of databases which are connected not by wires but by being about the same thing. https://www.w3.org/2001/sw/

!! Semantic combination of databases in science are also not new {% cite cheungSemanticWebApproach2007 simaEnablingSemanticQueries2019 %}. We need both though! semantic federated databases!

> For those that don't know, Linked Data type people and Indieweb type people have, for whatever reason, historically been at each others' throats despite (or perhaps because of) the enormous similarity between the kind of work that they're doing (the main disagreements being "should we treat everything like a graph" and "are namespaces a good idea" and also, let's be honest, just historical grudges). But Amy Guy long made the case in the group that actually the divisions between the groups were very shallow and that with just a few tweaks we could actually bridge the gap (this was the real origin of the Social Web Protocols document, which though it eventually became a document of the different things we produced, was originally an analysis of how they weren't so different at all). {% cite lemmer-webberStandardsDivisionsCollaboration2018 %}

> For the wiki to grow and stay healthy, it may be interesting to note that all four elements from Alchemy must be present.
> 
> - Earth: the wiki corpus, put into textual form.
> - Sun: the eyes gazing upon the wiki, giving it attention.
> - Air: the invisible server on which wiki rests, available at all points. - available from the "ether" (net), you might say?
> - Water: the interactions from WikiCommunity, making it grow. [AlchemyOfWiki](http://wiki.c2.com/?AlchemyOfWiki)

### rebuilding communication

Though we can quickly reconstruct existing technologies of scientific communication with our linked data system, there's no reason to be limited to the world imagined for us by platform holders. 

Instead let's think through an example "unit" of scientific work, from idea to publication, to imagine the process with fresh eyes:


!! take stock of our communication technology, we publish pdfs in journals, have science twitter, and then a bunch of private slacks and smalltime stuff??? Science is fundamentally a communicative process, literally every part fo the system that I have described has been built aroudn the ability to express the structure of things, the order of things, how it relates to other things and *that's communication baby.* The system we've imagined so far takes us so far from forums and the ultradominant feed -> shallow thread-based communication that we're used to though. This is a system where we can have continuous dialogue about linked topics, be able to branch and see the reflections and subtle variations on ideas in the same place that we have our data, analysis, and tools.



!! relationship between linked data and social media protocols stuff goes here, as compared to libresocial: https://libresocial.com/en/startpage/ {% cite graffiLibreSocialPeertopeerFramework2021 %}

!! open engiadina https://openengiadina.net/ - https://octodon.social/@cwebber/107158266685022617

!! skohub! https://skohub.io/


!! discovery of papers for scientists as well as general public, being able to trace history.

> Though frequently viewed as a product to finish, it is dynamic ontologies with associated process-building activities designed, developed, and deployed locally that will allow ontologies to grow and to change. And finally, the technical activity of ontology building is always coupled with the background work of identifying and informing a broader community of future ontology users. {% cite bowkerInformationInfrastructureStudies2010 %}





!! caution about slipping into techno-utopianism even here, we need the UI and tooling here to be simple to not only use but also build on. yes that does mean yet another framework! but this one is the most mythical yet, because I don't really know what it would look like! but bad UI has killed lots of projects, eg. IPFS (though it's not dead just slow!)
 https://macwright.com/2019/06/08/ipfs-again.html
https://blog.bluzelle.com/ipfs-is-not-what-you-think-it-is-e0aa8dc69b


#### ???

- the indefinite future! who knows what people will come up with, and that's the point!


"full cycle"
- Initial communication
  - p2p mastodon!?
- Forming a group
  - p2p mastodon!
- Group research & sharing/annotating papers
  - reference manager & shared annotations & wikilike system for notes. carry through annotations to the writing process & use as backlinks. example of private -> public links
- Planning experiment
  - example of autopilot wiki!?
- Doing experiment & Analysis (we already talked about)
  - example of autopilot wiki!?
- Drafting paper
  - notebooklike interface
  - early stopping point of not needing to publish a paper at all, every part of the paper is public at this point, so we could communicate in much smaller bites of linked analyses and commentary
  - example of backlinks put on top of the other paper, since we're friends future people are able to see when a particular part of a paper is being referenced
- Reviewing paper
  - public or facilitated peer review
- Communicating paper
  - non-ephemeral p2p masto & linked forum, multimodal transclusion
- Criticism and Integration into larger whole
  - theory wiki!
- Splitting of group!

---

# Conclusion


Much of what I describe here was also described by Tim Berners-Lee in 2000:

> When I proposed the web in 1989, the driving force I had in mind was communication through shared knowledge, and the driving "market" for it was collaboration among people at work and at home. By building a hypertext Web, a group of people of whatever size could easily express themselves, quickly acquire and convey knowledge, overcome misunderstandings, and reduce duplication of effort. This would give people in a group a new power to build something together. 
>
> People would also have a running model of their plans and reasoning. A web of knowledge linked through hypertextw ould contain a snapshot of their shared understanding. When new people joined a group they would have the legacy of decisions and reasons available for inspection. When people left the group their work would already have been captured and integrated. [...]
>
> The intention was that the Web be used as a personal information system, and a group tool on all scalked, from the team of two creating a flyer for the local elementary school play to the world population deciding on ecological issues. 
>
> To be able to really work together on the Web, we need much better tools: better formats for presenting information to the user; more intuitive interfaces for editing and changing information; seamless integration of other tools, such as chat rooms, and audio- and videoconferencing, with Web editing. We need the ability to store on one server an annotation about a Web page on another; simple access controls for gorup memebership, and for tracking changes to documents. While some of this work involved leading-edge reserach, a lot of it consists of trying to adapt existing computer systems to the global hypertext world. {% cite berners2008weaving -l p.162-163 %}

<div class="draft-text">
I don't claim to know more about why this vision hasn't yet been realized than its inventor, but I think part of it might be strategic. It's not zenough to describe or even build liberatory technology, you need some means of getting it in people's hands --- and if they already have it in their hands, you need to give them a good reason to swap. I think another is context: they were designing for the whole internet first, without any  *particular* problem to be solved (except, maybe, the whole internet as the problem). By seeding the tools and the culture in science, with its relatively unique ability to expend non-profit-driven labor, we might stand a chance of pushing the cart over the hill. To do that we need to see the problems of "open science" as much larger than just science, but reflective of our entire information ecosystem.

Where tim bl and i diverge maybe is described in his protocol introduction: by understanding how two molecules of a gas interact when they collide, scientists using suitable mathematics can deduce how billions of gillions of tas molecules, say the earth's admosphere --- will change. This allows them to analyze glogal weather patterns, and thus predict the weather. If the rules governing hypertext links between servers and browsers stayed simple, then our web of a few documents could grow to a global web. The art was to define the few basic, common, rules of "protocol" that would allow one computer to talk to another, in such a way that when all computer everywhere did it, the system would thrive not break down. 

The problem with this idea is that the problems are not always the same across a different degree of technical development. Tim Bl Describes problems of encoding, endianness, and other problems without which there is truly no means of useful information transfer at all. But there is a threshold where the basic means of communication are met and something qualitatively different emerges, and that, as he rightly describes, is the web. Where we then diverge is his understandable move to repeat the same process: we need some absolutely minimal set of standards, and that includes some basic ontologies that we agree on, but that there should be one set of nonoverlapping ontologies. "One Global Web" says a lot. !! take a look at the solid source code. how much of it is devoted to code development vs. UX development? why are the docs so sparse after so many years???? !!we can think of different things now, instead of permanent links everywhere, ephemeralitu is important too. instead of universal identifiers, it's possible to have multiple nonhierarchical mutually overlpping notions of order at different scale. You have multiple identities, things are multiple, language extends into the use too

!! the history of linking, according to tim bl, was actually started by scientists as references. and now we get to update it. (p. 38)
</div>


## Shared Governance

!! the broad and uncertain future here is how this system will be goverened and how it will be oeprated. Though we design a system that decentralizes its operation, decentralizing power is not an automatic guarantee of the technology, so we need to remember the main question here is a refocusing of our culture *along with* refocusing our technology. We need to reconceptualize what we demand from our communication systems, how much power and agency we have over them, and how we relate with other scientists. 

Dont want to be prescriptive here, but that we can learn from previous efforts like  https://en.wikipedia.org/wiki/Evergreen_(software) , 

!! multiplicity is in itself a form of governance, where rather than needing to canalize things into a single decision, it is possible to have all the options exist simultaneously and let history sort them out. http://meatballwiki.org/wiki/VotingIsEvil  http://meatballwiki.org/wiki/EnlargeSpace

!! what 'whoops we created a bureaucracy' teaches us is that wikis and wikilike technologies are important means of realizing multiple systems of governance and norms. see also the tyranny of structurelessness

> For everyone to have the opportunity to be involved in a given group and to participate in its activities the structure must be explicit, not implicit. The rules of decision-making must be open and available to everyone, and this can happen only if they are formalized. This is not to say that formalization of a structure of a group will destroy the informal structure. It usually doesn't. But it does hinder the informal structure from having predominant control and make available some means of attacking it if the people involved are not at least responsible to the needs of the group at large.
>
> The end of consciousness-raising leaves people with no place to go, and the lack of structure leaves them with no way of getting there. The women the movement either turn in on themselves and their sisters or seek other alternatives of action. There are few that are available. Some women just "do their own thing." This can lead to a great deal of individual creativity, much of which is useful for the movement, but it is not a viable alternative for most women and certainly does not foster a spirit of cooperative group effort. Other women drift out of the movement entirely because they don't want to develop an individual project and they have found no way of discovering, joining, or starting group projects that interest them.  {% cite freemanTyrannyStucturelessness1970 %}


# design principles

!! the coercion of centralization has a few forms. this is related to the authoritarian impulse in the open science movement that for awhile bullied people into openness. that instinct in part comes from a belief that everyone should be doing the same thing, should be posting their work on the one system. decentralization is about autonomy, and so a reciprocal approach is to make it easy and automatic.

## Translator trims (22-06)

The Translator is being developed by 28 institutions and nearly 200 team members as of 2019. They credit their group structure and flexible Other Transaction Award (OTA) funding mechanism for their successes {% cite consortiumBiomedicalDataTranslator2019 %}. OTA awards give the granting agency broad flexibility in to whom and for what money can be given, and consist of an initial competetive segment with possibility for indefinite noncompetitive extensions at the discretion of the agency {% cite fleisherOtherTransactionAward2019 %}. 



