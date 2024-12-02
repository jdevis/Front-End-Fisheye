import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "script",
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
];
