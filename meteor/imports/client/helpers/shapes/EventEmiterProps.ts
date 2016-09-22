
interface EventEmiterProps extends NodeJS.EventEmitter{
  off(evetn: string, listener: Function): NodeJS.EventEmitter;
}
