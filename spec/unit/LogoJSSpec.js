describe('LogoJS', () => {
  it('should be defined', () => {
    expect(LogoJS).not.toBe(undefined);
  });

  ['reset', 'setPosition', 'getPosition', 'execute'].forEach((func) => {
    it(`should have ${func} as a function`, () => {
      expect(typeof LogoJS[func]).toBe('function');
    });
  });

  it('reset should return itself for chaining', () => {
    expect(LogoJS.reset()).toBe(LogoJS);
  });

  it('setPosition should return itself for chaining', () => {
    expect(LogoJS.setPosition({x: 0, y: 0, angle: 0})).toBe(LogoJS);
  });
});