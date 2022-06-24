import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from '../plugins/fetch-plugin';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';


let service: esbuild.Service;

export default async (rawCode: string) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
        });
    }

    const env = ["process", "env", "NODE_ENV"].join(".");

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

    return result.outputFiles[0].text;
};