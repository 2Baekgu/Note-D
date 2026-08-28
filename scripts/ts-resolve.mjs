/** Node needs file extensions in ESM specifiers; TypeScript source omits them.
 *  These scripts import the app's .ts modules directly (Node strips the types
 *  natively), so this hook fills the extension back in. */
export async function resolve(specifier, context, next) {
  if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
    try {
      return await next(`${specifier}.ts`, context);
    } catch {
      /* fall through to the plain specifier */
    }
  }
  return next(specifier, context);
}
