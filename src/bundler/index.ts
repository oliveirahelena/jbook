import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';


let service: esbuild.Service;

const bundle = async (rawCode: string) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
        });
    }

    const env = ["process", "env", "NODE_ENV"].join(".");

    try {
        const result = await service.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
            [env]: '"production"',
            globalName: "window",
            },
        });

        return {
            code: result.outputFiles[0].text,
            err: '',
        }
    } catch (err) {
        return {
            code: '',
            // @ts-ignore
            err: err.message,
        }
    }
};

export default bundle;