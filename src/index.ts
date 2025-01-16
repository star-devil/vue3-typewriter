import type { App } from 'vue';
import Typer from './components/Typer.vue';

interface ComponentLibrary {
  [key: string]: any;
}

// 定义组件数组
const components = [Typer];

// 定义安装函数
const library: ComponentLibrary = {
  install: (app: App): void => {
    // 遍历组件数组，并以组件的 `name` 注册到 Vue 实例
    components.forEach((component) => {
      if (component.name) {
        app.component(component.name, component);
      } else {
        console.warn('组件未定义名称，将跳过注册：', component);
      }
    });
  },
  ...components
};

// 导出插件对象
export default library;
