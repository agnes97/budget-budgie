export interface EmojiArrayContent {
  emojiName: string
  emojiImage: string
}

export interface EmojiArrayType {
  [index: string]: {
    title: string
    content: EmojiArrayContent[]
  }
}

export const emojis: EmojiArrayType = {
  expressions: {
    title: '🙂 EXPRESSIONS 🙃',
    content: [
      { emojiName: 'happy', emojiImage: '🙂' },
      { emojiName: 'happy', emojiImage: '🙃' },
      { emojiName: 'happy', emojiImage: '😁' },
      { emojiName: 'happy', emojiImage: '😂' },
      { emojiName: 'happy', emojiImage: '🤣' },
      { emojiName: 'happy', emojiImage: '😃' },
      { emojiName: 'happy', emojiImage: '😄' },
      { emojiName: 'wink', emojiImage: '😉' },
      { emojiName: 'tongue', emojiImage: '😋' },
      { emojiName: 'tongue', emojiImage: '🤪' },
      { emojiName: 'tongue', emojiImage: '😝' },
      { emojiName: 'oops', emojiImage: '😅' },
      { emojiName: 'blush', emojiImage: '😊' },
      { emojiName: 'love', emojiImage: '🥰' },
      { emojiName: 'love', emojiImage: '😍' },
      { emojiName: 'love', emojiImage: '😘' },
      { emojiName: 'love', emojiImage: '😚' },
      { emojiName: 'money', emojiImage: '🤑' },
      { emojiName: 'angel', emojiImage: '😇' },
      { emojiName: 'pst', emojiImage: '🤫' },
      { emojiName: 'pst', emojiImage: '🤐' },
      { emojiName: 'sad', emojiImage: '🥲' },
      { emojiName: 'sad', emojiImage: '😟' },
      { emojiName: 'sad', emojiImage: '🙁' },
      { emojiName: 'sad', emojiImage: '😔' },
      { emojiName: 'sad', emojiImage: '😭' },
      { emojiName: 'sad', emojiImage: '🥺' },
      { emojiName: 'sad', emojiImage: '😢' },
      { emojiName: 'thinking', emojiImage: '🤔' },
      { emojiName: 'thinking', emojiImage: '🤨' },
      { emojiName: 'thinking', emojiImage: '🧐' },
      { emojiName: 'hug', emojiImage: '🤗' },
      { emojiName: 'neutral', emojiImage: '😐' },
      { emojiName: 'neutral', emojiImage: '😑' },
      { emojiName: 'neutral', emojiImage: '😶' },
      { emojiName: 'eyes', emojiImage: '😶‍🌫️' },
      { emojiName: 'drunk', emojiImage: '😏' },
      { emojiName: 'drunk', emojiImage: '🥴' },
      { emojiName: 'duh', emojiImage: '😒' },
      { emojiName: 'duh', emojiImage: '🙄' },
      { emojiName: 'sleep', emojiImage: '😴' },
      { emojiName: 'lust', emojiImage: '🤤' },
      { emojiName: 'facemask', emojiImage: '😷' },
      { emojiName: 'ill', emojiImage: '🤒' },
      { emojiName: 'ill', emojiImage: '🤕' },
      { emojiName: 'ill', emojiImage: '🤢' },
      { emojiName: 'ill', emojiImage: '🤧' },
      { emojiName: 'cold', emojiImage: '🥶' },
      { emojiName: 'shock', emojiImage: '😵' },
      { emojiName: 'shock', emojiImage: '😵‍💫' },
      { emojiName: 'shock', emojiImage: '😨' },
      { emojiName: 'shock', emojiImage: '🤯' },
      { emojiName: 'shock', emojiImage: '😮' },
      { emojiName: 'shock', emojiImage: '😱' },
      { emojiName: 'cowboy', emojiImage: '🤠' },
      { emojiName: 'celebration', emojiImage: '🥳' },
      { emojiName: 'sunglasses', emojiImage: '😎' },
      { emojiName: '', emojiImage: '😖' },
      { emojiName: '', emojiImage: '😣' },
      { emojiName: '', emojiImage: '😞' },
      { emojiName: '', emojiImage: '😓' },
      { emojiName: '', emojiImage: '😤' },
      { emojiName: '', emojiImage: '😡' },
      { emojiName: '', emojiImage: '😠' },
      { emojiName: '', emojiImage: '🤬' },
    ],
  },
  handsigns: {
    title: '👌 HANDSIGNS 👌',
    content: [
      { emojiName: 'strong', emojiImage: '💪' },
      { emojiName: 'wave', emojiImage: '👋' },
      { emojiName: 'top', emojiImage: '👌' },
      { emojiName: 'thumbsup', emojiImage: '👍' },
      { emojiName: 'thumbsdown', emojiImage: '👎' },
      { emojiName: 'fist', emojiImage: '👊' },
      { emojiName: 'applause', emojiImage: '👏' },
      { emojiName: 'left', emojiImage: '👈' },
      { emojiName: 'right', emojiImage: '👉' },
      { emojiName: 'fingers', emojiImage: '🤞' },
      { emojiName: '', emojiImage: '🤚' },
      { emojiName: '', emojiImage: '🖖' },
      { emojiName: '', emojiImage: '🤌' },
      { emojiName: '', emojiImage: '✌️' },
      { emojiName: '', emojiImage: '🤟' },
      { emojiName: '', emojiImage: '🤙' },
      { emojiName: '', emojiImage: '🖕' },
      { emojiName: '', emojiImage: '👆' },
      { emojiName: '', emojiImage: '👇' },
      { emojiName: '', emojiImage: '🙌' },
      { emojiName: '', emojiImage: '🤝' },
      { emojiName: '', emojiImage: '🙏' },
      { emojiName: '', emojiImage: '✍️' },
      { emojiName: '', emojiImage: '💅' },
    ],
  },
  love: {
    title: '❤️‍🔥 LOVE IS IN THE AIR ❤️‍🔥',
    content: [
      { emojiName: 'heart', emojiImage: '🖤' },
      { emojiName: 'heart', emojiImage: '🤎' },
      { emojiName: 'heart', emojiImage: '💚' },
      { emojiName: 'heart', emojiImage: '💜' },
      { emojiName: 'heart', emojiImage: '💙' },
      { emojiName: 'heart', emojiImage: '❤️' },
      { emojiName: 'heart', emojiImage: '🧡' },
      { emojiName: 'heart', emojiImage: '❤' },
      { emojiName: 'heart', emojiImage: '💛' },
      { emojiName: 'heart', emojiImage: '🤍' },
      { emojiName: 'heart', emojiImage: '💘' },
      { emojiName: 'heart', emojiImage: '💝' },
      { emojiName: 'heart', emojiImage: '💖' },
      { emojiName: 'heart', emojiImage: '💗' },
      { emojiName: 'heart', emojiImage: '💞' },
      { emojiName: 'heart', emojiImage: '💕' },
      { emojiName: 'heart', emojiImage: '❣️' },
      { emojiName: 'heart', emojiImage: '❤️‍🔥' },
      { emojiName: 'heart', emojiImage: '❣' },
      { emojiName: 'heart', emojiImage: '💔' },
      { emojiName: 'heart', emojiImage: '💟' },
    ],
  },
  animals: {
    title: '🦄 ANIMALS 🦄',
    content: [
      { emojiName: 'monkeys', emojiImage: '🙈' },
      { emojiName: 'monkeys', emojiImage: '🙉' },
      { emojiName: 'monkeys', emojiImage: '🙊' },
      { emojiName: 'monkeys', emojiImage: '🐵' },
      { emojiName: 'monkeys', emojiImage: '🐒' },
      { emojiName: 'monkeys', emojiImage: '🦍' },
      { emojiName: 'monkeys', emojiImage: '🦧' },
      { emojiName: 'dog', emojiImage: '🐶' },
      { emojiName: 'dog', emojiImage: '🐕' },
      { emojiName: 'dog', emojiImage: '🐕‍🦺' },
      { emojiName: 'dog', emojiImage: '🐩' },
      { emojiName: 'wolf', emojiImage: '🐺' },
      { emojiName: 'fox', emojiImage: '🦊' },
      { emojiName: 'racoon', emojiImage: '🦝' },
      { emojiName: 'cat', emojiImage: '😸' },
      { emojiName: 'cat', emojiImage: '😹' },
      { emojiName: 'cat', emojiImage: '😻' },
      { emojiName: 'cat', emojiImage: '🐱' },
      { emojiName: 'cat', emojiImage: '😼' },
      { emojiName: 'cat', emojiImage: '😽' },
      { emojiName: 'cat', emojiImage: '🙀' },
      { emojiName: 'cat', emojiImage: '😿' },
      { emojiName: 'cat', emojiImage: '😾' },
      { emojiName: 'cat', emojiImage: '🐈' },
      { emojiName: 'cat', emojiImage: '🐈‍⬛' },
      { emojiName: 'lion', emojiImage: '🦁' },
      { emojiName: 'tiger', emojiImage: '🐯' },
      { emojiName: 'tiger', emojiImage: '🐅' },
      { emojiName: 'cheetah', emojiImage: '🐆' },
      { emojiName: 'horse', emojiImage: '🐴' },
      { emojiName: 'horse', emojiImage: '🐎' },
      { emojiName: 'unicorn', emojiImage: '🦄' },
      { emojiName: 'zebra', emojiImage: '🦓' },
      { emojiName: 'deer', emojiImage: '🦌' },
      { emojiName: 'bison', emojiImage: '🦬' },
      { emojiName: 'cow', emojiImage: '🐮' },
      { emojiName: 'cow', emojiImage: '🐄' },
      { emojiName: 'bull', emojiImage: '🐂' },
      { emojiName: 'bull', emojiImage: '🐃' },
      { emojiName: 'pig', emojiImage: '🐷' },
      { emojiName: 'pig', emojiImage: '🐖' },
      { emojiName: 'pig', emojiImage: '🐽' },
      { emojiName: 'boar', emojiImage: '🐗' },
      { emojiName: 'sheep', emojiImage: '🐏' },
      { emojiName: 'sheep', emojiImage: '🐑' },
      { emojiName: 'goat', emojiImage: '🐐' },
      { emojiName: 'camel', emojiImage: '🐪' },
      { emojiName: 'camel', emojiImage: '🐫' },
      { emojiName: 'lama', emojiImage: '🦙' },
      { emojiName: 'lama', emojiImage: '🦒' },
      { emojiName: 'elephant', emojiImage: '🐘' },
      { emojiName: 'mammoth', emojiImage: '🦣' },
      { emojiName: 'rhino', emojiImage: '🦏' },
      { emojiName: 'hippo', emojiImage: '🦛' },
      { emojiName: 'mouse', emojiImage: '🐭' },
      { emojiName: 'mouse', emojiImage: '🐁' },
      { emojiName: 'mouse', emojiImage: '🐀' },
      { emojiName: 'mouse', emojiImage: '🐹' },
      { emojiName: 'bunny', emojiImage: '🐰' },
      { emojiName: 'bunny', emojiImage: '🐇' },
      { emojiName: 'squirell', emojiImage: '🐿️' },
      { emojiName: 'dunno', emojiImage: '🦫' },
      { emojiName: 'hedgehog', emojiImage: '🦔' },
      { emojiName: 'bat', emojiImage: '🦇' },
      { emojiName: 'bear', emojiImage: '🐻' },
      { emojiName: 'bear', emojiImage: '🐻‍❄' },
      { emojiName: 'koala', emojiImage: '🐨' },
      { emojiName: 'panda', emojiImage: '🐼' },
      { emojiName: 'dunno', emojiImage: '🦥' },
      { emojiName: 'dunno', emojiImage: '🦦' },
      { emojiName: 'dunno', emojiImage: '🦨' },
      { emojiName: 'kangaroo', emojiImage: '🦘' },
      { emojiName: 'badger', emojiImage: '🦡' },
      { emojiName: 'paws', emojiImage: '🐾' },
      { emojiName: 'dunno', emojiImage: '🦃' },
      { emojiName: 'chicken', emojiImage: '🐔' },
      { emojiName: 'chicken', emojiImage: '🐓' },
      { emojiName: 'chicken', emojiImage: '🐣' },
      { emojiName: 'chicken', emojiImage: '🐤' },
      { emojiName: 'chicken', emojiImage: '🐥' },
      { emojiName: 'bird', emojiImage: '🐦' },
      { emojiName: 'bird', emojiImage: '🕊️' },
      { emojiName: 'penguin', emojiImage: '🐧' },
      { emojiName: 'eagle', emojiImage: '🦅' },
      { emojiName: 'duck', emojiImage: '🦆' },
      { emojiName: 'swan', emojiImage: '🦢' },
      { emojiName: 'owl', emojiImage: '🦉' },
      { emojiName: 'bird', emojiImage: '🦤' },
      { emojiName: 'bird', emojiImage: '🦩' },
      { emojiName: 'peacock', emojiImage: '🦚' },
      { emojiName: 'parrot', emojiImage: '🦜' },
      { emojiName: 'frog', emojiImage: '🐸' },
      { emojiName: 'crocodile', emojiImage: '🐊' },
      { emojiName: 'turtle', emojiImage: '🐢' },
      { emojiName: 'lizard', emojiImage: '🦎' },
      { emojiName: 'snake', emojiImage: '🐍' },
      { emojiName: 'dragon', emojiImage: '🐲' },
      { emojiName: 'dragon', emojiImage: '🐉' },
      { emojiName: 'dino', emojiImage: '🦕' },
      { emojiName: 'dino', emojiImage: '🦖' },
      { emojiName: 'whale', emojiImage: '🐳' },
      { emojiName: 'whale', emojiImage: '🐋' },
      { emojiName: 'dolphin', emojiImage: '🐬' },
      { emojiName: 'seal', emojiImage: '🦭' },
      { emojiName: 'fish', emojiImage: '🐟' },
      { emojiName: 'fish', emojiImage: '🐠' },
      { emojiName: 'fish', emojiImage: '🐡' },
      { emojiName: 'shark', emojiImage: '🦈' },
      { emojiName: 'squid', emojiImage: '🐙' },
      { emojiName: 'squid', emojiImage: '🦑' },
      { emojiName: 'shell', emojiImage: '🐚' },
      { emojiName: 'snail', emojiImage: '🐌' },
      { emojiName: 'butterfly', emojiImage: '🦋' },
      { emojiName: 'worm', emojiImage: '🐛' },
      { emojiName: 'ant', emojiImage: '🐜' },
      { emojiName: 'bee', emojiImage: '🐝' },
      { emojiName: 'bug', emojiImage: '🪲' },
      { emojiName: 'bug', emojiImage: '🐞' },
      { emojiName: 'grasshoper', emojiImage: '🦗' },
      { emojiName: 'bug', emojiImage: '🪳' },
      { emojiName: 'spider', emojiImage: '🕷️' },
      { emojiName: 'spider', emojiImage: '🕷' },
      { emojiName: 'spider', emojiImage: '🕸️' },
      { emojiName: 'spider', emojiImage: '🕸' },
      { emojiName: 'lobster', emojiImage: '🦂' },
      { emojiName: 'mosquito', emojiImage: '🦟' },
      { emojiName: 'fly', emojiImage: '🪰' },
      { emojiName: 'worm', emojiImage: '🪱' },
      { emojiName: 'bacteria', emojiImage: '🦀' },
      { emojiName: 'bacteria', emojiImage: '🦞' },
      { emojiName: 'bacteria', emojiImage: '🦐' },
      { emojiName: 'bacteria', emojiImage: '🦠' },
    ],
  },
  flowers: {
    title: '🌵 ALL THINGS GREEN 🌵',
    content: [
      { emojiName: '', emojiImage: '🏵️' },
      { emojiName: '', emojiImage: '🌸' },
      { emojiName: '', emojiImage: '💮' },
      { emojiName: '', emojiImage: '🌹' },
      { emojiName: '', emojiImage: '🥀' },
      { emojiName: '', emojiImage: '🌺' },
      { emojiName: '', emojiImage: '🌻' },
      { emojiName: '', emojiImage: '🌼' },
      { emojiName: '', emojiImage: '🌷' },
      { emojiName: '', emojiImage: '💐' },
      { emojiName: '', emojiImage: '🪴' },
      { emojiName: '', emojiImage: '🌱' },
      { emojiName: '', emojiImage: '🌲' },
      { emojiName: '', emojiImage: '🌳' },
      { emojiName: '', emojiImage: '🌴' },
      { emojiName: '', emojiImage: '🌵' },
      { emojiName: '', emojiImage: '🌾' },
      { emojiName: '', emojiImage: '🌿' },
      { emojiName: '', emojiImage: '☘️' },
      { emojiName: '', emojiImage: '🍀' },
      { emojiName: '', emojiImage: '🍁' },
      { emojiName: '', emojiImage: '🍂' },
      { emojiName: '', emojiImage: '🍃' },
      { emojiName: '', emojiImage: '🪨' },
      { emojiName: '', emojiImage: '🪵' },
    ],
  },
  food: {
    title: '🌶️ TASTY STUFF 🌶️',
    content: [
      { emojiName: '', emojiImage: '🥢' },
      { emojiName: '', emojiImage: '🍽️' },
      { emojiName: '', emojiImage: '🍴' },
      { emojiName: '', emojiImage: '🥄' },
      { emojiName: '', emojiImage: '🔪' },
      { emojiName: '', emojiImage: '🍇' },
      { emojiName: '', emojiImage: '🍈' },
      { emojiName: '', emojiImage: '🍉' },
      { emojiName: '', emojiImage: '🍊' },
      { emojiName: '', emojiImage: '🍋' },
      { emojiName: '', emojiImage: '🍌' },
      { emojiName: '', emojiImage: '🍍' },
      { emojiName: '', emojiImage: '🥭' },
      { emojiName: '', emojiImage: '🍊' },
      { emojiName: '', emojiImage: '🍎' },
      { emojiName: '', emojiImage: '🍏' },
      { emojiName: '', emojiImage: '🍐' },
      { emojiName: '', emojiImage: '🍑' },
      { emojiName: '', emojiImage: '🍒' },
      { emojiName: '', emojiImage: '🍓' },
      { emojiName: '', emojiImage: '🫐' },
      { emojiName: '', emojiImage: '🥝' },
      { emojiName: '', emojiImage: '🍅' },
      { emojiName: '', emojiImage: '🫒' },
      { emojiName: '', emojiImage: '🥥' },
      { emojiName: '', emojiImage: '🥑' },
      { emojiName: '', emojiImage: '🍆' },
      { emojiName: '', emojiImage: '🥔' },
      { emojiName: '', emojiImage: '🥕' },
      { emojiName: '', emojiImage: '🌽' },
      { emojiName: '', emojiImage: '🌶️' },
      { emojiName: '', emojiImage: '🫑' },
      { emojiName: '', emojiImage: '🥒' },
      { emojiName: '', emojiImage: '🥬' },
      { emojiName: '', emojiImage: '🥦' },
      { emojiName: '', emojiImage: '🧄' },
      { emojiName: '', emojiImage: '🧅' },
      { emojiName: '', emojiImage: '🍄' },
      { emojiName: '', emojiImage: '🥜' },
      { emojiName: '', emojiImage: '🌰' },
      { emojiName: '', emojiImage: '🍞' },
      { emojiName: '', emojiImage: '🥐' },
      { emojiName: '', emojiImage: '🥖' },
      { emojiName: '', emojiImage: '🫓' },
      { emojiName: '', emojiImage: '🥨' },
      { emojiName: '', emojiImage: '🥯' },
      { emojiName: '', emojiImage: '🥞' },
      { emojiName: '', emojiImage: '🧇' },
      { emojiName: '', emojiImage: '🧀' },
      { emojiName: '', emojiImage: '🍖' },
      { emojiName: '', emojiImage: '🍗' },
      { emojiName: '', emojiImage: '🥩' },
      { emojiName: '', emojiImage: '🥓' },
      { emojiName: '', emojiImage: '🍔' },
      { emojiName: '', emojiImage: '🍟' },
      { emojiName: '', emojiImage: '🍕' },
      { emojiName: '', emojiImage: '🌭' },
      { emojiName: '', emojiImage: '🥪' },
      { emojiName: '', emojiImage: '🌮' },
      { emojiName: '', emojiImage: '🌯' },
      { emojiName: '', emojiImage: '🫔' },
      { emojiName: '', emojiImage: '🥙' },
      { emojiName: '', emojiImage: '🧆' },
      { emojiName: '', emojiImage: '🥚' },
      { emojiName: '', emojiImage: '🍳' },
      { emojiName: '', emojiImage: '🥘' },
      { emojiName: '', emojiImage: '🍲' },
      { emojiName: '', emojiImage: '🫕' },
      { emojiName: '', emojiImage: '🥣' },
      { emojiName: '', emojiImage: '🥗' },
      { emojiName: '', emojiImage: '🍿' },
      { emojiName: '', emojiImage: '🧈' },
      { emojiName: '', emojiImage: '🧂' },
      { emojiName: '', emojiImage: '🥫' },
      { emojiName: '', emojiImage: '🍱' },
      { emojiName: '', emojiImage: '🍘' },
      { emojiName: '', emojiImage: '🍙' },
      { emojiName: '', emojiImage: '🍚' },
      { emojiName: '', emojiImage: '🍛' },
      { emojiName: '', emojiImage: '🍜' },
      { emojiName: '', emojiImage: '🍝' },
      { emojiName: '', emojiImage: '🍠' },
      { emojiName: '', emojiImage: '🍢' },
      { emojiName: '', emojiImage: '🍣' },
      { emojiName: '', emojiImage: '🍤' },
      { emojiName: '', emojiImage: '🍥' },
      { emojiName: '', emojiImage: '🥮' },
      { emojiName: '', emojiImage: '🍡' },
      { emojiName: '', emojiImage: '🥟' },
      { emojiName: '', emojiImage: '🥠' },
      { emojiName: '', emojiImage: '🥡' },
      { emojiName: '', emojiImage: '🦪' },
      { emojiName: '', emojiImage: '🍦' },
      { emojiName: '', emojiImage: '🍧' },
      { emojiName: '', emojiImage: '🍨' },
      { emojiName: '', emojiImage: '🍩' },
      { emojiName: '', emojiImage: '🍪' },
      { emojiName: '', emojiImage: '🎂' },
      { emojiName: '', emojiImage: '🍰' },
      { emojiName: '', emojiImage: '🧁' },
      { emojiName: '', emojiImage: '🥧' },
      { emojiName: '', emojiImage: '🍫' },
      { emojiName: '', emojiImage: '🍬' },
      { emojiName: '', emojiImage: '🍭' },
      { emojiName: '', emojiImage: '🍮' },
      { emojiName: '', emojiImage: '🍯' },
      { emojiName: '', emojiImage: '🍼' },
      { emojiName: '', emojiImage: '🥛' },
      { emojiName: '', emojiImage: '☕' },
      { emojiName: '', emojiImage: '🫖' },
      { emojiName: '', emojiImage: '🍵' },
      { emojiName: '', emojiImage: '🍶' },
      { emojiName: '', emojiImage: '🍾' },
      { emojiName: '', emojiImage: '🍷' },
      { emojiName: '', emojiImage: '🍸' },
      { emojiName: '', emojiImage: '🍹' },
      { emojiName: '', emojiImage: '🍺' },
      { emojiName: '', emojiImage: '🍻' },
      { emojiName: '', emojiImage: '🥂' },
      { emojiName: '', emojiImage: '🥤' },
      { emojiName: '', emojiImage: '🧋' },
      { emojiName: '', emojiImage: '🧃' },
      { emojiName: '', emojiImage: '🧉' },
      { emojiName: '', emojiImage: '🧊' },
      { emojiName: '', emojiImage: '♨️' },
    ],
  },
  world: {
    title: '🌍 EXPLORE THE WORLD 🌍',
    content: [
      { emojiName: 'africa', emojiImage: '🌍' },
      { emojiName: 'america', emojiImage: '🌎' },
      { emojiName: 'asia', emojiImage: '🌏' },
      { emojiName: 'map', emojiImage: '🗺️' },
      { emojiName: 'japan', emojiImage: '🗾' },
      { emojiName: 'compass', emojiImage: '🧭' },
      { emojiName: 'mountain', emojiImage: '🏔️' },
      { emojiName: 'mountain-2', emojiImage: '🗻' },
      { emojiName: 'volcano', emojiImage: '🌋' },
      { emojiName: '', emojiImage: '🏕️' },
      { emojiName: '', emojiImage: '🏟️' },
      { emojiName: '', emojiImage: '🏝️' },
      { emojiName: '', emojiImage: '🏞️' },
      { emojiName: '', emojiImage: '🏜️' },
      { emojiName: '', emojiImage: '🏖️' },
      { emojiName: '', emojiImage: '🏛️' },
      { emojiName: '', emojiImage: '🏗️' },
      { emojiName: '', emojiImage: '🛖' },
      { emojiName: '', emojiImage: '🏘️' },
      { emojiName: '', emojiImage: '🏚️' },
      { emojiName: '', emojiImage: '🏠' },
      { emojiName: '', emojiImage: '🏡' },
      { emojiName: '', emojiImage: '🏢' },
      { emojiName: '', emojiImage: '🏣' },
      { emojiName: '', emojiImage: '🏤' },
      { emojiName: '', emojiImage: '🏥' },
      { emojiName: '', emojiImage: '🏦' },
      { emojiName: '', emojiImage: '🏨' },
      { emojiName: '', emojiImage: '🏩' },
      { emojiName: '', emojiImage: '🏪' },
      { emojiName: '', emojiImage: '🏫' },
      { emojiName: '', emojiImage: '🏬' },
      { emojiName: '', emojiImage: '🏭' },
      { emojiName: '', emojiImage: '🏯' },
      { emojiName: '', emojiImage: '🏰' },
      { emojiName: '', emojiImage: '💒' },
      { emojiName: '', emojiImage: '🗼' },
      { emojiName: '', emojiImage: '🗽' },
      { emojiName: '', emojiImage: '⛪' },
      { emojiName: '', emojiImage: '🕌' },
      { emojiName: '', emojiImage: '🛕' },
      { emojiName: '', emojiImage: '🕍' },
      { emojiName: '', emojiImage: '⛩️' },
      { emojiName: '', emojiImage: '🕋' },
      { emojiName: '', emojiImage: '⛲' },
      { emojiName: '', emojiImage: '⛺' },
      { emojiName: '', emojiImage: '🌁' },
      { emojiName: '', emojiImage: '🌃' },
      { emojiName: '', emojiImage: '🏙️' },
      { emojiName: '', emojiImage: '🌄' },
      { emojiName: '', emojiImage: '🌅' },
      { emojiName: '', emojiImage: '🌆' },
      { emojiName: '', emojiImage: '🌇' },
      { emojiName: '', emojiImage: '🌉' },
      { emojiName: '', emojiImage: '🎡' },
      { emojiName: '', emojiImage: '🎢' },
      { emojiName: '', emojiImage: '💈' },
      { emojiName: '', emojiImage: '🎪' },
    ],
  },
  others: {
    title: '👽 THIS DIDN\'T FIT ANYWHERE ELSE 👽',
    content: [
      { emojiName: 'skull', emojiImage: '💀' },
      { emojiName: 'skull', emojiImage: '☠' },
      { emojiName: 'bone', emojiImage: '🦴' },
      { emojiName: 'feather', emojiImage: '🪶' },
      { emojiName: 'alien', emojiImage: '👽' },
      { emojiName: 'devil', emojiImage: '😈' },
      { emojiName: 'devil', emojiImage: '👿' },
      { emojiName: 'ghost', emojiImage: '👻' },
      { emojiName: 'game', emojiImage: '👾' },
      { emojiName: 'robot', emojiImage: '🤖' },
      { emojiName: 'poop', emojiImage: '💩' },
      { emojiName: 'hundreth', emojiImage: '💯' },
      { emojiName: 'water', emojiImage: '💦' },
      { emojiName: 'wind', emojiImage: '💨' },
      { emojiName: 'zzz', emojiImage: '💤' },
      { emojiName: 'brain', emojiImage: '🧠' },
      { emojiName: 'heart', emojiImage: '🫀' },
      { emojiName: 'tooth', emojiImage: '🦷' },
      { emojiName: 'eyeball', emojiImage: '👁️' },
      { emojiName: 'eyes', emojiImage: '👀' },
      { emojiName: 'lungs', emojiImage: '🫁' },
      { emojiName: 'lips', emojiImage: '👄' },
      { emojiName: 'bomb', emojiImage: '💣' },
      { emojiName: 'explosion', emojiImage: '💥' },
      { emojiName: 'star', emojiImage: '💫' },
      { emojiName: 'letter', emojiImage: '💌' },
      { emojiName: 'kiss', emojiImage: '💋' },
      { emojiName: '', emojiImage: '🧱' },
      { emojiName: '', emojiImage: '🎠' },
      { emojiName: '', emojiImage: '🕳️' },
      { emojiName: '', emojiImage: '🏺' },
      { emojiName: '', emojiImage: '' },
      { emojiName: '', emojiImage: '' },
      { emojiName: '', emojiImage: '' },
    ],
  },
  symbols: {
    title: '',
    content: [
      { emojiName: '', emojiImage: '💬' },
      { emojiName: '', emojiImage: '🗨️' },
      { emojiName: '', emojiImage: '🗯️' },
      { emojiName: '', emojiImage: '💭' },
    ],
  },
}
/* ...
 '',  '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊',
  🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖',
  🚗', '🚘', '🚙', '🛻', '🚚', '🚛', '🚜', '🏎️', '🏎', '🏍️',
  🏍', '🛵', '🦽', '🦼', '🛺', '🚲', '🛴', '🛹', '🛼', '🚏',
  '🛣️', '🛣', '🛤️', '🛤', '🛢️', '🛢', '⛽', '🚨', '🚥', '🚦', '🛑',
  🚧', '⚓', '⛵', '🛶', '🚤', '🛳️', '🛳', '⛴️', '⛴', '🛥️', '🛥',
  🚢', '✈️', '✈', '🛩️', '🛩', '🛫', '🛬', '🪂', '💺', '🚁', '🚟',
  🚠', '🚡', '🛰️', '🛰', '🚀', '🛸', '🛎️', '🛎', '🧳', '⌛', '⏳',
  ⌚', '⏰', '⏱️', '⏱', '⏲️', '⏲', '🕰️', '🕰', '🕛', '🕧', '🕐',
  🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡',
  🕖', '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦', '🌑',
  🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜',
  🌡️', '🌡', '☀️', '☀', '🌝', '🌞', '🪐', '⭐', '🌟', '🌠', '🌌',
  ☁️', '☁', '⛅', '⛈️', '⛈', '🌤️', '🌤', '🌥️', '🌥', '🌦️', '🌦',
  🌧️', '🌧', '🌨️', '🌨', '🌩️', '🌩', '🌪️', '🌪', '🌫️', '🌫', '🌬️',
  🌬', '🌀', '🌈', '🌂', '☂️', '☂', '☔', '⛱️', '⛱', '⚡', '❄️',
  ❄', '☃️', '☃', '⛄', '☄️', '☄', '🔥', '💧', '🌊', '🎃', '🎄',
  🎆', '🎇', '🧨', '✨', '🎈', '🎉', '🎊', '🎋', '🎍', '🎎',
  🎏', '🎐', '🎑', '🧧', '🎀', '🎁', '🎗️', '🎗', '🎟️', '🎟', '🎫', '🎖️',
  🎖', '🏆', '🏅', '🥇', '🥈', '🥉', '⚽', '⚾', '🥎', '🏀', '🏐', '🏈',
  🏉', '🎾', '🥏', '🎳', '🏏', '🏑', '🏒', '🥍', '🏓', '🏸', '🥊', '🥋',
  🥅', '⛳', '⛸️', '⛸', '🎣', '🤿', '🎽', '🎿', '🛷', '🥌', '🎯', '🪀',
  🪁', '🎱', '🔮', '🪄', '🧿', '🎮', '🕹️', '🕹', '🎰', '🎲', '🧩', '🧸',
  🪅', '🪆', '♟️', '♟', '🃏', '🀄', '🎴', '🎭', '🖼️', '🖼', '🎨',
  🧵', '🪡', '🧶', '🪢', '👓', '🕶️', '🕶', '🥽', '🥼', '🦺', '👔',
  👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '🥻', '🩱', '🩲',
  🩳', '👙', '👚', '👛', '👜', '👝', '🛍️', '🛍', '🎒', '🩴', '👞',
  👟', '🥾', '🥿', '👠', '👡', '🩰', '👢', '👑', '👒', '🎩', '🎓', '🧢',
  🪖', '⛑️', '⛑', '📿', '💄', '💍', '💎', '🔇', '🔈', '🔉', '🔊', '📢',
  📣', '📯', '🔔', '🔕', '🎼', '🎵', '🎶', '🎙️', '🎙', '🎚️', '🎚', '🎛️',
  🎛', '🎤', '🎧', '📻', '🎷', '🪗', '🎸', '🎹', '🎺', '🎻', '🪕', '🥁',
  🪘', '📱', '📲', '☎️', '☎', '📞', '📟', '📠', '🔋', '🔌', '💻', '🖥️',
  🖥', '🖨️', '🖨', '⌨️', '⌨', '🖱️', '🖱', '🖲️', '🖲', '💽', '💾', '💿',
  📀', '🧮', '🎥', '🎞️', '🎞', '📽️', '📽', '🎬', '📺', '📷', '📸',
  📹', '📼', '🔍', '🔎', '🕯️', '🕯', '💡', '🔦', '🏮', '🪔', '📔',
  📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒', '📃', '📜', '📄',
  📰', '🗞️', '🗞', '📑', '🔖', '🏷️', '🏷', '💰', '🪙', '💴', '💵',
  💶', '💷', '💸', '💳', '🧾', '💹', '✉️', '✉', '📧', '📨', '📩',
  📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '🗳', '✏️',
  ✒️', '✒', '🖋️', '🖋', '🖊️', '🖊', '🖌️', '🖌', '🖍️', '🖍', '📝', '💼',
  📁', '📂', '🗂️', '🗂', '📅', '📆', '🗒️', '🗒', '🗓️', '🗓', '📇', '📈',
  📉', '📊', '📋', '📌', '📍', '📎', '🖇️', '🖇', '📏', '📐', '✂️', '✂',
  🗃️', '🗃', '🗄️', '🗄', '🗑️', '🗑', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️',
  🗝', '🔨', '🪓', '⛏️', '⛏', '⚒️', '⚒', '🛠️', '🛠', '🗡️', '🗡', '⚔️',
  ⚔', '🔫', '🪃', '🏹', '🛡️', '🛡', '🪚', '🔧', '🪛', '🔩', '⚙️', '⚙',
  🗜️', '🗜', '⚖️', '⚖', '🦯', '🔗', '⛓️', '⛓', '🪝', '🧰', '🧲', '🪜',
  ⚗️', '⚗', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊',
  🩹', '🩺', '🚪', '🛗', '🪞', '🪟', '🛏️', '🛏', '🛋️', '🛋', '🪑',
  🚽', '🪠', '🚿', '🛁', '🪤', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻',
  🪣', '🧼', '🪥', '🧽', '🧯', '🛒', '🚬', '⚰️', '⚰', '🪦', '⚱️',
  ⚱', '🗿', '🪧', '🏧', '🚮', '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '🛂', '🛃', '🛄', '🛅', '⚠️', '⚠', '🚸', '⛔', '🚫', '🚳', '🚭', '🚯', '🚱', '🚷', '📵', '🔞', '☢️', '☢', '☣️', '☣', '⬆️', '⬆', '↗️', '↗', '➡️', '➡', '↘️', '↘', '⬇️', '⬇', '↙️', '↙', '⬅️', '⬅', '↖️', '↖', '↕️', '↕', '↔️', '↔', '↩️', '↩', '↪️', '↪', '⤴️', '⤴', '⤵️', '⤵', '🔃', '🔄', '🔙', '🔚', '🔛', '🔜', '🔝', '🛐', '⚛️', '⚛', '🕉️', '🕉', '✡️', '✡', '☸️', '☸', '☯️', '☯', '✝️', '✝', '☦️', '☦', '☪️', '☪', '☮️', '☮', '🕎', '🔯', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔀', '🔁', '🔂', '▶️', '▶', '⏩', '⏭️', '⏭', '⏯️', '⏯', '◀️', '◀', '⏪', '⏮️', '⏮', '🔼', '⏫', '🔽', '⏬', '⏸️', '⏸', '⏹️', '⏹', '⏺️', '⏺', '⏏️', '⏏', '🎦', '🔅', '🔆', '📶', '📳', '📴', '♀️', '♀', '♂️', '♂', '⚧️', '⚧', '✖️', '✖', '➕', '➖', '➗', '♾️', '♾', '‼️', '‼', '⁉️', '⁉', '❓', '❔', '❕', '❗', '〰️', '〰', '💱', '💲', '⚕️', '⚕', '♻️', '♻', '⚜️', '⚜', '🔱', '📛', '🔰', '⭕', '✅', '☑️', '☑', '✔️', '✔', '❌', '❎', '➰', '➿', '〽️', '〽', '✳️', '✳', '✴️', '✴', '❇️', '❇', '©️', '©', '®️', '®', '™️', '™', '#️⃣', '#⃣', '*️⃣', '*⃣', '0️⃣', '0⃣', '1️⃣', '1⃣', '2️⃣', '2⃣', '3️⃣', '3⃣', '4️⃣', '4⃣', '5️⃣', '5⃣', '6️⃣', '6⃣', '7️⃣', '7⃣', '8️⃣', '8⃣', '9️⃣', '9⃣', '🔟', '🔠', '🔡', '🔢', '🔣', '🔤', '🅰️', '🅰', '🆎', '🅱️', '🅱', '🆑', '🆒', '🆓', 'ℹ️', 'ℹ', '🆔', 'Ⓜ️', 'Ⓜ', '🆕', '🆖', '🅾️', '🅾', '🆗', '🅿️', '🅿', '🆘', '🆙', '🆚', '🈁', '🈂️', '🈂', '🈷️', '🈷', '🈶', '🈯', '🉐', '🈹', '🈚', '🈲', '🉑', '🈸', '🈴', '🈳', '㊗️', '㊗', '㊙️', '㊙', '🈺', '🈵', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫', '⬛', '⬜', '◼️', '◼', '◻️', '◻', '◾', '◽', '▪️', '▪', '▫️', '▫', '🔶', '🔷', '🔸', '🔹', '🔺', '🔻', '💠', '🔘', '🔳', '🔲', '🏁', '🚩', '🎌', '🏴', '🏳️', '🏳', '🏳️‍🌈', '🏳‍🌈', '🏳️‍⚧️', '🏳‍⚧️', '🏳️‍⚧', '🏳‍⚧', '🏴‍☠️'
*/

