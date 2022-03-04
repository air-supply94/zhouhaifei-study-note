import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';
export default defineConfig({
  title: '学习笔记',
  base: isProduction ? '/zhouhaifei-study-note/' : undefined,
  publicPath: isProduction ? 'https://air-supply94.github.io/zhouhaifei-study-note/' : undefined,
  outputPath: 'dist',
  mode: 'site',
  hash: true,
  locales: [
    [
      'zh-CN',
      '中文',
    ],
    [
      'en-US',
      'English',
    ],
  ],
  navs: {
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/air-supply94/zhouhaifei-study-note.git',
      },
      {
        title: '更新日志',
        path: 'https://github.com/air-supply94/zhouhaifei-study-note/blob/master/CHANGELOG.md',
      },
    ],
    'en-US': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/air-supply94/zhouhaifei-study-note.git',
      },
      {
        title: '更新日志',
        path: 'https://github.com/air-supply94/zhouhaifei-study-note/blob/master/CHANGELOG.md',
      },
    ],
  },
  exportStatic: {},
});
