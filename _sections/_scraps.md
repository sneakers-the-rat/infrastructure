
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



----------

# knowledge


Part of what is missing and a place where we could learn from librarians is the notion of governance over a knowledge schema. People have a lot of trouble with NWB because they doubt if it could account for all the idiosyncracies in the types of data that we have to represent. But instead if we have a way of capturing all that thought and insight and practical experience in a governance and decisionmaking structure then we could flexibily work our way to a set of schemas that work for everyone. Part of what needs to be done is to move from SQL queries to a more expressive abstract system of schema creation that more people can participate in -- that's what infrastructure building is, making things that seem impossible or difficult routine. Practically, this can mean an explicit versioning system that not only specifies different versions of a data representation, but for every transition between state there is some notion of making that transition in the data structure. (give example of the subject upgrade system). If that was possible, then the notion of data structure would entirely evaporate, best of both worlds. we get everything and the game is over forever. This is also the distinction between centralized and decentralized systems. we can just make the changes and since they're done against a background of unified intent and expression they can exist simulataneously, commune with one another, while being forwardly productive as their contradictions are resolved.


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
