---
date: 2016-06-13T04:00:16-04:00
slug: hello-world
tags:
  - "Hello"
  - "World"
title: Hello World
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate cursus magna, at egestas justo suscipit a. Pellentesque sit amet feugiat lectus. Maecenas sit amet finibus lorem, nec dignissim tellus. Integer ut luctus turpis. Nullam euismod eget nulla vitae eleifend. Quisque semper maximus aliquam. Proin imperdiet nunc id tempus convallis.

<!--more-->

```js
export default function(intitialState: Object = {}, userConfig?: StoreConfig = {}): Function {
  const config = { ...defaultConfig, ...userConfig }
  const create = config.noHistory ? createDataWithoutHistory : partialRight(createData, config.historyLimit)
  const dbObject = observable(asMap(mapValues(intitialState, (value) => create(value))))

  // Store API
  db.canRedo = (key: string): boolean => dbObject.get(key).__future.length > 0
  db.canUndo = (key: string): boolean => dbObject.get(key).__past.length > 0
  db.contents = (): Object => toJS(dbObject)
  db.set = action((key: string, value: Array<any> | Object): void => dbObject.set(key, create(value)))
  db.redo = action(redo)
  db.undo = action(undo)
  db.chain = chain
  db.object = dbObject
  db.schedule = schedule

  // Query the DB, allowing the user to chain functions to query the store
  function db(key: string, funcs?: Array<Function> | Function): Object {
    if (!dbObject.get(key)) throw new Error('Tried to retrieve undefined key')
    if (funcs) {
      return chain(dbObject.get(key), funcs)
    }
    return dbObject.get(key)
  }

  // Redo any undone changes to the given store
  function redo(key: string): void {
    const obs = dbObject.get(key)
    if (!db.canRedo(key)) {
      throw new Error('You cannot call redo without having called undo first')
    }

    // Redo shouldn't trigger a push to history
    obs.__trackChanges = false
    obs.__past.push(revertChange(obs, obs.__future.pop()))
  }

  // Undo any changes the user has made to the current store
  function undo(key: string): void {
    const obs = dbObject.get(key)
    if (!db.canUndo(key)) {
      throw new Error('You cannot call undo if you have not made any changes')
    }

    // Undo shouldn't trigger a push to history
    obs.__trackChanges = false
    obs.__future.push(revertChange(obs, obs.__past.pop()))
  }

  // Return the database object
  return db
}
```
