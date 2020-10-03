module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: ['react-app', 'prettier', 'prettier/react', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'import/no-extraneous-dependencies': ['error'],
		'no-else-return': ['error', { allowElseIf: false }],
		'object-curly-spacing': ['error', 'always'],
	},
};
