#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.jmularski.paymentapp/host.exp.exponent.MainActivity
