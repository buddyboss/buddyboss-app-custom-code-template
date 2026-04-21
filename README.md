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

> ### ⚠️ **A FULL APP REBUILD IS REQUIRED BEFORE USING A NATIVE METHOD**
>
> After adding or modifying a native method, a full rebuild is required. Metro / Fast Refresh will not pick up native changes — failing to rebuild will cause the app to crash at runtime when the native code is called.

> **Sync vs. async:** sync methods return a value directly and block the JS thread until they return, so only use them for cheap, non-I/O work (simple math, reading a constant, etc.). For anything that does network, disk, or heavy compute, use `Promise<T>` so the JS thread stays free. Both variants are shown below.

Worked example (synchronous): add `multiply(a, b)` that returns `a * b` directly.

### 1. Declare the method in the TS spec

Edit `src/NativeBuddybossCustomCode.ts`:

```ts
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BuddybossCustomCode');
```

No `Promise<T>` on the return type → sync method. The value is returned directly; no `Promise` arg is appended by codegen.

### 2. Implement it on Android

Edit `android/src/main/java/com/buddybosscustomcode/BuddybossCustomCodeModule.java`:

```java
@Override
public double multiply(double a, double b) {
    return a * b;
}
```

Codegen maps JS `number` → Java `double`.

### 3. Implement it on iOS

Edit `ios/BuddybossCustomCode.mm`:

```objc
- (NSNumber *)multiply:(double)a b:(double)b
{
    return @(a * b);
}
```

### 4. Call it from JS

```js
import BuddybossCustomCode from 'buddyboss-custom-code/src/NativeBuddybossCustomCode';

const result = BuddybossCustomCode.multiply(10, 2); // 20 — no await
```

That's it. Rebuild the host app — codegen regenerates spec classes on every build, so no manual codegen step.

### Asynchronous variant (for I/O, network, heavy work)

If the work takes real time or needs to fail — hitting the network, disk, a keystore, etc. — return `Promise<T>` so the JS thread stays free. Codegen then appends a trailing `Promise` arg on Android and `resolve` + `reject` blocks on iOS.

Worked example: persist a string to the platform's key-value store (`SharedPreferences` on Android, `NSUserDefaults` on iOS) and read it back.

#### 1. Declare the methods in the TS spec

Edit `src/NativeBuddybossCustomCode.ts`:

```ts
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getPreference(key: string): Promise<string | null>;
  savePreference(key: string, value: string): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BuddybossCustomCode');
```

#### 2. Implement it on Android

Edit `android/src/main/java/com/buddybosscustomcode/BuddybossCustomCodeModule.java`:

```java
// Add these imports at the top of the file
import android.content.Context;
import android.content.SharedPreferences;

// Inside the class body
private static final String PREFS_NAME = "BuddybossCustomCode";

@Override
public void savePreference(String key, String value, Promise promise) {
    try {
        SharedPreferences prefs = getReactApplicationContext()
            .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(key, value).apply();
        promise.resolve(true);
    } catch (Exception e) {
        promise.reject("E_PREF_SAVE", e);
    }
}

@Override
public void getPreference(String key, Promise promise) {
    try {
        SharedPreferences prefs = getReactApplicationContext()
            .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        promise.resolve(prefs.getString(key, null));
    } catch (Exception e) {
        promise.reject("E_PREF_GET", e);
    }
}
```

`apply()` writes the change to disk asynchronously, so the JS `await` resolves as soon as the edit is committed to the in-memory map.

#### 3. Implement it on iOS

Edit `ios/BuddybossCustomCode.mm`:

```objc
- (void)savePreference:(NSString *)key
                 value:(NSString *)value
               resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject
{
    @try {
        [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
        resolve(@YES);
    } @catch (NSException *e) {
        reject(@"E_PREF_SAVE", e.reason, nil);
    }
}

- (void)getPreference:(NSString *)key
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject
{
    NSString *value = [[NSUserDefaults standardUserDefaults] stringForKey:key];
    resolve(value ?: [NSNull null]); // NSNull bridges to JS null
}
```

No extra imports needed — `NSUserDefaults` is part of Foundation, already available via the RN headers.

#### 4. Call it from JS

```js
import BuddybossCustomCode from 'buddyboss-custom-code/src/NativeBuddybossCustomCode';

await BuddybossCustomCode.savePreference('username', 'Jhon');

const username = await BuddybossCustomCode.getPreference('username'); // 'Jhon'
const missing  = await BuddybossCustomCode.getPreference('lastname');     // null
```

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
