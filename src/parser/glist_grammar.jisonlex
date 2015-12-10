CYRILLIC 				[абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ]
WORD 						(\w|{CYRILLIC})+

%s store select shuffle add remove num_list num_list_from num_list_to

%%

(\s"и"\s|[\s,.!?;]+)
		%{
			/* Skip whitespace and punctuation */
			yy.debug("WS '" + yytext + "'");
		%}

("запомни"|"запази")
		%{
			yy.debug("STORE '" + yytext + "'");
			this.begin("store");
			return "STORE";
		%}

<store>"като"
		%{
			yy.debug("AS '" + yytext + "'");
			this.begin("INITIAL");
			return "AS";
		%}

"забрави"
		%{
			yy.debug("FORGET '" + yytext + "'");
			return "FORGET";
		%}

("покажи"|"кои са"|"кой е")
		%{
			yy.debug("SHOW '" + yytext + "'");
			return "SHOW";
		%}

("разбъркай"|"рандомизирай"|"разджуркай")
		%{
			yy.debug("SHUFFLE '" + yytext + "'");
			this.begin("shuffle")
			return "SHUFFLE";
		%}

<shuffle>"числата"
		%{
			yy.debug("<select>NUMBER '" + yytext + "'");
			this.begin("num_list");
			return "NUMBER";
		%}

"махни"|"изтрий"
		%{
			yy.debug("REMOVE '" + yytext + "'");
			this.begin("remove")
			return "REMOVE";
		%}

<remove>"от"
		%{
			yy.debug("<remove>FROM '" + yytext + "'");
			this.begin("INITIAL");
			return "FROM";
		%}

"добави"
		%{
			yy.debug("ADD '" + yytext + "'");
			this.begin("add");
			return "ADD"
		%}

<add>"към"
		%{
			yy.debug("<add>TO '" + yytext + "'");
			this.begin("INITIAL");
			return "TO";
		%}

"само"
		%{
			yy.debug("ONLY '" + yytext + "'");
			return "ONLY";
		%}

"без"
		%{
			yy.debug("WITHOUT '" + yytext + "'");
			return "WITHOUT";
		%}

("дай"|"избери")
		%{
			yy.debug("SELECT '" + yytext + "'");
			this.begin("select");
			return "SELECT";
		%}

<select>"от"
		%{
			yy.debug("<select>FROM '" + yytext + "'");
			this.begin("INITIAL");
			return "FROM";
		%}

<select>"числo"
		%{
			yy.debug("<select>NUMBER '" + yytext + "'");
			this.begin("num_list");
			return "NUMBER";
		%}

<select>{WORD}
		%{
			/* Ignore additional words in select statements for now. */
			yy.debug("<select>IGNORE " + yytext);
		%}

<num_list>"от"
		%{
			yy.debug("<num_list>FROM '" + yytext + "'");
			this.begin("num_list_from");
			return "FROM";
		%}

<num_list>"до"
		%{
			yy.debug("<num_list>TO '" + yytext + "'");
			this.begin("num_list_to");
			return "TO";
		%}

<num_list_from>"до"
		%{
			yy.debug("<num_list_from>TO '" + yytext + "'");
			this.begin("num_list_to");
			return "TO";
		%}

<num_list_from>"-"?\d+
		%{
			yy.debug("<num_list_from>INT '" + yytext + "'");
			return "INT";
		%}

<num_list_to>"-"?\d+
		%{
			yy.debug("<num_list_to>INT '" + yytext + "'");
			this.begin("INITIAL");
			return "INT";
		%}

{WORD}
		%{
			yy.debug("NAME '" + yytext + "'");
			return "NAME";
		%}

$
		%{
			yy.debug("EOF '" + yytext + "'");
			return "EOF";
		%}