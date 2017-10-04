function compareJourneys(journeyA, journeyB) {
  expect(journeyA.length).toBe(journeyB.length);

  if(journeyA.length === journeyB.length) {
    journeyA.forEach((waypoint, index) => {
      expect(waypoint.position.x).toBe(journeyB[index].position.x);
      expect(waypoint.position.y).toBe(journeyB[index].position.y);
      expect(waypoint.position.angle).toBe(journeyB[index].position.angle);
      expect(waypoint.penDown).toBe(journeyB[index].penDown);
    });
  }
}