import {Reactioner} from "../../common/models/Reactioner";

export const Reactioners = new Mongo.Collection<Reactioner>('reactioners', {});

export const Blacklist = new Mongo.Collection<Reactioner>('blacklist', {});
