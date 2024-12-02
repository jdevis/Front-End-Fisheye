import globals from "globals";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";

export default [
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "script",
			},
		},
		plugins: {
			import: pluginImport,
		},
		settings: {
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"], // Extensions de fichiers autorisées
				},
			},
		},
		rules: {
			"import/no-unresolved": "error",
		},
	},
	pluginJs.configs.recommended,
];
