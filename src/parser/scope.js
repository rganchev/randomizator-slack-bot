import NamesListDef from './model/lists/names_list_def';
import NamesList from './model/lists/names_list';
import IntList from './model/lists/int_list';
import StoreCommand from './model/commands/store_command';
import SelectCommand from './model/commands/select_command';
import ShowCommand from './model/commands/show_command';
import ShuffleCommand from './model/commands/shuffle_command';
import AddCommand from './model/commands/add_command';
import RemoveCommand from './model/commands/remove_command';
import ForgetCommand from './model/commands/forget_command';

import { chain, join } from './util';

let debug = () => {}; // console.log;

export default {
	debug,

	chain,
	join,

	NamesListDef,
	NamesList,
	IntList,

	StoreCommand,
	SelectCommand,
	ShowCommand,
	ShuffleCommand,
	AddCommand,
	RemoveCommand,
	ForgetCommand
};
