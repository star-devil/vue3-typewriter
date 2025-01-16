import type { App } from 'vue';
import Typer from './components/Typer.vue';

Typer.install = (app: App) => {
  app.component(Typer.__name as string, Typer); //注册组件
};

export default Typer;
