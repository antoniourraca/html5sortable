import uglify from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript'
import strip from 'rollup-plugin-strip-code'
import pkg from './package.json'

let dir = `${pkg.dist}/`

let plugins = [
  typescript({
    target: 'ES5'
  })
]
// strip test code if not in testing mode
if (!process.env.test) {
  plugins = [...plugins, strip({
    start_comment: 'START.TESTS_ONLY',
    end_comment: 'END.TESTS_ONLY'
  })]
} else {
  dir = '_test/'
}

export default [
  {
    input: pkg.file,
    output: {
      name: 'sortable',
      file: `${dir}${pkg.name}.min.js`,
      format: 'iife',
      sourcemap: true
    },
    plugins: [...plugins, uglify()]
  },
  {
    input: pkg.file,
    output: [
      { file: `${dir}${pkg.name}.js`, format: 'iife', name: 'sortable' },
      { file: `${dir}${pkg.name}.cjs.js`, format: 'cjs' },
      { file: `${dir}${pkg.name}.amd.js`, format: 'amd' },
      { file: `${dir}${pkg.name}.es.js`, format: 'es' }
    ],
    plugins: plugins
  }
]
