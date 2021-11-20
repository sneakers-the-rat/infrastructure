from tqdm.notebook import trange
from time import sleep
import numpy as np

def get_data(id:str):
    """
    mock function just for visual effect!
    """
    print(f'Downloading dataset {id}')
    print('-'*20)
    for i in trange(100):
        sleep(0.01)

    X = np.linspace(.3, .7, 100)
    Y = 2*(X-.5)**2 + 0.3
    S = np.array([10]*100 + [100, 100, 100])

    X = np.concatenate([X, [0.5, 0.35, 0.63]])
    Y = np.concatenate([Y, [0.5, 0.65, 0.63]])

    return (X, Y, S)



