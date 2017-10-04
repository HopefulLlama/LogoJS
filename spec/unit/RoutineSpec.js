describe('Routine', () => {
  beforeEach(() => {
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  it('should execute an empty routine', () => {
    let journey = LogoJS.execute('routine empty startroutine endroutine empty');

    expect(journey.length).toBe(1);

    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);
  });

  it('should execute a routine', () => {
    let journey = LogoJS.execute('routine basic startroutine forward 1 endroutine basic');

    expect(journey.length).toBe(2);

    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);

    expect(journey[1].position.x).toBe(0);
    expect(journey[1].position.y).toBe(1);
    expect(journey[1].position.angle).toBe(0);
    expect(journey[1].penDown).toBe(true);
  });

  it('should execute a routine with several parameters', () => {
    let journey = LogoJS.execute('routine basic first second third startroutine forward first forward second forward third endroutine basic 1 2 3');

    expect(journey.length).toBe(4);

    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);

    expect(journey[1].position.x).toBe(0);
    expect(journey[1].position.y).toBe(1);
    expect(journey[1].position.angle).toBe(0);
    expect(journey[1].penDown).toBe(true);

    expect(journey[2].position.x).toBe(0);
    expect(journey[2].position.y).toBe(3);
    expect(journey[2].position.angle).toBe(0);
    expect(journey[2].penDown).toBe(true);

    expect(journey[3].position.x).toBe(0);
    expect(journey[3].position.y).toBe(6);
    expect(journey[3].position.angle).toBe(0);
    expect(journey[3].penDown).toBe(true);
  });

  it('should execute a routine with a routine', () => {
    let journey = LogoJS.execute('routine nested startroutine forward 1 endroutine routine callnested startroutine nested endroutine nested');

    expect(journey.length).toBe(2);

    expect(journey[0].position.x).toBe(0);
    expect(journey[0].position.y).toBe(0);
    expect(journey[0].position.angle).toBe(0);
    expect(journey[0].penDown).toBe(true);

    expect(journey[1].position.x).toBe(0);
    expect(journey[1].position.y).toBe(1);
    expect(journey[1].position.angle).toBe(0);
    expect(journey[1].penDown).toBe(true);
  });

  [
    'forward',
    'back',
    'left',
    'right',
    'routine',
    'startroutine',
    'endroutine',
    'repeat',
    'endrepeat',
    'up',
    'down'
  ].forEach((keyword) => {
    it(`should throw error when trying to define ${keyword} as routine`, () => {
      expect(() => {
        LogoJS.execute(`routine ${keyword} startroutine forward 1 endroutine`);
      }).toThrowError(`Invalid parameters: ${keyword}`);
    });
  });


  it('should throw error when startroutine without routine', () => {
    expect(() => {
      LogoJS.execute('startroutine');
    }).toThrowError('startroutine called without routine');
  });

  it('should throw error when endroutine without routine', () => {
    expect(() => {
      LogoJS.execute('endroutine');
    }).toThrowError('endroutine called without routine');
  });
});