# go-vet

A GitHub Action for running [gokart](https://github.com/praetorian-inc/gokart).

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/go-vet@v1
```

### Inputs

| Name        | Default | Description          |
|-------------|---------|----------------------|
| `package`   | `./...` | the package to scan  |
| `analyzers` | `all`   | the analyzers to use |

### Outputs

No outputs.

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: conventional-actions/go-vet@v1
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

