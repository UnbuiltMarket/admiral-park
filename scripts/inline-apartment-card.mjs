import { ts } from './tooling.mjs';

// The shared card is authored as browser JavaScript in the apartment-list project.
// Explicit dynamic types retain that runtime unchanged inside a strict TSX file.
export function inlineApartmentCardRuntime(source) {
 const file = ts.createSourceFile('apartment-card.js', source, ts.ScriptTarget.ES2020, true, ts.ScriptKind.JS);
 const transformed = ts.transform(file, [context => {
  const any = () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
  const visit = original => {
   const node = ts.visitEachChild(original, visit, context);
   if (ts.isIdentifier(node) && ['window','document','Object'].includes(node.text) &&
       !(ts.isPropertyAccessExpression(original.parent) && original.parent.name === original)) {
    return ts.factory.createParenthesizedExpression(ts.factory.createAsExpression(node, any()));
   }
   if (ts.isParameter(node)) node.type = any();
   if (ts.isVariableDeclaration(node)) {
    const owner = original.parent?.parent;
    if (!owner || !ts.isForOfStatement(owner) && !ts.isForInStatement(owner)) node.type = any();
   }
   if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
    const async = node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword);
    node.type = async ? ts.factory.createTypeReferenceNode('Promise', [any()]) : any();
   }
   if (ts.isArrayLiteralExpression(node) || ts.isObjectLiteralExpression(node)) return ts.factory.createParenthesizedExpression(ts.factory.createAsExpression(node, any()));
   return node;
  };
  return node => ts.visitNode(node, visit);
 }]);
 try { return ts.createPrinter({ newLine: ts.NewLineKind.LineFeed }).printFile(transformed.transformed[0]); }
 finally { transformed.dispose(); }
}
