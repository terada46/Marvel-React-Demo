const md5 = require('js-md5');

export const charactersAPI = 'https://gateway.marvel.com/v1/public/characters';
export const comicsAPI = 'https://gateway.marvel.com/v1/public/comics';
export const apikey = "0483c06f7f9d3c34dea045e77e99b676";
const pri_key = "e3cd0dc12c14712b02850f59c11c2d932d0dba1e";

export const ts = Date.now();
export const hash = md5(ts + pri_key + apikey);

export const characters = [
					'1009368', //IRON MAN
					'1009610', //Spider-man
					'1009351', //Hulk
					'1009146', //Abomination
					'1009297', //Falcon
					'1009596', //Banshee
					'1009262', //Daredevil
					'1009664', //Thor
					'1009685', //Ultron
					'1009652' //Thanos
				    ];