DATASET ?= epfl
DATASETS := $(notdir $(wildcard data_processing/datasets/*))
JUPYTER ?= jupyter

process-data:
	cd data_processing && DATASET=$(DATASET) $(JUPYTER) nbconvert --execute --to notebook --inplace wrangling_extract_from_csv.ipynb

process-all:
	@for d in $(DATASETS); do $(MAKE) process-data DATASET=$$d || exit 1; done

dev:
	npm run dev

.PHONY: process-data process-all dev
