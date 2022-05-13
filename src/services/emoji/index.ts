/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import type { EmojiArrayContent } from './data'
import { emojis } from './data'

export const listEmoji = () => {
  const emojisArray: EmojiArrayContent[] = emojis.expressions.content

  return emojisArray.map(emoji => emoji.emojiImage)
}
