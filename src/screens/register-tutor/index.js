// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     LogBox,
//   } from "react-native";
//   import React, { useContext, useState, useEffect } from "react";
//   import ThemeContext from "../../context/ThemeProvider";
//   import { StepperContainer, StepView } from "@material.ui/react-native-stepper";
//   import LocalizationContext from "../../context/LocalizationProvider";
//   import DropDownPicker from "react-native-dropdown-picker";
//   import * as ImagePicker from "expo-image-picker";
//   import { COLORS, IMGS, ROUTES } from "../../constants";
//   import moment from "moment";
//   import { Video } from "expo-av";
//   import { useNavigation } from "@react-navigation/native";
//   import { TextInput } from "react-native-paper";
//   import DateTimePickerModal from "react-native-modal-datetime-picker";
//   import { getUserInfo, becomeTeacher } from "../../services/userAPI";
//   import mime from "mime";

//   export default function BecomeTeacher() {
//     const navigation = useNavigation();
//     const [user, setUser] = useState(null);

//     const { i18n } = useContext(LocalizationContext);
//     const video = React.useRef(null);
//     const [videoUri, setVideoUri] = useState(null);
//     const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
//     const [img, setImg] = useState(IMGS.imgHolder);
//     const [hasImg, setHasImg] = useState(false);
//     const [name, setName] = useState("");
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [birthDate, setBirthDate] = useState(
//       moment("01-01-2000s", ["MM-DD-YYYY", "YYYY-MM-DD"])
//     );
//     const [phone, setPhone] = useState("");

//     const [openCountry, setOpenCountry] = useState(false);
//     const [valueCountry, setValueCountry] = useState([]);
//     const [itemsCountry, setItemsCountry] = useState([
//       { label: "VN", value: "VN" },
//       { label: "USA", value: "USA" },
//     ]);

//     const [openCourses, setOpenCourses] = useState(false);
//     const [valueCourses, setValueCourses] = useState([]);
//     const [itemsCourses, setItemsCourses] = useState([
//       { label: "English for Kids", value: "english-for-kids", id: "3" },
//       { label: "Business English", value: "business-english", id: "4" },
//       {
//         label: "Conversational English",
//         value: "conversational-english",
//         id: "5",
//       },
//       { label: "STARTERS", value: "STARTERS", id: "6" },
//       { label: "MOVERS", value: "MOVERS", id: "7" },
//       { label: "FLYERS", value: "FLYERS", id: "8" },
//       { label: "KET", value: "KET", id: "9" },
//       { label: "PET", value: "PET", id: "10" },
//       { label: "IELTS", value: "IELTS", id: "11" },
//       { label: "TOEFL", value: "TOEFL", id: "12" },
//       { label: "TOIEC", value: "TOIEC", id: "13" },
//     ]);

//     const [interests, setInterests] = useState("");
//     const [education, setEducation] = useState("");
//     const [experience, setExperience] = useState("");
//     const [profession, setProfession] = useState("");
//     const [introduction, setIntroduction] = useState("");
//     const [language, setLanguage] = useState("");
//     const showDatePicker = () => {
//       setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//       setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date) => {
//       setBirthDate(date);
//       hideDatePicker();
//     };
//     useEffect(() => {
//       (async () => {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         setHasGalleryPermission(status === "granted");
//       })();
//     }, []);
//     const pickImage = async () => {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         aspect: [4, 4],
//         quality: 1,
//       });
//       if (!result.canceled) {
//         setImg(result.assets[0].uri);
//         setHasImg(true);
//       }
//     };
//     const pickVideo = async () => {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//         quality: 1,
//       });
//       if (!result.canceled) {
//         setVideoUri(result.assets[0].uri);
//       }
//     };
//     if (hasGalleryPermission === null) {
//     }

//     useEffect(() => {
//       LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
//     }, []);

//     useEffect(() => {
//       async function getUser() {
//         const { data } = await getUserInfo();
//         setUser(data.user);
//         setName(data.user.name);
//         setValueCountry(data.user.country);
//         setValueCourses(() => {
//           let arr = [];
//           data.user.learnTopics.map((item) => {
//             arr.push(item.key);
//           });
//           return arr;
//         });
//       }
//       getUser();
//     }, []);

//     const becomeTeacherHandler = async () => {
//       let formData = new FormData();
//       formData.append("name", name);
//       formData.append("birthday", moment(birthDate).format("YYYY-MM-DD"));
//       formData.append("country", valueCountry);
//       formData.append("specialties", "english-for-kids,business-english");
//       formData.append("interests", interests);
//       formData.append("education", education);
//       formData.append("experience", experience);
//       formData.append("profession", profession);
//       formData.append("bio", introduction);
//       formData.append("targetStudent", "Beginner");
//       formData.append("languages", ["Vietnamese", "English"]);
//       if (hasImg) {
//         const newImageUri = "file:///" + img.split("file:/").join("");
//         formData.append("avatar", {
//           uri: newImageUri,
//           type: mime.getType(newImageUri),
//           name: newImageUri.split("/").pop(),
//         });
//       } else {
//         alert("Please choose your avatar");
//         return;
//       }
//       if (videoUri) {
//         console.log(videoUri);
//         const newVideoUri = "file:///" + videoUri.split("file:/").join("");

//         formData.append("video", {
//           uri: newVideoUri,
//           name: "video",
//           type: mime.getType(newVideoUri),
//         });
//       } else {
//         alert("Please choose your video");
//         return;
//       }

//       formData.append("price", 50000);
//       await becomeTeacher(formData).catch((err) => {
//         {
//           navigation.navigate(ROUTES.HOME_TAB);
//         }
//       });
//     };
//     return (
//       <View style={styles.container}>
//         <StepperContainer allowTapOnTitle style={{ flexGrow: 1 }}>
//           <StepView
//             title={"Hoàn thành hồ sơ"}
//             subTitle={"Cài đặt hồ sơ giáo viên"}
//           >
//             <Text>
//               Your tutor profile is your chance to market yourself to students on
//               Tutoring. You can make edits later on your profile settings page.
//               New students may browse tutor profiles to find a tutor that fits
//               their learning goals and personality. Returning students may use the
//               tutor profiles to find tutors they've had great experiences with
//               already.
//             </Text>
//             {/*BasicInfo*/}
//             <Text style={styles.headingParagraph}>{"Thông tin cơ bản"}</Text>
//             <View style={styles.formContainer}>
//               <TouchableOpacity onPress={() => pickImage()}>
//                 {hasImg ? (
//                   <Image source={{ uri: img }} style={styles.userImg} />
//                 ) : (
//                   <Image source={img} style={styles.userImg} />
//                 )}
//               </TouchableOpacity>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={name}
//                   onChangeText={setName}
//                   name="name"
//                   label="Tên"
//                   left={<TextInput.Icon icon="account" />}
//                 />
//               </View>
//               <TouchableOpacity
//                 onPress={showDatePicker}
//                 style={styles.inputContainer}
//               >
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={moment(user?.birthday).format("DD MMMM, YYYY")}
//                   name="dob"
//                   label="Ngày sinh"
//                   editable={false}
//                   left={<TextInput.Icon icon="calendar" />}
//                 />
//                 <DateTimePickerModal
//                   isVisible={isDatePickerVisible}
//                   mode="date"
//                   onChange={(date) => setBirthDate(date)}
//                   value={handleConfirm}
//                   onConfirm={handleConfirm}
//                   onCancel={hideDatePicker}
//                 />
//               </TouchableOpacity>
//               <DropDownPicker
//                 placeholder={i18n.t("Country")}
//                 style={styles.dropdownmulti}
//                 open={openCountry}
//                 value={valueCountry}
//                 items={itemsCountry}
//                 setOpen={setOpenCountry}
//                 setValue={setValueCountry}
//                 setItems={setItemsCountry}
//                 theme="LIGHT"
//               />
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={user?.phone}
//                   onChangeText={setPhone}
//                   name="SDT"
//                   label="SDT"
//                   defaultValue="Nguyen Van Ar"
//                   left={<TextInput.Icon icon="phone" />}
//                 />
//               </View>
//             </View>
//             {/* CV */}
//             <Text style={styles.headingParagraph}>CV</Text>
//             <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={interests}
//                   onChangeText={setInterests}
//                   name="Interests"
//                   label={i18n.t("Interests")}
//                   defaultValue=""
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={education}
//                   onChangeText={setEducation}
//                   name="Education"
//                   label={i18n.t("Education")}
//                   defaultValue=""
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={experience}
//                   onChangeText={setExperience}
//                   name="Experience"
//                   label={i18n.t("Experience")}
//                   defaultValue=""
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={profession}
//                   onChangeText={setProfession}
//                   name="ExpericProfessionalence"
//                   label={i18n.t("Professional")}
//                   defaultValue=""
//                 />
//               </View>
//             </View>
//             {/* Languages I Speak */}
//             <Text style={styles.headingParagraph}>
//               {i18n.t("LanguagesISpeak")}
//             </Text>
//             <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={language}
//                   onChangeText={setLanguage}
//                   name="Language"
//                   label={i18n.t("Language")}
//                   defaultValue=""
//                   multiline={true}
//                   numberOfLines={4}
//                 />
//               </View>
//             </View>
//             {/* Who I teach */}
//             <Text style={styles.headingParagraph}>{i18n.t("Introduction")}</Text>
//             <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   mode="outlined"
//                   style={styles.input}
//                   value={introduction}
//                   onChangeText={setIntroduction}
//                   name="Introduction"
//                   label={i18n.t("Introduction")}
//                   defaultValue=""
//                   multiline={true}
//                   numberOfLines={4}
//                 />
//               </View>
//             </View>
//             {/* Specialites */}

//             <Text style={styles.headingParagraph}>
//               {i18n.t("MySpecialities")}
//             </Text>
//             <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                 <DropDownPicker
//                   placeholder={i18n.t("Specilities")}
//                   style={styles.dropdownmulti}
//                   open={openCourses}
//                   value={valueCourses}
//                   items={itemsCourses}
//                   setOpen={setOpenCourses}
//                   setValue={setValueCourses}
//                   setItems={setItemsCourses}
//                   theme="LIGHT"
//                   multiple={true}
//                   mode="BADGE"
//                   badgeDotColors={[
//                     "#e76f51",
//                     "#00b4d8",
//                     "#e9c46a",
//                     "#e76f51",
//                     "#8ac926",
//                     "#00b4d8",
//                     "#e9c46a",
//                   ]}
//                   dropDownDirection="TOP"
//                 />
//               </View>
//             </View>
//           </StepView>
//           <StepView
//             title={i18n.t("VideoIntroduction")}
//             subTitle={i18n.t("IntroduceYourself")}
//           >
//             <Text style={styles.headingParagraph}>
//               {i18n.t("IntroductionVideo")}
//             </Text>
//             <Text>
//               Let students know who you are and why they should choose you as
//               their tutor. Students will see this video on your profile page. So
//               it can be a great way to introduce yourself and your teaching style.
//             </Text>
//             <View style={styles.formContainer}>
//               <TouchableOpacity
//                 style={styles.interactButton}
//                 onPress={() => pickVideo()}
//               >
//                 <Text style={styles.interactButtonText}>
//                   {i18n.t("PickAVideo")}
//                 </Text>
//               </TouchableOpacity>
//               {videoUri && (
//                 <Video
//                   ref={video}
//                   style={styles.video}
//                   source={{
//                     uri: videoUri,
//                   }}
//                   useNativeControls
//                   resizeMode="contain"
//                   // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//                 />
//               )}
//             </View>
//           </StepView>
//           <StepView
//             title={i18n.t("Approval")}
//             subTitle={i18n.t("WaitApproval")}
//             onNext={becomeTeacherHandler}
//           >
//             <Image source={IMGS.completeImg} style={styles.doneImg} />

//             <View style={styles.formContainer}>
//               <Text style={styles.finalText}>{i18n.t("DoneStep")}</Text>
//             </View>
//           </StepView>
//         </StepperContainer>
//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       backgroundColor: "#ecf0f1",
//       padding: 8,
//     },
//     doneImg: {
//       width: 200,
//       height: 200,
//       alignSelf: "center",
//       borderRadius: 100,
//       marginTop: 20,
//     },
//     video: {
//       width: "100%",
//       height: 200,
//     },
//     headingParagraph: {
//       fontSize: 15,
//       fontWeight: "bold",
//       color: COLORS.primary,
//     },
//     userImg: {
//       width: 110,
//       height: 110,
//       borderRadius: 110 / 2,
//       borderWidth: 4,
//       borderColor: COLORS.white,
//     },
//     formContainer: {
//       width: "100%",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingVertical: 20,
//     },
//     userName: {
//       fontSize: 20,
//       fontWeight: "bold",
//       marginTop: 10,
//     },
//     userEmail: {
//       fontSize: 15,
//       fontWeight: "italic",
//       marginTop: 5,
//       fontStyle: "italic",
//     },
//     inputContainer: {
//       width: "90%",
//       alignSelf: "flex-start",
//     },
//     input: {
//       width: "100%",
//       // backgroundColor: "#fff",
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//       elevation: 2,
//       marginVertical: 5,
//       alignSelf: "flex-start",
//     },
//     dropdownmulti: {
//       marginVertical: 10,
//       width: "90%",
//       height: 50,
//       paddingHorizontal: 18,
//       alignSelf: "flex-start",
//     },
//     interactButton: {
//       flex: 2,
//       flexDirection: "row",
//       alignContent: "center",
//       justifyContent: "center",
//       backgroundColor: "#4b7bec",
//       margin: 5,
//       borderRadius: 4,
//     },
//     interactButtonText: {
//       color: "#fff",
//       fontSize: 18,
//       paddingVertical: 6,
//       paddingHorizontal: 10,
//     },
//     finalText: {
//       fontSize: 20,
//       fontWeight: "bold",
//       color: COLORS.primary,
//       textAlign: "center",
//       paddingHorizontal: 30,
//     },
//   });
