describe('Execute', () => {
  beforeEach(() => {
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  [
    {command: 'forward -100', position: {x: 0, y: -100, angle: 0}},
    {command: 'forward 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'forward 100', position: {x: 0, y: 100, angle: 0}},

    {command: 'back -100', position: {x: 0, y: 100, angle: 0}},
    {command: 'back 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'back 100', position: {x: 0, y: -100, angle: 0}},
    
    {command: 'right -361', position: {x: 0, y: 0, angle: 1}},
    {command: 'right -360', position: {x: 0, y: 0, angle: 0}},
    {command: 'right -359', position: {x: 0, y: 0, angle: 359}},
    {command: 'right -1', position: {x: 0, y: 0, angle: 1}},
    {command: 'right 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'right 1', position: {x: 0, y: 0, angle: 359}},
    {command: 'right 359', position: {x: 0, y: 0, angle: 1}},
    {command: 'right 360', position: {x: 0, y: 0, angle: 0}},
    {command: 'right 361', position: {x: 0, y: 0, angle: 359}},

    {command: 'left -361', position: {x: 0, y: 0, angle: 359}},
    {command: 'left -360', position: {x: 0, y: 0, angle: 0}},
    {command: 'left -359', position: {x: 0, y: 0, angle: 1}},
    {command: 'left -1', position: {x: 0, y: 0, angle: 359}},
    {command: 'left 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'left 1', position: {x: 0, y: 0, angle: 1}},
    {command: 'left 359', position: {x: 0, y: 0, angle: 359}},
    {command: 'left 360', position: {x: 0, y: 0, angle: 0}},
    {command: 'left 361', position: {x: 0, y: 0, angle: 1}}
  ].forEach((testCase) => {
    it(`'${testCase.command}' should give ${JSON.stringify(testCase.position)}`, () => {
      let position = LogoJS.execute(testCase.command).pop();

      expect(position.x).toBe(testCase.position.x, 'x');
      expect(position.y).toBe(testCase.position.y, 'y');
      expect(position.angle).toBe(testCase.position.angle, 'angle');
    });
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
        expect(journey[i].y).toBe(i);

        expect(journey[i].x).toBe(0);
        expect(journey[i].angle).toBe(0);
      }
    });
  });
});