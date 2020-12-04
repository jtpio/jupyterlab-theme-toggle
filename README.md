# jupyterlab-theme-toggle

![Github Actions Status](https://github.com/jtpio/jupyterlab-theme-toggle/workflows/CI/badge.svg)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jtpio/jupyterlab-theme-toggle/stable?urlpath=lab)
[![npm](https://img.shields.io/npm/v/jupyterlab-theme-toggle.svg)](https://www.npmjs.com/package/jupyterlab-theme-toggle)

JupyterLab extension to toggle the theme in the Top Bar area.

![screencast](./docs/screencast.gif)

This extension was originally developed as part of the [jupyterlab-topbar](https://github.com/jtpio/jupyterlab-topbar) project, and extracted into its own repository later on.

## Prerequisites

- JupyterLab 1.0+

## Installation

This extension requires the `jupyterlab-topbar-extension` extension for JupyterLab to display the visual switch:

```bash
jupyter labextension install jupyterlab-topbar-extension jupyterlab-theme-toggle
```

To only install the keyboard shortcut (`Cmd/Ctrl+y` by default):

```bash
jupyter labextension install jupyterlab-theme-toggle
```

## Development

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab-theme-toggle directory

# create a new conda environment
mamba create -n jupyterlab-theme-toggle jupyterlab nodejs
conda activate jupyterlab-theme-toggle

# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

## Uninstall

```bash
pip uninstall jupyterlab-theme-toggle
```
