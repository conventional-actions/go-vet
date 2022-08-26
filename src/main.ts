import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {parseInputFiles} from './utils'

async function run(): Promise<void> {
  try {
    const packages = parseInputFiles(core.getInput('package') || './...')
    const analyzers = parseInputFiles(core.getInput('analyzers') || 'all')

    let args: string[] = ['vet']
    for (const analyzer of analyzers) {
      args = args.concat(`-${analyzer}`)
    }

    for (const pkg of packages) {
      await exec.exec('go', args.concat(pkg))
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
