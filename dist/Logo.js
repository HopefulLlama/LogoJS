var LogoJS =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Position__ = __webpack_require__(1);


class Turtle {
  constructor(position, penDown) {
    this.reset(position, penDown);
  }

  reset(position, penDown) {
    this.position = (position !== undefined) ? position : new __WEBPACK_IMPORTED_MODULE_0__Position__["a" /* default */](0, 0, 180);
    this.penDown = (penDown !== undefined) ? penDown : true;
  }

  getCopy() {
    return {position: this.position, penDown: this.penDown};
  }

  move(distance) {
    let radians = Math.PI * this.position.angle / 180;

    this.position = new __WEBPACK_IMPORTED_MODULE_0__Position__["a" /* default */](
      this.position.x + (distance * Math.sin(radians)),
      this.position.y + (distance * Math.cos(radians)),
      this.position.angle
    );
    
    return this.getCopy();
  }

  rotate(degree) {
    let angle = this.position.angle + degree;

    this.position = new __WEBPACK_IMPORTED_MODULE_0__Position__["a" /* default */](
      this.position.x,
      this.position.y,
      angle
    );

    return this.getCopy();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new Turtle());

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Position {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    
    angle = angle % 360;
    if (angle < 0) {
      angle += 360;
    }
    this.angle = angle;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Command {
  constructor(parameterSchema, execute) {
    this.parameterSchema = parameterSchema;
    this.execute = execute;
  }

  valid(parameters) {
    return (this.parameterSchema.length === parameters.length && 
      this.parameterSchema.every((item, index) => {
        return item.validate(parameters[index]);
      })
    );
  }

  createExecution(parameters) {
    if(this.valid(parameters)) {
      return {
        execute: () => {
          parameters = parameters.map((parameter, index) => {
            return this.parameterSchema[index].transform(parameter);
          });
          return this.execute(...parameters);
        }
      };
    } else {
      throw new Error(`Invalid parameters: ${parameters}`);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Command;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Parameter {
  constructor(validate, transform) {
    this.validate = validate;
    this.transform = transform;
  }
}

const KEYWORDS = [
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
];

/* harmony default export */ __webpack_exports__["a"] = ({
  FINITE_NUMBER: new Parameter((parameter) => {
    return isFinite(parameter);
  }, (parameter) => {
    return parseFloat(parameter);
  }),
  UP_DOWN: new Parameter((parameter) => {
    return parameter === 'up' || parameter === 'down';
  }, (parameter) => {
    return parameter;
  }),
  NOT_KEYWORD: new Parameter((parameter) => {
    return /^[a-z].*/.test(parameter) && KEYWORDS.indexOf(parameter) === -1;
  }, (parameter) => {
    return parameter.toString();
  })
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Repeat {
  constructor(parent, frequency) {
    this.parent = parent;
    this.frequency = frequency;
    this.executions = [];
  }

  execute() {
    let journey = [];

    /* jshint ignore:start */
    for(let i = 0; i < this.frequency; i++) {
      journey = this.executions.reduce((accumulator, execution) => {
        let partial = execution.execute();

        if(Array.isArray(partial)) {
          accumulator = accumulator.concat(partial);
        } else {
          accumulator.push(partial);
        }

        return accumulator;
      }, journey);
    }

    return journey;
    /* jshint ignore:end */
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Repeat;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Turtle__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Position__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parse_Parser__ = __webpack_require__(6);




function reset() {
  __WEBPACK_IMPORTED_MODULE_0__Turtle__["a" /* default */].reset();
  __WEBPACK_IMPORTED_MODULE_2__parse_Parser__["a" /* default */].reset();
}

function setPosition(position) {
  __WEBPACK_IMPORTED_MODULE_0__Turtle__["a" /* default */].position = new __WEBPACK_IMPORTED_MODULE_1__Position__["a" /* default */](position.x, position.y, position.angle);
  return this;
}

function getPosition() {
	return __WEBPACK_IMPORTED_MODULE_0__Turtle__["a" /* default */].position;
}

function execute(input) {
  let journey = [__WEBPACK_IMPORTED_MODULE_0__Turtle__["a" /* default */].getCopy()];

  let execution = __WEBPACK_IMPORTED_MODULE_2__parse_Parser__["a" /* default */].parse(input);
  journey = journey.concat(execution());

  reset();

  return journey;
}

/* harmony default export */ __webpack_exports__["default"] = ({reset, setPosition, getPosition, execute});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CommandRegistry__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Repeat__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Routine__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ExecutionStack__ = __webpack_require__(9);







let currentRoutineDefinition;

let routines = {};

const STATE = {
  EXECUTING_COMMANDS: (word, tokens) => {
    if(controls[word] !== undefined) {
      getControlExecution(controls[word], tokens).execute();
    } else if(__WEBPACK_IMPORTED_MODULE_1__CommandRegistry__["a" /* default */][word] !== undefined) {
      __WEBPACK_IMPORTED_MODULE_5__ExecutionStack__["a" /* default */].pushExecution(getCommandExecution(__WEBPACK_IMPORTED_MODULE_1__CommandRegistry__["a" /* default */][word], tokens));
    } else if(routines[word] !== undefined) {
      getRoutineExecution(routines[word], tokens);
    } else {
      throw new Error(`Control or Command not found: ${word}`);
    }
  },
  DEFINING_ROUTINE_PARAMETERS: (word, tokens) => {
    if(word !== 'startroutine') {
      currentRoutineDefinition.parameters.push(word);
    } else {
      currentState = STATE.DEFINING_ROUTINE_BODY;
    }
  },
  DEFINING_ROUTINE_BODY: (word, tokens) => {
    if(word !== 'endroutine') {
      currentRoutineDefinition.body.push(word);
    } else {
      currentState = STATE.EXECUTING_COMMANDS;
      routines[currentRoutineDefinition.name] = currentRoutineDefinition;
      currentRoutineDefinition = undefined;
    }
  }
};

let currentState = STATE.EXECUTING_COMMANDS;

let routine = new __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_2__Parameter__["a" /* default */].NOT_KEYWORD], (name) => {
  currentRoutineDefinition = new __WEBPACK_IMPORTED_MODULE_4__Routine__["a" /* default */](name);
  currentState = STATE.DEFINING_ROUTINE_PARAMETERS;
});

let startroutine = new __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */]([], () => {
  throw new Error('startroutine called without routine');
});

let endroutine = new __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */]([], () => {
  throw new Error('endroutine called without routine');
});

let repeat = new __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_2__Parameter__["a" /* default */].FINITE_NUMBER], (frequency) => {
  __WEBPACK_IMPORTED_MODULE_5__ExecutionStack__["a" /* default */].pushNewRepeat(frequency);
});

let endrepeat = new __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */]([], () => {
  __WEBPACK_IMPORTED_MODULE_5__ExecutionStack__["a" /* default */].closeCurrentRepeat();
});

let controls = {repeat, endrepeat, routine, startroutine, endroutine};

function tokenize(input) {
  return input.split("\n").join(" ").split(" ");
}

function getControlExecution(control, tokens) {
  let parameters = tokens.splice(0, control.parameterSchema.length);
  return control.createExecution(parameters);
}

function getCommandExecution(command, tokens) {
  let parameters = tokens.splice(0, command.parameterSchema.length);
  return command.createExecution(parameters);
}

function getRoutineExecution(routine, tokens) {
  let parameters = tokens.splice(0, routine.parameters.length);
  generateTurtleExecutions(routine.parseBody(parameters));
}

function generateTurtleExecutions(tokens) {
  while(tokens.length > 0) {
    currentState(tokens.shift(), tokens);
  }
}

function reset() {
  routines = {};
}

function parse(input) {
  __WEBPACK_IMPORTED_MODULE_5__ExecutionStack__["a" /* default */].instantiate();
  generateTurtleExecutions(tokenize(input));

  return () => {
    return __WEBPACK_IMPORTED_MODULE_5__ExecutionStack__["a" /* default */].execute();
  };
}

/* harmony default export */ __webpack_exports__["a"] = ({reset, parse});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Command__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Turtle__ = __webpack_require__(0);




let forward = new __WEBPACK_IMPORTED_MODULE_1__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_0__Parameter__["a" /* default */].FINITE_NUMBER], (distance) => {
  return __WEBPACK_IMPORTED_MODULE_2__Turtle__["a" /* default */].move(distance);
});

