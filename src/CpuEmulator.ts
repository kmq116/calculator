export class CpuEmulator {
  ins: string[]
  memory: number[]
  re: RegExp

  constructor(instructions: string) {
    this.ins = instructions.split('\r\n')
    this.memory = []
    // 匹配以 push 开头 一个字符结尾的字符串
    this.re = /^(push)\s\w+/
    this.execute()
  }

  execute() {
    this.ins.forEach((i) => {
      switch (i) {
        case 'add':
          this.add()
          break
        case 'sub':
          this.sub()
          break
        case 'mul':
          this.mul()
          break
        case 'div':
          this.div()
          break
        default:
          // 匹配 push 开头 一个字符结尾的字符串 将匹配到的数字放入内存
          if (this.re.test(i))

            this.push(i.split(' ')[1])
      }
    })
  }

  add() {
    const [a, b] = [this.pop(), this.pop()]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.memory.push(a + b)
  }

  sub() {
    const b = this.pop()
    const a = this.pop()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.memory.push(a - b)
  }

  mul() {
    const b = this.pop()
    const a = this.pop()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.memory.push(a * b)
  }

  div() {
    const b = this.pop()
    const a = this.pop()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.memory.push(Math.floor(a / b))// 取整 防止浮点数
  }

  push(x: string) {
    this.memory.push(parseInt(x))
  }

  pop() {
    return this.memory.pop()
  }

  getResult() {
    return this.memory[0]
  }
}
