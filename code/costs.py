import pandas as pd

bdt = pd.read_csv('../data/REPORTER_bdt2_07Oct2021_043559.csv', skiprows=8)
strides = pd.read_csv('../data/REPORTER_STRIDES_05Oct2021_084456.csv', skiprows=5)
commons = pd.read_csv('../data/REPORTER_commons_07Oct2021_054910.csv', skiprows=4)

print(f'Total Cost of Biomedical Data Translator {bdt["Total Cost IC"].sum()}')
print(f'Total Cost of STRIDES: {strides["Total Cost IC"].sum()}')
print(f'Total Cost of Commons: {commons["Total Cost IC"].sum()}')