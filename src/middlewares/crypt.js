import bcrypt from 'bcrypt'

export function crypt(string){
    return bcrypt.hashSync(string, 10)
}

export function compare(string1, string2){
    return bcrypt.compareSync(string1, string2);
}