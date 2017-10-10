describe('Tokenizer', () => {
  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

	[
		'forward 1 forward 1',
		'forward 1       forward 1',
		'      forward 1 forward 1',
		'forward 1 forward 1      ',
		'   forward 1   forward 1  '
	].forEach((command) => {
		it(`should ignore multiple spaces in ${command}`, () => {
			let journey = LogoJS.execute(command);

			compareJourneys(journey, [
				{position: {x: 0, y: 0, angle: 0}, penDown: true, colour: '#000000'},
				{position: {x: 0, y: 1, angle: 0}, penDown: true, colour: '#000000'},
				{position: {x: 0, y: 2, angle: 0}, penDown: true, colour: '#000000'}
			]);
		});
	});
});