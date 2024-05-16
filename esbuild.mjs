import * as esbuild from "esbuild"
import fs from "fs/promises"

const components = await fs.readdir("src/components")
const files = components.map(async (component) => {
  if ((await fs.stat(`src/components/${component}`)).isDirectory()) {
    return [`src/components/${component}/index.tsx`, `src/components/${component}/hookform.tsx`]
  } else {
    return []
  }
})
const entryPoints = await Promise.all(files).then((tsxs) => tsxs.flat())

await esbuild.build({
  entryPoints: entryPoints,
  outdir: "dist",
  outbase: "src/components",
  format: "esm",
  platform: "node",
  bundle: true,
  minify: true,
  external: ["react-dom", "react", "react-hook-form", "react-select", "react-datepicker"],
})

await esbuild.build({
  entryPoints: ["src/index.css"],
  outdir: "dist",
  bundle: true,
})

const dtsDir = await fs.readdir("dist/components")
dtsDir.forEach(async (dir) => {
  await fs.rename(`dist/components/${dir}/index.d.ts`, `dist/${dir}/index.d.ts`)
  await fs.rename(`dist/components/${dir}/hookform.d.ts`, `dist/${dir}/hookform.d.ts`)
})

await fs.rm("dist/components", { recursive: true })
await fs.rm("dist/hooks", { recursive: true })
await fs.rm("dist/utils", { recursive: true })
