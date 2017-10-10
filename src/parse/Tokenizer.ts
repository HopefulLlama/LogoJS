function tokenize(input: string): string[] {
	let keepNonWhitespace: RegExp = new RegExp(/\S+/, 'g');
	return input.match(keepNonWhitespace) || [];
}

export default {tokenize};