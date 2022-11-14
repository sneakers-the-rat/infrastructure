```python
from p2p_system import get_data
import matplotlib.pyplot as plt
```


```python
x, y, sizes = get_data('@jonny:my-project:Analysis1')
```

    Downloading dataset @jonny:my-dataset
    --------------------



      0%|          | 0/100 [00:00<?, ?it/s]


# Mathematical foundations of smiling
In my experiment, I have demonstrated that smiling is a simple matter of making the mouth into an arc and 


```python
plt.scatter(x, y, s=sizes)
```




    <matplotlib.collections.PathCollection at 0x12826dee0>




    
![png](smile_files/smile_3_1.png)
    

