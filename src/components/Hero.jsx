import React, { useContext, useState } from 'react'
import { FaImage, FaRegLaugh } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import styles, { layout } from '../style'
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation
} from "emoji-picker-react";

const Hero = () => {
  const { user, loading } = useContext(AuthContext);
  const [emojiBox, setEmojiBox] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  console.log(selectedEmoji);
  function onClick(emojiData) {
    setSelectedEmoji(emojiData.emoji);
  }
  return (
    <>
    {
      loading ? <div>Looding....</div>
      :
      <section id="home" className={`${""}`}>
      <div className="">
        <div>
          <h1 className={`${styles.heading4}`}>
            Share Something...
          </h1>
        </div>
        <div>
          <>
            <div className={`relative ${styles.flexStart}`}>
              <img className={`relative ${styles.flexStart} p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`} src={user?.photoURL} alt="" />
              <div className="flex-1 font-medium dark:text-white  w-full">

                <form>
                  <label htmlFor="chat" className="sr-only">Your message</label>
                  <div className="flex items-center rounded-lg mb-2">

                    <textarea id="chat" rows="1" className="block sm:mx-2 mx-4 p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." />
                    <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                      <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
                </form>
                <div className="inline-flex gap-2 md:gap-4 sm:mx-2 mx-4 p-2.5 w-full text-lg text-cyan-400 lg:text-2xl  rounded-lg  bg-primary ">
                  <label htmlFor="uploadImage">
                    <FaImage />
                    <input id="uploadImage" type="file" className="hidden" />
                  </label>

                  <FaRegLaugh onClick={() => setEmojiBox(!emojiBox)} />
                  <div className={`${!emojiBox ? "hidden" : ""} absolute z-10 top-24`}> <EmojiPicker
                    onEmojiClick={onClick}
                    autoFocusSearch={false}
                  // theme={Theme.AUTO}
                  // searchDisabled
                  // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                  // height={350}
                  // width="50%"
                  // emojiVersion="0.6"
                  // lazyLoadEmojis={true}
                  // previewConfig={{
                  //   defaultCaption: "Pick one!",
                  //   defaultEmoji: "1f92a" // 🤪
                  // }}
                  // suggestedEmojisMode={SuggestionMode.RECENT}
                  // skinTonesDisabled
                  // searchPlaceHolder="Filter"
                  // defaultSkinTone={SkinTones.MEDIUM}
                  // emojiStyle={EmojiStyle.NATIVE}
                  // categories={[
                  //   {
                  //     name: "Fun and Games",
                  //     category: Categories.ACTIVITIES
                  //   },
                  //   {
                  //     name: "Smiles & Emotions",
                  //     category: Categories.SMILEYS_PEOPLE
                  //   },
                  //   {
                  //     name: "Flags",
                  //     category: Categories.FLAGS
                  //   },
                  //   {
                  //     name: "Yum Yum",
                  //     category: Categories.FOOD_DRINK
                  //   }
                  // ]}
                  /></div>
                </div>
              </div>
            </div>

          </>
        </div>
      </div>

    </section>
    }
    </>
  )
}

export default Hero