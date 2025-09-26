/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. 配置 content 路径，指向你项目中所有使用 Tailwind class 的文件。
  //    这是让 Tailwind 生效的关键步骤。
  //    请根据你的项目结构修改下面的路径。
  content: [
    "./index.html", // 扫描根目录的 index.html
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 扫描 src 目录下的所有相关文件
    "./pages/**/*.{html,js,jsx,ts,tsx,vue}",
    "./components/**/*.{html,js,jsx,ts,tsx,vue}",
  ],

  // 2. 扩展 Tailwind 的默认主题。
  theme: {
    extend: {
      // 这里可以扩展颜色、字体、间距等，以便在 class 中使用。
      // 例如: theme: { extend: { colors: { 'custom-blue': '#007bff' } } }
      // 你的 CSS 变量已经定义在 main.css 中，也可以在这里定义以获得更好的编辑器支持。
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'accent-color': 'var(--accent-color)',
        'neutral-color': 'var(--neutral-color)',
        'primary-light': 'var(--primary-light)',
        'accent-light': 'var(--accent-light)',
        'success-color': 'var(--success-color)',
        'warning-color': 'var(--warning-color)',
        'danger-color': 'var(--danger-color)',
      }
    },
  },

  // 3. 添加 Tailwind 插件。
  plugins: [
    // 例如，官方的 forms, typography, aspect-ratio 插件
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
