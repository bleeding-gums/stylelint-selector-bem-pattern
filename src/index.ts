import _ from "lodash";
import { Processor, Root } from "postcss";
import bemLinter from "postcss-bem-linter";
import stylelint from "stylelint";
// @ts-ignore
import Result from "postcss/lib/result";

const ruleName = "plugin/selector-bem-pattern";

const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (message: string) => message,
});

const isStringOrRegExp = (x: any): x is string | RegExp =>
  _.isString(x) || _.isRegExp(x);
const isStringOrFunction = (x: any): x is string | Function =>
  _.isString(x) || _.isFunction(x);

const optionsSchema = {
  preset: ["suit", "bem"],
  presetOptions: [_.isObject],
  componentName: [isStringOrRegExp],
  componentSelectors: [
    (pattern: any) => {
      if (isStringOrFunction(pattern)) return true;
      if (!pattern.initial) return false;
      if (!isStringOrFunction(pattern.initial)) return false;
      if (pattern.combined && !isStringOrFunction(pattern.combined))
        return false;
      return true;
    },
  ],
  implicitComponents: [
    _.isBoolean,
    _.isString,
    (pattern: any) => _.isArray(pattern) && _.every(pattern, _.isString),
  ],
  implicitUtilities: [
    _.isBoolean,
    _.isString,
    (pattern: any) => _.isArray(pattern) && _.every(pattern, _.isString),
  ],
  utilitySelectors: [isStringOrRegExp],
  ignoreSelectors: [
    isStringOrRegExp,
    (pattern: any) => {
      if (!_.isArray(pattern)) {
        return isStringOrRegExp(pattern);
      }
      return _.every(pattern, isStringOrRegExp);
    },
  ],
  ignoreCustomProperties: [
    isStringOrRegExp,
    (pattern: any) => {
      if (!_.isArray(pattern)) {
        return isStringOrRegExp(pattern);
      }
      return _.every(pattern, isStringOrRegExp);
    },
  ],
};

const rule: stylelint.Rule = (options) => {
  return (root, result) => {
    if (!options) return;

    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: options,
      possible: optionsSchema,
    });

    if (!validOptions) return;

    // @ts-ignore
    const bemLinterResult = new Result(new Processor(), root, {});
    // @ts-ignore
    bemLinter(options).Once(root as Root, { result: bemLinterResult });
    const bemLinterWarnings = bemLinterResult.warnings();

    bemLinterWarnings.forEach((warning) => {
      stylelint.utils.report({
        ruleName,
        result,
        node: warning.node || root,
        // @ts-ignore
        line: warning.line,
        // @ts-ignore
        column: warning.column,
        message: messages.expected(warning.text),
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;

const plugin = stylelint.createPlugin(ruleName, rule);

export default plugin;
export { messages, ruleName };
