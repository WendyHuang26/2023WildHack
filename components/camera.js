const cameraPermission = await Camera.getCameraPermissionStatus()
const microphonePermission = await Camera.getMicrophonePermissionStatus()

if (cameraPermission == "authorized" && microphonePermission == "authorized") {
  const devices = useCameraDevices("best matching camera device")
  const device = devices.back

  if (device == null) return <LoadingView />
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
    />
  )
}
else if (cameraPermission == "not-determined" || microphonePermission == "not-determined") {
  const newCameraPermission = await Camera.requestCameraPermission()
  const newMicrophonePermission = await Camera.requestMicrophonePermission()

  if (newCameraPermission == "authorized" && newMicrophonePermission == "authorized") {
    const devices = useCameraDevices("best matching camera device")
    const device = devices.back

    if (device == null) return <LoadingView />
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
      />
    )
  }
  else if (newCameraPermission == "denied" || newMicrophonePermission == "denied") {
    print("ACCESS WAS PREVIOUSLY DENIED -- GO TO SETTINGS TO RESTORE ACCESS");
  }
  else {
    print("ACCESS TO CAMERA IS RESTRICTED");
  }
}
else if (cameraPermission == "not-determined" || microphonePermission == "not-determined") {
  print("ACCESS WAS PREVIOUSLY DENIED -- GO TO SETTINGS TO RESTORE ACCESS");
}
else {
  print("ACCESS TO CAMERA IS RESTRICTED");
}