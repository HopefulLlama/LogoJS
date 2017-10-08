import CommandRegistry from './CommandRegistry';
import ControlRegistry from './ControlRegistry';
import RoutineRegistry from './RoutineRegistry';

function getAllKeys(): string[] {
  return [...CommandRegistry.getKeys(), ...ControlRegistry.getKeys(), ...RoutineRegistry.getKeys()];
}

export default {
  command: CommandRegistry,
  control: ControlRegistry,
  routine: RoutineRegistry,
  getAllKeys
};