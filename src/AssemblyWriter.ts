export class AssemblyWriter {
  output: string
  constructor() {
    this.output = ''
  }

  writePush(digit: string) {
    this.output += `push ${digit}\r\n`
  }

  writeOP(op: string) {
    this.output += `${op}\r\n`
  }

  outputStr() {
    return this.output
  }
}
