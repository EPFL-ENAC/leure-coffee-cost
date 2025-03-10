# Hidden Cost of Coffee

This repository contains the code and resources for the "Hidden Cost of Coffee" mobile app, developed in collaboration between the LEURE Lab and ENACIT4R.

## Project Structure

- **src/**: Contains the source code for the application, including Vue components, TypeScript files, and stores.
- **data_processing/**: Holds Jupyter Notebooks and CSV data files.
- **public/data/**: Where processed data files will be generated.
- **Makefile**: Provides commands (e.g., `process-data`) to run data processing and other build tasks.

## Prerequisites

Before running the data processing scripts, ensure you have:

1. **Python** installed (version 3.6 or higher)
2. **pip** (Python package manager)
3. **Jupyter** and required Python libraries

## Setup Instructions

### 1. Install Required Python Packages

Open a terminal and run:

```bash
pip install -r data_processing/requirements.txt
```

or install the required packages individually:

```bash
pip install jupyter pandas numpy nbconvert
```

### 2. Prepare the Data Files

Place the following CSV files in the `data_processing/` folder:

- `TCF-Coffe_App-Export_Beverage-List.csv`
- `TCF-Coffe_App-Export_Impact-Data.csv`
- `TCF-Coffe_App-Export_Sugar-Data.csv`
- `TCF-Coffe_App-Export_Impact-Description.csv`
- `TCF-Coffe_App-Export_Coffee-Description.csv`

These are the "ground truth" data files needed for processing.

### 3. Process the Data

From the root directory of the project, run:

```bash
make process-data
```

This will execute the Jupyter notebook that processes the CSV files and generate output files in the `public/data/` directory.

### 4. Commit Changes

After processing, new or updated data files will be created in the `public/data/` folder. These files should be committed to the repository to make them available to the application:

```bash
git add public/data/
git commit -m "Update processed data files"
git push
```

## Development

To run the development server:

```bash
make dev
```

This runs `npm run dev` behind the scenes to start the development server.

## Troubleshooting

- **Missing dependencies?** Run `pip install -r data_processing/requirements.txt` if available, or install the individual packages listed above.
- **CSV encoding issues?** Ensure your CSV files use Windows-1252 encoding as specified in the processing script.
- **Execution errors?** Check that all CSV files are correctly named and placed in the `data_processing/` folder.
