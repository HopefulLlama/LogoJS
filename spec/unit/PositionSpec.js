describe('Position', () => {
  it('should be null if there is no position set', () => {
    LogoJS.reset();
    expect(LogoJS.getPosition()).toBe(null);
  });

  it('should have a position once set', () => {
    let position = {x: 0, y: 0, angle: 0};
    LogoJS.setPosition(position);

    expect(LogoJS.getPosition().x).toBe(position.x);
    expect(LogoJS.getPosition().y).toBe(position.y);
    expect(LogoJS.getPosition().angle).toBe(position.angle);
  });

  ['x', 'y'].forEach((axis) => {
    [-100, -1, 0, 1, 100, 1000].forEach((distance) => {
      it(`should set position.${axis} to ${distance}`, () => {
        let position = {x: 0, y: 0, angle: 0};
        position[axis] = distance;

        LogoJS.setPosition(position);
        expect(LogoJS.getPosition()[axis]).toBe(distance);
      });
    });
  });

  [
    {startAngle: -361, endAngle: 359},
    {startAngle: -360, endAngle: 0},
    {startAngle: -359, endAngle: 1},
    {startAngle: -180, endAngle: 180},
    {startAngle: -1, endAngle: 359},
    {startAngle: 0, endAngle: 0},
    {startAngle: 1, endAngle: 1},
    {startAngle: 359, endAngle: 359},
    {startAngle: 360, endAngle: 0},
    {startAngle: 361, endAngle: 1}
  ].forEach((testCase) => {
    it(`should convert ${testCase.startAngle} degrees to ${testCase.endAngle}`, () => {
      let position = {x: 0, y: 0, angle: testCase.startAngle};

      LogoJS.setPosition(position);
      expect(LogoJS.getPosition().angle).toBe(testCase.endAngle);
    });
  });
});