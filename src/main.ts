import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    let args: string[] = ['vet']
    for (const analyzer of config.analyzers) {
      args = args.concat(`-${analyzer}`)
    }

    for (const pkg of config.packages) {
      const output = await exec.getExecOutput('go', args.concat(pkg), {
        silent: true,
        ignoreReturnCode: true
      })

      for (const line of output.stderr.split(/\r?\n/)) {
        const [path, row, col, msg] = line.split(/:/)
        core.debug(`${path}, ${row}, ${col}, ${msg}`)
        if (path && msg) {
          core.error(msg, {
            title: msg,
            file: path,
            startLine: parseInt(row),
            startColumn: parseInt(col)
          })
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
