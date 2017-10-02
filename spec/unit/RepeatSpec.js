describe('Execute', () => {
  beforeEach(() => {
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

      expect(journey.length).toBe(testCase.iterations + 1);
      for(let i = 0; i <= testCase.iterations; i++) {
        expect(journey[i].position.y).toBe(i);

        expect(journey[i].position.x).toBe(0);
        expect(journey[i].position.angle).toBe(0);

        expect(journey[i].penDown).toBe(true);
      }
    });
  });
});