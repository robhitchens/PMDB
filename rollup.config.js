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
import sass from "rollup-plugin-sass";
import path from "path";

const production = !process.env.ROLLUP_WATCH;
const postcssOptions = () => ({
    extensions: ['.scss', '.sass'],
    extract: false,
    minimize: true,
    use: [
        ['sass', {
            includePaths: [
                './src/main/svelte/theme',
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
    plugins: [//TODO don't know how this will turn out
        //replace({}),//TODO need to replace any environment keys in frontend with process configured keys.
        postcss(postcssOptions()),
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