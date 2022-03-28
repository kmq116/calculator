export function analysis(expression: string): any[] {
  const symbol = ['(', ')', '+', '-', '*', '/']
  const re = /\d/

  const tokens: string[] = []
  const chars = expression.trim().split('')

  let token = ''

  chars.forEach((char) => {
    //  是数字 遍历到下一个字符 看下一个字符是否是数字
    if (re.test(char)) {
      token += char
    }
    else if (char === ' ' && token) {
      //  每个 if 都中断上一个 if 的执行
      tokens.push(token)
      token = ''
    }
    else if (symbol.includes(char)) {
      if (token) {
        tokens.push(token)
        token = ''
      }
      // 添加符号
      tokens.push(char)
    }
  })

  if (token) tokens.push(token)

  return tokens
}
