# lovely-ui-react(持续更新中) 使用 TypeScript、React Hooks
# 一套好用的 PC 端 React 组件 
[![GitHub license](https://img.shields.io/github/license/Maricaya/xue-react)](https://github.com/Maricaya/xue-react/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/Maricaya/xue-react.svg?style=svg)](https://app.circleci.com/pipelines/github/Maricaya/xue-react)
[![npm version](https://badge.fury.io/js/adorable-react.svg)](https://badge.fury.io/js/adorable-react)
[![GitHub issues](https://img.shields.io/github/issues/Maricaya/xue-react)](https://github.com/Maricaya/xue-react/issues)
[![GitHub forks](https://img.shields.io/github/forks/Maricaya/xue-react)](https://github.com/Maricaya/xue-react/network)
[![GitHub stars](https://img.shields.io/github/stars/Maricaya/xue-react)](https://github.com/Maricaya/xue-react/stargazers)

> 组件仅供学习交流，请勿在生产环境中使用

# 特性
- 使用 TypeScript 开发，提供完整的类型定义文件。
- 使用 React Hooks 进行状态管理。
- 深入每个细节的主题定制能力。

- 文档地址：
https://maricaya.github.io/lovely-ui-react/example.html
# 组件列表
- [x] Icon
- [ ] button
- [x] Dialog
- [x] Layout
- [ ] Form
- [ ] Scroll
- [ ] Tree

# 安装
```bash
npm install lovely-ui-react
yarn add lovely-ui-react
```
# 使用
```jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from 'lovely-react'
import 'lovely-ui-react/lib/index.css'

ReactDOM.render(
  <div>
    <Button>Default</Button>
  </div>,
  mountNode
)

```
需要注意的是，样式文件需要单独引入。


# 特别提醒
使用 lovely-react 时，需要使用 border-box 盒模型，否则会影响样式。代码示例：
```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

# License
This project is licensed under the terms of the MIT license.
