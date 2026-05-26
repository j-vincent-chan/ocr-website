The preview is not visible because the dev server is failing before the app can start. The logs show Vite cannot load `vite.config.ts` because esbuild is missing its Linux native package: `@esbuild/linux-x64`.

Plan:
1. Add the missing optional native package as a dev dependency so esbuild can run in this sandbox environment.
2. Let the dev server restart and confirm the latest logs no longer show the esbuild package error.
3. If a new app-level error appears after the server starts, diagnose that separately from fresh logs.

Technical detail:
- This is the same class of issue as the earlier missing Rollup native binary: the package manager did not install an optional platform binary that Vite/esbuild requires to run locally.