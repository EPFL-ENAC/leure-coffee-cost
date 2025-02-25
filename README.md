# Hidden Cost of Coffee

This repository contains the code and resources for the "Hidden Cost of Coffee" mobile app, developed in collaboration between the LEURE Lab and ENACIT4R.

## Project Structure

- **src/**: Contains the source code for the application, including Vue components, TypeScript files, and stores.
- **data_processing/**: Holds Jupyter Notebooks and CSV data files. **Important:** Add the CSV data into this folder before executing any data processing commands.
- **Makefile**: Provides commands (e.g., `process-data`) to run data processing and other build tasks.

## Data Processing

Before running `make process-data`, ensure that the required CSV files are present in the `data_processing/` folder. The process data command executes a Jupyter Notebook that processes CSV data, and then generates or updates the output files accordingly.

## Make Commands

- `process-data`: Runs the notebook `data_processing/wrangling_extract from_csv.ipynb` to convert and process the CSV files.
