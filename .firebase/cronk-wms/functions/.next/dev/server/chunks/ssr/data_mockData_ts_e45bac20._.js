module.exports = [
"[project]/data/mockData.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/_77c79c2e._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/data/mockData.ts [app-ssr] (ecmascript)");
    });
});
}),
];