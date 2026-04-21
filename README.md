# BuddyBoss App — Custom Code Template

This repo is a template for extending the BuddyBoss App with your own custom code and native modules. Clone it (or copy the files) and connect it to your app as a starting point.

See the [developer documentation](https://www.buddyboss.com/resources/dev-docs/app-development/) for how to link this package into your app.

Requires **React Native 0.85.1+** with the **New Architecture** enabled.

---

## Project layout

```
src/
  NativeBuddybossCustomCode.ts      # TurboModule spec (JS ↔ native contract)
android/
  build.gradle
  src/main/java/com/buddybosscustomcode/
    BuddybossCustomCodeModule.java  # Android native implementation
    BuddybossCustomCodePackage.java # Auto-registration (usually no edits)
ios/
  BuddybossCustomCode.h             # Obj-C++ header
  BuddybossCustomCode.mm            # iOS native implementation
index.js                            # JS entry point (applyCustomCode hook)
example.js                          # Reference example of applyCustomCode
buddyboss-custom-code.podspec       # Pod config (usually no edits)
package.json                        # Contains codegenConfig
```

---

## Adding a new native method

Signatures are enforced by codegen across all three files — if they don't match, the build fails.

Worked example: add `multiply(a, b)` that returns `a * b`.

### 1. Declare the method in the TS spec

Edit `src/NativeBuddybossCustomCode.ts`:

```ts
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BuddybossCustomCode');
```

### 2. Implement it on Android

Edit `android/src/main/java/com/buddybosscustomcode/BuddybossCustomCodeModule.java`:

```java
@Override
public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
}
```

Codegen maps JS `number` → Java `double` and `Promise<number>` → a trailing `Promise` arg.

### 3. Implement it on iOS

Edit `ios/BuddybossCustomCode.mm`:

```objc
- (void)multiply:(double)a
               b:(double)b
         resolve:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
    resolve(@(a * b));
}
```

### 4. Call it from JS

```js
import BuddybossCustomCode from 'buddyboss-custom-code/src/NativeBuddybossCustomCode';

const result = await BuddybossCustomCode.multiply(10, 2); // 20
```

That's it. Rebuild the host app — codegen regenerates spec classes on every build, so no manual codegen step.

> ### ⚠️ **A FULL APP REBUILD IS REQUIRED BEFORE USING A NATIVE METHOD**
>
> After modifying a native method, a full rebuild is required. Failing to do so will cause the app to crash at runtime when the native code is called

---

## Type mapping cheat-sheet

| TS spec             | Android (Java)       | iOS (Obj-C)                          |
|---------------------|----------------------|--------------------------------------|
| `number`            | `double`             | `double`                             |
| `string`            | `String`             | `NSString *`                         |
| `boolean`           | `boolean`            | `BOOL`                               |
| `Object`            | `ReadableMap`        | `NSDictionary *`                     |
| `Array<T>`          | `ReadableArray`      | `NSArray *`                          |
| `Promise<T>`        | trailing `Promise`   | trailing `resolve` + `reject` blocks |
| `void` (sync)       | `void` return        | `void` return                        |
| `(…) => void`       | `Callback`           | `RCTResponseSenderBlock`             |

For nullable types use `?` in the spec (e.g. `name?: string`) — the generated signatures will accept null on both platforms.

---

## Lifecycle hooks

`BuddybossCustomCodeModule.java` and `BuddybossCustomCode.mm` both expose static lifecycle hooks the BuddyBoss host app invokes. Use them to init third-party SDKs or run side-effects at app/activity/bridge startup. Leave the method signatures as-is — only fill in the bodies.

**Android** (in `BuddybossCustomCodeModule.java`):

- `onCreateApplication(Application)` — called from host `MainApplication.onCreate`
- `onCreateActivity(Activity, Bundle)` — called from host `MainActivity.onCreate`
- `onStart(Activity)` — called from host `MainActivity.onStart`
- `onNewIntent(Activity, Intent)` — called from host `MainActivity.onNewIntent`
- `getPackages(List<ReactPackage>)` — add any extra React packages here

**iOS** (in `BuddybossCustomCode.mm`):

- `+ application:didFinishLaunchingWithOptions:withBridge:` — called from host `AppDelegate`
- `+ rootViewVisible:` — called after the RN root view is attached to the window

---

## JS-only customisations

For pure-JS extensions (custom reducers, epic wrappers, screen replacements, navigation callbacks, global styles, etc.), edit `index.js`. See `example.js` for a reference implementation that exercises most of the `externalCodeSetup` API.
