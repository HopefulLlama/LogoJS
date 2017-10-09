describe('Repeat', () => {
  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  [
    {command: 'repeat 1 forward 1 endrepeat', iterations: 1},
    {command: 'repeat 2 forward 1 endrepeat', iterations: 2},
    {command: 'repeat 4 forward 1 endrepeat', iterations: 4},
    {command: 'repeat 2 repeat 2 forward 1 endrepeat endrepeat', iterations: 4},
    {command: 'repeat 2 repeat 4 forward 1 endrepeat endrepeat', iterations: 8},
    {command: 'repeat 2 repeat 3 repeat 4 forward 1 endrepeat endrepeat endrepeat', iterations: 24}
  ].forEach((testCase) => {
    it(`'${testCase.command}' should repeat ${testCase.iterations} times`, () => {
      let journey = LogoJS.execute(testCase.command);

      let expectedJourney = [];

      for(let i = 0; i <= testCase.iterations; i++) {
        expectedJourney.push({position: {x: 0, y: i, angle: 0}, penDown: true, colour: '#000000'});
      }

      compareJourneys(journey, expectedJourney);
    });
  });

  ['dab', '0.5', '-1', '-1000', '1.5'].forEach((parameter) => {
    it(`bad parameter ${parameter} should throw an error`, () => {
      expect(() => {
        LogoJS.execute(`repeat ${parameter} endrepeat`);
      }).toThrowError(`Expected an integer greater than zero, but got ${parameter}`);
    });
  });

  it('unclosed repeat should throw error', () => {
    expect(() => {
      LogoJS.execute('repeat 5');
    }).toThrowError('Unclosed repeat defined');
  });

  it('unopened repeat should throw error', () => {
    expect(() => {
      LogoJS.execute('endrepeat');
    }).toThrowError('endrepeat called without matching repeat');
  });
});