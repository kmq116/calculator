import { describe, expect, it } from 'vitest'
import { analysis } from '../src'
import { AssemblyWriter, Parser } from '../src/AssemblyWriter'

describe('词法分析', () => {
  it('exported', () => {
    // const tokens = analysis('100+10*10')
    const tokens = analysis('100    +   23   +    34 * 10 / 2')

    const writer = new AssemblyWriter()
    const parser = new Parser(tokens, writer)
    const instructions = parser.getInstructions()

    expect(tokens).toEqual([
      '100',
      '+',
      '23',
      '+',
      '34',
      '*',
      '10',
      '/',
      '2',
    ])

    expect(instructions).toEqual('push 100\r\npush 23\r\nadd\r\npush 34\r\npush 10\r\nmul\r\npush 2\r\ndiv\r\nadd\r\n')
  })
})
