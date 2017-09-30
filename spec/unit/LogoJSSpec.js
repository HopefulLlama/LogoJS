describe('LogoJS', () => {
  it('should be defined', () => {
    expect(LogoJS).not.toBe(undefined);
  });

  ['reset', 'setPosition', 'getPosition', 'execute'].forEach((func) => {
    it(`should have ${func} as a function`, () => {
      expect(typeof LogoJS[func]).toBe('function');
    });
  });
});