# Hidden Cost of Coffee

This repository contains the code and resources for the "Hidden Cost of Coffee" mobile app, developed in collaboration between the LEURE Lab and ENACIT4R.

The app can show several datasets. Each one is a separate deployment of the
same image, it only changes which data folder the app reads. Today there are
two: `epfl` (the EPFL sale points) and `olma` (the OLMA fair).

## Project Structure

- **src/**: Contains the source code for the application, including Vue components, TypeScript files, and stores.
- **src/config/dataset.ts**: The list of datasets, their sale points and how to read their CSV rows.
- **src/i18n/olma.ts**: The texts that change for the `olma` dataset.
- **`data_processing/datasets/<name>/`**: The CSV files of one dataset.
- **data_processing/shared/**: The CSV files used by every dataset.
- **`public/data/<name>/`**: Where processed data files will be generated.
- **public/config.json**: Which dataset the app reads when it runs from the dev server or GitHub Pages.
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

Each dataset has its own folder under `data_processing/datasets/`. Put the two
files that change from one dataset to the other there, for example
`data_processing/datasets/epfl/`:

- `TCF-Coffe_App-Export_Beverage-List.csv`
- `TCF-Coffe_App-Export_Impact-Data.csv`

The three files below are the same for every dataset, so they live in
`data_processing/shared/`:

- `TCF-Coffe_App-Export_Sugar-Data.csv`
- `TCF-Coffe_App-Export_Impact-Description.csv`
- `TCF-Coffe_App-Export_Coffee-Description.csv`

A dataset folder can also hold its own copy of a shared file. The notebook looks
in the dataset folder first, then in `shared/`.

These are the "ground truth" data files needed for processing.

To add a new dataset, create its folder here, add its name to `DatasetId` in
`src/config/dataset.ts` with its texts, then process it.

### 3. Process the Data

From the root directory of the project, run:

```bash
make process-data              # the epfl dataset, the default
make process-data DATASET=olma # one named dataset
make process-all               # every folder in data_processing/datasets/
```

This will execute the Jupyter notebook that processes the CSV files and generate
output files in `public/data/<dataset>/`. Each run only touches its own dataset
folder.

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

It reads `public/config.json`, so it shows the `epfl` dataset. To look at
another one without editing the file, add `?dataset=olma` to the URL. This
shortcut only works in dev, and the tab keeps it until you close it.

### Fonts

The app asks for Suisse Int'l, the EPFL typeface. The files are licensed, so
they are not in the repo. `public/fonts/` is empty on purpose: drop the five
`SuisseIntl-*.woff2` files there at deploy time and they get picked up. Without
them the app falls back to Arial and still looks fine. See
`public/fonts/README.md` for the exact file names.

## Deployment

Both versions run the same code, from the same commit. Only the dataset
changes.

- **EPFL**: GitHub Pages, built from `main` by
  `.github/workflows/deploy-pages.yml`. It reads `public/config.json`, so it
  shows `epfl`.
- **OLMA**: the ENAC Kubernetes cluster, on
  <https://hidden-cost-of-coffee.epfl.ch/>, from the Docker image built by
  `.github/workflows/deploy.yml`. The image holds every dataset, and the
  `DATASET` environment variable picks the one a deployment shows. nginx puts
  it in `/config.json` when the container starts.

The ENAC deploy action only updates the cluster from `dev`, not from `main`.
So `dev` follows `main`: on every push to `main`,
`.github/workflows/sync-dev.yml` moves `dev` to the same commit and starts the
cluster deploy. Merge to `main` and both sites get the change.

Do not push to `dev` by hand. The sync is a fast-forward, so it fails if `dev`
has commits that are not on `main`.

To try the image locally:

```bash
docker build -t coffee-cost .
docker run -p 8080:80 -e DATASET=olma coffee-cost
```

The cluster manifests live in `EPFL-ENAC/enack8s-app-config`, under
`epfl-leure/coffee-cost/`.

## Troubleshooting

- **Missing dependencies?** Run `pip install -r data_processing/requirements.txt` if available, or install the individual packages listed above.
- **CSV encoding issues?** Ensure your CSV files use Windows-1252 encoding as specified in the processing script.
- **Execution errors?** Check that all CSV files are correctly named and placed in their dataset folder or in `data_processing/shared/`.
- **Impact JSON files full of `{}`?** The notebook was run with a pandas version that does not match. Reinstall from `data_processing/requirements.txt`.
