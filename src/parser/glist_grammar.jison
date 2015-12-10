%start command

%%

command
	: stmt EOF
		{ return $1; }
	;

stmt
	: store_stmt
	| select_stmt
	| show_stmt
	| shuffle_stmt
	| add_stmt
	| remove_stmt
	| forget_stmt
	;

store_stmt
	: STORE names_list AS NAME
		{ $$ = yy.chain($2, (list) => new yy.StoreCommand($4, list)); }
	;

select_stmt
	: SELECT FROM names_list_def
		{ $$ = yy.chain($3, (listDef) => new yy.SelectCommand(listDef)); }
	| SELECT NUMBER int_list
		{ $$ = yy.chain($3, (list) => new yy.SelectCommand(list)); }
	;

show_stmt
	: SHOW names_list_def
		{ $$ = yy.chain($2, (listDef) => new yy.ShowCommand(listDef)); }
	;

shuffle_stmt
	: SHUFFLE names_list_def
		{ $$ = yy.chain($2, (listDef) => new yy.ShuffleCommand(listDef)); }
	| SHUFFLE NUMBER int_list
		{ $$ = yy.chain($3, (list) => new yy.ShuffleCommand(list)); }
	;

add_stmt
	: ADD names_list TO NAME
		{ $$ = yy.chain($2, (list) => new yy.AddCommand($4, list)); }
	;

remove_stmt
	: REMOVE names_list FROM NAME
		{ $$ = yy.chain($2, (list) => new yy.RemoveCommand($4, list)); }
	;

forget_stmt
	: FORGET NAME
		{ $$ = yy.chain(new yy.ForgetCommand($2)); }
	;

names_list_def
	: NAME
		{ $$ = yy.chain(new yy.NamesListDef($1)); }
	| names_list_def ONLY names_list
		{ $$ = yy.chain(yy.join($1, $3), (res) => res[0].addFilterOnly(res[1])); }
	| names_list_def WITHOUT names_list
		{ $$ = yy.chain(yy.join($1, $3), (res) => res[0].addFilterWithout(res[1])); }
	;

names_list
	: NAME
		{ $$ = yy.chain(new yy.NamesList($1)); }
	| names_list NAME
		{ $$ = yy.chain($1, (list) => list.insert(Infinity, $2)); }
	;

int_list
	: TO INT
		{ $$ = yy.chain(new yy.IntList($2)); }
	| FROM INT TO INT
		{ $$ = yy.chain(new yy.IntList($2, $4)); }
	;