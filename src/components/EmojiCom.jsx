import React, { useState } from 'react'
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

const EmojiCom = () => {
    const [emo, setEmo] = useState('');

  const handleEmojiSelect = (emojiData) => {
    setEmo(emojiData.emoji);
  };

    return (
        <div className="absolute top-24 left-24">
            <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                autoFocusSearch={false}
                theme={Theme.AUTO}
                searchDisabled
                skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                height={350}
                width="100%"
                emojiVersion="0.6"
                lazyLoadEmojis={true}
                previewConfig={{
                    defaultCaption: "Pick one!",
                    defaultEmoji: "1f92a" // 🤪
                }}
                suggestedEmojisMode={SuggestionMode.RECENT}
                skinTonesDisabled
                searchPlaceHolder="Filter"
                defaultSkinTone={SkinTones.MEDIUM}
                emojiStyle={EmojiStyle.NATIVE}
                categories={[
                    {
                        name: "Fun and Games",
                        category: Categories.ACTIVITIES
                    },
                    {
                        name: "Smiles & Emotions",
                        category: Categories.SMILEYS_PEOPLE
                    },
                    {
                        name: "Flags",
                        category: Categories.FLAGS
                    },
                    {
                        name: "Yum Yum",
                        category: Categories.FOOD_DRINK
                    }
                ]}
            />
        </div>
    )
}

export default EmojiCom;