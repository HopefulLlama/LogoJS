describe('Parse', () => {
  beforeEach(() => {
    LogoJS.reset();
    LogoJS.setPosition({x: 0, y: 0, angle: 0});
  });

  describe('Routine loop', () => {
    
    it('should detect direct loop', () => {
      let command = 'routine one startroutine two endroutine ' +
        'routine two startroutine one endroutine ' +
        'one';

      expect(() => {
        LogoJS.execute(command);
      }).toThrowError('Infinite call stack detected at: one -> two -> one');
    });

    it('should detect indirect loop', () => {
      let command = 'routine one startroutine two endroutine ' +
        'routine two startroutine three endroutine ' +
        'routine three startroutine one endroutine ' +  
        'one';

      expect(() => {
        LogoJS.execute(command);
      }).toThrowError('Infinite call stack detected at: one -> two -> three -> one');
    });

    it('should detect direct loop called from another routine', () => {
    	let command = 'routine zero startroutine one endroutine ' +
    		'routine one startroutine two endroutine ' +
        'routine two startroutine one endroutine ' +
        'zero';

      expect(() => {
        LogoJS.execute(command);
      }).toThrowError('Infinite call stack detected at: one -> two -> one');
    });

    it('should detect indirect loop called from another routine', () => {
    	let command = 'routine zero startroutine one endroutine ' +
      	'routine one startroutine two endroutine ' +
        'routine two startroutine three endroutine ' +
        'routine three startroutine one endroutine ' +  
        'zero';

      expect(() => {
        LogoJS.execute(command);
      }).toThrowError('Infinite call stack detected at: one -> two -> three -> one');
    });

  });
});