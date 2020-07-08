let importAll = (requireContext) => requireContext.keys().forEach(requireContext)
// 找到所有 icons，全部导出
try {
  importAll(require.context('./icons/', true, /\.svg$/))
} catch (error) {
  console.log(error)
}
