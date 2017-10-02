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
});