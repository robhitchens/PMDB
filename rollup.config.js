import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import typescriptCompiler from "typescript";
import sveltePreprocessor from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";
import scss from "rollup-plugin-scss";
import alias from "rollup-plugin-alias";
import path from "path";

const production = !process.env.ROLLUP_WATCH;
const aliases = () => ({
    resolve: ['.svelte', '.js', '.scss', '.css'],
    entries:[
        {find:/^@smui\/([^\/]+)$/, replacement: path.resolve(__dirname, /*'..',*/ 'node_modules', '$1', 'index.js')},
        {find:/^@smui\/([^\/]+)\/(.*)$/, replacement: path.resolve(__dirname, /*'..',*/ 'node_modules', '$1', '$2')}
    ]
});
const postcssOptions = () => ({
    extensions: ['.scss', '.sass'],
    extract: false,
    minimize: true,
    use: [
        ['sass', {
            includePaths: [
                //'./src/theme',
                './node_modules',
                // This is only needed because we're using a local module. :-/
                // Normally, you would not need this line.
                //path.resolve(__dirname, '..', 'node_modules')
            ]
        }]
    ]
});
//TODO apply configuration to project, need to get rollup and svelte working with typescript
export default {
    input: 'src/main/svelte/Main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        scss(),
        //replace({}),//TODO need to replace any environment keys in frontend with process configured keys.
        /*alias(aliases()),*/
        /*postcss(postcssOptions()),*/
        svelte({
            dev: !production,
            extensions: [".svelte"],
            preprocess: sveltePreprocessor(),
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),
        resolve({
            browser: true,
            dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
        }),
        commonjs({include: "node_modules/**"}),
        typescript({typescript: typescriptCompiler}),
        //!production && serve(),
        !production && livereload('public'),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve(){
    let started = false;
    return {
        writeBundle(){
            if(!started){
                started = true;
                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}