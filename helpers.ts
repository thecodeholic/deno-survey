import { renderFileToString } from "https://deno.land/x/dejs@0.7.0/mod.ts";


export const renderView = (view: string, params: object = {}) => {
  return renderFileToString(`${Deno.cwd()}/views/${view}.ejs`, params)
}
