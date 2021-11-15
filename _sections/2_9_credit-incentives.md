
!!The critical anchor of the entire scientific communication system is the system of professional incentives that make it so nothing outside of a journal counts as science. Blog posts are nice and all, but they aren't *science.* One way of approaching this problem is convincing, en masse, a majority of researchers to boycott journals or value other mediums in hiring decisions. That seems pretty unlikely for all the reasons all collective action problems are. Instead of approaching it prestige-side first, we can approach from the credit assignment side. !! make it easy for someone else to use your work and then by using it you have some verifiable record that other people like and use your stuff! !! this appeals to a much broader base of people not traditionally in the scientific value system, so they might be interested. !! also lets us value different kinds of scientific labor, like mentorship, advice, debugging, etc. without necessarily needing to gamify it. !! Deep linking and long provenance lets us see our impact on the broader scientific world, which is a much more valuable and informative than shitty journal rankings. !! people always talk about how shitty journal metrics are, and so that's an opening! !! 


the work of maintaining the system can't be invisible, read & cite {% cite classeDistributedInfrastructureSupport2017 bowkerInformationInfrastructureStudies2010 %}

!! essentially all questions about "changing the system of science" inevitably lead to credit assignment, but in our system it is the same as provenance. We can give credit to all work from data production, analysis tooling, technical work, theoretical work, and so on that we currently do with just author lists. brief nod to semantic publishing, though a treatment of the journal system is officially out of scope.


### Rebuilding Scientific Communication

!! skohub! https://skohub.io/

!! take stock of our communication technology, we publish pdfs in journals, have science twitter, and then a bunch of private slacks and smalltime stuff??? Science is fundamentally a communicative process, literally every part fo the system that I have described has been built aroudn the ability to express the structure of things, the order of things, how it relates to other things and *that's communication baby.* The system we've imagined so far takes us so far from forums and the ultradominant feed -> shallow thread-based communication that we're used to though. This is a system where we can have continuous dialogue about linked topics, be able to branch and see the reflections and subtle variations on ideas in the same place that we have our data, analysis, and tools.

!! theory wiki example from presentation

!! discovery of papers for scientists as well as general public, being able to trace history.

> Though frequently viewed as a product to finish, it is dynamic ontologies with associated process-building activities designed, developed, and deployed locally that will allow ontologies to grow and to change. And finally, the technical activity of ontology building is always coupled with the background work of identifying and informing a broader community of future ontology users. {% cite bowkerInformationInfrastructureStudies2010 %}

!! stop sweating about computational accuracy and completeness. the only danger is a system that makes appeal to perfection and promises accuracy like those sold in golden foil by the platform capitalists. if we are conceptualizing this appropriately as a *system of communication* where particular results are intended to be *interpreted in context* then we would treat computational errors and semantic inaccuracies like we do with *language*: like a *joke*.

> For example, one person may define a vehicle as having a number of wheels and a weight and a length, but not foresee a color. This will not stop another person making the assertion that a given car is red, using the color vocabular from elsewhere. - https://www.w3.org/DesignIssues/RDB-RDF.html


>  Relational database systems, manage RDF data, but in a specialized way. In a table, there are many records with the same set of properties. An individual cell (which corresponds to an RDF property) is not often thought of on its own. SQL queries can join tables and extract data from tables, and the result is generally a table. So, the practical use for which RDB software is used typically optimized for soing operations with a small number of tables some of which may have a large number of elements.
> 
> RDB systems have datatypes at the atomic (unstructured) level, as RDF and XML will/do. Combination rules tend in RDBs to be loosely enforced, in that a query can join tables by any comlumns which match by datatype -- without any check on the semantics. You could for example create a list of houses that have the same number as rooms as an employee's shoe size, for every employee, even though the sense of that would be questionable.
> 
> The Semantic Web is not designed just as a new data model - it is specifically appropriate to the linking of data of many different models. One of the great things it will allow is to add information relating different databases on the Web, to allow sophisticated operations to be performed across them. https://www.w3.org/DesignIssues/RDFnot.html

!! caution about slipping into techno-utopianism even here, we need the UI and tooling here to be simple to not only use but also build on. yes that does mean yet another framework! but this one is the most mythical yet, because I don't really know what it would look like! but bad UI has killed lots of projects, eg. IPFS (though it's not dead just slow!)
 https://macwright.com/2019/06/08/ipfs-again.html
https://blog.bluzelle.com/ipfs-is-not-what-you-think-it-is-e0aa8dc69b
