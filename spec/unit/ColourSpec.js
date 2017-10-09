describe('Colour', () => {
  const BLACK = '#000000';
  const WHITE = '#ffffff';

  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  it('should set the colour', () => {
    let journey = LogoJS.execute(`colour ${WHITE}`);

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: BLACK},
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: WHITE}
    ]);
  });

  it('should keep the colour until it changes', () => {
    let journey = LogoJS.execute(`forward 1 colour ${WHITE} forward 1 forward 1 colour ${BLACK} forward 1`);

    compareJourneys(journey, [
      {position: {x: 0, y: 0, angle: 0}, penDown: true, colour: BLACK},
      {position: {x: 0, y: 1, angle: 0}, penDown: true, colour: BLACK},
      {position: {x: 0, y: 1, angle: 0}, penDown: true, colour: WHITE},
      {position: {x: 0, y: 2, angle: 0}, penDown: true, colour: WHITE},
      {position: {x: 0, y: 3, angle: 0}, penDown: true, colour: WHITE},
      {position: {x: 0, y: 3, angle: 0}, penDown: true, colour: BLACK},
      {position: {x: 0, y: 4, angle: 0}, penDown: true, colour: BLACK}
    ]);
  });

  ['dab', '5', 'ffffff', '#gggggg', '#fffff', '#fffffff'].forEach((parameter) => {
    it(`should error when given ${parameter}`, () => {
      expect(() => {
        LogoJS.execute(`colour ${parameter}`);
      }).toThrowError(`Expected six digit hexadecimal colour (prefixed with "#"), but got ${parameter}`);
    });
  });
});