package com.rnbenchmark;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.react.bridge.ReactMarker;
import com.facebook.react.bridge.ReactMarkerConstants;
import com.facebook.react.modules.systeminfo.AndroidInfoHelpers;
import com.facebook.soloader.SoLoader;
import com.rnbenchmark.newarchitecture.MainApplicationReactNativeHost;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.annotation.Nullable;

import io.csie.kudo.reactnative.v8.ReactNativeV8Package;
import io.csie.kudo.reactnative.v8.executor.V8ExecutorFactory;

public class MainApplication extends Application implements
    ReactApplication,
    ReactMarker.MarkerListener {

  private long mTTIStartTime;
  private long mTTIEndTime;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new ReactNativeV8Package());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected JavaScriptExecutorFactory getJavaScriptExecutorFactory() {
      return new V8ExecutorFactory(
              getPackageName(),
              AndroidInfoHelpers.getFriendlyDeviceName(),
              getUseDeveloperSupport());
    }
  };

  private final ReactNativeHost mNewArchitectureNativeHost =
    new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    ReactMarker.addListener(this);
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this, getReactNativeHost().getReactInstanceManager()); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  public void onTerminate() {
    ReactMarker.removeListener(this);
    super.onTerminate();
  }

  //
  // ReactMarker.MarkerListener implementations
  //
  @Override
  public void logMarker(ReactMarkerConstants name, @Nullable String tag, int instanceKey) {
    if (name == ReactMarkerConstants.GET_REACT_INSTANCE_MANAGER_START) {
      mTTIStartTime = System.currentTimeMillis();
    } else if (name == ReactMarkerConstants.CONTENT_APPEARED) {
      mTTIEndTime = System.currentTimeMillis();
      Log.i("MeasureTTI", "TTI=" + (mTTIEndTime - mTTIStartTime));
    }
  }
}
