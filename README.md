# Cómo correr el proyecto

Video completo con toda la explicación de métodos y cómo correr el proyecto: https://youtu.be/bGxaAOSx5_M

Agregue en la raiz del proyecto un archivo .env con la siguientes variables de entorno:
```
PORT=8080
MONGO_URI=Tu_mono_cluster_url
JWT_SECRET=SECRET
```

Con esto, ahora ejecute el comando: `yarn dev` en la raiz del proyecto para ejecutar la aplicación en local.

# Manejo de datos

Para iniciar el proyecto con algunos datos, en al carpeta src/data se encuentran unos archivos json. Cargue estos archivos en las colecciones "users" y "groups" de su cluster de mongo. 

Aquí encontrará: 1 superadmin, 3 usuarios y un grupo. La clave del admin es admin, y las de los usuarioson passwordX donde X es el número del usuario. 


# Postman

Cuenta con una colección de postman con todas las peticiones que se solicitan en el taller