import fs from 'fs';
import path from 'path';

import ebnfParser from 'ebnf-parser';
import lexParser from 'lex-parser';
import { Parser } from 'jison';

import scope from './scope';

let bnf = fs.readFileSync('dist/parser/glist_grammar.jison', 'utf8');
let lex = fs.readFileSync('dist/parser/glist_grammar.jisonlex', 'utf8');

let grammar = ebnfParser.parse(bnf);
grammar.lex = lexParser.parse(lex);

let parser = new Parser(grammar);
parser.yy = scope;

export default parser;