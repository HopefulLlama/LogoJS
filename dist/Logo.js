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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExecutionStack_1 = __webpack_require__(1);
var ParseState_1 = __webpack_require__(2);
var Tokenizer_1 = __webpack_require__(20);
var MasterRegistry_1 = __webpack_require__(6);
var ParameterValueMap_1 = __webpack_require__(11);
var currentState = ParseState_1.default.EXECUTING_COMMANDS;
function generateExecutions(tokens, parameterValueMap) {
    while (tokens.length > 0) {
        currentState(tokens.shift(), tokens, parameterValueMap);
    }
}
function reset() {
    MasterRegistry_1.default.routine.reset();
    currentState = ParseState_1.default.EXECUTING_COMMANDS;
}
function parse(input) {
    ExecutionStack_1.default.instantiate();
    generateExecutions(Tokenizer_1.default.tokenize(input), new ParameterValueMap_1.default(new Map()));
    return function () {
        return ExecutionStack_1.default.execute();
    };
}
function setCurrentState(state) {
    currentState = state;
}
exports.default = { reset: reset, parse: parse, setCurrentState: setCurrentState, generateExecutions: generateExecutions };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Repeat_1 = __webpack_require__(13);
var ExecutionStack = /** @class */ (function () {
    function ExecutionStack() {
        this.instantiate();
    }
    ExecutionStack.prototype.instantiate = function () {
        this.currentRepeat = new Repeat_1.default(null, 1);
        this.masterRepeat = this.currentRepeat;
    };
    ExecutionStack.prototype.pushExecution = function (execution) {
        this.currentRepeat.executions.push(execution);
    };
    ExecutionStack.prototype.pushNewRepeat = function (frequency) {
        var newRepeat = new Repeat_1.default(this.currentRepeat, frequency);
        this.pushExecution(newRepeat);
        this.currentRepeat = newRepeat;
    };
    ExecutionStack.prototype.closeCurrentRepeat = function () {
        if (this.currentRepeat.parent === null) {
            throw new Error('endrepeat called without matching repeat');
        }
        else {
            this.currentRepeat = this.currentRepeat.parent;
        }
    };
    ExecutionStack.prototype.execute = function () {
        if (this.currentRepeat === this.masterRepeat) {
            return this.masterRepeat.execute();
        }
        else {
            throw new Error('Unclosed repeat defined');
        }
    };
    return ExecutionStack;
}());
exports.default = new ExecutionStack();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MasterRegistry_1 = __webpack_require__(6);
var RoutineGenerator_1 = __webpack_require__(10);
var Keywords_1 = __webpack_require__(8);
var ExecutionStack_1 = __webpack_require__(1);
var Parser_1 = __webpack_require__(0);
var ParseState_1 = __webpack_require__(2);
function getControlExecution(control, tokens, parameterValueMap) {
    var parameters = parameterValueMap.substituteParameters(tokens.splice(0, control.parameterSchema.length));
    return control.createExecution(parameters);
}
function getInstructionExecution(command, tokens, parameterValueMap) {
    var parameters = parameterValueMap.substituteParameters(tokens.splice(0, command.parameterSchema.length));
    return command.createExecution(parameters);
}
function getRoutineExecution(routine, tokens, parameterValueMap) {
    var parameters = tokens.splice(0, routine.parameters.length);
    var newParameterValueMap = routine.createParameterValueMap(parameters);
    Parser_1.default.generateExecutions(routine.getBody(), newParameterValueMap);
}
exports.default = {
    EXECUTING_COMMANDS: function (word, tokens, parameterValueMap) {
        if (MasterRegistry_1.default.control.getItem(word) !== undefined) {
            getControlExecution(MasterRegistry_1.default.control.getItem(word), tokens, parameterValueMap).execute();
        }
        else if (MasterRegistry_1.default.command.getItem(word) !== undefined) {
            ExecutionStack_1.default.pushExecution(getInstructionExecution(MasterRegistry_1.default.command.getItem(word), tokens, parameterValueMap));
        }
        else if (MasterRegistry_1.default.routine.getItem(word) !== undefined) {
            getRoutineExecution(MasterRegistry_1.default.routine.getItem(word), tokens, parameterValueMap);
        }
        else {
            throw new Error("Control or Command not found: " + word);
        }
    },
    DEFINING_ROUTINE_PARAMETERS: function (word, tokens, parameterValueMap) {
        if (word === Keywords_1.default.STARTROUTINE) {
            Parser_1.default.setCurrentState(ParseState_1.default.DEFINING_ROUTINE_BODY);
        }
        else if (Object.values(Keywords_1.default).indexOf(word) !== -1) {
            throw new Error("Keyword " + word + " not allowed as routine parameter");
        }
        else {
            RoutineGenerator_1.default.addParameter(word);
        }
    },
    DEFINING_ROUTINE_BODY: function (word, tokens, parameterValueMap) {
        if (word === Keywords_1.default.ENDROUTINE) {
            Parser_1.default.setCurrentState(ParseState_1.default.EXECUTING_COMMANDS);
            var routine = RoutineGenerator_1.default.generateRoutine();
            MasterRegistry_1.default.routine.setItem(routine.name, routine);
        }
        else {
            RoutineGenerator_1.default.addToBody(word);
        }
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry = /** @class */ (function () {
    function Registry() {
        this.register = {};
    }
    Registry.prototype.setItem = function (name, item) {
        this.register[name] = item;
    };
    Registry.prototype.getItem = function (name) {
        return this.register[name];
    };
    Registry.prototype.getKeys = function () {
        return Object.keys(this.register);
    };
    Registry.prototype.reset = function () {
        this.register = {};
    };
    return Registry;
}());
exports.default = Registry;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = __webpack_require__(5);
var Turtle = /** @class */ (function () {
    function Turtle(position, penDown, colour) {
        this.reset(position, penDown, colour);
    }
    Turtle.prototype.reset = function (position, penDown, colour) {
        this.position = position;
        this.penDown = penDown;
        this.colour = colour;
    };
    Turtle.prototype.getCopy = function () {
        return { position: this.position, penDown: this.penDown, colour: this.colour };
    };
    Turtle.prototype.move = function (distance) {
        var radians = Math.PI * this.position.angle / 180;
        this.position = new Position_1.default(this.position.x + (distance * Math.sin(radians)), this.position.y + (distance * Math.cos(radians)), this.position.angle);
        return this.getCopy();
    };
    Turtle.prototype.rotate = function (degree) {
        var angle = this.position.angle + degree;
        this.position = new Position_1.default(this.position.x, this.position.y, angle);
        return this.getCopy();
    };
    return Turtle;
}());
exports.default = new Turtle(new Position_1.default(0, 0, 180), true, '#000000');


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(x, y, angle) {
        this.x = x;
        this.y = y;
        angle = angle % 360;
        if (angle < 0) {
            angle += 360;
        }
        this.angle = angle;
    }
    return Position;
}());
exports.default = Position;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandRegistry_1 = __webpack_require__(14);
var ControlRegistry_1 = __webpack_require__(17);
var RoutineRegistry_1 = __webpack_require__(19);
function getAllKeys() {
    return CommandRegistry_1.default.getKeys().concat(ControlRegistry_1.default.getKeys(), RoutineRegistry_1.default.getKeys());
}
exports.default = {
    command: CommandRegistry_1.default,
    control: ControlRegistry_1.default,
    routine: RoutineRegistry_1.default,
    getAllKeys: getAllKeys
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Keywords_1 = __webpack_require__(8);
var Parameter_1 = __webpack_require__(15);
function expectationMessage(expect, actual) {
    return "Expected " + expect + ", but got " + actual;
}
exports.default = {
    FINITE_NUMBER: new Parameter_1.default(function (parameter) {
        var number = parseFloat(parameter);
        if (!isNaN(number) && isFinite(number)) {
            return number;
        }
        else {
            throw new Error(expectationMessage('a float', parameter));
        }
    }),
    POSITIVE_INTEGER: new Parameter_1.default(function (parameter) {
        var number = Math.floor(Number(parameter));
        if (String(number) === parameter && number > 0) {
            return number;
        }
        else {
            throw new Error(expectationMessage('an integer greater than zero', parameter));
        }
    }),
    UP_DOWN: new Parameter_1.default(function (parameter) {
        if (parameter === Keywords_1.default.UP || parameter === Keywords_1.default.DOWN) {
            return parameter;
        }
        else {
            throw new Error(expectationMessage('either "up" or "down"', parameter));
        }
    }),
    NOT_KEYWORD: new Parameter_1.default(function (parameter) {
        var startsWithLetter = new RegExp(/^[a-z].*/);
        if (startsWithLetter.test(parameter) && Object.values(Keywords_1.default).indexOf(parameter) === -1) {
            return parameter;
        }
        else {
            throw new Error(expectationMessage('non-reserved word', "reserved word: " + parameter));
        }
    }),
    HEXADECIMAL: new Parameter_1.default(function (parameter) {
        var sixDigitHexadecimal = new RegExp(/^#[0-9a-f]{6}$/);
        if (sixDigitHexadecimal.test(parameter)) {
            return parameter;
        }
        else {
            throw new Error(expectationMessage('six digit hexadecimal colour (prefixed with "#")', parameter));
        }
    })
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    FORWARD: 'forward',
    BACK: 'back',
    LEFT: 'left',
    RIGHT: 'right',
    ROUTINE: 'routine',
    STARTROUTINE: 'startroutine',
    ENDROUTINE: 'endroutine',
    REPEAT: 'repeat',
    ENDREPEAT: 'endrepeat',
    UP: 'up',
    DOWN: 'down'
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Executeable_1 = __webpack_require__(16);
var Instruction = /** @class */ (function () {
    function Instruction(parameterSchema, execute) {
        this.parameterSchema = parameterSchema;
        this.execute = execute;
    }
    Instruction.prototype.createExecution = function (parameters) {
        var _this = this;
        return new Executeable_1.default(function () {
            parameters = parameters.map(function (parameter, index) {
                return _this.parameterSchema[index].validateAndTransform(parameter);
            });
            return _this.execute.apply(_this, parameters);
        });
    };
    return Instruction;
}());
exports.default = Instruction;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Routine_1 = __webpack_require__(18);
var name, parameters, body;
var RoutineGenerator = /** @class */ (function () {
    function RoutineGenerator() {
        this.start();
    }
    RoutineGenerator.prototype.start = function () {
        name = null;
        parameters = [];
        body = [];
        return this;
    };
    RoutineGenerator.prototype.setName = function (n) {
        name = n;
        return this;
    };
    RoutineGenerator.prototype.addParameter = function (p) {
        parameters.push(p);
        return this;
    };
    RoutineGenerator.prototype.addToBody = function (b) {
        body.push(b);
        return this;
    };
    RoutineGenerator.prototype.generateRoutine = function () {
        var routine = new Routine_1.default(name, parameters, body);
        this.start();
        return routine;
    };
    return RoutineGenerator;
}());
exports.default = new RoutineGenerator();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParameterValueMap = /** @class */ (function () {
    function ParameterValueMap(map) {
        this.map = map;
    }
    ParameterValueMap.prototype.substituteParameters = function (parameters) {
        var _this = this;
        return parameters.map(function (word) {
            if (_this.map.has(word)) {
                return _this.map.get(word);
            }
            else {
                return word;
            }
        });
    };
    return ParameterValueMap;
}());
exports.default = ParameterValueMap;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Turtle_1 = __webpack_require__(4);
var Position_1 = __webpack_require__(5);
var Parser_1 = __webpack_require__(0);
function reset() {
    Turtle_1.default.reset(new Position_1.default(0, 0, 180), true, '#000000');
    Parser_1.default.reset();
    return this;
}
function setPosition(position) {
    Turtle_1.default.position = new Position_1.default(position.x, position.y, position.angle);
    return this;
}
function getPosition() {
    return Turtle_1.default.position;
}
function execute(input) {
    try {
        var journey = [Turtle_1.default.getCopy()];
        var execution = Parser_1.default.parse(input);
        journey = journey.concat(execution());
        reset();
        return journey;
    }
    catch (error) {
        reset();
        throw error;
    }
}
exports.default = { reset: reset, setPosition: setPosition, getPosition: getPosition, execute: execute };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Repeat = /** @class */ (function () {
    function Repeat(parent, frequency) {
        this.parent = parent;
        this.frequency = frequency;
        this.executions = [];
    }
    Repeat.prototype.execute = function () {
        var journey = [];
        /* jshint ignore:start */
        for (var i = 0; i < this.frequency; i++) {
            journey = this.executions.reduce(function (accumulator, execution) {
                var partial = execution.execute();
                if (Array.isArray(partial)) {
                    accumulator = accumulator.concat(partial);
                }
                else {
                    accumulator.push(partial);
                }
                return accumulator;
            }, journey);
        }
        return journey;
        /* jshint ignore:end */
    };
    return Repeat;
}());
exports.default = Repeat;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParameterMap_1 = __webpack_require__(7);
var Instruction_1 = __webpack_require__(9);
var Turtle_1 = __webpack_require__(4);
var Registry_1 = __webpack_require__(3);
var registry = new Registry_1.default();
registry.setItem('forward', new Instruction_1.default([ParameterMap_1.default.FINITE_NUMBER], function (distance) {
    return Turtle_1.default.move(distance);
}));
registry.setItem('back', new Instruction_1.default([ParameterMap_1.default.FINITE_NUMBER], function (distance) {
    return Turtle_1.default.move(0 - distance);
}));
registry.setItem('left', new Instruction_1.default([ParameterMap_1.default.FINITE_NUMBER], function (degree) {
    return Turtle_1.default.rotate(degree);
}));
registry.setItem('right', new Instruction_1.default([ParameterMap_1.default.FINITE_NUMBER], function (degree) {
    return Turtle_1.default.rotate(0 - degree);
}));
registry.setItem('pen', new Instruction_1.default([ParameterMap_1.default.UP_DOWN], function (pen) {
    Turtle_1.default.penDown = (pen === 'down');
    return Turtle_1.default.getCopy();
}));
registry.setItem('colour', new Instruction_1.default([ParameterMap_1.default.HEXADECIMAL], function (colour) {
    Turtle_1.default.colour = colour;
    return Turtle_1.default.getCopy();
}));
exports.default = registry;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Parameter = /** @class */ (function () {
    function Parameter(validateAndTransform) {
        this.validateAndTransform = validateAndTransform;
    }
    return Parameter;
}());
exports.default = Parameter;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Executeable = /** @class */ (function () {
    function Executeable(execute) {
        this.execute = execute;
    }
    return Executeable;
}());
exports.default = Executeable;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParameterMap_1 = __webpack_require__(7);
var Instruction_1 = __webpack_require__(9);
var ParseState_1 = __webpack_require__(2);
var Parser_1 = __webpack_require__(0);
var ExecutionStack_1 = __webpack_require__(1);
var Registry_1 = __webpack_require__(3);
var RoutineGenerator_1 = __webpack_require__(10);
var registry = new Registry_1.default();
registry.setItem('routine', new Instruction_1.default([ParameterMap_1.default.NOT_KEYWORD], function (name) {
    RoutineGenerator_1.default.start();
    RoutineGenerator_1.default.setName(name);
    Parser_1.default.setCurrentState(ParseState_1.default.DEFINING_ROUTINE_PARAMETERS);
}));
registry.setItem('startroutine', new Instruction_1.default([], function () {
    throw new Error('startroutine called without routine');
}));
registry.setItem('endroutine', new Instruction_1.default([], function () {
    throw new Error('endroutine called without routine');
}));
registry.setItem('repeat', new Instruction_1.default([ParameterMap_1.default.POSITIVE_INTEGER], function (frequency) {
    ExecutionStack_1.default.pushNewRepeat(frequency);
}));
registry.setItem('endrepeat', new Instruction_1.default([], function () {
    ExecutionStack_1.default.closeCurrentRepeat();
}));
exports.default = registry;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParameterValueMap_1 = __webpack_require__(11);
var Routine = /** @class */ (function () {
    function Routine(name, parameters, body) {
        this.name = name;
        this.parameters = parameters;
        this.body = body;
    }
    Routine.prototype.createParameterValueMap = function (values) {
        var map = new Map();
        if (values.length === this.parameters.length) {
            this.parameters.reduce(function (accumulator, parameterName, index) {
                accumulator.set(parameterName, values[index]);
                return accumulator;
            }, map);
        }
        return new ParameterValueMap_1.default(map);
    };
    Routine.prototype.getBody = function () {
        return this.body.slice();
    };
    return Routine;
}());
exports.default = Routine;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry_1 = __webpack_require__(3);
exports.default = new Registry_1.default();


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function tokenize(input) {
    var keepNonWhitespace = new RegExp(/\S+/, 'g');
    return input.match(keepNonWhitespace) || [];
}
exports.default = { tokenize: tokenize };


/***/ })
/******/ ])["default"];