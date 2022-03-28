import { type AssemblyWriter } from './AssemblyWriter'

export class Parser {
  writer: AssemblyWriter
  tokens: string[]
  token: '+' | '-' | '*' | '/' | string
  i: number
  opMap1: Record<string, string>
  opMap2: Record<string, string>
  constructor(tokens: string[], writer: AssemblyWriter) {
    this.tokens = tokens
    this.token = ''
    this.writer = writer
    this.i = -1
    this.opMap1 = {
      '+': 'add',
      '-': 'sub',
    }
    this.opMap2 = { '*': 'mul', '/': 'div' }
    this.init()
  }

  init() {
    this.compileExpression()
  }

  //  编译表达式
  compileExpression() {
    //  转译加减法
    this.compileAddExpr()
  }

  compileAddExpr() {
    // 优先转译乘除法
    this.compileMultExpr()
    while (true) {
      this.getNextToken()
      // 匹配加减符号
      const op = this.opMap1[this.token]
      if (op) {
        this.compileMultExpr()
        this.writer.writeOP(op)
      }
      else {
        //  没匹配到则跳出循环 回到上一个递归流程
        this.i--
        break
      }
    }
  }

  compileMultExpr() {
    this.compileTerm()
    // 匹配乘除符号
    while (true) {
      this.getNextToken()
      const op = this.opMap2[this.token]
      if (op) {
        // 匹配到操作符 先转译操作符
        this.compileTerm()
        this.writer.writeOP(op)
      }
      else {
        //  没匹配到则跳出循环 回到上一个递归流程
        this.i--
        break
      }
    }
  }

  //  转译符号
  compileTerm() {
    // 首次 获取第一个 token
    this.getNextToken()
    // 括号优先级是最高的  当没匹配到括号的时候 就会跳出循环 执行上一个递归流程
    if (this.token === '(') {
      this.compileExpression()
      // 递归调用 获取下一个 token
      this.getNextToken()
      // 递归完成如果没获取到右侧括号 则报错

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (this.token !== ')') throw new Error('缺少右侧 "("')
      // 匹配数字
    }
    else if (/^\d+$/.test(this.token)) {
      this.writer.writePush(this.token)
    }
    else {
      throw new Error(
        `错误的 token：第 ${this.i + 1} 个 token (${this.token})`,
      )
    }
  }

  getNextToken() {
    // 每次取下一 token
    this.token = this.tokens[++this.i]
  }

  //  获得处理完成的结果
  getInstructions() {
    return this.writer.outputStr()
  }
}
