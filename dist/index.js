import _ from "lodash";
import { Processor } from "postcss";
import bemLinter from "postcss-bem-linter";
import stylelint from "stylelint";
// @ts-ignore
import Result from "postcss/lib/result";
const ruleName = "plugin/selector-bem-pattern";
const messages = stylelint.utils.ruleMessages(ruleName, {
    expected: (message) => message,
});
const isStringOrRegExp = (x) => _.isString(x) || _.isRegExp(x);
const isStringOrFunction = (x) => _.isString(x) || _.isFunction(x);
const optionsSchema = {
    preset: ["suit", "bem"],
    presetOptions: [_.isObject],
    componentName: [isStringOrRegExp],
    componentSelectors: [
        (pattern) => {
            if (isStringOrFunction(pattern))
                return true;
            if (!pattern.initial)
                return false;
            if (!isStringOrFunction(pattern.initial))
                return false;
            if (pattern.combined && !isStringOrFunction(pattern.combined))
                return false;
            return true;
        },
    ],
    implicitComponents: [
        _.isBoolean,
        _.isString,
        (pattern) => _.isArray(pattern) && _.every(pattern, _.isString),
    ],
    implicitUtilities: [
        _.isBoolean,
        _.isString,
        (pattern) => _.isArray(pattern) && _.every(pattern, _.isString),
    ],
    utilitySelectors: [isStringOrRegExp],
    ignoreSelectors: [
        isStringOrRegExp,
        (pattern) => {
            if (!_.isArray(pattern)) {
                return isStringOrRegExp(pattern);
            }
            return _.every(pattern, isStringOrRegExp);
        },
    ],
    ignoreCustomProperties: [
        isStringOrRegExp,
        (pattern) => {
            if (!_.isArray(pattern)) {
                return isStringOrRegExp(pattern);
            }
            return _.every(pattern, isStringOrRegExp);
        },
    ],
};
const rule = (options) => {
    return (root, result) => {
        if (!options)
            return;
        const validOptions = stylelint.utils.validateOptions(result, ruleName, {
            actual: options,
            possible: optionsSchema,
        });
        if (!validOptions)
            return;
        // @ts-ignore
        const bemLinterResult = new Result(new Processor(), root, {});
        // @ts-ignore
        bemLinter(options).Once(root, { result: bemLinterResult });
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
