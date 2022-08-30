import {parseMultiInput} from '@conventional-actions/toolkit'
import * as core from '@actions/core'

type Config = {
  packages: string[]
  analyzers: string[]
}

export async function getConfig(): Promise<Config> {
  return {
    packages: parseMultiInput(core.getInput('package') || './...'),
    analyzers: parseMultiInput(core.getInput('analyzers') || 'all')
  }
}
