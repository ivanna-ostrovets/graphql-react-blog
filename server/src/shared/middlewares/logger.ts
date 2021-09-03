export async function logger(resolve, parent, args, context, info) {
  console.log(
    `${info.parentType} -> ${info.fieldName} (${info.returnType}) resolver triggered`,
  );

  return await resolve(parent, args, context, info);
}
