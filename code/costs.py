import pandas as pd

bdt = pd.read_csv('../_data/REPORTER_bdt_04Oct2021_111729.csv', skiprows=4)
strides = pd.read_csv('../_data/REPORTER_STRIDES_05Oct2021_084456.csv', skiprows=5)

print(f'Total Cost of Biomedical Data Translator {bdt["Total Cost IC"].sum()}')
print(f'Total Cost of STRIDES: {strides["Total Cost IC"].sum()}')