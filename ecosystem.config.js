// con pm2 ecosystem se crea este fichero

module.exports = {
  apps: [
    {
      name: "nodeapp",
      // script de arranque de la app
      script: "./bin/www",
      // vigila si hago cambios y lo vuelvo a reinciar (es como nodemon)
      watch: ".",
       // quiero 5 instancias de worker(por ejemplo)
      // instances: 5,
      // argumentos de linea de comandos
      // args: '--list=50'
      env_production: {
        // cuando aredranque mi app en produccion, le poingo variables de entorno
        NODE_ENV: "production",
        // en que puerto quiero que arranque
        PORT: 80,
      },
      // cuando lo arranque en modo de pruebas:
      env_qa: {
        NODE_ENV: "qa",
        port: 8080,
      },
      // cuando lo arranquye en modo desarrollo
      env_development: {
        NODE_ENV: "development",
        DEBUG: "nodeapp:*",
        PORT: 3000,
      },
      // para ver fecha y hora en los logs
      log_date_format: "YYY-MM-DD HH:mm",
    },
    {
      name: "emailService",
      script: "../ejemplo-microservicios/emailService.js",
      // vigila/monitoriza si hago cambios y lo vuelvo a reinciar (es como nodemon)
      watch: ["../ejemplo-microservicios"],
     
      
    },
  ],
//  si quisiera desplegar en un servidor, podria
  deploy: {
    production: {
      // el usuario para hacer ssh al servidor y desplegarlo sera:
      user: "SSH_USERNAME",
      // aqui estaria el servidor de produccion
      host: "SSH_HOSTMACHINE",
      //  la rama de git desde donde despliegas
      ref: "origin/master",
      //  aqui estaria el repo donde tengo mi codigo
      repo: "git:........",
      // la ruta dentro del servidor donde quiero que se despliegue
      path: "/home/nodeapp/app",
      // y cuando se despliegue, puedo hacer que el ejecute un comando en mi ordenador antes de desplegarse(ej, verifique que pasa los test)
      "pre-deploy-local": "",
      // despues de haberlo desplegado al servidor, quer haga npm install por si le he metido nuevas dependencias al proyecto, recargue y que coja las variables de entorno de prod
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
    // podria tener otro entorno mas
  },
};
