module.exports = {
	env: {
		node: true,
	},
	extends: ["eslint:recommended", "plugin:vue/essential"],
	rules: {
		"vue/require-default-prop": "off",
		"vue/multi-word-component-names": "off",
	},
}
