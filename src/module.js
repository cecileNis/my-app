/**
 * 
 * @param {object} p An object representing a person, implementing a birth Date parameter
 * @returns {number} The age in years of p
 */

export function calculateAge(p){
    if(!p) throw new Error("missing param")
    
    if(!p.birth) throw new Error("missing param birth")

    if(!(p.birth instanceof Date)) throw new Error("missing param birth date")

    if(p.birth.toString().includes("Invalid Date")) throw new Error("missing param birth date false")
    
    if(p.birth.getTime() > Date.now()) throw new Error("age must be greater than 18")

    let dateDiff = new Date(Date.now() - p.birth.getTime())
    let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    return age;
}