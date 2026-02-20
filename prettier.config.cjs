/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
