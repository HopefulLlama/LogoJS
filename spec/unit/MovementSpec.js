describe('Movement', () => {
  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  [
    {command: 'forward -100', position: {x: 0, y: -100, angle: 0}},
    {command: 'forward -0.5', position: {x: 0, y: -0.5, angle: 0}},
    {command: 'forward 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'forward 0.5', position: {x: 0, y: 0.5, angle: 0}},
    {command: 'forward 100', position: {x: 0, y: 100, angle: 0}},

    {command: 'back -100', position: {x: 0, y: 100, angle: 0}},
    {command: 'back -0.5', position: {x: 0, y: 0.5, angle: 0}},
    {command: 'back 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'back 0.5', position: {x: 0, y: -0.5, angle: 0}},
    {command: 'back 100', position: {x: 0, y: -100, angle: 0}},
    
    {command: 'right -361', position: {x: 0, y: 0, angle: 1}},
    {command: 'right -360', position: {x: 0, y: 0, angle: 0}},
    {command: 'right -359', position: {x: 0, y: 0, angle: 359}},
    {command: 'right -1', position: {x: 0, y: 0, angle: 1}},
    {command: 'right -0.5', position: {x: 0, y: 0, angle: 0.5}},
    {command: 'right 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'right 0.5', position: {x: 0, y: 0, angle: 359.5}},
    {command: 'right 1', position: {x: 0, y: 0, angle: 359}},
    {command: 'right 359', position: {x: 0, y: 0, angle: 1}},
    {command: 'right 360', position: {x: 0, y: 0, angle: 0}},
    {command: 'right 361', position: {x: 0, y: 0, angle: 359}},

    {command: 'left -361', position: {x: 0, y: 0, angle: 359}},
    {command: 'left -360', position: {x: 0, y: 0, angle: 0}},
    {command: 'left -359', position: {x: 0, y: 0, angle: 1}},
    {command: 'left -1', position: {x: 0, y: 0, angle: 359}},
    {command: 'left -0.5', position: {x: 0, y: 0, angle: 359.5}},
    {command: 'left 0', position: {x: 0, y: 0, angle: 0}},
    {command: 'left 0.5', position: {x: 0, y: 0, angle: 0.5}},
    {command: 'left 1', position: {x: 0, y: 0, angle: 1}},
    {command: 'left 359', position: {x: 0, y: 0, angle: 359}},
    {command: 'left 360', position: {x: 0, y: 0, angle: 0}},
    {command: 'left 361', position: {x: 0, y: 0, angle: 1}}
  ].forEach((testCase) => {
    it(`'${testCase.command}' should give ${JSON.stringify(testCase.position)}`, () => {
      let journey = LogoJS.execute(testCase.command);
      
      compareJourneys(journey, [
        {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: '#000000'},
        {position: testCase.position, penDown: true, colour: '#000000'}
      ]);
    });
  });

  ['forward', 'back', 'left', 'right'].forEach((command) => {
    it(`${command} with bad parameter should throw an error`, () => {
      expect(() => {
        LogoJS.execute(`${command} dab`);
      }).toThrowError('Expected a float, but got dab');
    });
  });
});