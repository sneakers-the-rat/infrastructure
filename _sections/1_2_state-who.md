
These constraints manifest differently depending on the circumstance of scientific practice. Differences in circumstance of practices also influence the kind of infrastructure developed, as well as where we should expect infrastructure development to happen as well as who benefits from it. 

### Institutional Core Facilities

Centralized "core" facilities are maybe the most typical form of infrastructure development and resource sharing at the level of departments and institutions. These facilities can range from minimal to baroque extravagance depending on institutional resources and whatever complex web of local history brought them about. 

[PNI Systems Core](https://projectreporter.nih.gov/project_info_details.cfm?aid=9444124) lists [subprojects](https://projectreporter.nih.gov/project_info_subprojects.cfm?aid=9444124&icde=0) echo a lot of the thoughts here, particularly around effort duplication[^tymae]: 

> Creating an Optical Instrumentation Core will  address the problem that much of the technical work required to innovate and maintain these instruments has  shifted to students and postdocs, because it has exceeded the capacity of existing staff. This division of  labor is a problem for four reasons: (1) lab personnel often do not have sufficient time or expertise to produce  the best possible results, (2) the diffusion of responsibility leads people to duplicate one another’s efforts, (3)  researchers spend their time on technical work at the expense of doing science, and (4) expertise can be lost  as students and postdocs move on. For all these reasons, we propose to standardize this function across  projects to improve quality control and efficiency. Centralizing the design, construction, maintenance, and  support of these instruments will increase the efficiency and rigor of our microscopy experiments, while  freeing lab personnel to focus on designing experiments and collecting data.   

[^tymae]: Thanks a lot to the one-and-only stunning and brilliant Dr. Eartha Mae Guthman for suggesting looking at the BRAIN initiative grants as a way of getting insight on core facilities.

While core facilities are an excellent way of expanding access, reducing redundancy, and standardizing tools within an instutition, as commonly structured they can displace work spent on those efforts outside of the institution. Elite institutions can attract the researchers with the technical knowledge to develop the instrumentation of the core and infrastructure for maintain it, but this development is only occasionally made usable by the broader public. The Princeton data science core is an excellent example of a core facility that does makes its software infrastructure development [public](https://github.com/BrainCOGS)[^pnidatascience], which they should be applauded for, but also illustrative of the problems with a core-focused infrastructure project. For an external user, the documentation and tutorials are incomplete -- it's not clear to me how I would set this up for my institute, lab, or data, and there are several places of hard-coded princeton-specific values that I am unsure how exactly to adapt[^pnicaveat]. I would consider this example a high-water mark, and the median openness of core infrastructure falls far below it. I was unable to find an example of a core facility that maintained publicly-accessible documentation on the construction and operation of its experimental infrastructure or the management of its facility.

[^pnidatascience]: > Project Summary: Core 2, Data Science Working memory, the ability to temporarily hold multiple pieces of information in mind for manipulation, is central to virtually all cognitive abilities. This multi-component research project aims to comprehensively dissect the neural circuit mechanisms of this ability across multiple brain areas. In doing so, it will generate an extremely large quantity of data, from multiple types of experiments, which will then need to be integrated together. The Data Science Core will support the individual research projects in discovering relationships among behavior, neural activity, and neural connectivity. The Core will create a standardized computational pipeline and human workflow for preprocessing of calcium-imaging data. The pipeline will run either on local computers or in cloud computing services, and users will interact with it through a web browser. The preprocessing will incorporate existing image-processing algorithms, such as Constrained Nonnegative Matrix Factorization and convolutional networks. In addition, the Core will build a data science platform that stores behavior, neural activity, and neural connectivity in a relational database that is queried by the DataJoint language. Diverse analysis tools will be integrated into DataJoint, enabling the robust maintenance of data-processing chains. This data-science platform will facilitate collaborative analysis of datasets by multiple researchers within the project, and make the analyses reproducible and extensible by other researchers. We will develop effective methods for training and otherwise disseminating our computational tools and workflows. Finally, the Core will make raw data, derived data, and analyses available to the public upon publication via the data-science platform, source-code repositories, and web-based visualization tools. To facilitate the conduct of this research, the creation of software tools, and the reuse of the data by others after the primary research has concluded, the project will adopt shared data and metadata formats using the HDF5 implementation of the Neurodata without Borders format. Data will be made public in accord with the FAIR guiding principles—findndable by a DOI and/or URL, accessible through a RESTful web API, and interoperable and reusable due to DataJoint and the Neurodata Without Borders format for data https://projectreporter.nih.gov/project_info_description.cfm?aid=9444126&icde=0 

[^pnicaveat]: Though again, this project is examplary, built by friends, and would be an excellent place to start extending towards global infrastructure. 

### Centralized Institutes

Outside of universities, the Allen Brain Institute is perhaps the most impactful reflection of centralization in neuroscience. The Allen Institute has, in an impressively short period of time, created several transformative tools and datasets, including its well-known atlases {% cite leinGenomewideAtlasGene2007 %} and the first iteration of its [Observatory](http://observatory.brain-map.org/) project which makes a massive, high-quality calcium imaging dataset of visual cortical activity available for public use. They also develop and maintain software tools like their [SDK](https://allensdk.readthedocs.io/en/latest/) and Brain Modeling Toolkit [(BMTK)](https://alleninstitute.github.io/bmtk/), as well as a collection of [hardware schematics](https://portal.brain-map.org/explore/toolkit/hardware) used in their experiments. The contribution of the Allen Institute to basic neuroscientific infrastructure is so great that, anecdotally, when talking about scientific infrastructure it's not uncommon for me to hear something along the lines of "I thought the Allen was doing that."

Though the Allen Institute is an excellent model for scale at the level of a single organization, its centralized, hierarchical structure cannot (and does not attempt to) serve as the backbone for all neuroscientific infrastructure. Performing single (or a small number of, as in its also-admirable [OpenScope Project](https://alleninstitute.org/what-we-do/brain-science/news-press/articles/three-collaborative-studies-launch-openscope-shared-observatory-neuroscience)) carefully controlled experiments a huge number of times is an important means of studying constrained problems, but is complementary with the diversity of research questions, model organisms, and methods present in the broader neuroscientific community. 

Christof Koch, its director, describes the challenge of centrally organizing a large number of researchers:

> Our biggest institutional challenge is organizational: assembling, managing, enabling and motivating large teams of diverse scientists, engineers and technicians to operate in a highly synergistic manner in pursuit of a few basic science goals {% cite grillnerWorldwideInitiativesAdvance2016 %}

> These challenges grow as the size of the team grows. Our anecdotal evidence suggests that above a hundred members, group cohesion appears to become weaker with the appearance of semi-autonomous cliques and sub-groups. This may relate to the postulated limit on the number of meaningful social interactions humans can sustain given the size of their brain {% cite kochBigScienceTeam2016 %}

### Meso-scale collaborations

Given the diminishing returns to scale for centralized organizations, many have called for smaller, "meso-scale" collaborations and consortia that combine the efforts of multiple labs {% cite mainenBetterWayCrack2016 %}. The most successful consortium of this kind has been the International Brain Laboratory {% cite abbottInternationalLaboratorySystems2017 woolKnowledgeNetworksHow2020 %}, a group of 22 labs spread across six countries. They have been able to realize the promise of big team neuroscience, setting a new standard for performing reproducible experiments performed by many labs {% cite laboratoryStandardizedReproducibleMeasurement2020 %} and developing data management infrastructure to match {% cite laboratoryDataArchitectureLargescale2020 %} (seriously, don't miss their extremely impressive [data portal](https://data.internationalbrainlab.org/)). Their project thus serves as the benchmark for large-scale collaboration and a model from which all similar efforts should learn from.

Critical to the IBL's success was its adoption of a flat, non-hierarchical organizational structure, as described by Lauren E. Wool:

> IBL’s virtual environment has grown to accommodate a diversity of scientific activity, and is supported by a flexible, ‘flattened’ hierarchy that emphasizes horizontal relationships over vertical management. [...] Small teams of IBL members collaborate on projects in Working Groups (WGs), which are defined around particular specializations and milestones and coordinated jointly by a chair and associate chair (typically a PI and researcher, respectively). All WG chairs sit on the Executive Board to propagate decisions across WGs, facilitate operational and financial support, and prepare proposals for voting by the General Assembly, which represents all PIs. In parallel, associate chairs convene on their own committee to share decisions, which are then conveyed to the entire researcher community so it may weigh in on proposals before a formal vote. The interests of PIs and researchers intersect via staff liaisons who sit on both the Executive Board and the Associate Chairs Committee, as well as an elected researcher representative, who sits on the Executive Board and is a voting member of the General Assembly. {% cite woolKnowledgeNetworksHow2020 %}

They should also be credited with their adoption of a form of consensus decision-making, [sociocracy](https://sociocracy.info), rather than a majority-vote or top-down decisionmaking structure. Consensus decision-making systems are derived from those developed by [Quakers and some Native American nations](https://rhizomenetwork.wordpress.com/2011/06/18/a-brief-history-of-consenus-decision-making/), and emphasize, perhaps unsurprisingly, the value of collective consent rather than the will of the majority. Sociocracy specifically describes consent:

> Consent means “no objections.” Giving consent does not mean unanimity, agreement, or even endorsement. Decisions are made to guide actions. Can we move forward if we make this decision? Consent is given in the context of moving forward. Consent to a policy decision means you believe that it is “worth trying.”  Or “I can work with it.” Moving forward is important for making better decisions because it provides more information. Not moving forward until a perfect decision is found, means operating in the blind. Information will always be limited to what is already known.
> 
> Consent is required for all policy decisions for many reasons. The two most important are that it ensures (1) the decision will allow all members of the group to participate or produce without feeling oppressed, and (2) it will be supported by everyone. Everyone is expected to participate in the reasoning behind the decision. And no one can be excluded. https://www.sociocracy.info/what-is-sociocracy/

The central lesson of the IBL, in my opinion, is that governance matters. Even if a consortium of labs were to form on an ad-hoc basis, without a formal system to ensure contributors felt heard and empowered to shape the project it would soon become unsustainable. Even if this system is not perfect, with some labor still falling unequally on some researchers, it is a promising model for future collaborative consortia.

The infrastructure developed by the IBL is impressive, but its focus on a single experiment makes it difficult to expand and translate to widescale use. The hardware for the IBL experimental apparatus is exceptionally well-documented, with a [complete and detailed build guide](https://figshare.com/articles/preprint/A_standardized_and_reproducible_method_to_measure_decision-making_in_mice_Appendix_3_IBL_protocol_for_setting_up_the_behavioral_training_rig/11634732) and [library of CAD parts](https://figshare.com/articles/online_resource/A_standardized_and_reproducible_method_to_measure_decision-making_in_mice_CAD_files_for_behavior_rig/11639973), but the documentation is not modularized such that it might facilitate use in other projects, remixed, or repurposed. The [experimental software](https://github.com/int-brain-lab/iblrig) is similarly single-purpose, a chimeric combination of Bonsai {% cite lopesBonsaiEventbasedFramework2015 %} and [PyBpod](https://github.com/pybpod/pybpod) [scripts](https://github.com/int-brain-lab/iblrig/tree/master/tasks/_iblrig_tasks_ephysChoiceWorld). It unfortunately [lacks](https://iblrig.readthedocs.io/en/latest/index.html) the API-level documentation that would facilitate use and modification by other developers, so it is unclear to me, for example, how I would use the experimental apparatus in a different task with perhaps slightly different hardware, or how I would then contribute that back to the library. The experimental software, according to the [PDF documentation](https://figshare.com/articles/preprint/A_standardized_and_reproducible_method_to_measure_decision-making_in_mice_Appendix_3_IBL_protocol_for_setting_up_the_behavioral_training_rig/11634732), will also not work without a connection to an [alyx](https://github.com/cortex-lab/alyx) database. While alyx was intended for use outside the IBL, it still has [IBL-specific](https://github.com/cortex-lab/alyx/blob/07f481f6bbde668b81ad2634f4c42df4d6a74e44/alyx/data/management/commands/files.py#L188) and [task-specific](https://github.com/cortex-lab/alyx/blob/07f481f6bbde668b81ad2634f4c42df4d6a74e44/alyx/data/fixtures/data.datasettype.json#L29) values in its source-code, and makes community development difficult with a similar [lack](https://alyx.readthedocs.io/en/latest/) of API-level documentation and requirement that users edit the library itself, rather than temporary user files, in order to use it outside the IBL.

My intention is not to denigrate the excellent tools built by the IBL, nor their inspiring realization of meso-scale collaboration, but to illustrate a problem that I see as an extension of that discussed in the context of core facilities --- designing infrastructure for one task, or one group in particular makes it much less likely to be portable to other tasks and groups.

It is also unclear how replicable these consortia are, and whether they challenge, rather than reinforce technical inequity in science. Participating in consortia systems like the IBL requires that labs have additional funding for labor hours spent on work for the consortium, and in the case of graduate students and postdocs, that time can conflict with work on their degrees or personal research which are still far more potent instruments of "remaining employed in science" than collaboration. In the case that only the most well-funded labs and institutions realize the benefits of big team science without explicit consideration given to scientific equity, mesoscale collaborations could have the unintended consequence of magnifying the skewed distribution of access to technical expertise and instrumentation.

### The rest of us...

Outside of ivies with rich core facilities, institutes like the Allen, or nascent multi-lab consortia, the rest of us are largely on our own, piecing together what we can from proprietary and open source technology. The world of open source scientific software has plenty of energy and lots of excellent work is always being done, though constrained by the circumstances of its development described briefly above. Anything else comes down to whatever we can afford with remaining grant money, scrape together from local knowledge, methods sections, begging, borrowing, and (hopefully not too much) stealing from neighboring labs.  

A third option from the standardization offered by centralization and the blooming, buzzing, beautiful chaos of disconnected open-source development is that of decentralized systems, and with them we might build the means by which the "rest of us" can mutually benefit by capturing and making use of each other's knowledge and labor.