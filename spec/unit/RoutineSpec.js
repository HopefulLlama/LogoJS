describe('Routine', () => {
  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  it('should execute an empty routine', () => {
    let journey = LogoJS.execute('routine empty startroutine endroutine empty');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true}
    ]);
  });

  it('should execute a routine', () => {
    let journey = LogoJS.execute('routine basic startroutine forward 1 endroutine basic');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 1, angle: 0}, penDown: true}
    ]);
  });

  it('should execute a routine with several parameters', () => {
    let journey = LogoJS.execute('routine basic first second third startroutine forward first forward second forward third endroutine basic 1 2 3');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 1, angle: 0}, penDown: true},
      {position: {x: 0, y: 3, angle: 0}, penDown: true},
      {position: {x: 0, y: 6, angle: 0}, penDown: true}
    ]);
  });

  it('should execute a routine with a routine', () => {
    let journey = LogoJS.execute('routine nested startroutine forward 1 endroutine routine callnested startroutine nested endroutine nested');

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 1, angle: 0}, penDown: true}
    ]);
  });

  it('should only replace parameters with values, not routine names', () => {
    let journey = LogoJS.execute('routine nested startroutine forward 1 endroutine ' + 
      'routine callnested nested startroutine nested endroutine ' +
      'callnested 100'
    );

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true},
      {position: {x: 0, y: 1, angle: 0}, penDown: true}
    ]);
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
      }).toThrowError(`Expected non-reserved word, but got reserved word: ${keyword}`);
    });
  });

  [
    'forward',
    'back',
    'left',
    'right',
    'routine',
    'endroutine',
    'repeat',
    'endrepeat',
    'up',
    'down'
  ].forEach((keyword) => {
    it(`should throw error when trying to define ${keyword} as a routine parameter`, () => {
      expect(() => {
        LogoJS.execute(`routine basic ${keyword} startroutine forward 1 endroutine`);
      }).toThrowError(`Keyword ${keyword} not allowed as routine parameter`);
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