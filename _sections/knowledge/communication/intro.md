<div class="draft-text" markdown="1">
* {% cite berners-leeSociallyAwareCloud2009 %} - separate app from storage, or much like our tracker/protocol model from bittorrent, the same data can have many potential interfaces that interpret and use different parts of its graph.

todo: 

- mention the idea behind the threadodobot app, maybe in additional 'adversarial interoperability' section? put in context with the agora
- bump up sections of rebuilding communication by 1 heading level.
- Also need to talk about the client
- The only thing special about a feed is that it is linked to a preceding post.

</div>

It's time to start thinking about interfaces. We have sketched our system in turtle-like pseudocode, but directly interacting with our linking syntax would be labor intensive and technically challenging. Instead we can start thinking about tools for interacting with it in an abstract way. Beneath every good interface we're familiar with, a data model lies in wait. A .docx file is just a zipped archive full of xml, so a blank word document that contains the single word "melon" is actually represented (after some preamble) like:

```xml
<w:body>
  <w:p 
    w14:paraId="0667868A" 
    w14:textId="50600F77" 
    w:rsidR="002B7ADC" 
    w:rsidRDefault="00A776E4">
    <w:r>
        <w:t>melon</w:t>
    </w:r>
  </w:p>  
</w:body>
```

Same thing with jupyter notebooks, where a block of code:

```python
>>> rating = 100
>>> print(f'I rate this dream {rating}')
'I rate this dream 100'
```

is represented as JSON (simplified for brevity):

```json
{
  "cell_type": "code",
  "id": "thousand-vermont",
  "outputs": [{
    "name": "stdout",
    "output_type": "stream",
    "text": [
      "I rate this dream 100\n"
    ]
  }],
  "source": [
    "rating = 100\n",
    "print(f'I rate this dream {rating}')"
  ]
}
```

So we are already used to working with interfaces to data models, we just need to think about what kind of interfaces we need for a scientific communication system. 

Let's pick up where we left off with our linked data and tools. Recall that we had a `project` named `#my-project` that linked an [experiment](#myproject-experiment), a few datasets that it produced, and an [analysis pipeline](#myproject-analysis) that we ran on it. We *could* just ship the raw numbers from the analysis, wash our hands of it, and walk straight into the ocean without looking back, but usually scientists like to take a few additional steps to visualize the data and write about what it means. 

To explore the communicative tools that might be useful, we can start by considering traditional documents, and attempt to generalize them by separating their form as "units" or "cells" of information with accompanying metadata from their representation in interfaces for interacting and communicating about them.