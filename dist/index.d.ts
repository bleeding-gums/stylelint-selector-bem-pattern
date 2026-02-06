import stylelint from "stylelint";
declare const ruleName = "plugin/selector-bem-pattern";
declare const messages: {
    expected: (message: string) => string;
};
declare const plugin: stylelint.Plugin;
export default plugin;
export { messages, ruleName };
