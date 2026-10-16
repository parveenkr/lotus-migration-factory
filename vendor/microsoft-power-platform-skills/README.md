# Microsoft Power Platform Skills Vendor Snapshot

This directory contains a local snapshot copied from:

`C:\Temp\ppskills\power-platform-skills\plugins`

Upstream repository: <https://github.com/microsoft/power-platform-skills>

## Contents

- `code-apps/`: complete Code Apps plugin snapshot. Its `.plugin/plugin.json` declares version `1.1.0` and MIT license.
- `power-automate/`: complete Power Automate plugin snapshot. Its `.plugin/plugin.json` declares version `3.2.1` and MIT license.
- `dataverse/`: standalone convenience bundle of Code Apps' `skills/add-dataverse` skill, its references, and the shared guidance it links to. Microsoft does not publish a separate Dataverse plugin in the supplied source tree.

The Dataverse skill is also present in `code-apps/skills/add-dataverse/`. Keep the two copies synchronized when refreshing this snapshot. Preserve the plugin manifests and upstream licensing information when updating vendor files.

Vendoring these files does not install or register the plugins, configure MCP servers, authenticate accounts, or grant access to Power Platform environments. Use only capabilities exposed and authorized by the active host.