type qwerty=string
const Keyboard = (Qwerty:number) => {
    const qwerty: string = "QWERTYUIOP ASDFGHJKL ZXCVBNM"
          return 'q | w | e | r | t | y | u | i | o | p' + 'a | s | d | f | g | h | j | k | l' + 'z | x | c | v | b | n | m' 
}
const Keyboard2 = (Dvorak:number) => {
    const dvorak:string = "PYFGCRL AOEUIDHTNS QJKXBMWZ"
         return 'p | y | f | g | c | r | l' + 'a | o | e | u | i | d | h | t | n | s' + 'q | j | k | x | b | m | w | z'
}
const Keyboard3 = (Colemak:number) => {
    const colekmak:string = "QWFPGJLUY ARSTDHNZXCMVBEIO ZXCVBKM"
         return 'q | w | f | p | g | j | l | u | y ' + 'a | r | s | t | d | h | n | e | i | o' + 'z | x | c | v | b | k | m'
}