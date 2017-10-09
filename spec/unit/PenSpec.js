describe('Pen', () => {
  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  it('should lift the pen up', () => {
    let journey = LogoJS.execute('pen up');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: '#000000'},
      {position: {x: 0, y: 0, angle: 0}, penDown: false, colour: '#000000'}
    ]);
  });

  it('should put the pen down', () => {
    let journey = LogoJS.execute('pen up pen down');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: '#000000'},
      {position: {x: 0, y: 0, angle: 0}, penDown: false, colour: '#000000'},
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: '#000000'}
    ]);
  });

  it('should keep the pen up', () => {
    let journey = LogoJS.execute('pen up forward 1 forward 1 forward 1 pen down forward 1');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: '#000000'},
      {position: {x: 0, y: 0, angle: 0}, penDown: false, colour: '#000000'},
      {position: {x: 0, y: 1, angle: 0}, penDown: false, colour: '#000000'},
      {position: {x: 0, y: 2, angle: 0}, penDown: false, colour: '#000000'},
      {position: {x: 0, y: 3, angle: 0}, penDown: false, colour: '#000000'},
      {position: {x: 0, y: 3, angle: 0}, penDown: true, colour: '#000000'},
      {position: {x: 0, y: 4, angle: 0}, penDown: true, colour: '#000000'}
    ]);
  });

  it('bad parameter should throw an error', () => {
    expect(() => {
      LogoJS.execute('pen dab');
    }).toThrowError('Expected either "up" or "down", but got dab');
  });
});