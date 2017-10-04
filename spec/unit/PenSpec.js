describe('Pen', () => {
  beforeEach(() => {
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  it('should lift the pen up', () => {
    let journey = LogoJS.execute('pen up');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 0, angle: 0}, penDown: false}
    ]);
  });

  it('should put the pen down', () => {
    let journey = LogoJS.execute('pen up pen down');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 0, angle: 0}, penDown: false},
      {position: {x: 0, y: 0, angle: 0}, penDown: true}
    ]);
  });

  it('should keep the pen up', () => {
    let journey = LogoJS.execute('pen up forward 1 forward 1 forward 1 pen down forward 1');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 0, angle: 0}, penDown: false},
      {position: {x: 0, y: 1, angle: 0}, penDown: false},
      {position: {x: 0, y: 2, angle: 0}, penDown: false},
      {position: {x: 0, y: 3, angle: 0}, penDown: false},
      {position: {x: 0, y: 3, angle: 0}, penDown: true},
      {position: {x: 0, y: 4, angle: 0}, penDown: true}
    ]);
  });

  it('bad parameter should throw an error', () => {
    expect(() => {
      LogoJS.execute('pen dab');
    }).toThrowError('Invalid parameters: dab');
  });
});