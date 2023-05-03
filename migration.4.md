# Migrating from @linzjs/style  3.x -> 4.x

Migration path for most users could just be to delete the config files and re-install them

```
rm .eslintrc.js .pretterrc.js tsconfig.json
npx linz-style-install
```

If there are custom rules users can re-configure the 

1. Rename config files to .cjs

```
mv .eslintrc.js .eslintrc.cjs
mv .prettierrc.js .prettierrc.cjs
```

2. Update imports inside config file
```javascript
require('@linzjs/style/.prettierrc.js') 
require('@linzjs/style/.prettierrc.cjs') 
````

3. Reset tsconfig to base
```json
{
  "extends": "@linzjs/style/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "build"
  }
}
```
