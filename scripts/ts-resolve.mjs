/** Node needs file extensions in ESM specifiers; TypeScript source omits them.
 *  These scripts import the app's .ts modules directly (Node strips the types
 *  natively), so this hook fills the extension back in — and resolves the
 *  `@/` alias, which tsconfig knows about but Node does not. */
import { pathToFileURL } from "node:url";

const ROOT = pathToFileURL(`${process.cwd()}/`).href;

export async function resolve(specifier, context, next) {
  // `server-only` throws outside a bundler. These scripts *are* the server,
  // so it has nothing to protect here.
  if (specifier === "server-only") {
    return { url: "data:text/javascript,", shortCircuit: true };
  }

  const path = specifier.startsWith("@/") ? `${ROOT}${specifier.slice(2)}` : specifier;

  if ((path.startsWith(".") || path.startsWith(ROOT)) && !/\.[a-z]+$/i.test(path)) {
    try {
      return await next(`${path}.ts`, context);
    } catch {
      /* fall through to the plain specifier */
    }
  }
  return next(path, context);
}
