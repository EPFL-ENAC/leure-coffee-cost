process-data:
	jupyter nbconvert --execute --to notebook --inplace "data_processing/wrangling_extract_from_csv.ipynb"

dev:
	npm run dev
