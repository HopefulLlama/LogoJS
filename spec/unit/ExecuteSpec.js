describe('Execute', () => {
  it('should throw error on unrecognised command', () => {
    const COMMAND = 'fake';
    expect(() => {
      LogoJS.execute(COMMAND);
    }).toThrowError(`Control or Command not found: ${COMMAND}`);
  });
});