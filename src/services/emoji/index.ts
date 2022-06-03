import type { EmojiArrayContent } from './data'
import { emojis } from './data'

export const listEmoji = (): string[] => {
  const emojisArray: EmojiArrayContent[] = emojis.expressions.content

  return emojisArray.map((emoji) => emoji.emojiImage)
}
