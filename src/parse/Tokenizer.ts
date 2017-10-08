function tokenize(input: string): string[] {
  return input.split("\n").join(" ").split(" ");
}

export default {tokenize};