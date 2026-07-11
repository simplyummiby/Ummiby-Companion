# Split Duaa Collection Data — v0.5.3

## Data location

```text
js/data/collections/
```

Each collection is now maintained separately:

- `morning.js`
- `evening.js`
- `sleep.js`
- `travel.js`
- `weather.js`
- `prayer.js`
- `istikharah.js`

## Supporting files

- `js/data/collection-registry.js`
- `js/data/collection-loader.js`

## Adding a Duaa

Open the relevant collection file and add the new record to its `items` array.

For example, a new Morning duaa belongs only in:

`js/data/collections/morning.js`

The shared renderer automatically creates the card and updates progress totals after reload.
