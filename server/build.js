const { build } = require("esbuild");
const esbuildPluginPino = require("esbuild-plugin-pino");

build({
  entryPoints: ["src/server.ts"],
  outdir: "dist",
  platform: "node",
  format: "cjs",
  keepNames: true,
  bundle: true,
  plugins: [esbuildPluginPino({ transports: ["pino-pretty"] })],
}).catch(() => process.exit(1));
