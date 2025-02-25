.PHONY: process-data

process-data:
    jupyter nbconvert --execute --to notebook --inplace "data_processing/wrangling_extract from_csv.ipynb"


dev:
	npm run dev