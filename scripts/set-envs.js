import { writeFileSync, mkdirSync } from "node:fs";

const targetPathEnvironments = "./src/environments/environments.ts";
const targetPathEnvironmentsProd = "./src/environments/environments.prod.ts";

const envFileContent = `
export const environment = {
  production: false,
  base_url: 'http://localhost:3000',
};
`;

//* mkdirSync crea la carpeta si no existe y el { recursive: true } es para que cree la carpeta aunque no exista la ruta
mkdirSync("./src/environments", { recursive: true });

//* writeFileSync crea el archivo si no existe y si existe lo sobreescribe
//* writeFileSync(<ruta del archivo>, <contenido del archivo>, <opciones>))
//* <ruta del archivo> = Es la ruta del archivo a crear o sobreescribir - targetPathEnvironments
//* <contenido del archivo> = Es el contenido del archivo a crear o sobreescribir - envFileContent
//* <opciones> = Es un objeto que contiene opciones para la creación del archivo
writeFileSync(targetPathEnvironments, envFileContent);
writeFileSync(targetPathEnvironmentsProd, envFileContent);
