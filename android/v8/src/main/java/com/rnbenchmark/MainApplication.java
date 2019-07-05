package com.rnbenchmark;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactMarker;
import com.facebook.react.bridge.ReactMarkerConstants;
import com.facebook.soloader.SoLoader;

import java.util.List;

import javax.annotation.Nullable;

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
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    ReactMarker.addListener(this);
    SoLoader.init(this, /* native exopackage */ false);
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
