import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstarp() {
  const replServer = await repl(AppModule);
  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

bootstarp();
