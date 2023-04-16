// function App() {
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   const [showCamera, setShowCamera] = useState(false);
//   const [imageSource, setImageSource] = useState('');

//   useEffect(() => {
//     async function getPermission() {
//       const permission = await Camera.requestCameraPermission();
//       console.log('Camera permission status: $(permission)');
//       if (permission === 'denied') await Linking.openSettings();
//     }
//     getPermission();
//   }, []);

//   const capturePhoto = async () => {
//     if (camera.current !== null) {
//       const photo = await camera.current.takePhoto({});
//       setImageSource(photo.path);
//       setShowCamera(false);
//       console.log(photo.path);
//     }
//   }

//   if (device == null) {
//     return <Text>Camera is currently not available...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {showCamera ? (
//         <>
//           <Camera
//             ref = {camera}
//             style = {StyleSheet.absoluteFill}
//             device = {device}
//             isActive = {showCamera}
//             photo = {true}
//           />

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.camButton}
//               onPress={() => capturePhoto()}
//             />
//           </View>
//         </>
//       ) : (
//         <>
//           {imageSource !== '' ? (
//             <Image
//               style={styles.image}
//               source={{
//                 uri: 'file://' + $(imageSource),
//               }}
//             />
//           ) : null}

//           <View style={styles.backButton}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: 'rgba(0,0,0,0.2)',
//                 padding: 10,
//                 justifyContent: 'center',
//                 alighItems: 'center',
//                 borderRadius: 10,
//                 borderWidth: 2,
//                 borderColor: '#fff',
//                 width: 100,
//               }}
//               onPress = {() => setShowCamera(true)}>
//                 <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
//               </TouchableOpacity>
//           </View>
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style = {{
//                   backgroundColor: '#fff',
//                   padding: 10,
//                   justifyContent: 'center',
//                   alighItems: 'center',
//                   borderRadius: 10,
//                   borderWidth: 2,
//                   borderColor: '#77c3ec',
//                 }}
//                 onPress = {() => setShowCamera(true)}>
//                   <Text style={{color: '#77c3ec', fontWeight: '500'}}>
//                     RETAKE
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style = {{
//                     backgroundColor: '#77c3ec',
//                     padding: 10,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderRadius: 10,
//                     borderWidth: 2,
//                     borderColor: 'white',
//                   }}
//                   onPress={() => setShowCamera(true)}>
//                   <Text style={{color: 'white', fontWeight: '500'}}>
//                     USE PHOTO
//                   </Text>
//                 </TouchableOpacity>
//             </View>
//           </View>
//         </>
//       )}
//       <HomeScreen/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     backgroundColor: 'gray',
//   },
//   backButton: {
//     backgroundColor: 'rgba(0,0,0,0.2)',
//     position: 'absolute',
//     justifyContent: 'center',
//     width: '100%',
//     top: 0,
//     padding: 25,
//   },
//   buttonContainer: {
//     backgroundColor: 'rgba(0,0,0,0.2)',
//     position: 'absolute',
//     justifyContent: 'center',
//     alignitems: 'center',
//     width: '100%',
//     top: 0,
//     padding: 25,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   camButton: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     backgroundColor: '#B2BEB5',
//     alignSelf: 'center',
//     borderWidth: 4,
//     borderColor: 'white',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     aspectRatio: 9/16,
//   },
// });

//export default App;
