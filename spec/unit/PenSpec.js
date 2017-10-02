describe('Pen', () => {
  beforeEach(() => {
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
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

  it('bad parameter should throw an error', () => {
    expect(() => {
      LogoJS.execute('pen dab');
    }).toThrowError('Invalid parameters: dab');
  });
});