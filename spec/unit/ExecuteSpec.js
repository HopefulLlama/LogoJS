describe('Execute', () => {
  beforeEach(() => {
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  it('should throw error on unrecognised command', () => {
    const COMMAND = 'fake';
    expect(function() {
      LogoJS.execute(COMMAND);
    }).toThrowError(`Control or Command not found: ${COMMAND}`);
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
      let waypoint = LogoJS.execute(testCase.command).pop();

      expect(waypoint.position.x).toBe(testCase.position.x, 'x');
      expect(waypoint.position.y).toBe(testCase.position.y, 'y');
      expect(waypoint.position.angle).toBe(testCase.position.angle, 'angle');

      expect(waypoint.penDown).toBe(true, 'penDown');
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
        expect(journey[i].position.y).toBe(i);

        expect(journey[i].position.x).toBe(0);
        expect(journey[i].position.angle).toBe(0);

        expect(journey[i].penDown).toBe(true);
      }
    });
  });

  it('should lift the pen up', () => {
    let journey = LogoJS.execute('pen up');

    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);

    expect(journey[1].position.y).toBe(0);
    expect(journey[1].position.x).toBe(0);
    expect(journey[1].position.angle).toBe(0);
    expect(journey[1].penDown).toBe(false);
  });

  it('should put the pen down', () => {
    let journey = LogoJS.execute('pen up pen down');

    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);

    expect(journey[1].position.y).toBe(0);
    expect(journey[1].position.x).toBe(0);
    expect(journey[1].position.angle).toBe(0);
    expect(journey[1].penDown).toBe(false);

    expect(journey[2].position.y).toBe(0);
    expect(journey[2].position.x).toBe(0);
    expect(journey[2].position.angle).toBe(0);
    expect(journey[2].penDown).toBe(true);
  });

  it('should keep the pen up', () => {
    let journey = LogoJS.execute('pen up forward 1 forward 1 forward 1 pen down forward 1');

    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);

    expect(journey[1].position.y).toBe(0);
    expect(journey[1].position.x).toBe(0);
    expect(journey[1].position.angle).toBe(0);
    expect(journey[1].penDown).toBe(false);

    for(let index = 2; index <= 4; index++) {
      expect(journey[index].position.y).toBe(index - 1);
      expect(journey[index].position.x).toBe(0);
      expect(journey[index].position.angle).toBe(0);
      expect(journey[index].penDown).toBe(false);
    }

    expect(journey[5].position.y).toBe(3);
    expect(journey[5].position.x).toBe(0);
    expect(journey[5].position.angle).toBe(0);
    expect(journey[5].penDown).toBe(true);

    expect(journey[6].position.y).toBe(4);
    expect(journey[6].position.x).toBe(0);
    expect(journey[6].position.angle).toBe(0);
    expect(journey[6].penDown).toBe(true);
  });
});