let back = new __WEBPACK_IMPORTED_MODULE_1__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_0__Parameter__["a" /* default */].FINITE_NUMBER], (distance) => {
  return __WEBPACK_IMPORTED_MODULE_2__Turtle__["a" /* default */].move(0 - distance);
});

let left = new __WEBPACK_IMPORTED_MODULE_1__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_0__Parameter__["a" /* default */].FINITE_NUMBER], (degree) => {
  return __WEBPACK_IMPORTED_MODULE_2__Turtle__["a" /* default */].rotate(degree);
});

let right = new __WEBPACK_IMPORTED_MODULE_1__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_0__Parameter__["a" /* default */].FINITE_NUMBER], (degree) => {
  return __WEBPACK_IMPORTED_MODULE_2__Turtle__["a" /* default */].rotate(0 - degree);
});

let pen = new __WEBPACK_IMPORTED_MODULE_1__Command__["a" /* default */]([__WEBPACK_IMPORTED_MODULE_0__Parameter__["a" /* default */].UP_DOWN], (pen) => {
  __WEBPACK_IMPORTED_MODULE_2__Turtle__["a" /* default */].penDown = (pen === 'down');
  return __WEBPACK_IMPORTED_MODULE_2__Turtle__["a" /* default */].getCopy();
});

/* harmony default export */ __webpack_exports__["a"] = ({forward, back, left, right, pen});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Routine {
  constructor(name) {
    this.name = name;
    this.parameters = [];
    this.body = [];
  }

  createParameterValueMap(values) {
    if(values.length === this.parameters.length) {
      return this.parameters.reduce((accumulator, parameterName, index) => {
        accumulator[parameterName] = values[index];
        return accumulator;
      }, {});
    }
  }

  parseBody(values) {
    let parameterValues = this.createParameterValueMap(values);

    return this.body.map((word) => {
      if(parameterValues[word] !== undefined) {
        return parameterValues[word];
      } else {
        return word;
      }
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Routine;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Repeat__ = __webpack_require__(4);


class ExecutionStack {
  constructor() {
    this.instantiate();
  }

  instantiate() {
    this.currentRepeat = new __WEBPACK_IMPORTED_MODULE_0__Repeat__["a" /* default */](null, 1);
    this.masterRepeat = this.currentRepeat;
  }

  pushExecution(execution) {
    this.currentRepeat.executions.push(execution);
  }

  pushNewRepeat(frequency) {
    let newRepeat = new __WEBPACK_IMPORTED_MODULE_0__Repeat__["a" /* default */](this.currentRepeat, frequency);
    this.pushExecution(newRepeat);
    this.currentRepeat = newRepeat;
  }

  closeCurrentRepeat() {
    if(this.currentRepeat.parent === null) {
      throw new Error('endrepeat called without matching repeat');
    } else {
      this.currentRepeat = this.currentRepeat.parent;
    }
  }

  execute() {
    if(this.currentRepeat === this.masterRepeat) {
      return this.masterRepeat.execute();
    } else {
      throw new Error('Unclosed repeat defined');
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new ExecutionStack());

/***/ })
/******/ ])["default"];