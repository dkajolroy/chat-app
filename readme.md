# Important Task

## 01 Many to Many Relationship ( prisma+mongodb)

```
model Post {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  categoryIDs String[]   @db.ObjectId
  categories  Category[] @relation(fields: [categoryIDs], references: [id])
}

model Category {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  name    String
  postIDs String[] @db.ObjectId
  posts   Post[]   @relation(fields: [postIDs], references: [id])
}
```

## 02 Error Socket typescript build ( fix socket v4.6.2)

## 03 Production on single port/domain ( React+ Express )

Package.json

```
 "scripts": {
    "tsc": "tsc",
    "start": " node dist/index.js",
    "dev": "nodemon src/index.ts",
    "init": "npm i && npm i --prefix client",
    "build": "npm run init && tsc && npm run build --prefix client"
  },
```

Server.ts ( client app inside server root directory )

```
// render react production build
app.use(express.static(path.join(path.resolve(), "client/dist")));  // if client in the root directory
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client/dist/index.html"));
});
```
