import pandas as pd

df = pd.read_csv('../_data/REPORTER_bdt_04Oct2021_111729.csv', skiprows=4)

print(f'Total Cost of Biomedical Data Translator {df["Total Cost"].sum()}')